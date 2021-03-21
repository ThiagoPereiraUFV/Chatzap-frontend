//  Importing React and socket.io resources
import { useState, useEffect } from "react";
import io from "socket.io-client";

import "./style.css";

import { Infobar } from "../../components/Infobar";
import { Input } from "../../components/Input";
import { Messages } from "../../components/Messages";
import { TextContainer } from "../../components/TextContainer";

let socket;

export const Group = ({ name, number, room }) => {
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState("");

	useEffect(() => {
		socket = io.connect(process.env.REACT_APP_ENDPOINT, {
			"force new connection" : true,
			"reconnectionAttempts": "Infinity",
			"timeout" : 10000,
			"transports" : ["websocket"]
		});

		socket.emit("join", { name, room }, (error) => {
			if(error) {
        alert(error);
      }
		});

		return () => socket.disconnect();
	}, [name, room]);

	useEffect(() => {
		socket.on("message", (message) => {
			setMessages(messages => [ ...messages, message ]);
		});

		socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
	}, []);

	function sendMessage(event) {
		event.preventDefault();

		if(message) {
			socket.emit("sendMessage", message, () => setMessage(""));
		}
	}

	return (
		<div className="outerContainer">
			<div className="container">
				<Infobar room={room} />
				<Messages messages={messages} name={name} />
				<Input setMessage={setMessage} sendMessage={sendMessage} message={message} />
			</div>
			<TextContainer users={users} />
		</div>
	);
}