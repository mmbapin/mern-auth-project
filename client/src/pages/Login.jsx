import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import {toast} from 'react-toastify';
import axios from 'axios';


const Login = () => {
  const navigate = useNavigate();
  const {backendUrl, setIsLoggedIn, getUserData} = useContext(AppContext);


  const [isLoginPage, setIsLoginPage] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      if(isLoginPage){
        const {data} =await axios.post(`${backendUrl}/api/auth/login`, {email, password});
        if(data.success){
          setIsLoggedIn(true);
          getUserData();
          navigate('/');
        }else{
          toast.error(data.message);
        }
      }else{
        const {data} = await axios.post(`${backendUrl}/api/auth/register`, {name, email, password});
        if(data.success){
          setIsLoggedIn(true);
          navigate('/');
        }else{
          toast.error(data.message);
        }
      }
        
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-500'>
      <img
        src={assets.logo}
        alt='logo'
        className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'
        onClick={() => navigate('/')}
      />
      <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
        <h2 className='text-3xl font-semibold text-white text-center mb-3'>{isLoginPage ? 'Login' : 'Create Account'}</h2>
        <p className='text-center text-sm mb-6'>{isLoginPage ? 'Login to your account' : 'Create your account'}</p>

        <form onSubmit={onSubmitHandler}>
          {!isLoginPage && <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img 
              src={assets.person_icon} 
              alt="personicon" 
            />
            <input 
              onChange={(e) => setName(e.target.value)} 
              value={name} 
              className='bg-transparent outline-none' 
              type="text" 
              placeholder='Full Name' 
              required
            />
          </div>}

          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img 
              src={assets.mail_icon} 
              alt="mailicon" 
            />
            <input 
              onChange={(e) => setEmail(e.target.value)} 
              value={email} 
              className='bg-transparent outline-none' 
              type="email" 
              placeholder='Email Id' 
              required
            />
          </div>

          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img 
              src={assets.lock_icon} 
              alt="lockicon" 
            />
            <input 
              onChange={(e) => setPassword(e.target.value)} 
              value={password} 
              className='bg-transparent outline-none' 
              type="password" 
              placeholder='Password' 
              required
            />
          </div>
          <p 
            onClick={() => navigate('/reset-password')}
            className='mb-4 text-indigo-500 cursor-pointer'>
              Forgot Password?
          </p>
          <button 
            className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium cursor-pointer'>
              {isLoginPage ? 
              'Login' : 
              'Sign Up'
              }
          </button>
        </form>

        {isLoginPage ? (
          <p className='text-gray-400 text-center text-xs mt-4'>Don't have an account?{' '} 
            <span 
              className='text-blue-400 cursor-pointer underline' 
              onClick={() => setIsLoginPage(false)}>
              Sign Up
            </span>
          </p>
        ) : (
          <p className='text-gray-400 text-center text-xs mt-4'>Already have an account?{' '} 
            <span 
              className='text-blue-400 cursor-pointer underline' 
              onClick={() => setIsLoginPage(true)}>
              Login here
            </span>
          </p>
        )}
      </div>
    </div>
  )
}

export default Login