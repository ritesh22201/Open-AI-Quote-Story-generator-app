const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./config/db');
const userRouter = require('./routes/authRoute');
const promptRouter = require('./routes/promptRoute');
require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use('/user', userRouter);
app.use('/prompt',promptRouter);

app.get('/', async(req, res) => {
    try {
        res.send('Homepage')
    } catch (error) {
        res.send({msg : error.message});
    }
})

app.listen(process.env.port, async() => {
    try {
        await connection;
        console.log('Server is connected to the DB');
    } catch (error) {
        console.log(error.message);
    }
    console.log(`Server is running at port ${process.env.port}`);
})