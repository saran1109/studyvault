import { useState } from "react";

import Layout from "../components/Layout";

import askAI from "../gemini";

import "../styles/quiz.css";

import {
  collection,
  addDoc
} from "firebase/firestore";

import { db } from "../firebase";

function QuizPage({ user }) {

  const [topic, setTopic] =
    useState("");

  const [difficulty,
    setDifficulty] =
      useState("Medium");

  const [questions,
    setQuestions] =
      useState(10);

  const [loading,
    setLoading] =
      useState(false);

  const [quizData,
    setQuizData] =
      useState([]);

  const [userAnswers,
    setUserAnswers] =
      useState({});

  const [score,
    setScore] =
      useState(null);

  const generateQuiz =
    async () => {

      if (!topic) return;

      setLoading(true);

      try {

        const prompt = `

Generate ${questions} MCQs on ${topic}.

Difficulty: ${difficulty}

Return ONLY valid JSON.

Example:

[
  {
    "question":"What is Cloud Computing?",
    "options":[
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "answer":0
  }
]

`;

        const result =
          await askAI(prompt);

        console.log(
          "AI Response:",
          result
        );

        const cleaned =
          result
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const parsed =
          JSON.parse(cleaned);

        console.log(
          "Parsed Quiz:",
          parsed
        );

        setQuizData(parsed);

        setUserAnswers({});

        setScore(null);

      } catch (err) {

        console.error(
          "Quiz Generation Error:",
          err
        );

        alert(
          "Quiz generation failed."
        );

      }

      setLoading(false);

    };

  const submitQuiz =
    async () => {

      console.log(
        "Submitting quiz..."
      );

      let total = 0;

      quizData.forEach(
        (q, index) => {

          if (

            userAnswers[index]
            ===
            q.answer

          ) {

            total++;

          }

        }
      );

      setScore(total);

      try {

        console.log(
          "User:",
          user
        );

        console.log(
          "UID:",
          user?.uid
        );

        console.log(
          "About to write to Firestore"
        );

        const docRef =
          await addDoc(

            collection(
              db,
              "quizResults"
            ),

            {

              uid:
                user?.uid,

              topic,

              score: total,

              totalQuestions:
                quizData.length,

              percentage:

                Math.round(

                  (
                    total /
                    quizData.length
                  ) * 100

                ),

              createdAt:
                new Date()

            }

          );

        console.log(
          "Firestore write completed"
        );

        console.log(
          "Document ID:",
          docRef.id
        );

        alert(
          "Quiz saved successfully!"
        );

      } catch (err) {

        console.error(
          "FIRESTORE ERROR:",
          err
        );

        alert(
          err.message
        );

      }

    };

  return (

    <Layout user={user}>

      <div className="quiz-page">

        <div className="quiz-hero">

          <div className="quiz-icon">

            🧠

          </div>

          <div>

            <h1>

              AI Quiz Generator

            </h1>

            <p className="quiz-description">

              Generate personalized quizzes
              using AI and test your
              knowledge instantly.

            </p>

          </div>

        </div>

        <div className="topic-buttons">

          {

            [

              "Cloud Computing",
              "DBMS",
              "Compiler Design",
              "Deep Learning",
              "Operating Systems",
              "Computer Networks"

            ].map((item) => (

              <button

                key={item}

                type="button"

                className="topic-chip"

                onClick={() =>
                  setTopic(item)
                }

              >

                {item}

              </button>

            ))

          }

        </div>

        <input

          type="text"

          placeholder="Enter topic..."

          value={topic}

          onChange={(e) =>
            setTopic(
              e.target.value
            )
          }

        />

        <div className="quiz-options">

          <div>

            <label>

              Difficulty

            </label>

            <select

              value={difficulty}

              onChange={(e) =>
                setDifficulty(
                  e.target.value
                )
              }

            >

              <option>
                Easy
              </option>

              <option>
                Medium
              </option>

              <option>
                Hard
              </option>

            </select>

          </div>

          <div>

            <label>

              Questions

            </label>

            <select

              value={questions}

              onChange={(e) =>
                setQuestions(
                  Number(
                    e.target.value
                  )
                )
              }

            >

              <option value="5">
                5
              </option>

              <option value="10">
                10
              </option>

              <option value="15">
                15
              </option>

            </select>

          </div>

        </div>

        <button
          onClick={generateQuiz}
        >

          {

            loading

              ? "🧠 Generating..."

              : "Generate Quiz"

          }

        </button>

        {

          quizData.length > 0 && (

            <div className="quiz-result">

              <h2>

                Generated Quiz

              </h2>

              {

                quizData.map(
                  (
                    q,
                    index
                  ) => (

                    <div

                      key={index}

                      className="question-card"

                    >

                      <h3>

                        {index + 1}.
                        {" "}
                        {q.question}

                      </h3>

                      {

                        q.options.map(
                          (
                            option,
                            i
                          ) => (

                            <label

                              key={i}

                              className="option-label"

                            >

                              <input

                                type="radio"

                                name={`q${index}`}

                                checked={

                                  userAnswers[index]
                                  ===
                                  i

                                }

                                onChange={() =>

                                  setUserAnswers({

                                    ...userAnswers,

                                    [index]: i

                                  })

                                }

                              />

                              {option}

                            </label>

                          )
                        )

                      }

                    </div>

                  )
                )

              }

              {

                score === null && (

                  <button

                    className="submit-btn"

                    onClick={submitQuiz}

                  >

                    Submit Quiz

                  </button>

                )

              }

              {

                score !== null && (

                  <div
                    className="score-card"
                  >

                    <h2>

                      Score:
                      {" "}
                      {score}
                      /
                      {quizData.length}

                    </h2>

                  </div>

                )

              }

            </div>

          )

        }

      </div>

    </Layout>

  );

}

export default QuizPage;