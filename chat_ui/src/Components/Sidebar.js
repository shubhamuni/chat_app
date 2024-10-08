import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUser = async () => {
          try {
              const users = axios.get('http://localhost:9000/chat/user/users')
              
          } catch (error) {
            navigate('/')
          }
      }
    
      
    }, [])
    
  return (
      <div>
          <input type="text" name="Search" placeholder='Search' />
    </div>
  )
}

export default Sidebar