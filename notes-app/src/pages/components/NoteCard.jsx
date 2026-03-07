const NoteCard = ({note, onEdit}) => {


  return (
    <div>
      <div>
         {note.title}
      </div> 
      <div>
        {note.content}
      </div>
      <button className="cursor-pointer bg-green-600 p-2" onClick={() => onEdit(note)}>Edit</button>
      <button className="cursor-pointer p-2 m-2  bg-red-700">Delete</button>
    </div>
  )
}

export default NoteCard