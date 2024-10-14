import { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Form from "../Components/Form";

const Chat = ({socket}) => {
  const [chatInitiated, setChatInitiated] = useState(false);
  const [chat, setChat] = useState([]);
  const [receiverId, setReceiverId] = useState();
  const userId = window.localStorage.getItem("userId");
  
useEffect(() => {
    if (userId) {
        socket.emit('join', userId);
    } else {
        console.error("No user ID found");
    }
}, []);


  
  useEffect(() => {
    const handleNewMessages = (message) => {
    if (receiverId === message.sender) {
      setChat(state => [...state, {sender: message.sender, content: message.content}])
    }
     }
    socket.on('newMessage',handleNewMessages)
    
    // clean up function
    return () => {
      socket.off('newMessage', handleNewMessages)
    }
  }, [socket, receiverId])
  

  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <div
        className='bg-cover w-2/4 h-[calc(100vh-60px)] rounded-lg flex' style={{ backgroundImage: "url(./bg.jpg)" }}>

        <Sidebar setChatInitiated={setChatInitiated} setChat={setChat} setReceiverId={setReceiverId} />
        
        <div className="w-3/4 bg-white flex flex-col bg-opacity-20 realative">
          
          {chatInitiated ?
            <>
            <div className="overflow-y-auto mb-20">
              {chat && chat.map((chat, index) => (
                <div key={index} className={`flex px-4 ${chat.sender === userId ? "justify-end" : "justify-start"}`}
                >
                  <div className={`p-2 my-2 rounded ${chat.sender === userId ? "bg-blue-500" : "bg-white"}`}>
                  {chat.content}
                  </div>
                </div>
              ))}
              
          </div>
            <Form receiverId={receiverId} setChat={setChat} chat={chat} />
          </> : <div className="flex justify-center items-center h-full">
            <h2 className='text-3xl py-3 bg-white bg-opacity-70 font-bold text-gray-700 rounded-lg'>-----Welcome-----</h2>
          </div> }
        </div>
      </div>
    </div>
  )
}

export default Chat;