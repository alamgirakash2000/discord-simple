import React from "react";
import { Avatar } from "@material-ui/core";
import moment from "moment";

function Message({ timestamp, user, message }) {
  return (
    <div className="message">
      <Avatar src={user.photo} />
      <div className="message__info">
        <h5>
          {user.name}
          <span className="message__info-timestamp">
            {moment(timestamp).format("llll")}
          </span>
        </h5>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Message;
