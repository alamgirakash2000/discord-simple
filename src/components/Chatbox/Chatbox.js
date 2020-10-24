import React, { useEffect, useState } from "react";
import {
  AddCircle,
  CardGiftcard,
  EmojiEmotions,
  Gif,
} from "@material-ui/icons";
import ChatHeader from "../ChatHeader";
import Message from "../Message";
import "./Chatbox.style.scss";
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "../../features/appSlice";
import { selectUser } from "../../features/userSlice";
import db from "../../FirebaseConfig";
import firebase from "firebase";

function Chatbox() {
  const channelId = useSelector(selectChannelId);
  const user = useSelector(selectUser);
  const channelName = useSelector(selectChannelName);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("channels").doc(channelId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user,
    });

    setInput("");
  };

  return (
    <div className="chatbox col-9">
      <ChatHeader channelName={channelName} />

      {/*Messages*/}
      <div className="chatbox__messages">
        {messages.map((message) => (
          <Message
            key={message.id}
            timestamp={message.timestamp?.seconds * 1000}
            message={message.message}
            user={message.user}
          />
        ))}
      </div>

      {/*Chatbox bottom*/}
      <div className="chatbox__bottom">
        <AddCircle fontSize="large" />
        <form onSubmit={sendMessage}>
          <input
            disabled={!channelId}
            required
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message to #${channelName}`}
          />
          <button type="submit" className="d-none">
            Send Message
          </button>
        </form>
        <div className="chatbox__bottom-icons">
          <CardGiftcard />
          <Gif />
          <EmojiEmotions />
        </div>
      </div>
    </div>
  );
}

export default Chatbox;
