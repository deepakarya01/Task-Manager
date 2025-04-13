const express = require('express')
const Task = require('../models/taskModel')
const {createTask, getSingleTask, updateTask, deleteTask, getAllTask} = require('../controllers/taskController');
const {protected} = require('../middleware/authMIddleware')

const router = express.Router();


//get all task
router.get('/getall', protected, getAllTask)

//create
router.post('/create',protected, createTask)

//get single
router.get('/:id',protected, getSingleTask )

//get
router.put('/:id',protected, updateTask)

//delete
router.delete('/:id',protected, deleteTask)

module.exports = router;