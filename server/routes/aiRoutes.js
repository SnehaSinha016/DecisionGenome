import express from "express";

const router = express.Router();

router.get("/health", (req, res) => {
    res.json({
        status: "healthy",
        message: "Express AI Route Working "
    });
});

export default router;