import axios from 'axios';
import React, { useState } from 'react'

const Form = () => {
    const [message, setMessage] = useState('');
    const userId = window.localStorage.getItem('userId')
    const sendMessage = async  () => {
        try {
            const response = await axios.post('http://localhost:9000/chat/message/send/')
        } catch (error) {
           console.log(error);
            
        }
    }
  return (
      <div className="p-4 fixed bottom-5 right-0 left-24 flex justify-center">
          <form onSubmit={sendMessage}>
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