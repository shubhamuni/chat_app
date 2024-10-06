import React, { useState } from 'react'

const Login = ({openSignUp}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        // eslint-disable-next-line no-restricted-globals
        // event.preventDefault();
    }

  return (
      <div>
          <h2 className='text-2xl font-bold mb-4'>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
                <label htmlFor='name' className='block text-gray-700'>Username:</label>
                <input type="text" name="name" className='w-full px-3 py-2 border' onChange={e => setUsername(e.target.value)} placeholder='Enter Username'/>      
            </div>
            <div className='mb-4'>
                <label htmlFor='password' className='block text-gray-700'>Password:</label>
                <input type="password" name="password" placeholder='********' className='w-full px-3 py-2 border'onChange={e => setPassword(e.target.value)}/>
            </div>
            <div className='mb-4 items-center justify-between'>
                <label form='rememberme' className='inline-flex items-center'>
                    <input type="checkbox" name="rememberme" className='form-checkbox'/>
                    <span className='ml-2 text-gray-700'>Remember me</span>
                </label>
            </div>
            <a href="/" className='text-red-800'>Forget password?</a>
            <div className='mb-4 '>
                <button className='w-full bg-red-600 text-white py-3'>
                    Login
                </button>
            </div>
          </form>
          <div className='text-center'>
              <span className='text-gray-700 '>Don't have an account? </span>
              <button className='text-red-800'onClick={openSignUp}>Sign Up</button>
          </div>
      </div>

  )
}

export default Login