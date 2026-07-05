import json

from config.llm import generate
from prompts.decisionEnrichmentPrompt import decisionEnrichmentPrompt


def enrich_decisions(decisions):

    if len(decisions) == 0:
        return []

   
    MAX_CHAR=15000

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
    return json.loads(response)