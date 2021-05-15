import { useEffect, createRef } from "react";
import { useHistory } from "react-router-dom";

import { Navbar, Nav, Accordion, Card, Button, Image, Row, Col, Form, Badge } from "react-bootstrap";
import { RiSendPlaneFill, RiArrowLeftLine } from "react-icons/ri";
import { emojify } from "react-emoji";
import Linkify from "react-linkify";

import "./style.css";

export const Chat = {
	Infobar: ({ room, chatMembers }) => {
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
									onClick={() => history.push("/chats")}
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
											<Row className="m-auto">
												{chatMembers?.map((member, index) => (
													<Col key={index} className="text-light m-2" sm="auto" disabled>
														{member?.name} <Badge variant="transparent">{member?.phone}</Badge>
													</Col>
												))}
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
	Messages: ({ messages, userPhone }) => {
		const ref = createRef();
		useEffect(() => {
			ref?.current?.scroll({ top: ref.current.scrollHeight, behavior: "smooth" });
		}, [messages]);

		return (
			<Row ref={ref} className="py-2 mx-0 mb-auto w-100" style={{ overflowY: "auto" }}>
				{messages.map((message, i) => (
					<Col key={i} className="m-0 p-0" sm="12">
						{message?.userId?.phone === userPhone ?
							<div className="messageContainer justifyEnd">
								<div className="messageBox backgroundBlue text-dark">
									<p className="messageText colorWhite m-auto py-2">
										<Linkify properties={{ target: "_blank" }}>
											{emojify(message?.text)}
										</Linkify>
									</p>
								</div>
							</div>
							:
							<div className="messageContainer justifyStart">
								<div className="messageBox backgroundLight text-dark">
									<p className="messageText colorDark m-auto py-2">
										<Linkify properties={{ target: "_blank" }}>
											{emojify(message?.text)}
										</Linkify>
									</p>
								</div>
								<p className="sentText m-2 my-auto">
									{message?.userId?.name}
								</p>
							</div>
						}
					</Col>
				))}
			</Row>
		);
	},
	Input: ({ setMessage, sendMessage, message }) => (
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
	)
};
