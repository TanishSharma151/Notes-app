import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import axios from 'axios';
import NoteCard from "./components/NoteCard";
import toast from "react-hot-toast";

const DisplayNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);



  useEffect(() => {
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
      }
      finally {
        setLoading(false);
      }
    };
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
          <div className="bg-gray-700 w-full max-w-md p-6 rounded-lg shadow-xl flex flex-col gap-4">

            <h2 className="text-xl font-semibold text-blue-500">Create Note</h2>

            <textarea
              placeholder="Type your note..."
              className="w-full h-32 border rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-500"
            />

            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Save
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md ft-blue hover:bg-gray-400 text-blue-500"
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