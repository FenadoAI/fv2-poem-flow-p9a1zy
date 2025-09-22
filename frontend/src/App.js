import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import PoemGenerator from "./components/PoemGenerator";
import { Toaster } from "@/components/ui/sonner";

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const API = `${API_BASE}/api`;

const Home = () => {
  const helloWorldApi = async () => {
    try {
      const response = await axios.get(`${API}/`);
      console.log(response.data.message);
    } catch (e) {
      console.error(e, `errored out requesting / api`);
    }
  };

  useEffect(() => {
    helloWorldApi();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a
            href="https://fenado.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3"
          >
            <img src="https://fenado.ai/fenado-logo.png" className="w-8 h-8 rounded-lg" alt="Fenado Logo" />
            <span className="font-bold text-xl text-gray-800">AI Apps</span>
          </a>
          <div className="flex gap-4">
            <a href="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              Home
            </a>
            <a href="/poem-generator" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              Poem Generator
            </a>
          </div>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to AI Apps</h1>
          <p className="text-lg text-gray-600 mb-8">Explore powerful AI-powered applications</p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <a href="/poem-generator" className="block p-6 bg-white/80 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
              <div className="text-center">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-xl font-semibold mb-2">Poem Generator</h3>
                <p className="text-gray-600">Create beautiful AI-generated poems with customizable styles and moods</p>
              </div>
            </a>
            <div className="p-6 bg-gray-100/50 rounded-lg border border-gray-200 opacity-50">
              <div className="text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold mb-2">More Apps Coming</h3>
                <p className="text-gray-600">Stay tuned for more AI-powered applications</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/poem-generator" element={<PoemGenerator />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
