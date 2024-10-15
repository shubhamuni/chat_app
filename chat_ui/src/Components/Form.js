import axios from 'axios';
import React, { useState } from 'react';

const Form = ({ receiverId, setChat, chat }) => {
  const [message, setMessage] = useState('');
  const userId = window.localStorage.getItem('userId');

  const sendMessage = async (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem('chat-token');
    try {
      await axios.post(`https://chat-build.onrender.com/chat/message/send/${receiverId}`, { content: message }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setChat([...chat, { content: message, sender: userId }]);
      setMessage('');
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <form onSubmit={sendMessage} className='flex justify-between items-center'>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none"
          required
        />
        <button className="p-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default Form;
