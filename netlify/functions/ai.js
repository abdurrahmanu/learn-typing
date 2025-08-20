import fetch from "node-fetch"

export async function handler(event) {
  const { prompt } = JSON.parse(event.body)

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.VITE_OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a test generator. Always reply in JSON format." },
        { role: "user", content: prompt }
      ]
    }),
  })

  const data = await res.json()
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  }
}
