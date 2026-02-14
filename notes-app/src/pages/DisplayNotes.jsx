import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import axios from 'axios';
import NoteCard from "./components/NoteCard";
import toast from "react-hot-toast";

const DisplayNotes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        const fetchNotes = async() =>{
        try{
            console.log(localStorage.getItem("token"));
            const token = localStorage.getItem("token");
            const header = "Bearer " + token;
            const res = await axios.get('http://localhost:8000/notes', {
              headers :   {
                Authorization : header,
              }
            });
            setNotes(res.data);
        }
        catch(err){
          console.log("Error fetching notes.");
          toast.error("Failed to load error.");
        }
        finally{
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
          {notes.length> 0 && (
            <div className="grid grid-cols-1 md:grif-cols-2 lg:grid-cols-3 gap-6"> 
              {notes.map(note =>(
                <NoteCard key={note.id} note={note}/>
              ))}
            </div>
          )}
        </div>
    </div>
  )
}

export default DisplayNotes