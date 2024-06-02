import { useContext, useEffect, useRef, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../../../context/AuthContext";
import apiRequest from "../../lib/api_request";
import { format } from "timeago.js";
import { SocketContext } from "../../../context/SocketContext";
import { useNotificationStore } from "../../lib/notificationStore";

function Chat({ chats }) {
  const [chat, setChat] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const [text, setText] = useState("");

  const messageEndRef = useRef();

  const decrease = useNotificationStore((state)=>state.decrease)

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest.get("/chats/" + id);
      setChat({ ...res.data.data, receiver });
      decrease()
    } catch (err) {
      console.log('Error while fetching chat data:', err);
    }
  };

  useEffect(()=>{
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  },[chat])

  useEffect(() => {
    console.log("Current chat state:", chat);
  }, [chat]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (text === "") return;

    try {
      const res = await apiRequest.post(`/messages/${chat.id}`, { text });
      setChat((prev) => ({ ...prev, message: [...prev.message, res.data.data] }));
      setText("");
      socket.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: res.data.data
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const read = async () => {
      try {
        await apiRequest.put(`/chats/${chat.id}`);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat && socket) {
      const handleMessage = (data) => {
        if (chat.id === data.chatId) {
          setChat((prev) => ({ ...prev, message: [...prev.message, data] }));
          read();
        }
      };

      socket.on("getMessage", handleMessage);

      // Clean up listener on unmount or when `chat` changes
      return () => {
        socket.off("getMessage", handleMessage);
      };
    }
  }, [socket, chat]);

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {chats?.map((c) => (
          <div
            className="message"
            key={c.id}
            style={{
              backgroundColor:
                c.seenBy.includes(currentUser.id) || chat?.id === c.id
                  ? "white"
                  : "#fecd514e",
            }}
            onClick={() => handleOpenChat(c.id, c.receiver)}
          >
            <img src={c.receiver.avatar || "/noavatar.jpg"} alt="" />
            <span>{c.receiver.username}</span>
            <p>{c.lastMessage}</p>
          </div>
        ))}
      </div>
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img src={chat.receiver.avatar || "/noavatar.jpg"} alt="" />
              {chat.receiver.username}
            </div>
            <span className="close" onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className="center">
            {chat.message?.map((m) => (
              <div
                className="chatMessage"
                style={{
                  alignSelf: m.userId === currentUser.id ? "flex-end" : "flex-start",
                  textAlign: m.userId === currentUser.id ? "right" : "left",
                }}
                key={m.id}
              >
                <p>{m.text}</p>
                <span>{format(m.createdAt)}</span>
              </div>
            ))}
            <div ref={messageEndRef}></div>
          </div>
          <form className="bottom" onSubmit={handleSubmit}>
            <textarea name="text" onChange={(e) => setText(e.target.value)} value={text}></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
