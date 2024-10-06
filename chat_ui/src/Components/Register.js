import React, { useState } from 'react'
import axios from 'axios';

const Register = ({openLogin}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [file, setFile] = useState(null)

    const handleSubmit = async (e) => {
        // eslint-disable-next-line no-restricted-globals
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', username)
        formData.append('password', password)
        if (file) {
        formData.append('image', file);  // Check that the file is properly attached
        } else {
            console.error("File is undefined");
            return;  // Early exit if no file is uploaded
        }
        try {
            const response = await axios.post('http://localhost:9000/chat/user/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'  // Ensure correct content type for file upload
                }
            });
        console.log(response);
        if (response.data.msg === 'success') {
            openLogin();
        }
        } catch (error) {
            console.log(error)
        }
    }

  return (
      <div>
          <h2 className='text-2xl font-bold mb-4'>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
                <label htmlFor='name' className='block text-gray-700'>Username:</label>
                <input type="text" name="name" className='w-full px-3 py-2 border' onChange={e => setUsername(e.target.value)} placeholder='Enter Username'/>      
            </div>
            <div className='mb-4'>
                <label htmlFor='password' className='block text-gray-700'>Password:</label>
                <input type="password" name="password" placeholder='********' className='w-full px-3 py-2 border'onChange={e => setPassword(e.target.value)}/>
            </div>
            <div className='mb-4'>
          <label htmlFor='file' className='block text-gray-700'>
            Upload Image
            </label>
            <input type="file" name="file" className='border p-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:texxt-sm file:font-semibold  file:bg-blue-500 file:text-white hover:file:bg-blue-700' onChange={e => setFile(e.target.files[0])}/>
            </div>
            <div className='mb-4 '>
                <button className='w-full bg-blue-600 text-white py-3'>
                    Register
                </button>
            </div>
          </form>
          <div className='text-center'>
              <span className='text-gray-700 '>Already have an account? </span>
              <button className='text-blue-600'onClick={openLogin}>Login</button>
          </div>
      </div>

  )
}

export default Register