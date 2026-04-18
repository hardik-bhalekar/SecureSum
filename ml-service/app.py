from fastapi import FastAPI
from pydantic import BaseModel
import re

app = FastAPI(title="SecureSum ML Service")

class TextRequest(BaseModel):
    text: str

def sanitize_text(text):
    entities = []

    patterns = {
        "email": r'[\w\.-]+@[\w\.-]+\.\w+',
        "phone": r'\+?\d[\d\-\s]{8,}\d',
        "api_key": r'(?i)(api[_-]?key\s*[:=]?\s*[A-Za-z0-9\-_]{8,})',
        "card": r'\b(?:\d[ -]*?){13,16}\b'
    }

    sanitized = text

    for label, pattern in patterns.items():
        matches = re.findall(pattern, sanitized)

        for match in matches:
            entities.append({
                "type": label,
                "value": match
            })

        sanitized = re.sub(pattern, f"[REDACTED_{label.upper()}]", sanitized)

    return sanitized, entities

@app.get("/")
def root():
    return {"message": "SecureSum ML Service Running"}

@app.post("/sanitize")
def sanitize(req: TextRequest):
    clean_text, entities = sanitize_text(req.text)

    return {
        "sanitized_text": clean_text,
        "entities_found": entities,
        "count": len(entities)
    }