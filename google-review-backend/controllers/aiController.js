const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generateReview = async (req, res) => {
  try {
    const { feedback } = req.body;

    const response =
      await openai.responses.create({
        model: "gpt-4.1-mini",
        input: `
Write a short positive Google review based on:
"${feedback}"

Maximum 2 sentences.
Friendly and professional.
        `,
      });

    res.json({
      review: response.output_text,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

