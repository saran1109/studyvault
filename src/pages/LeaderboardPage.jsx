import { useEffect, useState }
from "react";

import Layout
from "../components/Layout";

import {
  collection,
  getDocs
}
from "firebase/firestore";

import { db }
from "../firebase";

function LeaderboardPage({ user }) {

  const [leaders,
    setLeaders] =
      useState([]);

  useEffect(() => {

    fetchLeaderboard();

  }, []);

  const fetchLeaderboard =
    async () => {

      try {

        const usersSnap =
          await getDocs(
            collection(
              db,
              "users"
            )
          );

        const notesSnap =
          await getDocs(
            collection(
              db,
              "notes"
            )
          );

        const quizSnap =
          await getDocs(
            collection(
              db,
              "quizResults"
            )
          );

        const aiSnap =
          await getDocs(
            collection(
              db,
              "aiHistory"
            )
          );

        const users =
          usersSnap.docs.map(
            doc => ({
              id: doc.id,
              ...doc.data()
            })
          );

        const leaderboard =
          users.map(user => {

            const notesCount =

              notesSnap.docs.filter(

                note =>

                  note.data()
                    .uploadedByUid
                  ===
                  user.uid

              ).length;

            const userQuizzes =

              quizSnap.docs.filter(

                quiz =>

                  quiz.data().uid
                  ===
                  user.uid

              );

            const quizzesTaken =
              userQuizzes.length;

            const highestScore =

              userQuizzes.length

                ? Math.max(

                    ...userQuizzes.map(
                      q =>
                        q.data()
                         .percentage
                    )

                  )

                : 0;

            const aiCount =

              aiSnap.docs.filter(

                ai =>

                  ai.data()
                    .userId
                  ===
                  user.uid

              ).length;

            const totalScore =

              notesCount * 10

              +

              quizzesTaken * 5

              +

              highestScore

              +

              aiCount;

            return {

              ...user,

              notesCount,

              quizzesTaken,

              highestScore,

              aiCount,

              totalScore

            };

          });

        leaderboard.sort(

          (a, b) =>

            b.totalScore -
            a.totalScore

        );

        setLeaders(
          leaderboard
        );

      } catch (err) {

        console.log(err);

      }

    };

  return (

    <Layout user={user}>

      <div
        className="analytics-page"
      >

        <h1>

          🏆 Leaderboard

        </h1>

        {

          leaders.map(
            (
              person,
              index
            ) => (

              <div

                key={person.uid}

                className="stat-card"

                style={{
                  marginBottom:
                    "15px"
                }}

              >

                <h2>

                  #{index + 1}

                  {" "}

                  {person.name}

                </h2>

                <p>

                  Score:
                  {" "}
                  {
                    person.totalScore
                  }

                </p>

                <p>

                  Notes:
                  {" "}
                  {
                    person.notesCount
                  }

                  |

                  Quizzes:
                  {" "}
                  {
                    person.quizzesTaken
                  }

                  |

                  Best:
                  {" "}
                  {
                    person.highestScore
                  }%

                  |

                  AI:
                  {" "}
                  {
                    person.aiCount
                  }

                </p>

              </div>

            )
          )

        }

      </div>

    </Layout>

  );

}

export default LeaderboardPage;