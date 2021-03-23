import { Col, Row } from "react-bootstrap";

import { Message } from "./Message";

export const Messages = ({ messages, number }) => (
  <Row className="py-4 mx-0 mb-auto w-100" style={{ overflowY: "auto" }}>
    {messages.map((message, i) => (
      <Col key={i} className="m-0 p-0" sm="12">
        <Message message={message} number={number} />
      </Col>
    ))}
  </Row>
);