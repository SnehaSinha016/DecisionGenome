import json

from config.llm import generate
from prompts.decisionValidatorPrompt import decisionValidatorPrompt


def verify_decisions(original_text, decisions):

    print("\n========== VALIDATOR STARTED ==========")
    print(f"Document Length: {len(original_text)}")
    print(f"Decisions Received: {len(decisions)}")

    MAX_CHARS=15000

    prompt = f"""
{decisionValidatorPrompt}

{original_text[:5000]}

{json.dumps(decisions, indent=2)}

"""

    response = generate(prompt)

    response = (
        response.replace("```json", "")
        .replace("```", "")
        .strip()
    )

    print("\n========== VALIDATOR RESPONSE ==========")
    print(response)
    print("========================================\n")

    return json.loads(response)