import { groqProvider } from "./groqProvider.js";

export async function askLLM(config) {

    try {

        return await groqProvider(config);

    }

    catch (error) {

        console.error("LLM Error:", error);

        throw error;

    }

}