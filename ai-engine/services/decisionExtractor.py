import json

from config.llm import generate
from prompts.decisionExtractorPrompt import DECISION_EXTRACTOR_PROMPT
from services.decisionValidator import verify_decisions
from services.decisionEnricher import enrich_decisions


def extract_decisions(text):

    prompt = DECISION_EXTRACTOR_PROMPT + text[:5000]

    response = generate(prompt)

    response = (
        response.replace("```json", "")
        .replace("```", "")
        .strip()
    )

    print("\n========== RAW EXTRACTOR RESPONSE ==========")
    print(response)
    print("===========================================\n")

    data = json.loads(response)

    print("\n========== PARSED JSON ==========")
    print(data)
    print("================================\n")

    if isinstance(data, dict):
        decisions = data.get("decisions", [])
    elif isinstance(data, list):
        decisions = data
    else:
        raise Exception("Unexpected JSON format.")

    print(f"Decisions Extracted: {len(decisions)}")

    if len(decisions) == 0:
        return {
            "success": True,
            "decisions": []
        }

    # Step 1: Validate
    verified = verify_decisions(text, decisions)

    print(f"Verified Decisions: {len(verified)}")

    # Step 2: Enrich
    print("Calling Decision Enricher...")

    enriched = enrich_decisions(verified)

    print(f"Enriched Decisions: {len(enriched)}")

    return {
        "success": True,
        "decisions": enriched
    }