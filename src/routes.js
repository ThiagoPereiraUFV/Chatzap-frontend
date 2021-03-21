//	Importing React and Router resouces
import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//	Importing pages
import { Join } from "./pages/Join";
import { Chat } from "./pages/Chat";
import { Home } from "./pages/Website/Home";
import { NotFound } from "./pages/Website/NotFound";

//	Exporting Routes
export const Routes = () => {
	const [name, setName] = useState(sessionStorage.getItem("name"));
	const [room, setRoom] = useState(sessionStorage.getItem("room"));

	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route
					exact path="/join"
					component={() => <Join name={name} setName={setName} room={room} setRoom={setRoom} />}
				/>
				<Route
					exact path="/chat"
					component={() => <Chat name={name} room={room} />}
				/>
				<Route path="*" component={NotFound} status={404} />
			</Switch>
		</BrowserRouter>
	);
}