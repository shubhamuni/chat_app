import axios from 'axios';
import React, { useState } from 'react'

const Form = ({receiverId, setChat, chat}) => {
    const [message, setMessage] = useState('');
    const userId = window.localStorage.getItem('userId')
    const sendMessage = async (e) => {
        e.preventDefault();
        const token = window.localStorage.getItem('chat-token');
        try {
            const response = await axios.post('http://localhost:9000/chat/message/send/' + receiverId, { content: message },
                {
              headers: {
                    'Authorization': `Bearer ${token}`
                    }
                })
            console.log(response);
            
            setChat([...chat, { content: message, sender: userId }])
            setMessage('');
        } catch (error) {
           console.log(error);
           
            
        }
    }
  return (
      <div className="p-4 fixed bottom-5 right-0 left-24 ">
          <form onSubmit={sendMessage} className='flex justify-center'>
              <div className="flex items-center w-full max-w-md">
                {/* Input Field */}
                <input 
                    type="text" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    placeholder="Type your message..." 
                    className="flex-grow w-50 p-3 border border-gray-300 rounded-l-lg focus:outline-none"
                />
                
                {/* Send Button */}
                <button className="p-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600">
                    Send
                </button>
            </div>
            </form>
        </div>
  )
}

export default Form;