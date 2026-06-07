import "../styles/review.css";

import { useState } from "react";

import {
  addDoc,
  collection
} from "firebase/firestore";

import { db } from "../firebase";

import Layout from "../components/Layout";

function ReviewPage({ user }) {

  const [form, setForm] =
    useState({

      aiRating: 0,

      notesRating: 0,

      quizRating: 0,

      analyticsRating: 0,

      feedback: ""

    });

  const submitReview =
    async () => {

      try {

        const overallRating =

          (

            form.aiRating +

            form.notesRating +

            form.quizRating +

            form.analyticsRating

          ) / 4;

        await addDoc(

          collection(
            db,
            "reviews"
          ),

          {

            userId:
              user.uid,

            userName:

              user.displayName ||

              user.email,

            ...form,

            overallRating:

              Number(
                overallRating.toFixed(1)
              ),

            createdAt:
              new Date()

          }

        );

        alert(
          "🎉 Review submitted successfully!"
        );

        setForm({

          aiRating: 5,

          notesRating: 5,

          quizRating: 5,

          analyticsRating: 5,

          feedback: ""

        });

      } catch (error) {

        console.log(error);

        alert(
          "Failed to submit review"
        );

      }

    };

  const StarSelector = ({
    title,
    field
  }) => (

    <div className="review-section">

      <h3>
        {title}
      </h3>

      <div className="review-stars">

        {[1,2,3,4,5].map(

          (star) => (

            <button

              key={star}

              className={
                form[field] >= star
                  ? "active"
                  : ""
              }

              onClick={() =>

                setForm({

                  ...form,

                  [field]: star

                })

              }

            >

              ⭐

            </button>

          )

        )}

      </div>

    </div>

  );

  return (

    <Layout user={user}>

      <div className="review-page">

        <h1
          style={{
            marginBottom: "30px"
          }}
        >

          ⭐ StudyVault Review

        </h1>

        <div className="review-card">

          <StarSelector

            title="AI Assistant"

            field="aiRating"

          />

          <StarSelector

            title="Notes Repository"

            field="notesRating"

          />

          <StarSelector

            title="Quiz Generator"

            field="quizRating"

          />

          <StarSelector

            title="Analytics Dashboard"

            field="analyticsRating"

          />

          <div
            className="review-section"
          >

            <h3>
              Additional Feedback
            </h3>

            <textarea

              className="review-feedback"

              placeholder=
                "Tell us what you liked or what can be improved..."

              value={
                form.feedback
              }

              onChange={(e) =>

                setForm({

                  ...form,

                  feedback:
                    e.target.value

                })

              }

            />

          </div>

          <button

            className="submit-review"

            onClick={
              submitReview
            }

          >

            Submit Review

          </button>

        </div>

      </div>

    </Layout>

  );

}

export default ReviewPage;