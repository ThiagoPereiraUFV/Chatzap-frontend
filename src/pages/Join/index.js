import { useHistory } from "react-router-dom";

import "./style.css";

export const Join = ({ name, setName, room, setRoom }) => {
	const history = useHistory();

	async function signin(event) {
		event.preventDefault();

		sessionStorage.setItem("name", name);
		sessionStorage.setItem("room", room);

		history.push("/chat");
	}

	return (
		<div className="joinOuterContainer">
			<div className="joinInnerContainer">
				<h1 className="heading">Chatjoin</h1>
					<form onSubmit={signin}>
					<div>
						<input
							className="joinInput"
							type="text"
							name="name"
							placeholder="Seu nome"
							value={name}
							onChange={(e) => setName(e.target.value)}
							autoFocus
							required
						/>
					</div>
					<div>
						<input
						className="joinInput mt-20"
						type="text"
						name="room"
						placeholder="Sala que deseja participar"
						value={room}
						onChange={(e) => setRoom(e.target.value)}
						required
					/>
					</div>
					<button className="button mt-20" type="submit" disabled={!name || !room}>Sign In</button>
				</form>
			</div>
		</div>
	);
}