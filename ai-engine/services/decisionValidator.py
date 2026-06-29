import json

from config.llm import generate
from prompts.decisionValidatorPrompt import decisionValidatorPrompt


def verify_decisions(original_text, decisions):

    print("\n========== VALIDATOR STARTED ==========")
    print(f"Document Length: {len(original_text)}")
    print(f"Decisions Received: {len(decisions)}")

    prompt = f"""
{decisionValidatorPrompt}

==========================
ORIGINAL DOCUMENT
==========================

{original_text[:5000]}

==========================
EXTRACTED DECISIONS
==========================

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