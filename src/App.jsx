import { useState, useEffect } from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import {
  collection,
  addDoc,
  getDocs
} from "firebase/firestore";

import {
  onAuthStateChanged
} from "firebase/auth";

import {
  db,
  auth
} from "./firebase";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UploadPage from "./pages/UploadPage";
import NotesPage from "./pages/NotesPage";
import ProfilePage from "./pages/ProfilePage";
import AiPage from "./pages/AiPage";

function App() {

  /* STATES */

  const [notes, setNotes] =
    useState([]);

  const [user, setUser] =
    useState(null);

  const [title, setTitle] =
    useState("");

  const [subject, setSubject] =
    useState("");

  const [semester, setSemester] =
    useState("");

  const [link, setLink] =
    useState("");

  /* AUTH */

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {

          setUser(currentUser);

        }
      );

    return () => unsubscribe();

  }, []);

  /* LOAD NOTES */

  useEffect(() => {

    fetchNotes();

  }, []);

  const fetchNotes = async () => {

    try {

      const querySnapshot =
        await getDocs(
          collection(db, "notes")
        );

      const notesArray = [];

      querySnapshot.forEach((doc) => {

        notesArray.push({

          id: doc.id,

          ...doc.data()

        });

      });

      setNotes(notesArray);

    } catch (error) {

      console.log(error);

    }

  };

  /* UPLOAD */

  const handleUpload = async (newNote) => {

    try {

      await addDoc(
        collection(db, "notes"),
        {

          ...newNote,

          uploadedBy:

            user?.displayName

            || user?.email
              ?.split("@")[0]

            || "Anonymous"

        }
      );

      fetchNotes();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN */}

        <Route
          path="/"
          element={<Login />}
        />

        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={

            user ? (

              <Dashboard

                user={user}

                title={title}
                setTitle={setTitle}

                subject={subject}
                setSubject={setSubject}

                semester={semester}
                setSemester={setSemester}

                link={link}
                setLink={setLink}

                handleUpload={
                  handleUpload
                }

                notes={notes}

              />

            ) : (

              <Login />

            )

          }
        />

        {/* UPLOAD */}

        <Route
          path="/upload"
          element={

            user ? (

              <UploadPage

                user={user}

                title={title}
                setTitle={setTitle}

                subject={subject}
                setSubject={setSubject}

                semester={semester}
                setSemester={setSemester}

                link={link}
                setLink={setLink}

                handleUpload={
                  handleUpload
                }

              />

            ) : (

              <Login />

            )

          }
        />

        {/* NOTES */}

        <Route
          path="/notes"
          element={

            user ? (

              <NotesPage

                user={user}

                notes={notes}

              />

            ) : (

              <Login />

            )

          }
        />

        {/* AI */}

        <Route
          path="/ai"
          element={

            user ? (

              <AiPage
                user={user}
              />

            ) : (

              <Login />

            )

          }
        />

        {/* PROFILE */}

        <Route
          path="/profile"
          element={

            user ? (

              <ProfilePage
                user={user}
              />

            ) : (

              <Login />

            )

          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;