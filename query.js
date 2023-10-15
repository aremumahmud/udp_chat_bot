const openai = require('openai');
const dotenv = require('dotenv')

dotenv.config()

// Set your OpenAI API key
const apiKey = process.env.OPENAI_API_KEY;

const openaiClient = new openai({ key: apiKey });

module.exports = async function queryChatGPT(prompt) {
    const start = process.hrtime();

    try {
        const response = await openaiClient.completions.create({
            // Use the Davinci Codex engine
            model: "gpt-3.5-turbo-instruct",
            prompt: prompt,
            max_tokens: 1850, // You can adjust this as needed
        });

        const end = process.hrtime();
        const timeTaken = (end[0] * 1000 + end[1] / 1e6).toFixed(2); // Measure the time taken

        return { answer: response.choices[0].text, timeTaken: `${timeTaken} ms` };
    } catch (error) {
        console.error('Error calling OpenAI:', error);
        return { answer: 'An error occurred.', timeTaken: 'N/A' };
    }
}

// // Example usage:
// (async() => {
//     const prompt = 'Translate the following English text to French: "Hello, world!"';
//     const { answer, timeTaken } = await queryChatGPT(prompt);
//     console.log('Response:', answer);
//     console.log('Time taken:', timeTaken);
// })();