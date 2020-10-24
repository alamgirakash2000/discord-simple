import React, { useEffect, useState } from "react";
import "./Sidebar.style.scss";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Add,
  Call,
  Headset,
  InfoOutlined,
  Mic,
  Settings,
  SignalCellularAlt,
} from "@material-ui/icons";
import SidebarChannel from "../SidebarChannel";
import { Avatar } from "@material-ui/core";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import db, { auth } from "../../FirebaseConfig";

function Sidebar() {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    db.collection("channels").onSnapshot((snapshot) =>
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      )
    );
  }, []);

  const handleAddChannel = () => {
    const channelName = prompt("Enter a new channel name");

    if (channelName) {
      db.collection("channels").add({
        channelName,
      });
    }
  };
  return (
    <div className="sidebar col-3">
      {/*Top*/}
      <div className="sidebar__top">
        <h3>Alamgir Akash</h3>
        <ExpandMoreIcon />
      </div>

      {/*Add Channels*/}
      <div className="sidebar__channels">
        <div className="sidebar__channels-Header">
          <div className="d-flex">
            <ExpandMoreIcon />
            <h4>Text Channels</h4>
          </div>
          <Add
            onClick={handleAddChannel}
            className="sidebar__channels-addChannel"
          />
        </div>
      </div>

      {/*Channel list*/}
      <div className="sidebar__channelsList">
        {channels.map(({ id, channel }) => (
          <SidebarChannel key={id} id={id} channelName={channel.channelName} />
        ))}
      </div>

      {/*Voice*/}
      <div className="sidebar__voice">
        <SignalCellularAlt className="sidebar__voice-icon" fontSize="large" />
        <div className="sidebar__voice-info">
          <h4>Voice Connected</h4>
          <p>Stream</p>
        </div>
        <div className="sidebar__voice-icons">
          <InfoOutlined />
          <Call />
        </div>
      </div>

      {/*Profile*/}
      <div className="sidebar__profile">
        <Avatar src={user.photo} onClick={() => auth.signOut()} />
        <div className="sidebar__profile-info">
          <h4>{user.name}</h4>
          <p>#{user.uid.substring(0, 7)}</p>
        </div>
        <div className="sidebar__profile-icons">
          <Mic />
          <Headset />
          <Settings />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
