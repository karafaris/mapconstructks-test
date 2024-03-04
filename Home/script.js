// Replace 'YOUR_API_KEY' with your actual OpenAI API key
const apiKey = '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';
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');

// Function to send a message to the ChatGPT API
async function sendMessage(message) {
    const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            prompt: message,
            max_tokens: 150,
            temperature: 0.7,
            top_p: 1,
            n: 1,
            stop: ['\n', ' User:']
        })
    });
    const data = await response.json();
    return data.choices[0].text.trim();
}

// Function to add a message to the chat interface
function addMessage(text, sender) {
    const messageElement = document.createElement('div');
    messageElement.innerText = text;
    if (sender === 'bot') {
        messageElement.style.textAlign = 'left';
        messageElement.style.backgroundColor = '#f0f0f0';
    } else {
        messageElement.style.textAlign = 'right';
        messageElement.style.backgroundColor = '#d3e0ff';
    }
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Event listener for user input
userInput.addEventListener('keydown', async function(event) {
    if (event.key === 'Enter') {
        const userMessage = userInput.value.trim();
        if (userMessage !== '') {
            addMessage(userMessage, 'user');
            userInput.value = '';
            const botMessage = await sendMessage(userMessage);
            addMessage(botMessage, 'bot');
        }
    }
});
