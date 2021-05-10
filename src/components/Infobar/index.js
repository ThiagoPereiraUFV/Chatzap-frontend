import { Link, useHistory } from "react-router-dom";

import { Navbar, Nav, NavDropdown } from "react-bootstrap";

import { RiCloseFill, RiLogoutCircleLine } from "react-icons/ri";

export const Infobar = {
	Chat: ({ room }) => {
		const history = useHistory();

		return (
			<Navbar className="m-0" bg="success" variant="light" sticky="top">
				<Nav className="mr-auto">
					<Nav.Item>
						<Navbar.Brand className="text-light font-weight-bold">{room}</Navbar.Brand>
					</Nav.Item>
				</Nav>
				<Nav className="ml-auto">
					<Nav.Item className="btn" onClick={() => history.push("/chat")}>
						<RiCloseFill className="text-white" size="25" />
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
