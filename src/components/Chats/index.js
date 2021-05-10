import { Badge, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router";

export const Chats = ({ chats }) => {
	const history = useHistory();

	return (
		<Row className="m-auto" >
			{chats.map((chat, i) => (
				<Col key={i} className="m-0" sm="12">
					<Row
						className="d-flex justify-content-between btn border rounded-0 py-4"
						onClick={() => history.push(`/chat?c=${chat?.roomId?._id}`)}
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
};
