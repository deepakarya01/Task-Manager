import React from 'react'
import { Header } from '../components/Header'
import Task from '../Task'

export const Dashboard = () => {
   return ( 
   <div className='min-h-screen bg-gray-100 flex flex-col'>
      <Header/>
      <div className='flex-1'>
         <Task/>
      </div>
   </div>    
   )
}
