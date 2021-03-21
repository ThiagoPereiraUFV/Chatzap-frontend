//	Importing React and Router resouces
import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//	Importing pages
import { Join } from "./pages/Join";
import { Direct } from "./pages/Direct";
import { Group } from "./pages/Group";
import { Home } from "./pages/Website/Home";
import { NotFound } from "./pages/Website/NotFound";

//	Exporting Routes
export const Routes = () => {
	const name = useState(sessionStorage.getItem("name"));
	const number = useState(sessionStorage.getItem("number"));
	const room = useState(sessionStorage.getItem("room"));

	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route
					exact path="/join"
					component={Join}
				/>
				<Route
					exact path="/direct"
					component={() => <Direct name={name} number={number} room={room} />}
				/>
				<Route
					exact path="/group"
					component={() => <Group name={name} number={number} room={room} />}
				/>
				<Route path="*" component={NotFound} status={404} />
			</Switch>
		</BrowserRouter>
	);
}