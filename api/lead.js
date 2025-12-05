export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { name, contact, query, fullHistory } = req.body;


    if (!contact) {
      return res.status(400).json({ error: "Contact number is required" });
    }

    // Environment Variables
    const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID; // Your test number phone ID
    const token = process.env.WHATSAPP_TOKEN;            // Permanent token
    const adminNumber = process.env.WHATSAPP_NUMBER.replace(/\D/g, ""); // YOUR WhatsApp number only

    // Format outgoing message to YOU
    const adminMessage = `
New Lead from Convoria 🚀

Name: ${name || "Not provided"}
Client WhatsApp: ${contact}
Query: ${query || "No query provided"}

Conversation History:
${fullHistory || "No history available"}

Sent automatically from your website.
    `.trim();

    // WhatsApp Cloud API endpoint (send message TO YOU only)
    const url = `https://graph.facebook.com/v18.0/${phoneId}/messages`;

    const payload = {
      messaging_product: "whatsapp",
      to: adminNumber, // ONLY you receive message
      type: "text",
      text: { body: adminMessage }
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
    console.log("WA Response:", data);

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    return res.status(200).json({ success: true, message: "Lead sent to your WhatsApp!" });

  } catch (error) {
    console.error("Lead Error:", error);
    return res.status(500).json({ error: "Failed to send lead to WhatsApp." });
  }
}
