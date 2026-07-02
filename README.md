# DecisionGenome

> **An Enterprise Decision Intelligence Platform that transforms organizational decisions into an interconnected knowledge graph for explainable AI-powered insights.**

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb)
![FastAPI](https://img.shields.io/badge/FastAPI-AI%20Engine-009688?logo=fastapi)
![Gemini](https://img.shields.io/badge/Google-Gemini-4285F4?logo=google)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## Overview

Organizations generate thousands of decisions across teams, projects, policies, and departments. Unfortunately, these decisions are usually scattered across PDFs, documents, spreadsheets, emails, and knowledge bases, making them difficult to analyze collectively.

**DecisionGenome** converts organizational knowledge into a connected decision graph where every decision, stakeholder, department, document, risk, and outcome becomes an interconnected node.

Using AI-powered graph intelligence, the platform enables users to:

- Discover hidden organizational relationships
- Analyze decision impact
- Explore knowledge graphs interactively
- Query organizational knowledge using natural language
- Visualize enterprise decision networks

---

# Features

## Intelligent Document Processing

- Upload organizational documents
- Automatic text extraction
- Knowledge graph generation
- Metadata extraction
- Decision relationship creation

---

## Interactive Knowledge Graph

- React Flow based visualization
- Hierarchical graph layout
- Department subgraph exploration
- Decision relationship traversal
- Dynamic graph highlighting
- Interactive node inspection

---

## Enterprise Graph Search

Search by

- Decision
- Department
- Stakeholder
- Tags
- Business Domain

Automatically highlights related nodes inside the graph.

---

## Decision Copilot

Enterprise AI assistant capable of:

- Answering organization questions
- Explaining decisions
- Finding related stakeholders
- Providing strategic recommendations
- Context-aware graph responses

Powered by **Google Gemini**.

---

## Graph Intelligence Dashboard

Analytics including

- Total Nodes
- Total Relationships
- Graph Density
- Department Distribution
- Tag Distribution
- Risk Distribution
- Most Connected Entities

---

## Decision Intelligence

Every decision receives

- Overall Impact Score
- Connected Entity Count
- Stakeholder Analysis
- Risk Analysis
- Organizational Reach
- AI Recommendation

---

## Knowledge Graph Engine

Graph consists of

- Decisions
- Departments
- Stakeholders
- Risks
- Outcomes
- Reasons
- Documents
- Business Domains
- Priorities
- Categories
- Tags

---

# Architecture

```
                   ┌─────────────────────┐
                   │   React Frontend    │
                   └──────────┬──────────┘
                              │
                    REST API (Express)
                              │
          ┌───────────────────┴──────────────────┐
          │                                      │
          │                              FastAPI AI Engine
          │                                      │
          │                             Google Gemini API
          │
      MongoDB Knowledge Graph
          │
     Nodes + Relationships
```

---

# Tech Stack

## Frontend

- React 19
- Vite
- Tailwind CSS
- React Flow
- Axios
- Lucide Icons

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- REST API

---

## AI

- FastAPI
- Google Gemini
- Knowledge Graph Traversal
- Graph Intelligence Engine

---

## Database

MongoDB stores

- Graph Nodes
- Graph Edges
- Decision Metadata
- Organizational Relationships

---

# Graph Intelligence Modules

### Graph Analytics

- Graph Density
- Connectivity Analysis
- Department Insights
- Tag Analytics
- Risk Analysis

### Decision Impact

- Decision Reach
- Connected Nodes
- Organizational Influence
- Impact Scoring

### Knowledge Exploration

- BFS Graph Traversal
- Department Subgraphs
- Relationship Discovery

---

# Screenshots

## Dashboard

> *(Add screenshot here)*

```
/screenshots/dashboard.png
```

---

## Knowledge Graph

> *(Add screenshot here)*

```
/screenshots/graph.png
```

---

## Decision Intelligence

> *(Add screenshot here)*

```
/screenshots/decision-intelligence.png
```

---

## AI Copilot

> *(Add screenshot here)*

```
/screenshots/copilot.png
```

---

#  Installation

## Clone Repository

```bash
git clone https://github.com/SnehaSinha016/DecisionGenome.git

cd DecisionGenome
```

---

## Frontend

```bash
cd client

npm install

npm run dev
```

---

## Backend

```bash
cd server

npm install

npm run dev
```

---

## AI Engine

```bash
cd ai-engine

python -m venv .venv

source .venv/bin/activate

pip install -r requirements.txt

uvicorn main:app --reload
```

---

# Environment Variables

Create

```
server/.env
```

```env
MONGO_URI=

GEMINI_API_KEY=

PORT=5000
```

Create

```
ai-engine/.env
```

```env
GEMINI_API_KEY=
```

---

#  Project Structure

```
DecisionGenome/

│

├── client/

│   ├── components/

│   ├── services/

│   ├── pages/

│   └── graph/

│

├── server/

│   ├── controllers/

│   ├── models/

│   ├── routes/

│   ├── services/

│   └── utils/

│

├── ai-engine/

│   ├── extraction/

│   ├── graph/

│   └── prompts/

│

└── README.md
```

---

# Future Scope

- Graph Neural Networks
- Temporal Decision Evolution
- Predictive Decision Intelligence
- Multi-document reasoning
- Organizational Digital Twin
- Decision Similarity Search
- Enterprise Access Control
- Live Collaboration
- Decision Versioning

---

Motivation

DecisionGenome was built to demonstrate how enterprise decisions can be represented as a connected knowledge graph rather than isolated documents.

The platform combines graph databases, artificial intelligence, and interactive visualization to improve organizational decision discovery and analysis.

---

# Author

**Sneha Sinha**

B.Tech Chemical Engineering  
Indian Institute of Technology Patna

GitHub

https://github.com/SnehaSinha016

---

# If you found this project useful

Give it a ⭐ on GitHub.

---

## License

This project is licensed under the MIT License.
