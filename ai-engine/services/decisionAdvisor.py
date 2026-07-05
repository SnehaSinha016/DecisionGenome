import json

from config.llm import generate
from prompts.decisionAdvisorPrompt import decisionAdvisorPrompt
def generate_advice(decision, organizational_intelligence):

    prompt = f"""
{decisionAdvisorPrompt}
{json.dumps(decision, indent=2)}

{json.dumps(organizational_intelligence, indent=2)}
"""

    response = generate(prompt)

    response = (
        response.replace("```json", "")
        .replace("```", "")
        .strip()
    )

    return json.loads(response)