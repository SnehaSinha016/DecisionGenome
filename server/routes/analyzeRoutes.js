import express from "express";
import multer from "multer";

import { analyzeDocument } from "../controllers/analyzeController.js";

const router = express.Router();

const upload = multer({
    dest: "uploads/"
});

router.post(
    "/analyze",
    upload.single("pdf"),
    analyzeDocument
);

export default router;