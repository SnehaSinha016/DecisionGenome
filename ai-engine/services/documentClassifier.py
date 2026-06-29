import json

from config.llm import generate

from prompts.documentClassifierPrompt import DOCUMENT_CLASSIFIER_PROMPT


def classify_document(text):

    prompt = DOCUMENT_CLASSIFIER_PROMPT + text

    response = generate(prompt)

    return json.loads(response)