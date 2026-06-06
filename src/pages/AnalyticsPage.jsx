import { useEffect, useState } from "react";

import Layout from "../components/Layout";

import {
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";

import { db } from "../firebase";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import {
  Line,
  Pie,
  Bar
} from "react-chartjs-2";

import "../styles/analytics.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function AnalyticsPage({ user }) {

  const [activeTab,
    setActiveTab] =
      useState("quiz");

  const [results,
    setResults] =
      useState([]);

  const [notes,
    setNotes] =
      useState([]);

  const [aiHistory,
    setAiHistory] =
      useState([]);

  useEffect(() => {

    if (!user) return;

    fetchResults();
    fetchNotes();
    fetchAiHistory();

  }, [user]);

  const fetchResults =
    async () => {

      const q = query(

        collection(
          db,
          "quizResults"
        ),

        where(
          "uid",
          "==",
          user.uid
        )

      );

      const snap =
        await getDocs(q);

      setResults(

        snap.docs.map(
          doc => ({
            id: doc.id,
            ...doc.data()
          })
        )

      );

    };

  const fetchNotes =
    async () => {

      const snap =
        await getDocs(
          collection(
            db,
            "notes"
          )
        );

      setNotes(

        snap.docs.map(
          doc => ({
            id: doc.id,
            ...doc.data()
          })
        )

      );

    };

  const fetchAiHistory =
    async () => {

      const snap =
        await getDocs(
          collection(
            db,
            "aiHistory"
          )
        );

      setAiHistory(

        snap.docs.map(
          doc => ({
            id: doc.id,
            ...doc.data()
          })
        )

      );

    };

  const averageScore =

    results.length

      ? Math.round(

          results.reduce(
            (a, b) =>
              a +
              b.percentage,
            0
          ) /
          results.length

        )

      : 0;

  const highestScore =

    results.length

      ? Math.max(
          ...results.map(
            r =>
              r.percentage
          )
        )

      : 0;

  const topicMap = {};

  results.forEach(r => {

    topicMap[r.topic] =

      (topicMap[r.topic] || 0)

      + 1;

  });

  const subjectMap = {};

  notes.forEach(note => {

    subjectMap[
      note.subject
    ] =

      (subjectMap[
        note.subject
      ] || 0)

      + 1;

  });

  const semesterMap = {};

  notes.forEach(note => {

    semesterMap[
      note.semester
    ] =

      (semesterMap[
        note.semester
      ] || 0)

      + 1;

  });

  const topSubject =

    Object.keys(
      subjectMap
    )

      .sort(
        (a, b) =>
          subjectMap[b] -
          subjectMap[a]
      )[0]

    || "None";
    const aiTopicMap = {

  "Cloud Computing": 0,
  "DBMS": 0,
  "Compiler Design": 0,
  "Deep Learning": 0,
  "Operating Systems": 0,
  "Computer Networks": 0

};

aiHistory.forEach(item => {

  const text =

    (
      item.question || ""
    ).toLowerCase();

  if (
    text.includes("cloud")
  )
    aiTopicMap[
      "Cloud Computing"
    ]++;

  if (
    text.includes("dbms")
  )
    aiTopicMap[
      "DBMS"
    ]++;

  if (
    text.includes("compiler")
  )
    aiTopicMap[
      "Compiler Design"
    ]++;

  if (
    text.includes("deep")
  )
    aiTopicMap[
      "Deep Learning"
    ]++;

  if (
    text.includes("operating")
  )
    aiTopicMap[
      "Operating Systems"
    ]++;

  if (
    text.includes("network")
  )
    aiTopicMap[
      "Computer Networks"
    ]++;

});

  const lineData = {

    labels:

      results.map(
        (_, i) =>
          `Quiz ${i + 1}`
      ),

    datasets: [

      {

        label:
          "Score %",

        data:

          results.map(
            r =>
              r.percentage
          ),

        borderColor:
          "#ff9800",

        backgroundColor:
          "rgba(255,152,0,.2)",

        tension: .4

      }

    ]

  };

  const pieData = {

    labels:
      Object.keys(
        topicMap
      ),

    datasets: [

      {

        data:

          Object.values(
            topicMap
          ),

        backgroundColor: [

          "#ff9800",
          "#00c49f",
          "#36a2eb",
          "#ff6384",
          "#9966ff"

        ]

      }

    ]

  };
  const aiPieData = {

  labels:

    Object.keys(
      aiTopicMap
    ),

  datasets: [

    {

      data:

        Object.values(
          aiTopicMap
        ),

      backgroundColor: [

        "#ff9800",
        "#00c49f",
        "#36a2eb",
        "#ff6384",
        "#9966ff",
        "#4bc0c0"

      ]

    }

  ]

};
const aiDayMap = {};

aiHistory.forEach(item => {

  if (
    !item.createdAt
  ) return;

  const date =

    new Date(

      item.createdAt
        .seconds * 1000

    )

      .toLocaleDateString();

  aiDayMap[date] =

    (
      aiDayMap[date] || 0
    )

    + 1;

});

const aiLineData = {

  labels:

    Object.keys(
      aiDayMap
    ),

  datasets: [

    {

      label:
        "Questions Asked",

      data:

        Object.values(
          aiDayMap
        ),

      borderColor:
        "#00c49f",

      backgroundColor:
        "rgba(0,196,159,.2)",

      tension: .4

    }

  ]

};
  const notesSubjectData = {

  labels:
    Object.keys(
      subjectMap
    ),

  datasets: [

    {

      label:
        "Notes",

      data:

        Object.values(
          subjectMap
        ),

      backgroundColor:
        "#ff9800"

    }

  ]

};
const semesterPieData = {

  labels:

    Object.keys(
      semesterMap
    ),

  datasets: [

    {

      data:

        Object.values(
          semesterMap
        ),

      backgroundColor: [

        "#ff9800",
        "#00c49f",
        "#36a2eb",
        "#ff6384",
        "#9966ff"

      ]

    }

  ]

};

  return (

    <Layout user={user}>

      <div className="analytics-page">

        <h1>

          📊 Analytics Dashboard

        </h1>

        <div className="analytics-tabs">

          <button
            className={
              activeTab === "quiz"
                ? "active-tab"
                : ""
            }
            onClick={() =>
              setActiveTab(
                "quiz"
              )
            }
          >
            📊 Quiz
          </button>

          <button
            className={
              activeTab === "notes"
                ? "active-tab"
                : ""
            }
            onClick={() =>
              setActiveTab(
                "notes"
              )
            }
          >
            📚 Notes
          </button>

          <button
            className={
              activeTab === "ai"
                ? "active-tab"
                : ""
            }
            onClick={() =>
              setActiveTab(
                "ai"
              )
            }
          >
            🤖 AI
          </button>

        </div>

        {activeTab === "quiz" && (

          <>

            <div className="stats-grid">

              <div className="stat-card">
                <h2>{results.length}</h2>
                <p>Total Quizzes</p>
              </div>

              <div className="stat-card">
                <h2>{averageScore}%</h2>
                <p>Average Score</p>
              </div>

              <div className="stat-card">
                <h2>{highestScore}%</h2>
                <p>Highest Score</p>
              </div>

              <div className="stat-card">
                <h2>{Object.keys(topicMap).length}</h2>
                <p>Topics Practiced</p>
              </div>

            </div>

            <div className="chart-card">

              <h2>Score Progress</h2>

              <Line data={lineData} />

            </div>

            <div className="chart-card">

              <h2>Topic Distribution</h2>

              <div className="pie-wrapper">

                <Pie data={pieData} />

              </div>

            </div>

          </>

        )}

       {activeTab === "notes" && (

  <>

    <div className="stats-grid">

      <div className="stat-card">

        <h2>
          {notes.length}
        </h2>

        <p>
          Total Notes
        </p>

      </div>

      <div className="stat-card">

        <h2>
          {
            Object.keys(
              subjectMap
            ).length
          }
        </h2>

        <p>
          Subjects Covered
        </p>

      </div>

      <div className="stat-card">

        <h2>
          {
            Object.keys(
              semesterMap
            ).length
          }
        </h2>

        <p>
          Semesters Covered
        </p>

      </div>

      <div className="stat-card">

        <h2>
          {topSubject}
        </h2>

        <p>
          Top Subject
        </p>

      </div>

    </div>

    <div className="chart-card">

      <h2>

        📚 Notes Per Subject

      </h2>

      <Bar
        data={
          notesSubjectData
        }
      />

    </div>

    <div className="chart-card">

      <h2>

        🎓 Semester Distribution

      </h2>

      <div
        className="pie-wrapper"
      >

        <Pie
          data={
            semesterPieData
          }
        />

      </div>

    </div>

  </>

)}

       {activeTab === "ai" && (

  <>

    <div className="stats-grid">

      <div className="stat-card">

        <h2>
          {aiHistory.length}
        </h2>

        <p>
          Total Questions
        </p>

      </div>

      <div className="stat-card">

        <h2>

          {
            new Set(

              aiHistory.map(
                item =>
                  item.userId
              )

            ).size
          }

        </h2>

        <p>

          Active Users

        </p>

      </div>

      <div className="stat-card">

        <h2>

          {

            aiHistory.length

              ? Math.round(

                  aiHistory.length /

                  new Set(

                    aiHistory.map(
                      item =>
                        item.userId
                    )

                  ).size

                )

              : 0

          }

        </h2>

        <p>

          Avg Questions/User

        </p>

      </div>

    </div>

    <div className="chart-card">

      <h2>

        🤖 AI Usage Trend

      </h2>

      <Line
        data={aiLineData}
      />

    </div>

    <div className="chart-card">

      <h2>

        🧠 Most Asked Topics

      </h2>

      <div className="pie-wrapper">

        <Pie
          data={aiPieData}
        />

      </div>

    </div>

  </>

)}
      </div>

    </Layout>

  );

}

export default AnalyticsPage;