const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const connectDb = require('./lib/db');
const app = express();

connectDb();

app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoute');
const taskRoutes = require('./routes/taskRoute');

app.use('/api/user', userRoutes);
app.use('/api/task/', taskRoutes)

const port = process.env.PORT;

app.listen(port, ()=> {
   console.log(`App is running on the port ${port}`)
})