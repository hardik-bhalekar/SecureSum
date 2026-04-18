# SecureSum

> Privacy-first AI meeting and transcript summarizer that redacts sensitive data before AI processing.

SecureSum is a full-stack application designed to reduce context leakage risks when using AI for meeting notes, transcripts, research logs, or internal documents. Instead of sending raw text directly to an LLM, SecureSum first detects and masks sensitive information, then generates summaries and stores safe history for future reference.

---

# Why This Project Matters

Most AI summarization tools process raw content directly, which can expose:

- emails
- phone numbers
- API keys
- card-like numbers
- internal identifiers
- confidential notes

SecureSum introduces a privacy layer before summarization.

---

# Core Features

## Privacy Layer
- Detects sensitive patterns
- Masks confidential data before processing
- Returns sanitized output

## AI Summaries
- Generates concise summaries
- Extracts structured insights
- Supports future upgrade to Gemini / Groq / OpenAI

## Analysis History
- Stores previous analyses in MongoDB
- Enables future search and audit workflows

## Full-Stack Architecture
- Modern frontend
- REST API backend
- Python ML microservice
- NoSQL persistence

---

# Tech Stack

## Frontend
- Next.js
- React
- Tailwind CSS
- TypeScript
- Axios

## Backend
- Node.js
- Express.js
- Helmet
- Morgan
- CORS

## ML Service
- FastAPI
- Python
- Regex-based PII detection

## Database
- MongoDB

---

# System Architecture

```text
User Input
   ↓
Next.js Frontend
   ↓
Express Backend API
   ↓
FastAPI Sanitization Service
   ↓
Summary Generation
   ↓
MongoDB Storage
   ↓
Dashboard History
````

---

# Current Workflow

1. User pastes transcript or notes
2. Frontend sends text to backend
3. Backend calls sanitization service
4. Sensitive data is masked
5. Summary is generated
6. Result is saved to MongoDB
7. User sees history dashboard

---

# API Endpoints

## POST `/api/analyze`

Analyze text input.

### Request

```json
{
  "text": "Meeting transcript here"
}
```

### Response

```json
{
  "id": "...",
  "sanitized_text": "...",
  "summary": "...",
  "entities_found": []
}
```

---

## GET `/api/history`

Returns previously stored analyses.

---

## POST `/sanitize`

Sanitizes raw text and returns findings.

---

# Sensitive Data Detection (Current)

* Email addresses
* Phone numbers
* API keys
* Card-like patterns

---

# Local Setup

## 1. Clone Repository

```bash
git clone https://github.com/hardik-bhalekar/SecureSum.git
cd SecureSum
```

---

## 2. Frontend Setup

```bash
cd client
npm install
npm run dev
```

Runs on:

```text
http://localhost:3000
```

---

## 3. Backend Setup

```bash
cd server
npm install
npm run dev
```

Runs on:

```text
http://localhost:5000
```

---

## 4. ML Service Setup

```bash
cd ml-service
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app:app --reload
```

Runs on:

```text
http://localhost:8000
```

---

# Environment Variables

Create `server/.env`

```env
PORT=5000
MONGODB_URI=your_connection_string
ML_SERVICE_URL=http://localhost:8000
```

---

# Folder Structure

```text
SecureSum/
├── client/       # Next.js frontend
├── server/       # Express backend
├── ml-service/   # FastAPI service
├── README.md
└── .gitignore
```

---

# Current Status

## Completed

* Functional frontend
* Working backend APIs
* Sanitization microservice
* MongoDB persistence
* History retrieval
* End-to-end workflow

## In Progress

* Premium UI redesign

## Planned

* Real LLM summaries
* Search history
* Delete entries
* Authentication
* Audio transcription
* Deployment

---

# Security Philosophy

SecureSum follows a simple principle:

> sanitize first, summarize second

This reduces accidental exposure of sensitive information to downstream AI systems.

---

# Portfolio Value

This project demonstrates:

* Full-stack engineering
* API integration
* Microservices architecture
* Security-first product thinking
* Database design
* Real-world SaaS workflow design

---

# Author

**Hardik Bhalekar**

GitHub:
[https://github.com/hardik-bhalekar](https://github.com/hardik-bhalekar)

