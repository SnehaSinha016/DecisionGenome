import json

from config.llm import generate
from prompts.decisionEnrichmentPrompt import decisionEnrichmentPrompt


def enrich_decisions(decisions):

    if len(decisions) == 0:
        return []

    print("\n========== ENRICHMENT STARTED ==========")
    print(f"Received {len(decisions)} decisions")

    prompt = f"""
{decisionEnrichmentPrompt}

Validated Decisions

{json.dumps(decisions, indent=2)}
"""

    response = generate(prompt)

    response = (
        response.replace("```json", "")
        .replace("```", "")
        .strip()
    )

    print("\n========== ENRICHMENT RESPONSE ==========")
    print(response)
    print("=========================================\n")

    return json.loads(response)