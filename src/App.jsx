import { useState, useEffect } from "react";
import ReviewPage
from "./pages/ReviewPage";
import ReviewAnalytics
from "./pages/ReviewAnalytics";
import QuizPage from "./pages/QuizPage";
import AnalyticsPage
from "./pages/AnalyticsPage";
import AchievementsPage
from "./pages/AchievementsPage";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import LeaderboardPage
from "./pages/LeaderboardPage";
import {

  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc as firestoreDoc,
  setDoc
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
import AdminPage from "./pages/AdminPage";

function App() {

  const [notes, setNotes] =
    useState([]);

  const [user, setUser] =
    useState(null);

  const [usersCount, setUsersCount] =
    useState(0);

  const [aiCount, setAiCount] =
    useState(0);

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

        async (currentUser) => {

          setUser(currentUser);

          if (currentUser) {
            console.log("USER LOGIN DETECTED");
console.log(currentUser.uid);

await setDoc(
  firestoreDoc(
    db,
    "users",
    currentUser.uid
  ),
  {
    name:
      currentUser.displayName ||
      currentUser.email?.split("@")[0],

    email:
      currentUser.email,

    photo:
      currentUser.photoURL || "",

    uid:
      currentUser.uid,
  },
  {
    merge: true
  }
);

console.log("USER DOCUMENT UPDATED");

          }

        }

      );

    return () => unsubscribe();

  }, []);

  /* FETCH DATA */

  useEffect(() => {

    fetchData();

  }, []);

  /* FETCH AI */

  useEffect(() => {

    if (user) {

      fetchAIRequests();

    }

  }, [user]);

  const fetchData = async () => {

    try {

      /* NOTES */

      const notesSnapshot =

        await getDocs(
          collection(db, "notes")
        );

      const notesArray = [];

      notesSnapshot.forEach((doc) => {

        notesArray.push({

          id: doc.id,

          ...doc.data()

        });

      });

      setNotes(notesArray);

      /* USERS */

      const usersSnapshot =

        await getDocs(
          collection(db, "users")
        );

      setUsersCount(
        usersSnapshot.size
      );

    } catch (error) {

      console.log(error);

    }

  };

  /* FETCH AI REQUESTS */

  const fetchAIRequests =
    async () => {

      try {

        const aiSnapshot =

          await getDocs(
            collection(
              db,
              "aiHistory"
            )
          );

        const userAI =

          aiSnapshot.docs.filter(

            doc =>

              doc.data().userId ===
              user.uid

          );

        setAiCount(
          userAI.length
        );

      } catch (error) {

        console.log(error);

      }

    };

  /* UPLOAD */

  const handleUpload =
  async (newNote) => {

    try {

      await addDoc(

        collection(
          db,
          "notes"
        ),

        {

          ...newNote,

          uploadedBy:
            user?.displayName
            ||
            user?.email?.split("@")[0]
            ||
            "Anonymous",

          uploadedByUid:
            user.uid,

          createdAt:
            new Date()

        }

      );

      await updateDoc(

        firestoreDoc(
          db,
          "users",
          user.uid
        ),

        {

          uploads:
            increment(1),

          credits:
            increment(25)

        }

      );

      fetchData();

      alert(
        "🎉 Note uploaded! +25 credits"
      );

    } catch (error) {

      console.log(error);

    }

  };

  /* DELETE */

  const handleDelete =
    async (id) => {

      try {

        const noteRef =

          firestoreDoc(
            db,
            "notes",
            String(id)
          );

        await deleteDoc(noteRef);

        setNotes(

          prevNotes =>

            prevNotes.filter(
              note => note.id !== id
            )

        );

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <BrowserRouter>

      <Routes>
        <Route
  path="/review"
  element={
    user
      ? (
          <ReviewPage
            user={user}
          />
        )
      : (
          <Login />
        )
  }
/>
        <Route

 path="/review-analytics"

 element={

  user?.email ===
  "gollapallisaran74@gmail.com"

   ? (

      <ReviewAnalytics
        user={user}
      />

     )

   : (

      <Dashboard
        user={user}
      />

     )

 }

 />
        <Route
  path="/leaderboard"
  element={
    <LeaderboardPage
      user={user}
    />
  }
/>
        <Route

  path="/achievements"

  element={

    <AchievementsPage
      user={user}
    />

  }

/>
        <Route
  path="/quiz"
  element={
    <QuizPage
      user={user}
    />
  }
/>
         <Route
  path="/analytics"
  element={
    <AnalyticsPage
      user={user}
    />
  }
/>
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

        notes={notes}

        aiCount={aiCount}

      />

    ) : (

      <Login />

    )

  }

/>

        {/* ADMIN */}

       <Route

  path="/admin"

  element={

    user === null ? (

      <div>
        Loading...
      </div>

    ) : user?.email ===
        "gollapallisaran74@gmail.com" ? (

      <AdminPage

        user={user}

        notes={notes}

        usersCount={usersCount}

        aiCount={aiCount}

        handleDelete={handleDelete}

      />

    ) : (

      <Dashboard
        user={user}
        notes={notes}
      />

    )

  }

/>

      </Routes>

    </BrowserRouter>

  );

}

export default App;