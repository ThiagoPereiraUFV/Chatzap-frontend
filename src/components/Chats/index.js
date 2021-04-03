import { Col, Row } from "react-bootstrap";

export const Chats = ({ chats, setChat }) => (
	<Row className="m-auto" >
		{[...Array(20)].map((message, i) => (
			<Col key={i} className="m-0 px-2" sm="12">
				<p>Chat</p>
			</Col>
		))}
	</Row>
);
