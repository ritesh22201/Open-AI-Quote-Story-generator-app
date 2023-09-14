const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./config/db');
const OpenAI = require("openai");
const userRouter = require('./routes/authRoute');
const auth = require('./middlewares/auth');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use('/user', userRouter);

const openai = new OpenAI({ apiKey: process.env.openApiKey });

app.get('/', async(req, res) => {
    try {
        res.send('Homepage')
    } catch (error) {
        res.send({msg : error.message});
    }
})


app.post("/chat", auth, async (req, res) => {
    const { userInput, inputCategory } = req.body;

    let input_text = `Act as an expert ${inputCategory} generator. I as a user will provide you a topic as an input and you have to generate a ${inputCategory} related to ${userInput} in ${inputCategory === 'shayari' ? 'Hindi' : 'English'}`;

    try {
        if (!userInput) {
            return res.status(400).send({ msg: 'Input must not be empty!' });
        }

        const completion = await openai.chat.completions.create({
            "model": "gpt-3.5-turbo",
            "messages": [{ role: "user", content: input_text }]
        });

        // console.log(completion.choices[0].message.content)
        res.status(200).send(completion.choices[0].message.content);

    } catch (error) {
        res.status(400).send({msg : error.message});
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