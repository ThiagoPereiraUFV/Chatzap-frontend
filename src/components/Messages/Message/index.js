import "./style.css";

import ReactEmoji from "react-emoji";

export const Message = ({ message, number, numberDirect }) => (
    message?.number === number ?
      <div className="messageContainer justifyEnd">
        <p className="sentText m-2 my-auto">
          {numberDirect && numberDirect.length ? null : message?.user}
        </p>
        <div className="messageBox backgroundBlue text-dark">
          <p className="messageText colorWhite m-auto py-2">{ReactEmoji.emojify(message?.text)}</p>
        </div>
      </div>
      :
      <div className="messageContainer justifyStart">
        <div className="messageBox backgroundLight text-dark">
          <p className="messageText colorDark m-auto py-2">{ReactEmoji.emojify(message?.text)}</p>
        </div>
        {message?.user !== "group" ?
          <p className="sentText m-2 my-auto">
            {numberDirect && numberDirect.length ? null : message?.user}
          </p>
          :
          null
        }
      </div>
);