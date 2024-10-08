import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    useEffect(() => {
        const fetchUser = async () => {
          try {
              const users = await axios.get('http://localhost:9000/chat/user/users')
              setUser(users.data.users)
          } catch (error) {
              navigate('/');
              console.log(error);
              
          }
        }
        fetchUser();
      
    }, [])
    
  return (
      <div>
          <input type="text" name="Search" placeholder='Search' />
          {user.length > 0 ? 
              <div>
                  {user.map(user => (
                      <div>
                          <img src="" alt="" />
                          <span>{user.username}</span>
                      </div>
                  ))}
              </div> :
              <div>
                  
              </div>
          }
    </div>
  )
}

export default Sidebar