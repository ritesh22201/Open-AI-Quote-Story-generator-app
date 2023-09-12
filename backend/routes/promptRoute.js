const express = require('express');
const auth = require('../middlewares/auth');
const PromptModel = require('../models/promptModel');
const rateLimit = require('express-rate-limit');
const promptRouter = express.Router();
require('dotenv').config();

const apiKey = process.env.openApiKey;

const promptModel = new PromptModel(apiKey);

const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // 10 requests per minute
    message: "Too many requests from this IP, please try again later.",
  });

promptRouter.post('/generate-prompt', auth, apiLimiter, async(req, res) => {
    const {userInput, inputCategory} = req.body;

    try {
        const prompt = await promptModel.generatePrompt(userInput, inputCategory);
        res.status(200).send({promptData : prompt});
    } catch (error) {
        res.status(500).send({msg : error.message});
    }
})

module.exports = promptRouter;

