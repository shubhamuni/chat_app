import Sidebar from "../Components/Sidebar";

const Chat = () => {
  
  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <div className='bg-cover w-2/4 h-[calc(100vh-60px)] rounded-lg flex items-center justify-center' style={{ backgroundImage: "url(./bg.jpg)" }}>

        <Sidebar />
      </div>
    </div>
  )
}

export default Chat;