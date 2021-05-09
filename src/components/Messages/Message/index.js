import "./style.css";

import ReactEmoji from "react-emoji";

export const Message = ({ message, number }) => (
	message?.userId?.phone === number ?
		<div className="messageContainer justifyEnd">
			<div className="messageBox backgroundBlue text-dark">
				<p className="messageText colorWhite m-auto py-2">{ReactEmoji.emojify(message?.text)}</p>
			</div>
		</div>
		:
		<div className="messageContainer justifyStart">
			<div className="messageBox backgroundLight text-dark">
				<p className="messageText colorDark m-auto py-2">{ReactEmoji.emojify(message?.text)}</p>
			</div>
			<p className="sentText m-2 my-auto">
				{message?.userId?.name}
			</p>
		</div>
);
