import { useEffect, useState } from "react";

import Layout from "../components/Layout";

import {
  collection,
  getDocs
} from "firebase/firestore";

import { db } from "../firebase";

function ReviewAnalytics({ user }) {

  const [reviews, setReviews] =
    useState([]);

  useEffect(() => {

    fetchReviews();

  }, []);

  const fetchReviews =
    async () => {

      const snap =
        await getDocs(
          collection(
            db,
            "reviews"
          )
        );

      setReviews(

        snap.docs.map(
          doc => ({
            id: doc.id,
            ...doc.data()
          })
        )

      );

    };

  const average =
    (field) => {

      if (
        reviews.length === 0
      )
        return 0;

      return (

        reviews.reduce(
          (sum, review) =>
            sum +
            (review[field] || 0),
          0
        ) /
        reviews.length

      ).toFixed(1);

    };

  return (

    <Layout user={user}>

      <div
        className="analytics-page"
      >

        <h1>
          ⭐ Review Analytics
        </h1>

        <div className="stats-grid">

          <div className="stat-card">

            <h2>
              {reviews.length}
            </h2>

            <p>
              Total Reviews
            </p>

          </div>

          <div className="stat-card">

            <h2>
              {average(
                "aiRating"
              )}
              /5
            </h2>

            <p>
              AI Assistant
            </p>

          </div>

          <div className="stat-card">

            <h2>
              {average(
                "notesRating"
              )}
              /5
            </h2>

            <p>
              Notes Repository
            </p>

          </div>

          <div className="stat-card">

            <h2>
              {average(
                "quizRating"
              )}
              /5
            </h2>

            <p>
              Quiz Generator
            </p>

          </div>

          <div className="stat-card">

            <h2>
              {average(
                "analyticsRating"
              )}
              /5
            </h2>

            <p>
              Analytics
            </p>

          </div>

          <div className="stat-card">

            <h2>
              {average(
                "overallRating"
              )}
              /5
            </h2>

            <p>
              Overall Rating
            </p>

          </div>

        </div>

        <div
          className="chart-card"
        >

          <h2>
            User Feedback
          </h2>

          {

            reviews.map(
              review => (

                <div
                  key={review.id}
                  style={{
                    borderBottom:
                      "1px solid #333",
                    padding:
                      "12px 0"
                  }}
                >

                  <strong>
                    {
                      review.userName
                    }
                  </strong>

                  <p>

                    Overall:
                    {" "}
                    {
                      review.overallRating
                    }
                    /5

                  </p>

                  <p>

                    {
                      review.feedback
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

export default ReviewAnalytics;