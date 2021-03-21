import onlineIcon from '../../assets/onlineIcon.png';
import closeIcon from '../../assets/closeIcon.png';

import './style.css';

export const Infobar = ({ room }) => (
	<div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/"><img src={closeIcon} alt="close icon" /></a>
    </div>
  </div>
);