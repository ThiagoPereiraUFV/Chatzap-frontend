//	Importing React and Router resouces
import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//	Importing pages
import { JoinDirect } from "./pages/Join/Direct";
import { JoinGroup } from "./pages/Join/Group";
import { Direct } from "./pages/Chat/Direct";
import { Group } from "./pages/Chat/Group";
import { Home } from "./pages/Website/Home";
import { NotFound } from "./pages/Website/NotFound";

//	Exporting Routes
export const Routes = () => {
	const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));

	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route
					exact path="/joinDirect"
					component={() => <JoinDirect setUser={setUser} />}
				/>
				<Route
					exact path="/joinGroup"
					component={() => <JoinGroup setUser={setUser} />}
				/>
				<Route
					exact path="/direct"
					component={() => <Direct user={user} />}
				/>
				<Route
					exact path="/group"
					component={() => <Group user={user} />}
				/>
				<Route path="*" component={NotFound} status={404} />
			</Switch>
		</BrowserRouter>
	);
}