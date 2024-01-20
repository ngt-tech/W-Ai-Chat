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
    console.error('Error:', error);

    // Log OpenAI error details
    if (error.response && error.response.data && error.response.data.error) {
      console.error('OpenAI Error Details:', error.response.data.error);
    }

    res.status(500).send({
      error: `Internal Server Error: ${error.message}`,
    });
  }
});
