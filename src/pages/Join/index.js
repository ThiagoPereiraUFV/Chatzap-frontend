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
				<h1 className="heading">Join</h1>
				<div>
					<input
						className="joinInput"
						type="text"
						name="name"
						placeholder=""
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div>
					<input
					className="joinInput mt-20"
					type="text"
					name="room"
					placeholder=""
					value={room}
					onChange={(e) => setRoom(e.target.value)}
				/>
				</div>
				<button className="button mt-20" onClick={signin} disabled={!name || !room}>Sign In</button>
			</div>
		</div>
	);
}