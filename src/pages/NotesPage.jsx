import Layout from "../components/Layout";

import "../styles/notes.css";

import {
  BookOpen,
  Trash2,
  ExternalLink
} from "lucide-react";

function NotesPage({

  notes,
  isAdmin,
  handleDelete,
  user

}) {

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

        <div className="notes-grid">

          {

            notes.length === 0 ? (

              <div className="empty-notes">

                <h2>
                  No Notes Yet 📚
                </h2>

                <p>
                  Upload your first academic resource.
                </p>

              </div>

            ) : (

              notes.map((note) => (

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