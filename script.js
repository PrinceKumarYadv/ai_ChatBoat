async function sendMessage() {
  const input = document.getElementById("input");
  const messages = document.getElementById("messages");

  const userMessage = input.value.trim();
  if (!userMessage) return;

  messages.innerHTML += `<div><b>You:</b> ${userMessage}</div>`;

  try {
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await res.json();

    console.log("Server response:", data);

    if (data.reply) {
      messages.innerHTML += `<div><b>AI:</b> ${data.reply}</div>`;
    } else if (data.error) {
      messages.innerHTML += `<div><b>AI:</b> ${data.error}</div>`;
    } else {
      messages.innerHTML += `<div><b>AI:</b> No response received</div>`;
    }

  } catch (error) {
    console.error("Fetch error:", error);
    messages.innerHTML += `<div><b>AI:</b> Connection error</div>`;
  }

  input.value = "";
}