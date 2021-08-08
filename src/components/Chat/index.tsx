import { Dispatch, SetStateAction, useEffect, createRef, useMemo, useState, FormEvent } from "react";
import { useHistory } from "react-router-dom";

import { Navbar, Nav, Accordion, Card, Button, Image, Row, Col, Form, Badge, Alert } from "react-bootstrap";
import { RiSendPlaneFill, RiArrowLeftLine, RiCloseFill } from "react-icons/ri";
import { emojify } from "react-emoji";
import Linkify from "react-linkify";

import "./style.css";

//	Importing camera asset
import camera from "../../assets/camera.png";

//	Importing media query helper
import { useMediaQuery } from "react-responsive";

//	Importing api to communicate to backend
import api from "../../services/api";
import { Push } from "../Push";
import { useAuth } from "../../hooks/useAuth";

//	Importing interfaces
import { User } from "../../interfaces/User";
import { Room } from "../../interfaces/Room";
import { Message } from "../../interfaces/Message";

interface InfobarProps {
	room: Room,
	chatMembers: Array<User> | null
}

interface InputProps {
	setMessage: Dispatch<SetStateAction<string>>,
	sendMessage(event: FormEvent): void,
	message: string
}

export const Chat = {
	Infobar: ({ room, chatMembers }: InfobarProps) => {
		const { userToken, socket } = useAuth();
		const [roomImage, setRoomImage] = useState<File | null>(null);
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
		async function updateRoomImage(event: any, image: any) {
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
					setRoomImage(null);
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
		async function exitRoom(event: FormEvent) {
			event.preventDefault();

			if(room) {
				socket?.emit("leaveRoom", room?.id);
				history.go(0);
			}
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
									title="Voltar"
								>
									{sm ?
										<RiCloseFill className="text-white my-2" size="21" />
										:
										<RiArrowLeftLine className="text-white my-2" size="21" />
									}
								</Button>
								<Accordion.Toggle
									as={Button}
									className="text-left font-weight-bold rounded-0 py-2"
									variant="success"
									size="lg"
									eventKey="0"
									block
								>
									{emojify(room?.name)}
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
											onChange={(e: any) => {
												if(e?.target?.files) {
													setRoomImage(e.target?.files[0]);
													updateRoomImage(e, e.target?.files[0]);
												} else {
													setRoomImage(null);
												}
											}}
										/>
										<Image
											// as={Col}
											src={preview ? preview : (room?.image ? `${process.env.REACT_APP_API_URL}files/${room?.image}` : camera)}
											style={{ maxWidth: sm ? "100vw" : "300px", cursor: "pointer" }}
											onClick={() => document.getElementById("inputImage")?.click()}
											alt="Selecione sua imagem"
										/>
										<Col className="px-1">
											<Row className="m-auto">
												<Col className="text-light m-2">
													{`Criado em ${new Date(room?.createdAt).toLocaleString("pt-BR", {dateStyle: "short", timeStyle: "short"})} por ${room?.owner?.name}`}
												</Col>
											</Row>
											<Row className="m-auto">
												<Col className="text-light m-2">
													{`Membros ${chatMembers?.length}`}
												</Col>
											</Row>
											<Row className="m-auto">
												{chatMembers?.map((member, index) => (
													<Col key={index} className="text-light m-2" sm="auto">
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
	Messages: ({ messages, userPhone }: { messages: Array<Message>, userPhone: string | undefined }) => {
		const ref = createRef<HTMLInputElement>();
		useEffect(() => {
			ref?.current?.scroll({ top: ref.current.scrollHeight, behavior: "smooth" });
		}, [messages]);

		return (
			<Row ref={ref} className="py-2 mx-0 mb-auto w-100" style={{ overflowY: "auto" }}>
				{messages.map((message, i) => (
					<Col key={i} className="m-0 p-0 my-2" sm="12">
						{message?.text?.split(":")[0] === "ROOM" ?
							<Row className="m-auto">
								<Alert className="mx-auto my-0 py-1" variant="secondary">
									{message?.text?.split(":")[1]}
								</Alert>
							</Row>
							:
							message?.user?.phone === userPhone ?
								<div className="messageContainer justifyEnd">
									<div className="messageBox backgroundBlue text-dark">
										<div className="messageText colorWhite m-auto">
											<Row className="m-auto">
												<Linkify>
													{emojify(message?.text)}
												</Linkify>
											</Row>
											<Row className="m-auto">
												<small className="sentText ml-auto mt-2">
													{new Date(message?.createdAt)?.toLocaleString("pt-BR", {timeStyle: "short"})?.split(" ")}
												</small>
											</Row>
										</div>
									</div>
								</div>
								:
								<div className="messageContainer justifyStart">
									<div className="messageBox backgroundLight text-dark">
										<div className="messageText colorDark m-auto">
											<Row className="m-auto">
												<Linkify>
													{emojify(message?.text)}
												</Linkify>
											</Row>
											<Row className="m-auto">
												<small className="sentText ml-auto mt-2">
													{new Date(message?.createdAt)?.toLocaleString("pt-BR", {timeStyle: "short"})?.split(" ")}
												</small>
											</Row>
										</div>
									</div>
									<p className="sentText m-2 my-auto">
										{message?.user?.name}
									</p>
								</div>
						}
					</Col>
				))}
			</Row>
		);
	},
	Input: ({ setMessage, sendMessage, message }: InputProps) => (
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
						title="Enviar"
					>
						<RiSendPlaneFill className="m-auto" size="25" />
					</Button>
				</Row>
			</Form.Group>
		</Form>
	)
};
