//	Importing React and Router resources
import React, { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

//	Importing framer motion resources
import { AnimatePresence } from "framer-motion";

//	Importing pages
import { Chat } from "./pages/Chat";
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

//	Socket variable
let socket = null;

//	Exporting Routes
export const Routes = () => {
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
				}).catch(() => {
					setUserToken(null);
					setUser(null);
					sessionStorage.removeItem("userToken");
					localStorage.removeItem("userToken");
				});
			} else {
				setUserToken(null);
				setUser(null);
			}

			setLoading(false);
		}

		fetchData();
	}, [userToken]);

	//	Socket connection
	useEffect(() => {
		if(user) {
			socket = io.connect(process.env.REACT_APP_API_URL, {
				"force new connection": true,
				timeout: 10000,
				transports: ["websocket"]
			});
			console.log(user);
			socket.emit("online", user?._id, (error) => {
				if(error) {
					alert(error);
				}
			});

			return () => socket.disconnect();
		}

	}, [user]);

	const userAuth = user && user._id && userToken && userToken.length;

	if(isLoading) {
		return (<Loading />);
	}

	return (
		<AnimatePresence exitBeforeEnter>
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={() => <Home userToken={userToken} />} />
					<Route
						exact path="/chat"
						component={() => userAuth ?
							<Chat
								socket={socket}
								user={user}
								userToken={userToken}
								setUserToken={setUserToken}
							/>
							:
							<Redirect to="/login?r=chat" />
						}
					/>
					<Route
						path="/login"
						component={({ location }) => !userAuth ?
							<Login setUserToken={setUserToken} location={location} />
							:
							<Redirect to="/chat" />
						}
					/>
					<Route
						path="/signup"
						component={({ location }) => !userAuth ?
							<Signup setUserToken={setUserToken} location={location} />
							:
							<Redirect to="/chat" />
						}
					/>
					<Route path="*" component={NotFound} />
				</Switch>
			</BrowserRouter>
		</AnimatePresence>
	);
};
