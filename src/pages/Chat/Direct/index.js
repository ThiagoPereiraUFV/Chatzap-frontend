//  Importing React and socket.io resources
import { useState, useEffect } from "react";
import io from "socket.io-client";

import { Infobar } from "../../../components/Infobar";
import { Input } from "../../../components/Input";
import { Messages } from "../../../components/Messages";
import { Container } from "react-bootstrap";

let socket;

export const Direct = ({ user }) => {
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		socket = io.connect(process.env.REACT_APP_ENDPOINT, {
			"force new connection" : true,
			"reconnectionAttempts": "Infinity",
			"timeout" : 10000,
			"transports" : ["websocket"]
		});

		socket.emit("joinDirect", {
			name: user?.name,
			number: user?.number,
			numberDirect: user?.numberDirect
		}, (error) => {
			if(error) {
        alert(error);
      }
		});

		return () => socket.disconnect();
	}, [user]);

	useEffect(() => {
		socket.on("message", (message) => {
			setMessages(messages => [ ...messages, message ]);
		});
	}, []);

	function sendMessage(event) {
		event.preventDefault();

		if(message) {
			socket.emit("sendMessage", message, () => setMessage(""));
		}
	}

	return (
		<Container className="d-flex p-0 h-100 flex-column" fluid>
			<Infobar room={user?.nameDirect ?? "Messagem direta"} />
			<Messages messages={messages} number={user?.number} />
			<Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
		</Container>
	);
}