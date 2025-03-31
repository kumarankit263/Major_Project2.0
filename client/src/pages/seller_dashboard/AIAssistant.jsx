
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080/api"; // Ensure this matches backend

const AIAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const welcomeMessage = { role: "bot", content: "Hi, I am Debugger. How may I help you?" };
    setMessages([welcomeMessage]);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const { data } = await axios.post(`${API_URL}/chat`, { message: input });
      setMessages(data.chatHistory);
      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const clearHistory = async () => {
    await axios.post(`${API_URL}/clear-history`);
    setMessages([]);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-lg">
        <h2 className="text-xl font-bold text-blue-600 text-center">Gemini Chatbot</h2>
        
        {/* Chat Messages */}
        <div className="h-72 overflow-y-auto border p-3 my-4 rounded-lg bg-gray-50">
          {messages.map((msg, index) => (
            <div key={index} className={`p-2 my-1 ${msg.role === "user" ? "text-right text-blue-600" : "text-left text-green-600"}`}>
              <b>{msg.role === "user" ? "You" : "Bot"}:</b> {msg.content}
            </div>
          ))}
        </div>

        {/* Input and Buttons */}
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}  // Handle Enter key
            className="flex-1 border rounded-lg p-2"
            placeholder="Type a message..."
          />
          <button onClick={sendMessage} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg">Send</button>
        </div>
        
        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button onClick={clearHistory} className="px-4 py-2 bg-red-500 text-white rounded-lg">Clear Chat</button>
          <button onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-500 text-white rounded-lg">Back</button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
