from fastapi import FastAPI
from pydantic import BaseModel

from services.pdfExtractor import extract_text
from services.documentClassifier import classify_document
from services.decisionExtractor import extract_decisions
from services.decisionValidator import verify_decisions
from services.decisionAdvisor import generate_advice
from pydantic import BaseModel
from typing import List
app = FastAPI()


class PDFRequest(BaseModel):
    file_path: str


class TextRequest(BaseModel):
    text: str
class DecisionRequest(BaseModel):
    decisions: List[dict]
class AdvisorRequest(BaseModel):
    decision: dict
    organizationalIntelligence: dict

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.post("/extract-text")
def extract(request: PDFRequest):

    text = extract_text(request.file_path)

    return {
        "text": text
    }
@app.post("/extract-decisions")
def extract_decision_endpoint(request: TextRequest):

    result = extract_decisions(request.text)

    return result

@app.post("/classify-document")
def classify(request: TextRequest):

    result = classify_document(request.text)

    return result
@app.post("/decision-advisor")
def advisor(request: AdvisorRequest):

    return generate_advice(
        request.decision,
        request.organizationalIntelligence
    )