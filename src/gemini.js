import {

  db,
  auth

} from "./firebase";

import {

  addDoc,
  collection,
  serverTimestamp

} from "firebase/firestore";

const API_KEY =
  import.meta.env.VITE_GROQ_API_KEY;

async function askAI(prompt) {

  try {

    const response = await fetch(

      "https://api.groq.com/openai/v1/chat/completions",

      {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${API_KEY}`,

        },

        body: JSON.stringify({

          model:
            "llama-3.1-8b-instant",

          messages: [

            {
              role: "user",
              content: prompt,
            },

          ],

          temperature: 0.7,

        }),

      }

    );

    const data =
      await response.json();

    console.log(data);

    if (data.error) {

      return data.error.message;

    }

    /* SAVE AI HISTORY */

    if (auth.currentUser) {

      await addDoc(

        collection(
          db,
          "aiHistory"
        ),

        {

          userId:
            auth.currentUser.uid,

          email:
            auth.currentUser.email,

          question:
            prompt,

          createdAt:
            serverTimestamp()

        }

      );

    }

    return data
      .choices[0]
      .message
      .content;

  } catch (error) {

    console.log(error);

    return "AI failed 😭";

  }

}

export default askAI;