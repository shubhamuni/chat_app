import React, { useEffect, useState } from 'react';
import Model from '../Components/Model';
import Register from '../Components/Register';
import Login from '../Components/Login';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Error404 from './Error404';

const Home = () => {
  const [error, setError] = useState(null); 
  const [modelIsOpen, setModelIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const openSignUp = () => {
      setModelIsOpen(true);
      setIsLogin(false);
  }

  const openLogin = () => {
      setModelIsOpen(true);
      setIsLogin(true);
  }

  useEffect(() => {
    const verifyUser = async () => {
      const token = window.localStorage.getItem('chat-token');
      if (!token) {
        return; // Early exit if no token
      }
      try {
        const response = await axios.get('https://chat-app-17cu.vercel.app/chat/user/verify', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.data.msg === 'success') {
          navigate('/chat');
        } else {
          setError(new Error('User verification failed.'));
        }
      } catch (error) {
        console.error('Verification error:', error);
        setError(error);
      }
    }
    verifyUser();
  }, [navigate]);

  return (
    <>
      {error ? <Error404 /> : (
        <div className='flex items-center justify-center h-screen bg-gray-100'>
          <div 
            className='bg-cover w-full md:w-2/4 h-[calc(100vh-60px)] rounded-lg flex flex-col items-center justify-center' 
            style={{ backgroundImage: "url(./bg.jpg)" }}
            role="banner" 
            aria-label="Welcome Banner"
          >
            <div className='text-center bg-white bg-opacity-80 p-5 rounded-lg shadow-lg' role="contentinfo">
              <h2 className='text-5xl md:text-6xl py-3 font-bold text-gray-700' aria-live="polite">
                Let's get the conversation started!
              </h2>
              <button 
                className='p-3 hover:bg-blue-800 rounded-lg mt-4 bg-blue-600 text-white text-lg transition duration-300'
                onClick={() => setModelIsOpen(true)}
                aria-label="Open Login/Register modal"
                tabIndex={0}
              >
                Login/Register
              </button>
            </div>
          </div>
          <Model modelIsOpen={modelIsOpen} setModelIsOpen={setModelIsOpen} isLogin={isLogin} setIsLogin={setIsLogin}>
            {isLogin ? <Login openSignUp={openSignUp} /> : <Register openLogin={openLogin}/>}
          </Model>
        </div>
      )}
    </>
  );
}

export default Home;
