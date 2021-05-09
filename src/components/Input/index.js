import { Button, Form, Row } from "react-bootstrap";

//	Importing React icons features
import { RiSendPlaneFill } from "react-icons/ri";

export const Input = ({ setMessage, sendMessage, message }) => (
	<Form onSubmit={sendMessage}>
		<Form.Group className="m-0 h-100" controlId="message">
			<Row className="px-2 py-2 m-auto flex-nowrap">
				<Form.Control
					type="text"
					size="lg"
					style={{ borderRadius: "30px" }}
					placeholder="Digite sua mensagem"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					autoComplete="off"
					autoFocus
				/>
				<Button
					variant="success"
					type="submit"
					className="rounded-circle mx-1"
					disabled={!message || !message.length}
				>
					<RiSendPlaneFill className="m-auto" size="25" />
				</Button>
			</Row>
		</Form.Group>
	</Form>
);
