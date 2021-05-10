//  Importing React and socket.io resources
import { useState, useEffect } from "react";

import { Col, Container } from "react-bootstrap";

//	Importing query-string handle feature
import queryString from "query-string";

import { Infobar } from "../../components/Infobar";
import { Chats } from "../../components/Chats";
import { Input } from "../../components/Input";
import { Query } from "../../components/Query";
import { Messages } from "../../components/Messages";
import { CreateRoomModal } from "../../components/CreateRoomModal";
import { EnterRoomModal } from "../../components/EnterRoomModal";
import { Push } from "../../components/Push";

//	Importing api to communicate to backend
import api from "../../services/api";

export const Chat = ({ socket, user, userToken, setUserToken }) => {
	const [query, setQuery] = useState("");
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [chats, setChats] = useState([]);
	const [chat, setChat] = useState(null);

	//	Push notification state variables
	const [pushShow, setPushShow] = useState(false);
	const [titlePush, setTitlePush] = useState("");
	const [messagePush, setMessagePush] = useState("");

	//	Room state variables
	const [roomName, setRoomName] = useState("");
	const [roomId, setRoomId] = useState("");
	const [createRoomModal, setCreateRoomModal] = useState(false);
	const [enterRoomModal, setEnterRoomModal] = useState(false);

	//	Chat id variable
	const chatId = queryString.parse(location?.search)?.c;

	//	Get user chats
	useEffect(() => {
		async function fetchData() {
			if(query && query.length) {
				await api.get(`/searchRoom?q=${query}`, {
					headers: {
						Authorization: `Bearer ${userToken}`
					}
				}).then((response) => {
					if(response && response.status === 200) {
						setChats(response.data.filter((c) => c?.roomId));
					}
				}).catch(() => {
					setChats([]);
				});
			} else {
				await api.get("/userRoom", {
					headers: {
						Authorization: `Bearer ${userToken}`
					}
				}).then((response) => {
					if(response && response.status === 200) {
						setChats(response.data);
					}
				}).catch(() => {
					setChats([]);
				});
			}
		}

		fetchData();
	}, [userToken, query]);

	//	Get user chat
	useEffect(() => {
		async function fetchData() {
			if(chatId && chatId.length) {
				await api.get(`/userRoom/${chatId}`, {
					headers: {
						Authorization: `Bearer ${userToken}`
					}
				}).then((response) => {
					if(response && response.status === 200) {
						setChat(response.data);
					}
				}).catch(() => {
					setChat(null);
				});
			} else {
				setChat(null);
			}
		}

		fetchData();
	}, [chatId]);

	useEffect(() => {
		socket?.on("message", (receivedMsg) => {
			setMessages((msgs) => [ ...msgs, receivedMsg ]);
		});
	}, [user]);

	useEffect(() => {
		if(chat) {
			socket?.emit("getMessages", chat?.roomId?._id);

			socket?.on("messages", (roomMessages) => {
				setMessages(roomMessages);
			});
		}
	}, [chat]);

	async function createRoom(event) {
		event.preventDefault();

		await api.post("/room", { name: roomName }, {
			headers: {
				Authorization: `Bearer ${userToken}`
			}
		}).then((response) => {
			if(response && response.status === 201) {
				setQuery(null);
			}
		}).catch((error) => {
			setTitlePush("Erro!");
			if(error.response && [401, 403].includes(error.response.status)) {
				setMessagePush(error.response.data);
			} else if(error.response && [400].includes(error.response.status)) {
				const errorMessages = error.response.data;
				setMessagePush(errorMessages.errors ? errorMessages.errors.join(", ") : errorMessages);
			} else if(error.response && error.response.status === 500) {
				setMessagePush(error.message);
			}
			setPushShow(true);
		});

		setRoomName("");
	}

	async function enterRoom(event) {
		event.preventDefault();

		await api.post(`/userRoom/${roomId}`, {}, {
			headers: {
				Authorization: `Bearer ${userToken}`
			}
		}).then((response) => {
			if(response && response.status === 201) {
				setQuery(null);
			}
		}).catch((error) => {
			setTitlePush("Erro!");
			if(error.response && [401, 403, 404].includes(error.response.status)) {
				setMessagePush(error.response.data);
			} else if(error.response && [400].includes(error.response.status)) {
				const errorMessages = error.response.data;
				setMessagePush(errorMessages.errors ? errorMessages.errors.join(", ") : errorMessages);
			} else if(error.response && error.response.status === 500) {
				setMessagePush(error.message);
			}
			setPushShow(true);
		});

		setRoomName("");
	}

	function sendMessage(event) {
		event.preventDefault();

		if(message) {
			socket?.emit("sendMessage", {
				message,
				userId: user?._id,
				roomId: chat?.roomId?._id
			});
			setMessage("");
		}
	}

	return (
		<Container className="d-flex p-0 h-100 flex-row" fluid>
			<Push.Top
				pushShow={pushShow}
				setPushShow={setPushShow}
				title={titlePush}
				message={messagePush}
			/>
			<Col
				className={chat ? "d-none" : "bg-light m-0 p-0"}
				style={{ overflowY: "scroll" }}
				sm="3"
			>
				<Infobar.Chats
					actions={
						[
							{
								func: setCreateRoomModal,
								name: "Criar sala"
							}, {
								func: setEnterRoomModal,
								name: "Entrar em uma sala"
							}
						]}
					setUserToken={setUserToken}
				/>
				<Query query={query} setQuery={setQuery} />
				<Chats chats={chats} setChat={setChat} />
			</Col>
			{chat ?
				<Col className="d-flex p-0 flex-column" sm={chat ? "12" : "9"}>
					<Infobar.Chat room={chat?.roomId?.name} />
					<Messages messages={messages} userPhone={user?.phone} />
					<Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
				</Col>
				:
				null
			}

			<CreateRoomModal
				roomName={roomName}
				setRoomName={setRoomName}
				createRoom={createRoom}
				createRoomModal={createRoomModal}
				setCreateRoomModal={setCreateRoomModal}
			/>

			<EnterRoomModal
				roomId={roomId}
				setRoomId={setRoomId}
				enterRoom={enterRoom}
				enterRoomModal={enterRoomModal}
				setEnterRoomModal={setEnterRoomModal}
			/>
		</Container>
	);
};
