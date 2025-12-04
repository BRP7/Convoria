export default async function handler(req, res) {
  try {
    const { message, history } = req.body;

    const systemMessage = `
You are the company's AI assistant.
You ONLY use the company info provided below to answer questions.

COMPANY INFO:
- Opening hours: 10AM to 7PM
- Pricing: Starts at ₹5,000 per automation
- Services: Automation, AI workflows, chatbot integrations, API setups.
- Supported platforms: Instagram, WhatsApp, Gmail, GSheets, CRMs.
- Feasibility rules:
  * If a task has an API — usually yes.
  * If a platform does NOT allow automation — explain why it's not possible.
  * Always answer clearly and confidently.

If user asks feasibility like "can you automate X?" → give yes/no + short reason.

Always answer based on the ongoing conversation.
    `;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemMessage },
          ...history,
          { role: "user", content: message }
        ],
        temperature: 0.2
      })
    });

    const result = await response.json();
    const reply = result.choices?.[0]?.message?.content ?? "Something went wrong.";

    res.status(200).json({ reply });
  } catch (e) {
    res.status(500).json({ reply: "Error processing your request." });
  }
}
