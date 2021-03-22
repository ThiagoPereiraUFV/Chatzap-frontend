import { Button, Col, Form, Row } from "react-bootstrap";

//	Importing React icons features
import { RiSendPlaneFill } from "react-icons/ri";

export const Input = ({ setMessage, sendMessage, message }) => (
    <Form className="" onSubmit={sendMessage}>
      <Form.Group className="m-0 h-100" controlId="message">
        <Row className="m-auto flex-nowrap">
          <Form.Control
            type="text"
            className="py-3 h-100"
            placeholder="Digite sua mensagem"
            value={message}
            onChange={e => setMessage(e.target.value)}
            autoFocus
            autoComplete="off"
            sm="11"
          />
          <Button variant="success" className="d-flex" disabled={!message || !message.length}>
            <RiSendPlaneFill className="m-auto" size="25" />
          </Button>
        </Row>
      </Form.Group>
    </Form>
);