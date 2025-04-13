const Task = require('../models/taskModel');

const createTask = async (req, res) => {
   const {title} = req.body;

   if(!title){
      return res.status(400).json({message: "Title is required", success: false})
   }
   
   const newTask = await Task.create({
      title,
      user: req.user._id,
   })

   res.status(201).json({message: "Task created",
      task: newTask,
      success: true
   });
}

const getAllTask = async (req, res) => {
   try {
      const tasks = await Task.find({user:req.user._id})
      res.status(200).json({
         message: "Tasks fetched successfully",
         tasks,
         success: true
      })
   } catch (error) {
      console.error("Error in getAllTasks:", error);
      res.status(500).json({
         message: "Server error while fetching tasks",
         error,
         success: false,
      });
   }
}

const getSingleTask = async (req, res) => {
   try {
      const task = await Task.findOne({_id: req.params.id, user: req.user._id})

      if(!task){
         return res.status(404).json({message: "Task not found", success: false})
      }

      res.status(200).json({ task, success: true });
   } catch (error) {
      console.error('Error in getSingleTask:', error);
      res.status(500).json({ message: 'Server error', success: false });
   }
}

const updateTask = async (req, res) => {
   const {title} = req.body;
   if(!title){
      return res.status(400).json({message: "Title is required", success: false})
   }

   try {
      const updatedTask = await Task.findOneAndUpdate(
         {_id: req.params.id, user: req.user._id},
         {title},
         {new: true}
      );

      if(!updatedTask){
         return res.status(404).json({message: "Task not found", success: false});
      }

      res.status(200).json({ message: 'Task updated', task: updatedTask, success: true });
   } catch (error) {
      console.error('Error in updateTask:', error);
      res.status(500).json({ message: 'Server error', success: false });
      
   }
}

const deleteTask = async (req, res) => {
   try {
      const task = await Task.findOneAndDelete(
         {_id: req.params.id, user: req.user._id},
      )

      if(!task){
         return res.status(404).json({message: "Task not found", success: fasle})
      }
      
      res.status(200).json({message: "Task deleted", success: true})
   } catch (error) {
      console.error('Error in deleteTask:', error);
      res.status(500).json({ message: 'Server error', success: false });
   }
}

module.exports = {createTask, getSingleTask,getAllTask, updateTask, deleteTask};