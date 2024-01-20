import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

// Function to handle OpenAI API request
const getOpenAIResponse = async (prompt) => {
  try {
    const response = await openai.createCompletion({
      engine: "gpt-3.5-turbo-0613",
      prompt: `${prompt}`,
      temperature: 0.7,
      max_tokens: 300,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return response.data.choices[0].text;
  } catch (error) {
    console.error(error);
    throw new Error('Error generating OpenAI response');
  }
};

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from NGT AI',
  });
});

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    if (!prompt) {
      return res.status(400).send({
        error: 'Prompt is required',
      });
    }

    const botResponse = await getOpenAIResponse(prompt);

    res.status(200).send({
      bot: botResponse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: 'Internal Server Error',
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`AI server started on http://localhost:${PORT}`));
