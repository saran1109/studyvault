import { useState } from "react";

import Layout from "../components/Layout";

import "../styles/ai.css";

import askAI from "../gemini";

function AiPage({ user }) {

  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleAsk = async () => {

    if (!question) return;

    setLoading(true);

    try {

      const result =
        await askAI(question);

      setAnswer(result);

    } catch (error) {

      console.error(error);

      setAnswer("AI failed 😭");

    }

    setLoading(false);

  };

  return (

    <Layout user={user}>

      <div className="ai-page">

        <div className="ai-card">

          <h1>
            AI Study Assistant
          </h1>

          <p>
            Ask anything about coding,
            exams, subjects, or concepts.
          </p>

          <textarea

            placeholder="Ask AI something..."

            value={question}

            onChange={(e) =>
              setQuestion(
                e.target.value
              )
            }

          />

          <button
            onClick={handleAsk}
          >

            {
              loading
                ? "Thinking..."
                : "Ask AI"
            }

          </button>
          {
            answer&&(
            <div className="ai-response">

            {answer}

          </div>
            )

          }

          
        </div>

      </div>

    </Layout>

  );

}

export default AiPage;