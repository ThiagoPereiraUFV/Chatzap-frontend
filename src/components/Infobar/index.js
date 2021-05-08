import { Link, useHistory } from "react-router-dom";

import { Navbar, Nav, NavDropdown } from "react-bootstrap";

import { RiCloseFill, RiLogoutCircleLine } from "react-icons/ri";

export const Infobar = {
	Chat: ({ room, online }) => (
		<Navbar className="m-0" bg="success" variant="light" sticky="top">
			<Nav className="mr-auto">
				<Nav.Item>
					<Navbar.Brand className="text-light font-weight-bold">{room}</Navbar.Brand>
				</Nav.Item>
				{typeof(online) === "boolean" ?
					<Nav.Item className="d-flex">
						<small className="m-auto text-light">
							{online ? "online" : "offline"}
						</small>
					</Nav.Item>
					:
					null
				}
			</Nav>
			<Nav className="ml-auto">
				<Nav.Item className="btn">
					<RiCloseFill className="text-white" size="25" />
				</Nav.Item>
			</Nav>
		</Navbar>
	),
	Chats: ({ setUser, setUserToken, actions }) => {
		//	Defining history to jump through pages
		const history = useHistory();

		//	Function to handle user logout
		function handleLogout(event) {
			event.preventDefault();

			sessionStorage.removeItem("userToken");
			localStorage.removeItem("userToken");
			setUserToken("");
			setUser(null);

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
								<NavDropdown.Item key={index} href={`#action/${index}`} onClick={() => action?.func(true)}>
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
