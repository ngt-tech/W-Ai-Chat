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

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from NGT AI',
  });
});

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    // Validate prompt
    if (!prompt) {
      return res.status(400).send({
        error: 'Prompt is required in the request body.',
      });
    }

    const response = await openai.createCompletion({
      model: "gpt-3.5-turbo-1106",
      prompt: `${prompt}`,
      temperature: 0.7, // Adjust based on your preference
      max_tokens: 300, // Adjust based on your preference
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    res.status(200).send({
      bot: response.data.choices[0].text,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: `Internal Server Error: ${error.message}`,
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`AI server started on http://localhost:${PORT}`));
