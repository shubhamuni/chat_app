import React, { useState } from 'react'

const Form = () => {
    const [message, setMessage] = useState('');
  return (
      <div className="p-4 fixed bottom-5 right-0 left-24 flex justify-center">
            <div className="flex items-center w-full max-w-md">
                {/* Input Field */}
                <input 
                    type="text" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    placeholder="Type your message..." 
                    className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none"
                />
                
                {/* Send Button */}
                <button className="p-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600">
                    Send
                </button>
            </div>
        </div>
  )
}

export default Form