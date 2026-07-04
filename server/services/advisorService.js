import axios from "axios";

export const getDecisionAdvice = async (
    decision,
    organizationalIntelligence
) => {

    const payload = {
        decision,
        organizationalIntelligence
    };

    console.log("\n========== PAYLOAD TO FASTAPI ==========");
    console.log(JSON.stringify(payload, null, 2));
    console.log("========================================\n");

    try {

        const response = await axios.post(
            "https://decisiongenome.onrender.com/decision-advisor",
            payload
        );

        return response.data;

    } catch (error) {

        console.log("\n========== FASTAPI VALIDATION ERROR ==========");

        console.log(JSON.stringify(error.response?.data, null, 2));

        console.log("==============================================\n");

        throw error;
    }
};