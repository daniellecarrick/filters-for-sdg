import React, { createContext, useContext, useMemo, useEffect } from "react"
import QdtComponents from "qdt-components"
import uuidv4 from "uuid/v4"
import { connectSession } from "rxq"
import { from } from "rxjs"
import { shareReplay, mergeMap, filter, switchMap, retry } from "rxjs/operators"
import { qAskReplayRetry } from "../operators"

/** Convert the incoming qlik config to format supported by qdt */
const qdtConfigGenerator = ({
	host,
	isSecure: secure = true,
	port = 443,
	prefix = "",
	appname: appId,
}) => ({ host, secure, port, prefix, appId })

/** Create Context */
const SessionContext = createContext()

/** Session Component */
export const SessionProvider = ({
	qlikConfig,
	initialSelections = [],
	children,
}) => {
	/** Serialize config to track updates */
	const _serializedConfig = JSON.stringify(qlikConfig)

	/** Convert to array */
	const qlikConfigArray = useMemo(
		() => (Array.isArray(qlikConfig) ? qlikConfig : [qlikConfig]),
		[_serializedConfig]
	)

	/** Sessions */
	const sessions = useMemo(
		() =>
			/** For each qlik config.. */
			qlikConfigArray.map(config => {
				/** Create a new session id */
				const sessionId = uuidv4()

				/** Create a new QdtComponents instance */
				const qdtComponents = new QdtComponents(qdtConfigGenerator(config), {
					vizApi: true,
					engineApi: true,
					useUniqueSessionID: sessionId,
				})

				/** Create a new RxQ session */
				const rxqSession = connectSession({
					...config,
					identity: sessionId,
				})
				const rxqGlobal$ = rxqSession.global$.pipe(shareReplay(1))
				const rxqDoc$ = rxqGlobal$.pipe(
					qAskReplayRetry("OpenDoc", config.appname)
				)

				/** return the QdtComponent session and RxQ session for this config */
				return {
					name: config.name,
					app: config.appname,
					initialBookmark: config.initialBookmark,
					sessionId,
					qdtComponents,
					rxq: { session: rxqSession, global$: rxqGlobal$, doc$: rxqDoc$ },
				}
			}),
		[_serializedConfig]
	)

	useEffect(() => {
		const bookmark$ = from(sessions)
			.pipe(
				filter(session => session.initialBookmark !== undefined),
				mergeMap(session =>
					session.rxq.doc$.pipe(
						qAskReplayRetry("ApplyBookmark", session.initialBookmark)
					)
				)
			)
			.subscribe()

		return () => bookmark$.unsubscribe()
	}, [sessions])

	/** Return Context Provider */
	return (
		<SessionContext.Provider value={sessions}>
			{children}
		</SessionContext.Provider>
	)
}

/** Accessible context consumer */
export const useSession = () => useContext(SessionContext)
