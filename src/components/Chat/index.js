import { useEffect, createRef, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";

import { Navbar, Nav, Accordion, Card, Button, Image, Row, Col, Form, Badge } from "react-bootstrap";
import { RiSendPlaneFill, RiArrowLeftLine } from "react-icons/ri";
import { emojify } from "react-emoji";
import Linkify from "react-linkify";

import "./style.css";

//	Importing camera asset
import camera from "../../assets/camera.png";

//	Importing media query helper
import { useMediaQuery } from "react-responsive";

//	Importing api to communicate to backend
import api from "../../services/api";
import { Push } from "../../components/Push";

export const Chat = {
	Infobar: ({ room, chatMembers, userToken }) => {
		const [roomImage, setRoomImage] = useState(null);
		const sm = useMediaQuery({ maxDeviceWidth: 426 });
		const history = useHistory();

		//	Push notification state variables
		const [pushShow, setPushShow] = useState(false);
		const [messagePush, setMessagePush] = useState("");
		const [colorPush, setColorPush] = useState("");

		//	Room image preview
		const preview = useMemo(() => {
			return roomImage ? URL.createObjectURL(roomImage) : null;
		}, [roomImage]);

		//	Request to change room image
		async function updateRoomImage(event, image) {
			event.preventDefault();

			const data = new FormData();

			data.append("image", image);

			await api.put(`/roomImage/${room?._id}`, data, {
				headers: {
					Authorization: `Bearer ${userToken}`
				}
			}).then((response) => {
				if(response?.status === 200) {
					setMessagePush("Imagem atualizada");
					setColorPush("success");
					setPushShow(true);
				}
			}).catch((error) => {
				setColorPush("danger");
				if(error.response && error.response.status === 400) {
					const errorMessages = error.response.data;
					setMessagePush(errorMessages.errors ? errorMessages.errors.join(", ") : errorMessages);
				} else if(error.response && error.response.status === 404) {
					setMessagePush(error.response.data);
				} else if(error.response && error.response.status === 500) {
					setMessagePush(error.message);
				} else {
					setMessagePush("Algo deu errado :(");
				}
				setPushShow(true);
				setRoomImage(null);
			});
		}

		//	Exit current room
		async function exitRoom(event) {
			event.preventDefault();

			await api.delete(`/userRoom/${room?._id}`, {
				headers: {
					Authorization: `Bearer ${userToken}`
				}
			}).then((response) => {
				if(response?.status === 200) {
					history.go();
				}
			}).catch((error) => {
				setColorPush("danger");
				if(error.response && error.response.status === 400) {
					const errorMessages = error.response.data;
					setMessagePush(errorMessages.errors ? errorMessages.errors.join(", ") : errorMessages);
				} else if(error.response && error.response.status === 404) {
					setMessagePush(error.response.data);
				} else if(error.response && error.response.status === 500) {
					setMessagePush(error.message);
				} else {
					setMessagePush("Algo deu errado :(");
				}
				setPushShow(true);
			});
		}

		return (
			<Navbar className="m-0 p-0" bg="success" variant="light" sticky="top">
				<Push
					pushShow={pushShow}
					setPushShow={setPushShow}
					message={messagePush}
					color={colorPush}
				/>
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
										<Form.Control
											id="inputImage"
											className="d-none"
											type="file"
											accept="image/*"
											onChange={(e) => {
												if(e.target.files[0]) {
													setRoomImage(e.target.files[0]);
													updateRoomImage(e, e.target.files[0]);
												} else {
													setRoomImage(null);
												}
											}}
										/>
										<Image
											as={Col}
											src={preview ? preview : (room?.image ? `${process.env.REACT_APP_API_URL}files/${room?.image}` : camera)}
											style={{ maxWidth: sm ? "100vw" : "300px", cursor: "pointer" }}
											onClick={() => document.getElementById("inputImage").click()}
											alt="Selecione sua imagem"
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
											<Row className="m-auto">
												<Button
													className={sm ? "w-100 m-2 px-3" : "m-2 px-3"}
													variant="success"
													size="sm"
													onClick={exitRoom}
												>
													Sair da sala
												</Button>
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
								<p className="sentText m-2 my-auto">
									{new Date(message?.createdAt)?.toLocaleString("pt-BR")?.split(" ")[1]}
								</p>
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
									{`${message?.userId?.name} - ${new Date(message?.createdAt)?.toLocaleString("pt-BR")?.split(" ")[1]}`}
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
