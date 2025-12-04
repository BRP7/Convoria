import twilio from "twilio";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { name, contact, query } = req.body;

    if (!contact) {
      return res.status(400).json({ error: "Contact number is required" });
    }

    // Initialize Twilio
    const client = twilio(
      process.env.TWILIO_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const message = `
New Lead from Convoria 🚀

Name: ${name || "Not provided"}
Contact: ${contact}
Query: ${query || "No query provided"}

Sent automatically from your website.
    `;

    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER, // twilio sandbox number
      to: process.env.YOUR_WHATSAPP_NUMBER,     // your whatsapp number
      body: message.trim()
    });

    return res.status(200).json({ success: true, message: "Lead sent to WhatsApp!" });
  } catch (error) {
    console.error("Twilio Lead Error:", error);
    return res.status(500).json({ error: "Failed to send lead to WhatsApp." });
  }
}
