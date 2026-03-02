import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import axios from 'axios';
import NoteCard from "./components/NoteCard";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";


const DisplayNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const fetchNotes = async () => {
    try {
      console.log(localStorage.getItem("token"));
      const token = localStorage.getItem("token");
      const header = "Bearer " + token;
      const res = await axios.get('http://localhost:8000/notes', {
        headers: {
          Authorization: header,
        }
      });
      setNotes(res.data);
    }
    catch (err) {
      console.log(err.response?.data || err.message);
      console.log("Error fetching notes.");
      toast.error("Failed to load error.");

      if(err.response.status === 401){
        localStorage.removeItem("token");
        navigate("/");
      }
    }
    finally {
      setLoading(false);
    }
  };

  async function saveNote() {

    try {

      const token = localStorage.getItem("token");

      await axios.post("http://localhost:8000/notes/create",
        { title, content },
        {
          headers: { Authorization: "Bearer " + token }
        }
      )

      setIsModalOpen(false);
      setTitle("");
      setContent("");
      fetchNotes();
    }
    catch (err) {
      console.log(err.response?.data || err.message);
      console.log("Error fetching notes.");
      toast.error("Failed to load error.");
    }
  }

  useEffect(() => {
    fetchNotes();
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}
        {notes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map(note => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        )}
      </div>
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {notes.length == 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            Created notes will appear here.
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <button className="cursor-pointer" onClick={() => setIsModalOpen(true)}>Create notes</button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-gray-800 w-full max-w-md p-5 rounded-xl shadow-2xl">

            {/* Inputs Container */}
            <div className="flex flex-col gap-2 border border-gray-600 rounded p-3">

              {/* Title */}
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-transparent text-white text-lg font-semibold 
                     placeholder-gray-400 
                     focus:outline-none"
              />

              {/* Note */}
              <textarea
                placeholder="Take a note..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="bg-transparent text-white 
                     placeholder-gray-400 
                     resize-none h-28 
                     focus:outline-none"
              />

            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md 
                     hover:bg-blue-600 transition" onClick={() => saveNote()}
              >
                Save
              </button>

              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md 
                     hover:bg-gray-500 transition"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default DisplayNotes