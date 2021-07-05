//	Importing React and Router resources
import React, { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import * as Sentry from "@sentry/react";

//	Importing framer motion resources
import { AnimatePresence } from "framer-motion";

//	Importing pages
import { Chats } from "./pages/Chats";
import { Login } from "./pages/User/Login";
import { Signup } from "./pages/User/Signup";
import { Home } from "./pages/Website/Home";
import { NotFound } from "./pages/Website/NotFound";

//	Importing components
import { Loading } from "./components/Loading";

//	Importing socket resources
import io from "socket.io-client";

//	Importing api to communicate to backend
import api from "./services/api";

//	Exporting Routes
export const Routes = () => {
	//	Socket variable
	const [socket, setSocket] = useState(null);

	//	User state variables
	const [userToken, setUserToken] = useState(sessionStorage.getItem("userToken")?.length ?
		sessionStorage.getItem("userToken")
		:
		localStorage.getItem("userToken")
	);
	const [user, setUser] = useState(null);

	//	Loading component state variable
	const [isLoading, setLoading] = useState(true);

	//	Get logged user data
	useEffect(() => {
		async function fetchData() {
			if(userToken && userToken.length) {
				await api.get("/session", {
					headers: {
						Authorization: `Bearer ${userToken}`
					}
				}).then((response) => {
					if(response && response.status === 200) {
						setUser(response.data);
					}
				}).catch((error) => {
					if(!error?.response || error?.response?.status === 500) {
						Sentry.captureException(error);
					}
					setUserToken(null);
					setUser(null);
					sessionStorage.removeItem("userToken");
					localStorage.removeItem("userToken");
				});
			}

			setLoading(false);
		}

		fetchData();
	}, [userToken]);

	//	Socket connection
	useEffect(() => {
		if(user) {
			const wsConn = io(process.env.REACT_APP_API_URL, {
				transports: ["websocket"]
			});

			wsConn?.emit("online", user?._id);

			setSocket(wsConn);

			return () => socket?.disconnect();
		}

	}, [user]);

	const userAuth = userToken && userToken.length;

	if(isLoading) {
		return (<Loading />);
	}

	return (
		<AnimatePresence exitBeforeEnter>
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={() => <Home userToken={userToken} />} />
					<Route
						exact path="/chats"
						component={() => userAuth ?
							<Chats
								socket={socket}
								user={user}
								userToken={userToken}
								setUserToken={setUserToken}
							/>
							:
							<Redirect to="/login?r=chats" />
						}
					/>
					<Route
						path="/login"
						component={({ location }) => !userAuth ?
							<Login setUserToken={setUserToken} location={location} />
							:
							<Redirect to="/chats" />
						}
					/>
					<Route
						path="/signup"
						component={({ location }) => !userAuth ?
							<Signup setUserToken={setUserToken} location={location} />
							:
							<Redirect to="/chats" />
						}
					/>
					<Route path="*" component={NotFound} />
				</Switch>
			</BrowserRouter>
		</AnimatePresence>
	);
};
