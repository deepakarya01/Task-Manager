import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useAuth } from './context/authContext';

const Task = () => {
   const { user } = useAuth();
   const [task, setTask] = useState('');
   const [tasks, setTasks] = useState([]);
   const [editTaskId, setEditTaskId] = useState(null);
   const [editedTitle, setEditedTitle] = useState({});

   const handleAddTask = async () => {
      if (!task.trim()){
         console.error("Not authorized, no token provided!")
         return
      } 
      try {
         const token = localStorage.getItem('token');
         //console.log(token)

         const response = await axios.post('http://localhost:5001/api/task/create',
            {title: task},
            { headers:{
                  Authorization: `Bearer ${token}`
               }
            }
         )

         setTasks([...tasks, response.data.task]);
         setTask('');
      } catch (error) {
         console.error("Error adding task:", error);
      }
   };

   const getAllTasks = async () => {
      try {
         const token = localStorage.getItem('token');

         const response = await axios.get(
            'http://localhost:5001/api/task/getall', {
               headers: {
                  Authorization: `Bearer ${token}`
               }
            });
            //console.log(response);
            setTasks(response.data.tasks);
      } catch (error) {
         console.error("Error fetching tasks:", error);
      }
   }

   useEffect(() => {
      getAllTasks();
   },[])

   const handleDelete = async (deletedId) => {
      console.log(deletedId);
      try {
         const token = localStorage.getItem('token')

         setTasks(prevTask => prevTask.filter(t => t._id !== deletedId));

         await axios.delete(
            `http://localhost:5001/api/task/${deletedId}`,
            {headers:{
               Authorization: `Bearer ${token}`
            }}
         )
         console.log("Task deleted!");
      } catch (error) {
         console.log("Error in handleDelete", error);
      }
   }

   const handleEdit = async (taskId) => {
      console.log(editTaskId);
      try {
         const token = localStorage.getItem('token');

         const response = await axios.put(
            `http://localhost:5001/api/task/${editTaskId}`,
            {title: editedTitle[taskId]},
            {headers:{
               Authorization: `Bearer ${token}`
            }}
         );

         setTasks((prev) => prev.map((task) => (
            task._id === taskId ? {...task, title: editedTitle[taskId]} : task
         )))

         setEditTaskId(null);
      } catch (error) {
         console.log("Error updating task", error)
      }
   }

   return (
      <div className= "w-full bg-gray-100 p-6">
         <div className="w-220 mx-auto bg-white p-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-6">

               <h1 className="text-2xl font-bold text-gray-800">
                  Welcome, {user?.name || 'Guest'}!
               </h1>
               <p className="text-gray-500 mt-1">Manage your tasks efficiently</p>
            </div>

            <div className="flex gap-2 mb-6">
               <input
                  type="text"
                  placeholder="Enter a task"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
               />
               <button
                  onClick={handleAddTask}
                  className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600"
               >
                  Add Task
               </button>
            </div>

            <div>
               <h2 className="text-xl font-semibold text-gray-700 mb-3">Your Tasks</h2>
               {tasks.length === 0 ? (
                  <p className="text-gray-500">No tasks yet. Start adding!</p>
               ) : (
                  <ul className="space-y-2">
                     {tasks.map((t) => (
                        <li
                           key={t._id}
                           className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-md shadow-sm"
                        >
                           {editTaskId === t._id ? (
                              <input
                                 type="text"
                                 value={editedTitle[t._id]}
                                 onChange={e => 
                                    setEditedTitle({...editedTitle, [t._id]: e.target.value})}
                                 className='border '
                              />
                           ):(
                              <span >
                              {t.title}
                              </span>
                           )}
                           <div className="flex gap-2">
                              {editTaskId === t._id ? (
                                 <button
                                    onClick={() => handleEdit(t._id)}
                                    className="text-blue-500 hover:text-blue-700"
                                 >
                                    Save
                                 </button>
                              ) : (
   <                             button
                                    onClick={() => {
                                       setEditTaskId(t._id);
                                       setEditedTitle(prev => ({ ...prev, [t._id]: t.title }));
                                    }}
                                    className="text-green-500 hover:text-green-700">Edit</button>
                              )} 
                              <button
                                 onClick={() => handleDelete(t._id)}
                                 className="text-red-500 hover:text-red-700">Delete</button>
                           </div>
                        </li>
                     ))}
                  </ul>
               )}
            </div>
         </div>
      </div>
   );
};

export default Task;
