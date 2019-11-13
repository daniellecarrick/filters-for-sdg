import { configure } from "@storybook/react"
import "../src/styles/global.css"

function loadStories() {
	const req = require.context("../src/components", true, /stories\.js$/)
	return req.keys().map(file => req(file))
}

configure(loadStories, module)
