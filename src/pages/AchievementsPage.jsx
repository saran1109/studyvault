import { useEffect, useState } from "react";

import Layout from "../components/Layout";

import {
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";

import { db } from "../firebase";

import "../styles/achievements.css";

function AchievementsPage({ user }) {

  const [quizResults,
    setQuizResults] =
      useState([]);

  const [notes,
    setNotes] =
      useState([]);

  const [aiHistory,
    setAiHistory] =
      useState([]);

  useEffect(() => {

    if (!user) return;

    fetchData();

  }, [user]);

  const fetchData =
    async () => {

      const quizSnap =
        await getDocs(

          query(

            collection(
              db,
              "quizResults"
            ),

            where(
              "uid",
              "==",
              user.uid
            )

          )

        );

      setQuizResults(

        quizSnap.docs.map(
          doc => doc.data()
        )

      );

      const notesSnap =
        await getDocs(
          collection(
            db,
            "notes"
          )
        );

      setNotes(

        notesSnap.docs.map(
          doc => doc.data()
        )

      );

      const aiSnap =
        await getDocs(
          collection(
            db,
            "aiHistory"
          )
        );

      setAiHistory(

        aiSnap.docs.filter(
          doc =>

            doc.data()
              .userId ===
            user.uid

        ).map(
          doc => doc.data()
        )

      );

    };

  const achievements = [

    {

      title:
        "🥇 First Quiz",

      unlocked:
        quizResults.length >= 1

    },

    {

      title:
        "🔥 Quiz Master",

      unlocked:
        quizResults.length >= 10

    },

    {

      title:
        "🎯 Score Above 80%",

      unlocked:

        quizResults.some(

          item =>

            item.percentage >= 80

        )

    },

    {

      title:
        "📚 Uploaded 5 Notes",

      unlocked:
        notes.length >= 5

    },

    {

      title:
        "📚 Uploaded 10 Notes",

      unlocked:
        notes.length >= 10

    },

    {

      title:
        "🤖 Asked 10 AI Questions",

      unlocked:
        aiHistory.length >= 10

    },

    {

      title:
        "🤖 Asked 50 AI Questions",

      unlocked:
        aiHistory.length >= 50

    }

  ];

  return (

    <Layout user={user}>

      <div className="achievements-page">

        <h1>

          🏆 Achievements

        </h1>

        <div className="achievement-grid">

          {

            achievements.map(

              item => (

                <div

                  key={
                    item.title
                  }

                  className={`achievement-card ${
                    item.unlocked

                      ? "unlocked"

                      : "locked"
                  }`}
                >

                  <h2>

                    {item.title}

                  </h2>

                  <p>

                    {

                      item.unlocked

                        ? "Unlocked"

                        : "Locked"

                    }

                  </p>

                </div>

              )

            )

          }

        </div>

      </div>

    </Layout>

  );

}

export default AchievementsPage;