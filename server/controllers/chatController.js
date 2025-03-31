const genAI = require("../config/gemini");

// Store chat history in memory
let chatHistory = [];

const chatWithBot = async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    try {
        chatHistory.push({ role: "user", content: message });

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const response = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: message }] }],
        });
        console.log(response);
        
        const botReply = response.response.candidates[0].content.parts[0].text;
         console.log("bot reply:",botReply);
        chatHistory.push({ role: "bot", content: botReply });

        res.json({ reply: botReply, chatHistory });
    } catch (error) {
        console.error("Error generating response:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

const clearChatHistory = (req, res) => {
    chatHistory = [];
    res.json({ message: "Chat history cleared" });
};

module.exports = { chatWithBot, clearChatHistory };
