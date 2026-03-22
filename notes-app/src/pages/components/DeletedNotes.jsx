import React from 'react'
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
      const res = await axios.get('http://localhost:8000/notes/deleted', {
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

  // return (
    //   <div>
  //     <Navbar />
  //     <div>DeletedNotes</div>
  //   </div>
  // )

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
    </div>
  )
}

export default DeletedNotes