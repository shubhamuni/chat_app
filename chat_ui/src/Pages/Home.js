import React, { useState } from 'react'
import Model from '../Components/Model';
import Register from '../Components/Register';
import Login from '../Components/Login';

const Home = () => {
    const [modelIsOpen, setModelIsOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const openSignUp = () => {
        setModelIsOpen(true);
        setIsLogin(false);
    }
    const openLogin = () => {
        setModelIsOpen(true);
        setIsLogin(true);
    }
  return (
      <div className='flex items-center justify-center h-screen bg-gray-100'>
          <div className='bg-cover w-2/4 h-[calc(100vh-60px)] rounded-lg flex items-center justify-center' style={{ backgroundImage: "url(./bg.jpg)" }}>
              <div className='text-center'>
                  <h2 className='text-6xl py-3 bg-white bg-opacity-70 font-bold text-gray-700 rounded-lg'>Welcome</h2>
                  <button className='p-3 hover:bg-blue-800 rounded-lg mt-2 bg-blue-600 text-white text-3' onClick={()=> setModelIsOpen(true)}>Login/Register</button>
              </div>
          </div>
          <Model modelIsOpen={modelIsOpen} setModelIsOpen={setModelIsOpen} isLogin={isLogin} setIsLogin={setIsLogin}>
              {isLogin ? <Login openSignUp={openSignUp} /> : <Register openLogin={openLogin}/>}
          </Model>
    </div>
  )
}
export default Home;