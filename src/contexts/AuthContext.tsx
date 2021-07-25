//	Importing React resources
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

//	Importing api to communicate to backend
import api from "../services/api";

//	Importing Sentry resources
import * as Sentry from "@sentry/react";

//	Importing socket resources
import io, { Socket } from "socket.io-client";
import { Loading } from "../components/Loading";

//	Defining User interface
interface User {
	_id: string,
	name: string,
	phone: string,
	email?: string,
	password: string,
	online: boolean,
	image?: string,
	createdAt: Date,
	updatedAt: Date
}

//	Defining AuthContext interface
interface AuthContextType {
	user: User | null,
	userToken: string | null,
	socket: Socket | null
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: { children: ReactNode }) {
	//	User data
	const [user, setUser] = useState<User | null>(null);
	const [userToken, setUserToken] = useState(sessionStorage.getItem("userToken")?.length ?
		sessionStorage.getItem("userToken")
		:
		localStorage.getItem("userToken")
	);

	//	Socket data
	const [socket, setSocket] = useState<Socket | null>(null);

	//	Loader data
	const [loading, setLoading] = useState(true);

	//	Get logged user data
	useEffect(() => {
		async function fetchData() {
			if(userToken && userToken.length) {
				await api.get("/users/me", {
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
			const wsConn = io(process.env.REACT_APP_API_URL ?? "", {
				transports: ["websocket"]
			});

			wsConn?.emit("online", user?._id);

			setSocket(wsConn);
		}
	}, [user]);

	if(loading) {
		return (<Loading animation="border" />);
	}

	if(user && userToken && socket) {
		return (
			<AuthContext.Provider value={{ user, userToken, socket }}>
				{children}
			</AuthContext.Provider>
		);
	} else {
		return (
			<>
				{children}
			</>
		);
	}
}
