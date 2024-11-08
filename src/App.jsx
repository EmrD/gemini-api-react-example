import React, { useState } from 'react';
import './App.css';
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const sendPrompt = async () => {
    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI("YOUR_API_KEY");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const response = await model.generateContent(prompt);
      setResult(response.response.text());
    } catch (error) {
      setResult("An error occurred while processing your request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">AI Prompt Generator</h1>
        
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt..."
          autoComplete="off"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        
        <button
          onClick={sendPrompt}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-200"
        >
          Send
        </button>
        
        {loading && <div className="mt-4 text-blue-600 font-medium">Loading...</div>}
        {!loading && result && (
          <div className="mt-4 bg-gray-100 p-4 rounded-md text-gray-800">
            {result}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
