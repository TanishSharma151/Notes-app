import Navbar from './components/Navbar'
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

const HomePage = () => {

  const navigate = useNavigate();

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    navigate("/notes");
  }
}, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center mt-20 px-4">

        {/* Image */}
        <img 
          src="xyz.jpg" 
          alt="Notes App" 
          className="w-64 md:w-80 mb-6 rounded-xl shadow-lg"
        />

        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
        📝  All your notes in one place
        </h1>

        {/* Subtext */}
        <p className="text-gray-400 max-w-xl mb-6">
          Create, edit, and manage your notes effortlessly. 
          Stay organized and never lose your thoughts again.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4">

          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/notes")}
            className="px-6 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
          >
            View Notes
          </button>

        </div>

      </div>
    </div>
  )
}

export default HomePage