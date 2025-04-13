import React from 'react'
import {useAuth} from '../context/authContext'
import { useNavigate } from 'react-router-dom'

export const Header = () => {
     const {user, setUser} = useAuth();
     const navigate = useNavigate();

     const handleLogout = () => {
          localStorage.removeItem('token');
          setUser(null);
          navigate('/')
     }
  return (
    <div className='flex justify-between sticky bg-gray-700 text-white py-4 px-2 shadow-lg z-10'>
          <div className='text-3xl bold-300 ml-4'>Task Manager</div>
          <div className="btns flex ">
               {user ? (
                    <button 
                         onClick={handleLogout}
                         className='rounded-md px-3 py-2 hover:bg-gray-600'>Logout</button>
               ) : (
                    <>
                    <button 
                         onClick={() => navigate('/')}
                         className='rounded-md px-3 py-2 hover:bg-gray-600'>Login</button>
                    <button 
                         onClick={() => navigate('/register')}
                         className='rounded-md px-3 py-2 hover:bg-gray-600'>Register</button>
                    </>
               )}
               
               
          </div>
    </div>
  )
}
