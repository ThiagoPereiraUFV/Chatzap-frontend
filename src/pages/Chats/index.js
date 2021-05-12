//  Importing React and socket.io resources
import { useState, useEffect } from "react";

import { Col, Container } from "react-bootstrap";

//	Importing query-string handle feature
import queryString from "query-string";

import { Chat } from "../../components/Chat";
import { ChatList } from "../../components/ChatList";
import { CreateRoomModal } from "../../components/CreateRoomModal";
import { EnterRoomModal } from "../../components/EnterRoomModal";
import { Push } from "../../components/Push";

//	Importing api to communicate to backend
import api from "../../services/api";

export const Chats = ({ socket, user, userToken, setUserToken }) => {
	const [query, setQuery] = useState("");
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [chatList, setChatList] = useState([]);
	const [chat, setChat] = useState(null);

	//	Push notification state variables
	const [pushShow, setPushShow] = useState(false);
	const [messagePush, setMessagePush] = useState("");

	//	Room state variables
	const [roomName, setRoomName] = useState("");
	const [roomId, setRoomId] = useState("");
	const [createRoomModal, setCreateRoomModal] = useState(false);
	const [enterRoomModal, setEnterRoomModal] = useState(false);

	//	Chat id variable
	const chatId = queryString.parse(location?.search)?.c;

	//	Get user chatList
	useEffect(() => {
		async function fetchData() {
			if(query && query.trim()?.length) {
				await api.get(`/searchRoom?q=${query.trim()}`, {
					headers: {
						Authorization: `Bearer ${userToken}`
					}
				}).then((response) => {
					if(response && response.status === 200) {
						setChatList(response.data.filter((c) => c?.roomId));
					}
				}).catch(() => {
					setChatList([]);
				});
			} else {
				await api.get("/userRoom", {
					headers: {
						Authorization: `Bearer ${userToken}`
					}
				}).then((response) => {
					if(response && response.status === 200) {
						setChatList(response.data);
					}
				}).catch(() => {
					setChatList([]);
				});
			}
		}

		fetchData();
	}, [query]);

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

	//	Get chat messages
	useEffect(() => {
		if(chat) {
			socket?.emit("getMessages", chat?.roomId?._id);

			socket?.on("messages", (roomMessages) => {
				setMessages(roomMessages);
			});

			socket?.on("message", (receivedMsg) => {
				if(receivedMsg?.roomId === chat?.roomId?._id) {
					setMessages((msgs) => [ ...msgs, receivedMsg ]);
				}
			});
		} else {
			socket?.off("messages");
			socket?.off("message");
			setMessages([]);
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
				socket?.emit("joinRoom", response.data?._id);
			}
		}).catch((error) => {
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
				socket?.emit("joinRoom", response.data?.roomId);
			}
		}).catch((error) => {
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

		setRoomId("");
	}

	function sendMessage(event) {
		event.preventDefault();

		if(message) {
			socket?.emit("sendMessage", message, chat?.roomId?._id);
			setMessage("");
		}
	}

	return (
		<Container className="d-flex p-0 h-100 flex-row" fluid>
			<Push
				pushShow={pushShow}
				setPushShow={setPushShow}
				message={messagePush}
			/>
			{!chat ?
				<Col
					className="bg-light m-0 p-0"
					sm="3"
				>
					<ChatList.Infobar
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
					<ChatList.Query query={query} setQuery={setQuery} />
					<ChatList.Chats chats={chatList} setChat={setChat} />
				</Col>
				:
				<Col className="d-flex p-0 flex-column">
					<Chat.Infobar room={chat?.roomId} />
					<Chat.Messages messages={messages} userPhone={user?.phone} />
					<Chat.Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
				</Col>
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