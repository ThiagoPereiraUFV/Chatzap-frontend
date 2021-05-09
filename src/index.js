//  Importing React, ReactDOM and App resources
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

//  Rendering App
ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);
