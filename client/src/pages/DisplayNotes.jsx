import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import axios from "axios";
import NoteCard from "./components/NoteCard";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const DisplayNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingNote, setEditingNote] = useState(null);

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${import.meta.env.VITE_API_URL}/notes`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setNotes(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
      toast.error("Failed to load notes.");

      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  async function saveNote() {
    const token = localStorage.getItem("token");

    try {
      if (editingNote) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/notes/${editingNote._id}`,
          { title, content },
          {
            headers: { Authorization: "Bearer " + token },
          }
        );

        setEditingNote(null);
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/notes/create`,
          { title, content },
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
      }

      setIsModalOpen(false);
      setTitle("");
      setContent("");
      fetchNotes();
    } catch (err) {
      console.log(err.response?.data || err.message);
      toast.error("Error saving note.");
    }
  }

  async function deleteNotes(id) {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_API_URL}/notes/${id}/delete`,
        {},
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      fetchNotes();
    } catch (err) {
      console.log(err.response?.data || err.message);
      toast.error("Error deleting note.");
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    fetchNotes();
  }, []);

  function editNote(note) {
    setTitle(note.title);
    setContent(note.content);
    setEditingNote(note);
    setIsModalOpen(true);
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Notes Section */}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading ? (
          <div className="text-center text-primary py-10">
            Loading notes...
          </div>
        ) : notes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onDelete={deleteNotes}
                onEdit={editNote}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-20 text-lg">
            No notes yet. Create your first one ✨
          </div>
        )}
      </div>

      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-600 transition"
        >
          + Note
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 w-full max-w-md p-5 rounded-xl shadow-2xl">
            
            {/* Inputs */}
            <div className="flex flex-col gap-2 border border-gray-600 rounded p-3">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-transparent text-white text-lg font-semibold placeholder-gray-400 focus:outline-none"
              />

              <textarea
                placeholder="Take a note..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="bg-transparent text-white placeholder-gray-400 resize-none h-28 focus:outline-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={saveNote}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Save
              </button>

              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingNote(null);
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayNotes;