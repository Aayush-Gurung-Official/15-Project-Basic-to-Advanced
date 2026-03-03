const chatMessages = document.getElementById("chatMessages");
const messageInput = document.getElementById("messageInput");

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function createMessage(text, type, statusText = "") {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", type);

    messageDiv.innerHTML = `
        <div>${text}</div>
        <div class="timestamp">${getCurrentTime()}</div>
        ${type === "sent" ? `<div class="status">${statusText}</div>` : ""}
    `;

    chatMessages.appendChild(messageDiv);
    scrollToBottom();

    return messageDiv;
}

function sendMessage() {
    const text = messageInput.value.trim();
    if (text === "") return;

    messageInput.value = "";

    const messageElement = createMessage(text, "sent", "Sending...");

    // Simulate sending
    setTimeout(() => {
        messageElement.querySelector(".status").innerText = "✓ Sent";
    }, 1000);

    setTimeout(() => {
        messageElement.querySelector(".status").innerText = "✓✓ Delivered";
    }, 2000);

    // Simulate reply
    setTimeout(() => {
        createMessage("Auto reply to: " + text, "received");
    }, 2500);
}