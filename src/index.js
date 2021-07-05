//  Importing React, ReactDOM and App resources
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import packageJson from "../package.json";

//	Setting up sentry
Sentry.init({
	dsn: "https://bd8b19ac1d7245ceb7eb658dd7c61d9f@o851448.ingest.sentry.io/5818363",
	integrations: [new Integrations.BrowserTracing()],
	environment: process.env.NODE_ENV,
	release: `${packageJson.name}@${packageJson.version}`,

	// Set tracesSampleRate to 1.0 to capture 100%
	// of transactions for performance monitoring.
	// We recommend adjusting this value in production
	tracesSampleRate: 1.0
});

//  Rendering App
ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);
