import { buildPrompt } from "../llm/promptBuilder.js";
import { askLLM } from "../llm/provider.js";

export async function askEnterpriseCopilot(

    question,

    context,

    intent

) {

    const prompt = buildPrompt({

        title: "DecisionGenome Enterprise Copilot",

        question,

        context,

        intent

    });

    const answer = await askLLM({

        system: `
You are DecisionGenome AI Copilot.

You are an enterprise decision intelligence assistant.

Always answer using the enterprise context provided.

If information is unavailable, explicitly state that it was not found.

Never invent organizational data.

Provide concise executive-level recommendations.
        `,

        prompt,

        temperature: 0.2

    });

    return answer;

}