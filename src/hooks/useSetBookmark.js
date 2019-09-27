import { useEffect, useRef } from "react"
import { useSession } from "dash-component-library/context"
import { combineLatest, switchMap, retry } from "rxjs/operators"
import { Subject } from "rxjs"

export default ({ app } = {}) => {
	const sessions = useSession()
	const {
		rxq: { doc$ },
	} = app ? sessions.find(session => session.name === app) : sessions[0]

	const set$ = useRef(new Subject()).current

	useEffect(() => {
		const sub$ = set$
			.pipe(
				combineLatest(doc$),
				switchMap(([bookmarkId, docHandle]) =>
					docHandle.ask("ApplyBookmark", bookmarkId).pipe(retry(3))
				)
			)
			.subscribe()

		return () => sub$.unsubscribe()
	}, [doc$])

	const setBookmark = id => set$.next(id)

	return { setBookmark }
}
