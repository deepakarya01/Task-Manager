import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/authContext';

const Login = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [errorMsg, setErrorMsg] = useState('')
   const {setUser} = useAuth();
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const response = await axios.post('http://localhost:5001/api/user/login', {email, password});
         localStorage.setItem('token', response.data.token);
         //console.log("Token stored:", response.data.token);

         setUser(response.data.user);
         setEmail('')
         setPassword('');
         navigate('/dashboard');
      } catch (error) {
         console.log("Error in axios login", error);
         if(error.response.data.success === false){
            setErrorMsg("Invalid credentials");
            return;
         }
      }
   };

   return (
      <div className='flex flex-col items-center justify-center bg-gray-100 min-h-screen'>
         <h1 className='text-3xl font-semibold mb-6 text-gray-800'>Login</h1>
         {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
         <form onSubmit={handleSubmit} className='bg-white p-8 rounded-xl shadow-lg w-lg'>
            <div className='flex flex-col mb-4'>
               <label htmlFor="email" className='mb-1 text-gray-700 font-md'>Email:</label>
               <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className='border border-gray-300 rounded-md px-4 py-2 focus:oultine-none focus:ring-1 focus:ring-gray-400 transition-all duration-200'
               />
            </div>
            <div className='flex flex-col mb-4'> 
               <label htmlFor="password" className='mb-1 text-gray-700 font-md'>Password:</label>
               <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className='border border-gray-300 rounded-md px-4 py-2 focus:oultine-none focus:ring-1 focus:ring-gray-400 transition-all duration-200'
               />
            </div>
            <button
               type="submit"
               className='bg-gray-700 text-white px-4 py-2 w-full rounded-md font-semibold text-xl shadow-md mt-4 hover:bg-gray-600 transition-all duration-200'
               >Login</button>
         </form>
         <p className='mt-2 text-gray-700'>
            Don't have an account?{' '}
            <Link to='/register' className='hover:underline hover:text-blue-400'>
               register here
            </Link>
         </p>
      </div>
   );
};

export default Login;