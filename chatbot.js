(function () {
  const widget = document.getElementById("ai-chatbot-widget");

  widget.innerHTML = `
    <style>
  #chat-bubble {
    position: fixed; bottom: 25px; right: 25px;
    width: 60px; height: 60px; border-radius: 50%;
    background: #6d28d9;  /* purple accent */
    display: flex; justify-content: center; 
    align-items: center; color: white; cursor: pointer;
    font-size: 26px; box-shadow: 0 3px 15px rgba(0,0,0,0.4);
    z-index: 9999;
  }

  #chat-window {
    position: fixed; bottom: 100px; right: 25px;
    width: 350px; height: 480px;
    background: #0f1222; /* your dark background */
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    box-shadow: 0 3px 25px rgba(0,0,0,0.5);
    display: none; flex-direction: column;
    z-index: 9999;
    color: #e5e7eb; /* light gray text */
  }

  #chat-header {
    padding: 10px;
    background: #6d28d9; /* purple header */
    color: white;
    border-radius: 12px 12px 0 0;
    display: flex; justify-content: space-between; align-items: center;
  }

  #chat-header button {
    background: rgba(255,255,255,0.2);
    color: white;
    border: none; padding: 4px 8px; cursor: pointer;
    border-radius: 6px; font-size: 12px;
  }

  #chat-log {
    flex: 1; overflow-y: auto; padding: 10px;
    font-size: 14px; line-height: 1.4;
  }

  #chat-log p strong {
    color: #a78bfa; /* soft purple for speaker labels */
  }

  #chat-input {
    display: flex; gap: 8px; padding: 10px;
  }

  #chat-input input {
    flex: 1; padding: 10px;
    border-radius: 6px; border: 1px solid rgba(255,255,255,0.15);
    background: #1a1c2e; /* dark input */
    color: white;
  }

  #chat-input input::placeholder {
    color: #9ca3af;
  }

  #chat-input button {
    padding: 10px 14px;
    background: #6d28d9; /* your purple */
    color: white; border: none;
    border-radius: 6px; cursor: pointer;
    font-weight: 600;
  }

  #typing {
    padding: 5px 12px; font-size: 13px;
    opacity: 0.7; display: none;
    color: #c4b5fd; /* light purple */
  }
</style>

    <div id="chat-bubble">💬</div>

    <div id="chat-window">
      <div id="chat-header">
        <span>AI Support</span>
        <button id="download-btn">Download</button>
      </div>
      
      <div id="chat-log"></div>
      <div id="typing">Bot is typing...</div>

      <div id="chat-input">
        <input id="msg" placeholder="Ask something..."/>
        <button id="send">Send</button>
      </div>
    </div>
  `;

  const bubble = document.getElementById("chat-bubble");
  const windowBox = document.getElementById("chat-window");
  const log = document.getElementById("chat-log");
  const sendBtn = document.getElementById("send");
  const typing = document.getElementById("typing");
  const downloadBtn = document.getElementById("download-btn");

  let history = [];
  let rawHistory = []; // for download

  bubble.onclick = () => {
    windowBox.style.display = windowBox.style.display === "none" ? "flex" : "none";
  };

  function addMessage(role, text) {
    log.innerHTML += `<p><strong>${role}:</strong> ${text}</p>`;
    log.scrollTop = log.scrollHeight;
    rawHistory.push(`${role}: ${text}`);
  }

  function showTyping(state) {
    typing.style.display = state ? "block" : "none";
  }

  async function sendMessage() {
    const message = document.getElementById("msg").value.trim();
    if (!message) return;

    addMessage("You", message);
    history.push({ role: "user", content: message });
    document.getElementById("msg").value = "";

    showTyping(true);

    const response = await fetch("https://www.convoria.com/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history })
    });

    const data = await response.json();

    showTyping(false);

    addMessage("Bot", data.reply);
    history.push({ role: "assistant", content: data.reply });
  }

  sendBtn.onclick = sendMessage;

  // Download chat history
  downloadBtn.onclick = () => {
    const text = rawHistory.join("\n\n");
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "chat-history.txt";
    link.click();
  };
})();
