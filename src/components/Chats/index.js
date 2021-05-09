import { Badge, Col, Row } from "react-bootstrap";

export const Chats = ({ chats, setChat }) => (
	<Row className="m-auto" >
		{chats.map((chat, i) => (
			<Col key={i} className="m-0" sm="12">
				<Row
					className="d-flex justify-content-between btn border rounded-0 py-4"
					onClick={() => setChat(chat)}
				>
					<Col className="p-0 text-left" sm="6">
						{chat?.roomId?.name ?? chat?.name}
					</Col>
					<Badge
						as={Col}
						className="ml-auto my-auto"
						variant="secondary"
						sm="1"
					>
						{chat?.roomId?.nMembers ?? chat?.nMembers}
					</Badge>
				</Row>
			</Col>
		))}
	</Row>
);
