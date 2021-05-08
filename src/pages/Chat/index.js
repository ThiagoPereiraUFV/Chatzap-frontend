//  Importing React and socket.io resources
import { useState, useEffect } from "react";

import { Col, Container } from "react-bootstrap";

import { Infobar } from "../../components/Infobar";
import { Chats } from "../../components/Chats";
import { Input } from "../../components/Input";
import { Query } from "../../components/Query";
import { Messages } from "../../components/Messages";
import { CreateRoomModal } from "../../components/CreateRoomModal";
import { Push } from "../../components/Push";

//	Importing api to communicate to backend
import api from "../../services/api";

export const Chat = ({ user, userToken, setUser, setUserToken }) => {
	const [online, setOnline] = useState(false);
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [query, setQuery] = useState("");
	const [chats, setChats] = useState([]);
	const [chat, setChat] = useState({});

	//	Push notification state variables
	const [pushShow, setPushShow] = useState(false);
	const [titlePush, setTitlePush] = useState("");
	const [messagePush, setMessagePush] = useState("");

	//	Create room state variables
	const [roomName, setRoomName] = useState("");
	const [createRoomModal, setCreateRoomModal] = useState(false);

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
						setChats(response.data);
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

	useEffect(() => {
		// socket.on("message", (message) => {
		// 	setMessages(messages => [ ...messages, message ]);
		// });

		// socket.on("groupData", ({ users }) => {
		// 	setOnline(users.find((u) => u?.number === user?.numberDirect) ? true : false);
		// });
	}, [user]);

	async function createRoom(event) {
		event.preventDefault();

		await api.post("/room", { name: roomName }, {
			headers: {
				Authorization: `Bearer ${userToken}`
			}
		}).then((response) => {
			if(response && response.status === 201) {
				setChats([...chats, response.data]);
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

	function sendMessage(event) {
		event.preventDefault();

		if(message) {
			// socket.emit("sendMessage", message, () => setMessage(""));
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
			<Col className="bg-light m-0 p-0" style={{ overflowY: "scroll" }} sm="3">
				<Infobar.Chats
					actions={[{ func: setCreateRoomModal, name: "Criar sala" }]}
					room={user?.nameDirect ?? "Messagem direta"}
					setUserToken={setUserToken}
					setUser={setUser}
				/>
				<Query query={query} setQuery={setQuery} />
				<Chats chats={chats} setChat={setChat} />
			</Col>
			<Col className="d-flex p-0 flex-column" sm="9">
				<Infobar.Chat room={user?.nameDirect ?? "Messagem direta"} online={online} />
				<Messages messages={messages} number={user?.number} numberDirect={user?.numberDirect} />
				<Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
			</Col>

			<CreateRoomModal
				roomName={roomName}
				setRoomName={setRoomName}
				createRoom={createRoom}
				createRoomModal={createRoomModal}
				setCreateRoomModal={setCreateRoomModal}
			/>
		</Container>
	);
};
