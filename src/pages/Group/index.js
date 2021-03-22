//  Importing React and socket.io resources
import { useState, useEffect } from "react";
import io from "socket.io-client";

import { Infobar } from "../../components/Infobar";
import { Input } from "../../components/Input";
import { Messages } from "../../components/Messages";
import { Container } from "react-bootstrap";

let socket;

export const Group = ({ user }) => {
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

	useEffect(() => {
		socket = io.connect(process.env.REACT_APP_ENDPOINT, {
			"force new connection" : true,
			"reconnectionAttempts": "Infinity",
			"timeout" : 10000,
			"transports" : ["websocket"]
		});

		socket.emit("joinGroup", {
			name: user?.name,
			number: user?.number,
			group: user?.group
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

		socket.on("groupData", ({ users }) => {
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
		<Container className="d-flex p-0 h-100 flex-column" fluid>
			<Infobar room={user?.group} />
			<Messages messages={messages} name={user?.name} />
			<Input setMessage={setMessage} sendMessage={sendMessage} message={message} />
		</Container>
	);
}