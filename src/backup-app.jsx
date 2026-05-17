import "./App.css";

import { useState, useEffect } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import {
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import {
  collection,
  addDoc,
  getDocs
} from "firebase/firestore";

import { auth, provider, db } from "./firebase";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

function App() {

  const [user, setUser] = useState(null);

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [semester, setSemester] = useState("");
  const [link, setLink] = useState("");

  const [search, setSearch] = useState("");

  const [notes, setNotes] = useState([]);

  const handleLogin = async () => {

    try {

      const result = await signInWithPopup(auth, provider);

      setUser(result.user);

    } catch (error) {

      console.log(error);

    }

  };

  const handleLogout = async () => {

    await signOut(auth);

    setUser(null);

  };

  const fetchNotes = async () => {

    const querySnapshot = await getDocs(
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

  };

  useEffect(() => {

    fetchNotes();

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {

        setUser(currentUser);

      }
    );

    return () => unsubscribe();

  }, []);

  const handleUpload = async () => {

    if (!title || !subject || !semester || !link) {

      alert("Please fill all fields");

      return;

    }

    try {

      await addDoc(collection(db, "notes"), {

        title,
        subject,
        semester,
        link,
        uploadedBy: user.displayName

      });

      alert("Note uploaded successfully!");

      setTitle("");
      setSubject("");
      setSemester("");
      setLink("");

      fetchNotes();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            !user ? (
              <Home handleLogin={handleLogin} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />

        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard

                user={user}
                handleLogout={handleLogout}

                title={title}
                setTitle={setTitle}

                subject={subject}
                setSubject={setSubject}

                semester={semester}
                setSemester={setSemester}

                link={link}
                setLink={setLink}

                handleUpload={handleUpload}

                notes={notes}

                search={search}
                setSearch={setSearch}

              />
            ) : (
              <Navigate to="/" />
            )
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;