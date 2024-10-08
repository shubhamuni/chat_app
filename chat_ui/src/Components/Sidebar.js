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
              setUser(users.data)
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
    </div>
  )
}

export default Sidebar