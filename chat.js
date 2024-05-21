document.getElementById('send-button').addEventListener('click', async () => {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === "") return;

    // Display the user's message
    displayMessage(userInput, 'user');

    // Call the API and display the bot's response
    const botResponse = await getChatbotResponse(userInput);
    displayMessage(botResponse, 'bot');

    // Clear the input
    document.getElementById('user-input').value = '';
});

async function getChatbotResponse(userInput) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify({
            model: 'gpt-4', // or 'gpt-3.5-turbo'
            messages: [{ role: 'user', content: userInput }]
        })
    });

    const data = await response.json();
    return data.choices[0].message.content;
}

function displayMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = message;
    document.getElementById('messages').appendChild(messageElement);
    document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
}
