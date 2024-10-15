import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ setChatInitiated, setChat, setReceiverId }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchField, setSearchField] = useState('');
  const token = window.localStorage.getItem('chat-token');

  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchField.toLowerCase())
  );

  const handleLogout = () => {
    window.localStorage.removeItem("chat-token");
    window.localStorage.removeItem("userId");
    navigate('/');
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://chat-build.onrender.com/chat/users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUsers(response.data.users);
      } catch (error) {
        navigate('/');
        console.error(error);
      }
    };
    fetchUsers();
  }, [navigate, token]);

  const statChat = async (id) => {
    try {
      const response = await axios.get(`https://chat-build.onrender.com/chat/message/read/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setChat(response.data);
    } catch (error) {
      if (error.response && error.response.data.message === "Not Found") {
        setChat([]);
      }
    }
    setReceiverId(id);
    setChatInitiated(true);
  };

  return (
    <div className='w-1/4 bg-gray-800 p-4 relative text-white flex flex-col h-full'>
      <input
        type="text"
        name="Search"
        onChange={onSearchChange}
        placeholder='Search Users'
        className='w-full mb-4 p-2 bg-gray-700 border border-gray-600 rounded'
      />
      {users.length > 0 ? (
        <div className='flex-grow space-y-4 overflow-y-auto'>
          {filteredUsers.map(user => (
            <div key={user._id} onClick={() => statChat(user._id)} className='flex items-center space-x-4 p-2 hover:bg-gray-600 cursor-pointer rounded'>
              <img src={`http://localhost:9000/Public/Images/${user.image}`} alt={user.username} className='w-10 h-10 rounded-full border' />
              <span className='font-bold'>{user.username}</span>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p className='text-white text-2xl'>No Users</p>
        </div>
      )}
      <button onClick={handleLogout} className='mt-auto bg-red-500 text-white p-2 rounded hover:bg-red-600'>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
