//	Importing React and Routes feature to navigate through website pages
import { Routes } from "./routes";

//	Importing global styles
import "./global.css";

//	Importing Auth context
import { AuthContextProvider } from "./contexts/AuthContext";

//	Exporting app component
export const App = () => (
	<AuthContextProvider>
		<Routes />
	</AuthContextProvider>);
