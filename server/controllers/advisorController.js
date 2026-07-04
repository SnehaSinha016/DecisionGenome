import axios from "axios";

export const advisor = async (req, res) => {

    try {

        const response = await axios.post(
            "https://decisiongenome.onrender.com/decision-advisor",
            req.body
        );

        return res.json(response.data);

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};