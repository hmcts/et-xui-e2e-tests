const axios = require('axios');
const testConfig = require("./config");

async function aiRequest(prompt) {
  const apiKey =  testConfig.TestApiKey;
  const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

  const data = {
    prompt: prompt,
    max_tokens: 3000,
  };

  try {
    const response = await axios.post(apiUrl, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error making AI request:', error);
    throw error;
  }
}

module.exports = aiRequest;
