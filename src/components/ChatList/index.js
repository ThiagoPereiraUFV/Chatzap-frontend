import { useHistory, Link } from "react-router-dom";

import { Navbar, Nav, NavDropdown, Badge, Card, Col, Row, Form } from "react-bootstrap";
import { RiLogoutCircleLine } from "react-icons/ri";

export const ChatList = {
	Infobar: ({ setUserToken, actions }) => {
		//	Defining history to jump through pages
		const history = useHistory();

		//	Function to handle user logout
		function handleLogout(event) {
			event.preventDefault();

			sessionStorage.removeItem("userToken");
			localStorage.removeItem("userToken");
			setUserToken(null);

			history.push("/");
		}

		return (
			<Navbar className="m-0" bg="success" variant="light" sticky="top">
				<Nav className="mr-auto">
					<Nav.Item>
						<Navbar.Brand className="text-light font-weight-bold">Chatzap</Navbar.Brand>
					</Nav.Item>
					<Nav.Item>
						<NavDropdown className="p-0">
							{actions?.map((action, index) => (
								<NavDropdown.Item key={index} onClick={() => action?.func(true)}>
									{action?.name}
								</NavDropdown.Item>
							))}
						</NavDropdown>
					</Nav.Item>
				</Nav>
				<Nav className="ml-auto">
					<Nav.Item>
						<Link
							to="#"
							className="p-0"
							onClick={handleLogout}
						>
							<RiLogoutCircleLine className="text-white" size="25" />
						</Link>
					</Nav.Item>
				</Nav>
			</Navbar>
		);
	},
	Query: ({ query, setQuery }) => (
		<Form onSubmit={(e) => e.preventDefault()}>
			<Form.Group className="m-1 h-100" controlId="input">
				<Form.Control
					type="text"
					style={{ borderRadius: "30px" }}
					placeholder="Busque aqui"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					maxLength="50"
					autoComplete="off"
				/>
			</Form.Group>
		</Form>
	),
	Chats: ({ chats }) => {
		const history = useHistory();

		return (
			<Row className="m-auto" >
				{chats.map((chat, i) => (
					<Card
						key={i}
						as={Col}
						className="d-flex flex-row btn border rounded-0 py-4"
						onClick={() => history.push(`/chats?c=${chat?.roomId?._id}`)}
						sm="12"
					>
						<Col className="p-0 text-left" sm="11">
							{chat?.roomId?.name ?? chat?.name}
						</Col>
						<Badge
							as={Col}
							className="my-auto"
							variant="success"
							sm="auto"
						>
							{chat?.roomId?.nMembers ?? chat?.nMembers}
						</Badge>
					</Card>
				))}
			</Row>
		);
	}
};
