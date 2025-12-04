import twilio from "twilio";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { name, contact, query, fullHistory } = req.body;

    const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

    const message = `
🔥 New Lead from Convoria

👤 Name: ${name}
📞 Contact: ${contact}
❓ Query: ${query}

📝 Conversation History:
${fullHistory}

Sent automatically from your website.
    `;

    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: process.env.YOUR_WHATSAPP_NUMBER,
      body: message
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Lead failed" });
  }
}
