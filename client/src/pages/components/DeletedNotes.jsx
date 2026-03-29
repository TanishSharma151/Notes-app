import Navbar from './Navbar'
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import NoteCard from './NoteCard';
import axios from 'axios';
import { useNavigate } from 'react-router';

const DeletedNotes = () => {

  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const deletedNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const header = "Bearer " + token;
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/notes/deleted`, {
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

      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    deletedNotes();
  }, []);

  async function restoreNote(id) {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_API_URL}/notes/${id}/restore`,
        {},
        {
          headers: { Authorization: "Bearer " + token }
        }
      );

      deletedNotes(); // refresh list
    } catch (err) {
      console.log(err);
      toast.error("Error restoring note");
    }
  }

  async function deletePermanent(id) {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/notes/${id}/permanent`,
        {
          headers: { Authorization: "Bearer " + token }
        }
      );

      deletedNotes();
    } catch (err) {
      console.log(err);
      toast.error("Error deleting permanently");
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}
        {notes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map(note => (
              <NoteCard
                key={note._id}
                note={note}
                onRestore={restoreNote}
                onDeletePermanent={deletePermanent}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-20 text-lg">
            Deleted notes will appear here 🗑️
          </div>
        )}
      </div>
    </div>
  )
}

export default DeletedNotes