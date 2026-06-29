import api from "./api";

export const askCopilot = async (question) => {

    const { data } = await api.post("/intelligence/copilot", {

        question

    });

    return data;

};