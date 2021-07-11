//	Importing Router resources
import { BrowserRouter, Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";

//	Importing framer motion resources
import { AnimatePresence } from "framer-motion";

//	Importing pages
import { Chats } from "./pages/Chats";
import { Login } from "./pages/User/Login";
import { Signup } from "./pages/User/Signup";
import { Home } from "./pages/Website/Home";
import { NotFound } from "./pages/Website/NotFound";

//	Importing api to communicate to backend
import { StaticContext } from "react-router";

//	Importing user data
import { useAuth } from "./hooks/useAuth";

//	Exporting Routes
export const Routes = () => {
	//	User data
	const { userToken } = useAuth();

	const userAuth = userToken && userToken.length;

	return (
		<AnimatePresence exitBeforeEnter>
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={() => <Home />} />
					<Route
						exact path="/chats"
						component={() => userAuth ?
							<Chats />
							:
							<Redirect to="/login?r=chats" />
						}
					/>
					<Route
						path="/login"
						component={({ location }: RouteComponentProps<any, StaticContext, unknown>) => !userAuth ?
							<Login location={location} />
							:
							<Redirect to="/chats" />
						}
					/>
					<Route
						path="/signup"
						component={({ location }: RouteComponentProps<any, StaticContext, unknown>) => !userAuth ?
							<Signup location={location} />
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
