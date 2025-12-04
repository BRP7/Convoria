// /api/lead.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { name, contact, query, history } = req.body;

    if (!contact) {
      return res.status(400).json({ error: "Contact number is required" });
    }

    const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const token = process.env.WHATSAPP_TOKEN;
    const yourWhatsapp = process.env.WHATSAPP_NUMBER;

    const leadMessage = `
New Lead from Convoria 🚀

Name: ${name || "Not provided"}
Contact: ${contact}
Query: ${query || "No query provided"}

Conversation History:
${history?.join("\n")}

Sent automatically from your website.
    `;

    // WhatsApp Cloud API endpoint
    const url = `https://graph.facebook.com/v18.0/${phoneId}/messages`;

    const payload = {
      messaging_product: "whatsapp",
      to: yourWhatsapp.replace("+", ""), // WhatsApp expects no '+'
      type: "text",
      text: { body: leadMessage }
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log("WA API Response:", data);

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    return res.status(200).json({ success: true, message: "Lead sent to WhatsApp!" });

  } catch (error) {
    console.error("Lead Error:", error);
    return res.status(500).json({ error: "Failed to send lead to WhatsApp." });
  }
}
