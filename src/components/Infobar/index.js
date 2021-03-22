import { Navbar } from 'react-bootstrap';

export const Infobar = ({ room }) => (
  <Navbar className="m-0" bg="success" variant="light" sticky="top">
    <Navbar.Brand className="text-light">{room}</Navbar.Brand>
  </Navbar>
);