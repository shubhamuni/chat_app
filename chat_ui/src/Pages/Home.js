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
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  const openSignUp = () => {
    setModelIsOpen(true);
    setIsLogin(false);
  };

  const openLogin = () => {
    setModelIsOpen(true);
    setIsLogin(true);
  };

  useEffect(() => {
    const verifyUser = async () => {
      const token = window.localStorage.getItem('chat-token');
      if (!token) {
        // If no token exists, show login modal
        setModelIsOpen(false);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:9000/chat/user/verify', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.msg === 'success') {
          // If user is successfully authenticated, navigate to chat page
          navigate('/chat');
        } else {
          // If token verification failed, show login/register modal
          setModelIsOpen(true);
        }
      } catch (error) {
        console.log('Authentication failed:', error);
        setError('You need to log in to access the chat');
        setModelIsOpen(true); // Show login/register modal on error
      } finally {
        setLoading(false); // Ensure loading stops
      }
    };

    verifyUser();
  }, [navigate]);

  return (
    <>
      {loading ? (
        <div className='flex items-center justify-center h-screen bg-gray-100'>
          <p>Loading...</p>
        </div>
      ) : error ? (
        <Error404 message={error} />
      ) : (
        <div className='flex items-center justify-center h-screen bg-gray-100'>
          <div
            className='bg-cover w-full md:w-2/4 h-[calc(100vh-60px)] rounded-lg flex flex-col items-center justify-center'
            style={{ backgroundImage: 'url(./bg.jpg)' }}
          >
            <div className='text-center bg-white bg-opacity-80 p-5 rounded-lg shadow-lg'>
              <h2 className='text-5xl md:text-6xl py-3 font-bold text-gray-700'>
                Let&apos;s get the conversation started!
              </h2>
              <button
                className='p-3 hover:bg-blue-800 rounded-lg mt-4 bg-blue-600 text-white text-lg transition duration-300'
                onClick={() => setModelIsOpen(true)}
              >
                Login/Register
              </button>
            </div>
          </div>
          <Model modelIsOpen={modelIsOpen} setModelIsOpen={setModelIsOpen} isLogin={isLogin} setIsLogin={setIsLogin}>
            {isLogin ? <Login openSignUp={openSignUp} /> : <Register openLogin={openLogin} />}
          </Model>
        </div>
      )}
    </>
  );
};

export default Home;
