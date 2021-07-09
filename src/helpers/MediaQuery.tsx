//	Importing media query helper
import MediaQuery from "react-responsive";

export const MQ = {
	SM: ({ children }) => (
		<MediaQuery minDeviceWidth={0}>
			{children}
		</MediaQuery>
	),
	MD: ({ children }) => (
		<MediaQuery minDeviceWidth={426}>
			{children}
		</MediaQuery>
	),
	LG: ({ children }) => (
		<MediaQuery minDeviceWidth={769}>
			{children}
		</MediaQuery>
	),
	XL: ({ children }) => (
		<MediaQuery minDeviceWidth={1441}>
			{children}
		</MediaQuery>
	)
};
