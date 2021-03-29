//  Importing React and socket.io resources
import { useState, useEffect } from "react";
import { Prompt } from "react-router-dom";
import io from "socket.io-client";

import { Col, Container } from "react-bootstrap";

import { Infobar } from "../../components/Infobar";
import { Input } from "../../components/Input";
import { Query } from "../../components/Query";
import { Messages } from "../../components/Messages";

let socket;

export const Chat = ({ user }) => {
	const [online, setOnline] = useState(false);
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [query, setQuery] = useState("");
	const [chats, setChats] = useState([]);

	useEffect(() => {
		// socket = io.connect(process.env.REACT_APP_ENDPOINT, {
		// 	"force new connection" : true,
		// 	"reconnectionAttempts": "Infinity",
		// 	"timeout" : 10000,
		// 	"transports" : ["websocket"]
		// });

		// socket.emit("joinDirect", {
		// 	name: user?.name,
		// 	number: user?.number,
		// 	numberDirect: user?.numberDirect
		// }, (error) => {
		// 	if(error) {
    //     alert(error);
    //   }
		// });

		// return () => socket.disconnect();
	}, [user]);

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

	return (
		<Container className="d-flex p-0 h-100 flex-row" fluid>
			<Prompt message="Você será desconectado, continuar?" when={true} />
			<Col className="bg-light m-0 p-0" sm="3">
				<Infobar.Chats room={user?.nameDirect ?? "Messagem direta"} online={online} />
				<Query query={query} setQuery={setQuery} />
			</Col>
			<Col className="d-flex p-0 flex-column" sm="9">
				<Infobar.Chat room={user?.nameDirect ?? "Messagem direta"} online={online} />
				<Messages messages={messages} number={user?.number} numberDirect={user?.numberDirect} />
				<Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
			</Col>
		</Container>
	);
}