import json

from config.llm import generate
from prompts.documentClassifierPrompt import DOCUMENT_CLASSIFIER_PROMPT

MAX_CHARS = 15000


def classify_document(text):

    prompt = (
        DOCUMENT_CLASSIFIER_PROMPT
        + "\n\n"
        + text[:MAX_CHARS]
    )

    response = generate(prompt)

    response = (
        response.replace("```json", "")
        .replace("```", "")
        .strip()
    )

    return json.loads(response)