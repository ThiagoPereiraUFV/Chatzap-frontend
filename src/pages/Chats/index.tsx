//  Importing React and Router
import { useState, useEffect, FormEvent } from "react";
import { useHistory } from "react-router";

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

//	Importing media query helper
import { useMediaQuery } from "react-responsive";

//	Importing auth user data
import { useAuth } from "../../hooks/useAuth";

//	Importing interfaces
import { Message } from "../../interfaces/Message";
import { User } from "../../interfaces/User";
import { UserRoom } from "../../interfaces/UserRoom";

export const Chats = () => {
	const { user, userToken, socket } = useAuth();
	const [query, setQuery] = useState<string>("");
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState<Array<Message>>([]);
	const [chatList, setChatList] = useState(user?.user_rooms ?? []);
	const [chat, setChat] = useState<UserRoom | null>(null);
	const [chatMembers, setChatMembers] = useState<Array<User> | null>(null);

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

	//	Media query small
	const sm = useMediaQuery({ maxDeviceWidth: 426 });

	//	History
	const history = useHistory();

	//	Get chat data
	useEffect(() => {
		async function fetchData() {
			if(chatId && String(chatId)?.trim()?.length) {
				await api.post("/graphql", {
					query: `
						query {
							userRoom(id: "${chatId}") {
								id,
								_id,
								room {
									id,
									name,
									owner {
										id,
										name,
										phone
									},
									image {
										url,
									},
									createdAt,
								}
							}
						}
					`
				}, {
					headers: {
						Authorization: `Bearer ${userToken}`
					}
				}).then((response) => {
					if(response?.status === 200) {
						setChat(response?.data?.data?.userRoom);
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
		if(chat) {
			socket?.emit("getMessages", chat?.room?._id);
			socket?.emit("getMembers", chat?.room?._id);

			socket?.on("messages", (roomMessages: Array<Message>) => {
				setMessages(roomMessages);
			});

			socket?.on("members", (roomMembers: Array<User>) => {
				setChatMembers(roomMembers);
			});

			socket?.on("message", (receivedMsg: Message) => {
				if(receivedMsg?.room?.id === chat?.room?.id) {
					setMessages((msgs: Array<Message>) => [ ...msgs, receivedMsg ]);
				}
			});
		} else {
			socket?.off("messages");
			socket?.off("members");
			socket?.off("message");
			setMessages([]);
			setChatMembers([]);
		}
	}, [chat]);

	async function createRoom(event: FormEvent) {
		event.preventDefault();

		await api.post("/rooms", { name: roomName }, {
			headers: {
				Authorization: `Bearer ${userToken}`
			}
		}).then((response) => {
			if(response && response.status === 201) {
				setChatList([...chatList, response.data]);
				socket?.emit("joinRoom", response.data?.room?._id);
				history?.push(`/chats?c=${response.data?._id}`);
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

	async function enterRoom(event: FormEvent) {
		event.preventDefault();

		await api.post("/user-rooms", { roomId }, {
			headers: {
				Authorization: `Bearer ${userToken}`
			}
		}).then((response) => {
			if(response && response.status === 201) {
				setChatList([...chatList, response.data]);
				socket?.emit("joinRoom", response.data?.room?._id);
				history?.push(`/chats?c=${response.data?._id}`);
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

	function sendMessage(event: FormEvent) {
		event.preventDefault();

		if(message) {
			socket?.emit("sendMessage", message, chat?.room?.id);
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

			<Col
				className={chat && sm ? "d-none" : "bg-light m-0 p-0"}
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
				/>
				<ChatList.Query query={query} setQuery={setQuery} />
				<ChatList.Chats chats={chatList} />
			</Col>

			{chat ?
				<Col className="d-flex p-0 flex-column">
					<Chat.Infobar room={chat?.room} chatMembers={chatMembers} />
					<Chat.Messages messages={messages} userPhone={user?.phone} />
					<Chat.Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
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
