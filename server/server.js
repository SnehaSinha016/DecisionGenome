import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import analyzeRoutes from "./routes/analyzeRoutes.js";
import graphRoutes from "./routes/graphRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import advisorRoutes from "./routes/advisorRoutes.js";
import executiveAdvisorRoutes from "./routes/executiveAdvisorRoutes.js";
import graphSearchRoutes from "./routes/graphSearchRoutes.js";
import relationshipExplorerRoutes from "./routes/relationshipExplorerRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import queryRoutes from "./routes/queryRoutes.js";
import decisionGraphRoutes from "./routes/decisionGraphRoutes.js";
import copilotRoutes from "./routes/copilotRoutes.js";
import graphTraversalRoutes from "./routes/graphTraversalRoutes.js";

dotenv.config();
console.log("Loaded GROQ key:", process.env.GROQ_API_KEY ? "YES" : "NO");
console.log("Current working directory:", process.cwd());
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", analyzeRoutes);
app.use("/api/graph", graphRoutes);
app.use("/analytics", analyticsRoutes);
app.use("/recommend", recommendationRoutes);
app.use("/advisor", advisorRoutes);
app.use( "/executive-advisor",executiveAdvisorRoutes);
app.use("/api/graph", graphSearchRoutes);
app.use("/graph", relationshipExplorerRoutes);
app.use("/query", queryRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/graph", decisionGraphRoutes);
import relationshipRoutes from "./routes/relationshipRoutes.js";
app.use("/api/graph", relationshipRoutes);
app.use("/intelligence", executiveAdvisorRoutes);
app.use("/intelligence", copilotRoutes);
app.use("/api/graph",graphTraversalRoutes);


mongoose.connect(process.env.MONGO_URL)
.then(() => {

    console.log("MongoDB Connected");

})
.catch((err) => {

    console.log(err);

});

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});