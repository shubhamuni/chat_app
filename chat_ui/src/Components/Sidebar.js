import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({setChatInitiated, setChat, setReceiverId}) => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchUser = async () => {
            const token = window.localStorage.getItem('chat-token');
          try {
              const users = await axios.get('http://localhost:9000/chat/users', {
              headers: {
                    'Authorization': `Bearer ${token}`
              }
            }
                  
              )
              setUsers(users.data.users) 
          } catch (error) {
              navigate('/');
              console.log(error);
              
          }
        }
        fetchUser();        
    }, [navigate])
    
  const statChat = async (id) => {
    const token = window.localStorage.getItem('chat-token');
      try {
          const response = await axios.get('http://localhost:9000/chat/message/read/' + id,
              {
            headers: {
                  'Authorization': `Bearer ${token}`
                  }
              })
          console.log(response);
          
          setChat(response.data)
      } catch (error) {
        if (error.response.data.message === "Not Found") {
          setChat([]);
        }
      }
  setReceiverId(id)
  setChatInitiated(true);
  }
  return (
      <div className='w-1/4 bg-black p-4 bg-opacity-70 realative'>
          <input type="text" name="Search" placeholder='Search' className='w-full mb-4 p-2 border rounded'/>
          {users.length > 0 ? 
              (<div className='space-y-4' >
                  {users.map(user => (
                      <div key={user._id} onClick={()=> statChat(user._id)} className='flex items-center space-x-4 p2 hover:bg-gray-300 cursor-pointer '>
                          <img src={`./../../../chatServer/Public/Images/${user.image}`} alt="username" className='w-10 h-10 rounded-full border'/>
                          <span className='text-white font-bold'>{user.username}</span>
                      </div>
                  ))}
              </div>) :
              (<div>
                <p className='text-white text-2xl'>No Users</p>  
              </div>)
          }
          <button className='fixed bottom-9 right-30 left-100 rounded hover:bg-blue-700 bg-blue-500 text-white p-3 justify-center'>Logout</button>
    </div>
  )
}

export default Sidebar