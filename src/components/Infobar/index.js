import { Link } from "react-router-dom";

import { Navbar, Nav } from "react-bootstrap";

import { RiCloseFill } from "react-icons/ri";

export const Infobar = ({ room, online }) => (
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
      <Nav.Item>
        <Nav.Link
          as={Link}
          to="/"
          href="/"
          className="text-warning mx-2"
        >
          <RiCloseFill className="text-white" size="25" />
        </Nav.Link>
      </Nav.Item>
    </Nav>
  </Navbar>
);