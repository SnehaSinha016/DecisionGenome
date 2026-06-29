import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

console.log("Loaded API Key:", process.env.GROQ_API_KEY ? "YES" : "NO");

if (!process.env.GROQ_API_KEY) {
    throw new Error(
        "GROQ_API_KEY is missing. Check your .env file."
    );
}

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export default groq;