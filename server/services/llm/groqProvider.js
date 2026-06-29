import groq from "../../config/groq.js";
import { LLM_MODELS } from "../../constants/llmModels.js";



export async function groqProvider({

    system,

    prompt,

    temperature = 0.3,

    model = LLM_MODELS.SMART

}) {

    const response = await groq.chat.completions.create({

        model,

        temperature,

        messages: [

            {
                role: "system",
                content: system
            },

            {
                role: "user",
                content: prompt
            }

        ]

    });

    return response.choices[0].message.content;

}