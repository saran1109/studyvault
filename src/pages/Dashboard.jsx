import "../styles/dashboard.css";

import studyImage
from "../assets/notes.png";

import Layout
from "../components/Layout";

import {
  useState,
  useEffect
}
from "react";

import {
  collection,
  getDocs
}
from "firebase/firestore";

import { db }
from "../firebase";

import {
  BookOpen,
  Users,
  GraduationCap,
  TrendingUp,
  Sparkles
}
from "lucide-react";

function Dashboard({ user, notes }) {

  const [notesCount, setNotesCount] =
    useState(0);

  const [studentsCount, setStudentsCount] =
    useState(0);

  useEffect(() => {

    const fetchStats = async () => {

      try {

        const notesSnap =
          await getDocs(
            collection(db, "notes")
          );

        const usersSnap =
          await getDocs(
            collection(db, "users")
          );

        setNotesCount(
          notesSnap.size
        );

        setStudentsCount(
          usersSnap.size
        );

      } catch (error) {

        console.log(error);

      }

    };

    fetchStats();

  }, []);

  return (

    <Layout user={user}>

      <div className="landing-page">

        {/* HERO */}

        <section className="hero-section">

          <div className="hero-left">

            <div className="hero-badge">

              <Sparkles size={14} />

              Smart Student Platform

            </div>

            <h1>

              Share Notes.
              <br />

              Build Knowledge.
              <br />

              Ace Every Semester.

            </h1>

            <p>

              Upload, organize, and access academic
              resources beautifully with StudyVault.
              Built for students who want smarter learning.

            </p>

            <div className="hero-tags">

              <span>

                AI Ready

              </span>

              <span>

                Cloud Powered

              </span>

              <span>

                Student Driven

              </span>

            </div>

          </div>

          <div className="hero-right">

            <img
              src={studyImage}
              alt="study"
              className="hero-image"
            />

          </div>

        </section>

        {/* STATS */}

        <section className="stats-section">

          <div className="stat-box">

            <BookOpen size={28} />

            <h2>

              {notesCount}

            </h2>

            <p>

              Total Notes

            </p>

          </div>

          <div className="stat-box">

            <Users size={28} />

            <h2>

              {studentsCount}

            </h2>

            <p>

              Students

            </p>

          </div>

          <div className="stat-box">

            <GraduationCap size={28} />

            <h2>

              8

            </h2>

            <p>

              Semesters

            </p>

          </div>

          <div className="stat-box">

            <TrendingUp size={28} />

            <h2>

              24/7

            </h2>

            <p>

              Access

            </p>

          </div>

        </section>

      </div>

    </Layout>

  );

}

export default Dashboard;