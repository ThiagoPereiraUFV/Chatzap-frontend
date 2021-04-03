//  Importing React and socket.io resources
import { useState, useEffect } from "react";

import { Col, Container } from "react-bootstrap";

import { Infobar } from "../../components/Infobar";
import { Chats } from "../../components/Chats";
import { Input } from "../../components/Input";
import { Query } from "../../components/Query";
import { Messages } from "../../components/Messages";

//	Importing api to communicate to backend
import api from "../../services/api";

export const Chat = ({ user, userId, setUser, setUserId }) => {
	const [online, setOnline] = useState(false);
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [query, setQuery] = useState("");
	const [chats, setChats] = useState([]);

	//	Get user chats
	useEffect(() => {
		async function fetchData() {
			await api.get("/userRoom", {
				headers: {
					"X-Access-token": userId
				}
			}).then((response) => {
				if(response && response.status === 200) {
					setChats(response.data);
				}
			}).catch(() => {
				setChats([]);
			});
		}

		fetchData();
	}, [userId]);

	useEffect(() => {
		// socket.on("message", (message) => {
		// 	setMessages(messages => [ ...messages, message ]);
		// });

		// socket.on("groupData", ({ users }) => {
		// 	setOnline(users.find((u) => u?.number === user?.numberDirect) ? true : false);
		// });
	}, [user]);

	function sendMessage(event) {
		event.preventDefault();

		if(message) {
			// socket.emit("sendMessage", message, () => setMessage(""));
		}
	}

	function handleQueryChat(event) {
		event.preventDefault();
	}

	return (
		<Container className="d-flex p-0 h-100 flex-row" fluid>
			<Col className="bg-light m-0 p-0" style={{ overflowY: "scroll" }} sm="3">
				<Infobar.Chats
					room={user?.nameDirect ?? "Messagem direta"}
					setUserId={setUserId}
					setUser={setUser}
				/>
				<Query query={query} setQuery={setQuery} handleQueryChat={handleQueryChat} />
				<Chats chats={chats} />
			</Col>
			<Col className="d-flex p-0 flex-column" sm="9">
				<Infobar.Chat room={user?.nameDirect ?? "Messagem direta"} online={online} />
				<Messages messages={messages} number={user?.number} numberDirect={user?.numberDirect} />
				<Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
			</Col>
		</Container>
	);
};
