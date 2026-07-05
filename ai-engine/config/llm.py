import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GROQ_API_KEY")

if not API_KEY:
    raise ValueError("GROQ_API_KEY not found.")

client = Groq(api_key=API_KEY)

SYSTEM_PROMPT = """
You are DecisionGenome AI.

Your job is to analyze enterprise documents,
extract structured business knowledge,
identify decisions,
stakeholders,
risks,
dependencies,
and output accurate JSON.
"""


def generate_response(prompt: str,
                      model: str = "llama-3.3-70b-versatile",
                      temperature: float = 0.0) -> str:

    response = client.chat.completions.create(
        model=model,
        temperature=temperature,
        messages=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content