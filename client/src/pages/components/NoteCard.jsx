const NoteCard = ({ note, onEdit, onDelete, onRestore, onDeletePermanent }) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 flex flex-col justify-between">

      {/* Title */}
      <div className="text-lg font-semibold mb-2 break-words">
        {note.title || "Untitled"}
      </div>

      {/* Content */}
      <div className="text-gray-300 text-sm mb-4 break-words">
        {note.content || "No content"}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 mt-auto">

        {onEdit && (
          <button
            onClick={() => onEdit(note)}
            className="px-3 py-1 text-sm bg-blue-500 rounded-md hover:bg-blue-600 transition"
          >
            Edit
          </button>
        )}

        {onDelete && (
          <button
            onClick={() => onDelete(note._id)}
            className="px-3 py-1 text-sm bg-red-500 rounded-md hover:bg-red-600 transition"
          >
            Delete
          </button>
        )}

        {onRestore && (
          <button
            onClick={() => onRestore(note._id)}
            className="px-3 py-1 text-sm bg-green-500 rounded-md hover:bg-green-600 transition"
          >
            Restore
          </button>
        )}

        {onDeletePermanent && (
          <button
            onClick={() => onDeletePermanent(note._id)}
            className="px-3 py-1 text-sm bg-red-700 rounded-md hover:bg-red-800 transition"
          >
            Delete Forever
          </button>
        )}

      </div>
    </div>
  );
};

export default NoteCard;