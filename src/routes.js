//	Importing React and Router resouces
import React, { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import { AnimatePresence } from "framer-motion";

//	Importing pages
import { Chat } from "./pages/Chat";
import { Login } from "./pages/User/Login";
import { Signup } from "./pages/User/Signup";
import { Home } from "./pages/Website/Home";
import { NotFound } from "./pages/Website/NotFound";

//	Importing components
import { Loading } from "./components/Loading";

//	Importing api to communicate to backend
import api from "./services/api";

//	Exporting Routes
export const Routes = () => {
	//	User and session state variables
	const [userId, setUserId] = useState(sessionStorage.getItem("userId")?.length ?
		sessionStorage.getItem("userId")
		:
		localStorage.getItem("userId")
	);
	const [user, setUser] = useState(null);

	//	Loading component state variable
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			if(userId && userId.length) {
				await api.get("/session", {
					headers: {
						"X-Access-Token": userId
					}
				}).then((response) => {
					if(response && response.status === 200) {
						setUser(response.data);
					}
				}).catch(() => {
					setUserId("");
					setUser(null);
					sessionStorage.removeItem("userId");
					localStorage.removeItem("userId");
				});
			}

			setLoading(false);
		}

		fetchData();
	}, [userId]);

	const userAuth = user && user._id && userId && userId.length;

	if(isLoading) {
		return (<Loading />);
	}

	return (
		<AnimatePresence exitBeforeEnter>
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={() => <Home userId={userId} />} />
					<Route
						exact path="/chat"
						component={() => userAuth ? <Chat user={user} /> : <Redirect to="/login?r=chat" />}
					/>
					<Route
						path="/login"
						component={({ location }) => !userAuth ?
							<Login setUser={setUser} setUserId={setUserId} location={location} />
							:
							<Redirect to="/" />
						}
					/>
					<Route
						path="/signup"
						component={({ location }) => !userAuth ?
							<Signup setUser={setUser} setUserId={setUserId} location={location} />
							:
							<Redirect to="/" />
						}
					/>
					<Route path="*" component={NotFound} status={404} />
				</Switch>
			</BrowserRouter>
		</AnimatePresence>
	);
}