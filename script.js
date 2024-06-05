document.addEventListener("DOMContentLoaded", function() {
    const sendButton = document.getElementById("sendButton");
    const messageInput = document.getElementById("message");
    const chatArea = document.getElementById("chatArea");

    // Call sendMessage() when the send button is clicked
    sendButton.addEventListener("click", function() {
        sendMessage();
    });

    // Call sendMessage() when the Enter key is pressed in the message input
    messageInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    function addMessageToChatArea(sender, message, isUser = true) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add('message', sender.toLowerCase());
        messageDiv.classList.add(isUser ? "user-message" : "bot-message");
        messageDiv.textContent = `${sender}: ${message}`;
        chatArea.appendChild(messageDiv);
        chatArea.scrollTop = chatArea.scrollHeight; // Scroll to bottom
    }

    function sendMessage() {
        const message = document.getElementById("message").value;
        if (message.trim() !== "") {
            addMessageToChatArea('User', message, true);
            document.getElementById("message").value = ""; // Clear the input box
            getChatbotResponse(message);
        }
    }

    function getChatbotResponse(message) {
        fetch('https://api.cohere.com/v1/chat', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer vAWnMAx23QoaeBicVV1kP0xZdVuD51XvGMxdkECF',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message, model: 'c4ai-aya-23' })
        })
        .then(response => response.json())
        .then(data => {
            const botMessage = data.text.trim();
            addMessageToChatArea('DC', botMessage, false);
        })
        .catch(error => {
            console.error('Error:', error);
            addMessageToChatArea('DC', "Sorry, I couldn't process your request.", false);
        });
    }
});
