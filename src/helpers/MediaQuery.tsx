//	Importing React features
import { ReactNode } from "react";

//	Importing media query helper
import MediaQuery from "react-responsive";

export const MQ = {
	SM: ({ children }: { children: ReactNode}) => (
		<MediaQuery minDeviceWidth={0}>
			{children}
		</MediaQuery>
	),
	MD: ({ children }: { children: ReactNode}) => (
		<MediaQuery minDeviceWidth={426}>
			{children}
		</MediaQuery>
	),
	LG: ({ children }: { children: ReactNode}) => (
		<MediaQuery minDeviceWidth={769}>
			{children}
		</MediaQuery>
	),
	XL: ({ children }: { children: ReactNode}) => (
		<MediaQuery minDeviceWidth={1441}>
			{children}
		</MediaQuery>
	)
};
