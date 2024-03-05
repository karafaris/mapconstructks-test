import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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"
});

// Your code here

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main();