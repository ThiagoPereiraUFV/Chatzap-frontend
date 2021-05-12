import { Link, useHistory } from "react-router-dom";

import { Navbar, Nav, NavDropdown, Accordion, Card, Button, Image, Row, Col } from "react-bootstrap";

import { RiArrowLeftLine, RiLogoutCircleLine } from "react-icons/ri";

export const Infobar = {
	Chat: ({ room }) => {
		const history = useHistory();

		return (
			<Navbar className="m-0 p-0" bg="success" variant="light" sticky="top">
				<Nav className="w-100">
					<Nav.Item className="w-100">
						<Accordion>
							<Card bg="success" className="d-flex flex-row">
								<Button
									className="rounded-0"
									variant="success"
									size="lg"
									onClick={() => history.push("/chat")}
								>
									<RiArrowLeftLine className="text-white" size="25" />
								</Button>
								<Accordion.Toggle
									as={Button}
									className="text-left font-weight-bold rounded-0 py-2"
									variant="success"
									size="lg"
									eventKey="0"
									block
								>
        					{room?.name}
								</Accordion.Toggle>
							</Card>
							<Accordion.Collapse eventKey="0">
								<Card.Body className="p-0">
									<Row className="m-auto">
										<Image
											as={Col}
											fluid
											src="https://portalmakingof.com.br/uploads/posts/1e8ab0f93cb7cc98abba51ea69b62c16.jpg"
										/>
										<Col className="px-1">
											<Row className="m-auto">
												<Col className="text-light m-2">
													{`Criado em ${new Date(room?.createdAt).toLocaleString("pt-BR")} por ${room?.userId?.name}`}
												</Col>
											</Row>
											<Row className="m-auto">
												<Col className="text-light m-2">
													{`Membros ${room?.nMembers}`}
												</Col>
											</Row>
										</Col>
									</Row>
								</Card.Body>
							</Accordion.Collapse>
						</Accordion>
					</Nav.Item>
				</Nav>
			</Navbar>
		);
	},
	Chats: ({ setUserToken, actions }) => {
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
			<Navbar className="m-0" bg="secondary" variant="light" sticky="top">
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
	}
};
