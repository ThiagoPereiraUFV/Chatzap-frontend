import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";

import { Message } from "./Message";

export const Messages = ({ messages, userPhone }) => {
	const ref = React.createRef();
	useEffect(() => {
		ref.current.scroll({ top: ref.current.scrollHeight, behavior: "smooth" });
	}, [messages]);

	return (
		<Row ref={ref} className="py-4 mx-0 mb-auto w-100" style={{ overflowY: "auto" }}>
			{messages.map((message, i) => (
				<Col key={i} className="m-0 p-0" sm="12">
					<Message message={message} number={userPhone} />
				</Col>
			))}
		</Row>
	);
};
