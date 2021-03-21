//	Importing React main module
import React, { useState } from "react";

//	Importing Route features to manage app routes
import { BrowserRouter, Route, Switch } from "react-router-dom";

//	Importing api to communicate to backend
//import api from "./services/api";

//	Importing pages
import { Join } from "./pages/Join";
import { Chat } from "./pages/Chat";

//	Exporting Routes do App.js
export const Routes = () => {
	const [name, setName] = useState(sessionStorage.getItem("name"));
	const [room, setRoom] = useState(sessionStorage.getItem("room"));

	return (
		<BrowserRouter>
			<Switch>
				<Route
					exact path="/"
					component={() => <Join name={name} setName={setName} room={room} setRoom={setRoom} />}
				/>
				<Route
					exact path="/chat"
					component={() => <Chat name={name} room={room} />}
				/>
				{/* <Route path="*" component={NotFoundPage} status={404} /> */}
			</Switch>
		</BrowserRouter>
	);
}