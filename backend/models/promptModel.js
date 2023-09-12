const axios = require('axios');

class PromptModel {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.apiUrl = 'https://api.openai.com/v1/engines/davinci/completions';
    }

    async generatePrompt(userInput, inputCategory) {

        const token = inputCategory === 'story' ? 300 : 100;

        try {
            const response = await axios.post(
                this.apiUrl,
                {
                    prompt: `Tell me a ${inputCategory} about ${userInput}`,
                    max_tokens : token
                },
                {
                    headers : {
                        'Authorization' : `Bearer ${this.apiKey}`,
                        'Content-Type' : 'application/json'
                    }
                }
            )
            console.log(response.data);
            return response.data.choices[0].text;

        } catch (error) {
            throw error;
        }
    }
}

module.exports = PromptModel;