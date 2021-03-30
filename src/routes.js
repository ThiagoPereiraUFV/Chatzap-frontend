//	Importing React and Router resources
import React, { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

//	Importing socket resources
import io from "socket.io-client";

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

//	Socket variable
let socket;

//	Exporting Routes
export const Routes = () => {
	//	User state variables
	const [userId, setUserId] = useState(sessionStorage.getItem("userId")?.length ?
		sessionStorage.getItem("userId")
		:
		localStorage.getItem("userId")
	);
	const [user, setUser] = useState(null);

	//	Loading component state variable
	const [isLoading, setLoading] = useState(true);

	//	Get logged user data
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

	// //	Socket connection
	// useEffect(() => {
	// 	socket = io.connect(process.env.REACT_APP_ENDPOINT, {
	// 		"force new connection" : true,
	// 		"reconnectionAttempts": "Infinity",
	// 		"timeout" : 10000,
	// 		"transports" : ["websocket"]
	// 	});

	// 	socket.emit("general", user, (error) => {
	// 		if(error) {
  //       alert(error);
  //     }
	// 	});

	// 	return () => socket.disconnect();
	// }, [user]);

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
						component={() => userAuth ?
							<Chat user={user} userId={userId} setUserId={setUserId} setUser={setUser} />
							:
							<Redirect to="/login?r=chat" />
						}
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