import Layout from "../components/Layout";

import "../styles/admin.css";

import {

  Trash2,
  Users,
  BookOpen,
  Bot

} from "lucide-react";

function AdminPage({

  user,
  notes,
  usersCount,
  aiCount,
  handleDelete

}) {

  const totalAI = aiCount;

  return (

    <Layout user={user}>

      <div className="admin-page">

        <h1>
          Admin Dashboard
        </h1>

        {/* STATS */}

        <div className="admin-stats">

          <div className="admin-card">

            <Users size={30} />

            <h2>
              {usersCount}
            </h2>

            <p>
              Total Users
            </p>

          </div>

          <div className="admin-card">

            <BookOpen size={30} />

            <h2>
              {notes.length}
            </h2>

            <p>
              Total Notes
            </p>

          </div>

          <div className="admin-card">

            <Bot size={30} />

            <h2>
              {totalAI}
            </h2>

            <p>
              AI Requests
            </p>

          </div>

        </div>

        {/* NOTES */}

        <div className="admin-notes">

          <h2>
            Manage Notes
          </h2>

          {

            notes.map((note) => (

              <div
                key={note.id}
                className="admin-note"
              >

                <div>

                  <h3>
                    {note.title}
                  </h3>

                  <p>
                    {note.subject}
                  </p>

                </div>

                <button

                  onClick={() =>
                    handleDelete(note.id)
                  }
                >

                  <Trash2 size={18} />

                  Delete

                </button>

              </div>

            ))

          }

        </div>

      </div>

    </Layout>

  );

}

export default AdminPage;