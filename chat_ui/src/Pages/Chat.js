import { useState, useEffect, useRef } from "react";
import Sidebar from "../Components/Sidebar";
import Form from "../Components/Form";

const Chat = ({ socket }) => {
  const [chatInitiated, setChatInitiated] = useState(false);
  const [chat, setChat] = useState([]);
  const [receiverId, setReceiverId] = useState();
  const userId = window.localStorage.getItem("userId");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (userId) {
      socket.emit("join", userId);
    } else {
      console.error("No user ID found");
    }
  }, [socket, userId]);

  useEffect(() => {
    const handleNewMessages = (message) => {
      if (receiverId === message.sender) {
        setChat((state) => [...state, { sender: message.sender, content: message.content }]);
      }
    };
    socket.on("newMessage", handleNewMessages);

    return () => {
      socket.off("newMessage", handleNewMessages);
    };
  }, [socket, receiverId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className='flex items-center justify-center h-screen bg-gray-200'>
      <div className='bg-white w-3/4 h-[calc(100vh-60px)] rounded-lg flex shadow-lg'>
        <Sidebar setChatInitiated={setChatInitiated} setChat={setChat} setReceiverId={setReceiverId} />

        <div className="flex flex-col w-3/4 p-4 overflow-hidden">
          {chatInitiated ? (
            <>
              <div className="flex-grow overflow-y-auto p-4 bg-gray-100 rounded-lg shadow-inner">
                {chat.map((msg, index) => (
                  <div key={index} className={`flex mb-2 ${msg.sender === userId ? "justify-end" : "justify-start"}`}>
                    <div className={`p-3 rounded-lg ${msg.sender === userId ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <Form receiverId={receiverId} setChat={setChat} chat={chat} />
            </>
          ) : (
            <div className="flex justify-center items-center h-full">
              <h2 className='text-3xl py-3 bg-white bg-opacity-70 font-bold text-gray-700 rounded-lg'>-----Welcome-----</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
