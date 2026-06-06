import Layout from "../components/Layout";

import "../styles/notes.css";

import {
  BookOpen,
  Trash2,
  ExternalLink,
  Search
}
from "lucide-react";

import {
  useState
}
from "react";

function NotesPage({

  notes,
  isAdmin,
  handleDelete,
  user

}) {

  const [searchTerm,
    setSearchTerm] =
      useState("");

  const filteredNotes =
    notes.filter((note) =>

      note.title
        ?.toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )

      ||

      note.subject
        ?.toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )

    );

  return (

    <Layout user={user}>

      <div className="notes-page">

        <div className="notes-header">

          <h1>
            Explore Notes 📚
          </h1>

          <p>
            Access all uploaded resources.
          </p>

        </div>

        {/* SEARCH BAR */}

        <div className="search-box">

          <Search
            size={20}
            className="search-icon"
          />

          <input

            type="text"

            placeholder="Search notes by title or subject..."

            value={searchTerm}

            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }

          />

        </div>

        <div className="notes-grid">

          {

            filteredNotes.length === 0 ? (

              <div className="empty-notes">

                <h2>
                  No Matching Notes 📚
                </h2>

                <p>
                  Try another keyword.
                </p>

              </div>

            ) : (

              filteredNotes.map((note) => (

                <div
                  className="note-card"
                  key={note.id}
                >

                  <div className="note-icon">

                    <BookOpen size={28} />

                  </div>

                  <div className="note-top">

                    <span className="note-subject">

                      {note.subject}

                    </span>

                    <span className="note-semester">

                      Sem {note.semester}

                    </span>

                  </div>

                  <h2>
                    {note.title}
                  </h2>

                  <p>
                    Uploaded by:
                    {" "}
                    {note.uploadedBy}
                  </p>

                  <div className="note-actions">

                    <a
                      href={note.link}
                      target="_blank"
                      rel="noreferrer"
                      className="open-btn"
                    >

                      <ExternalLink size={18} />

                      Open

                    </a>

                    {

                      isAdmin && (

                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(note.id)
                          }
                        >

                          <Trash2 size={18} />

                          Delete

                        </button>

                      )

                    }

                  </div>

                </div>

              ))

            )

          }

        </div>

      </div>

    </Layout>

  );

}

export default NotesPage;