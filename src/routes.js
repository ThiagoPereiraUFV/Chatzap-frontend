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
	const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));

	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route
					exact path="/join"
					component={() => <Join user={user} setUser={setUser} />}
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