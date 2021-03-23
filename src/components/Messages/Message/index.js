import "./style.css";

import ReactEmoji from "react-emoji";

export const Message = ({ message, number }) => (
    message?.number === number ?
      <div className="messageContainer justifyEnd">
        <p className="sentText pr-10">{message?.user}</p>
        <div className="messageBox backgroundBlue">
          <p className="messageText colorWhite">{ReactEmoji.emojify(message?.text)}</p>
        </div>
      </div>
      :
      <div className="messageContainer justifyStart">
        <div className="messageBox backgroundLight">
          <p className="messageText colorDark">{ReactEmoji.emojify(message?.text)}</p>
        </div>
        {message?.user !== "group" ?
          <p className="sentText pl-10 ">{message?.user}</p>
          :
          null
        }
      </div>
);