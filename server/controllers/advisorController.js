import axios from "axios";

export const advisor = async (req, res) => {

    try {

        const response = await axios.post(
            "http://127.0.0.1:8000/decision-advisor",
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