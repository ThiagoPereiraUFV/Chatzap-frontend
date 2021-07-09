//	Importing React Bootstrap features
import React, { useEffect } from "react";
import { Alert } from "react-bootstrap";

interface PushTypes {
	pushShow: boolean,
	setPushShow: React.Dispatch<React.SetStateAction<boolean>>,
	message: string,
	color: string
}

export function Push({ pushShow, setPushShow, message, color }: PushTypes) {
	useEffect(() => {
		if(pushShow) {
			setTimeout(() => {
				setPushShow(false);
			}, 3000);
		}
	}, [pushShow]);

	return (
		<div
			style={{
				position: "fixed",
				bottom: "3%",
				left: "50%",
				transform: "translate(-50%, 0)",
				zIndex: 5
			}}
		>
			<Alert
				show={pushShow}
				variant={color?.length ? color : "danger"}
			>
				{message}
			</Alert>
		</div>
	);
}
