import NoteCard from "./NoteCard";

function NotesList({
  notes,
  search,
  setSearch
}) {

  return (

    <div className="notes-section">

      <h2>Uploaded Notes</h2>

      <input
        className="search-box"
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="notes-grid">

        {notes
          .filter((note) => {

            return (
              note.title.toLowerCase().includes(search.toLowerCase()) ||
              note.subject.toLowerCase().includes(search.toLowerCase()) ||
              note.semester.toLowerCase().includes(search.toLowerCase())
            );

          })
          .map((note) => (

            <NoteCard
              key={note.id}
              note={note}
            />

          ))}

      </div>

    </div>

  );

}

export default NotesList;