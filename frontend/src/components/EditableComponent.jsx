import React, { useState } from 'react'

const EditableComponent = ({initialValue, onSave}) => {
   const [isEditing, setIsEditing] = useState(false)
   const [input, setInput] = useState(initialValue);

   const handleEdit = () => {
      setIsEditing(true);
   }

   const handleSave = () => {
      onSave(input);
      setIsEditing(false);
   }

   const handleCancel = () => {
      setInput(initialValue);
      setIsEditing(false);
   }

   return (
    <div className="relative inline-block">
      {!isEditing ? (
         <div className="flex items-center">
            <button 
               onClick={handleEdit}
               className="text-green-600 hover:text-green-800 focus:outline-none">Edit</button>
         </div>
      ):(
         <div className="absolute z-50 top-full left-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 backdrop-blur-sm">
            <div className='p-3'>
               <input 
               type="text"
               value={input}
               onChange={e => setInput(e.target.value)}
               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 mb-2"/>
               <div className="flex justify-end space-x-2">
               <button 
                  onClick={handleSave}
                  className="px-3 py-1 bg-gray-700 text-white hover:bg-gray-800 rounded-md focus:outline-none">Save</button>
               <button 
                  onClick={handleCancel}
                  className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded-md focus:outline-none">cancel</button>
               </div>
            </div>
         </div>
      )}
    </div>
  )
}

export default EditableComponent