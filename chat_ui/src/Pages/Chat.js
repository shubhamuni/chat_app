import { useState } from "react";
import Sidebar from "../Components/Sidebar";

const Chat = () => {
  const [chatInitiated, setChatInitiated] = useState(false);
  const [chats, setChats] = useState([])
  
  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <div className='bg-cover w-2/4 h-[calc(100vh-60px)] rounded-lg flex items-center justify-center' style={{ backgroundImage: "url(./bg.jpg)" }}>
        <Sidebar />
        <div className="w-3/4 bg-white flex flex-col bg-opacity-20 realative">
          {chatInitiated ? <div>

          </div> : <div className="flex justify-center items-center h-full">
            <h2 className='text-3xl py-3 bg-white bg-opacity-70 font-bold text-gray-700 rounded-lg'>-----Welcome-----</h2>
          </div> }
        </div>
      </div>
    </div>
  )
}

export default Chat;