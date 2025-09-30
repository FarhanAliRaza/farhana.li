---
title: 'MedChat: AI-Powered Clinical Decision Support System with FHIR Integration'
slug: 'medgebra-medical-chatbot'
description: 'A sophisticated AI-powered clinical decision support system that combines real-time EMR data via FHIR API with RAG-powered medical literature search. Features semantic PDF citation highlighting, intelligent question classification, Django/Next.js architecture, and multi-model AI orchestration (GPT-5, Gemini 2.5 flash, OpenAI embeddings) for helping doctors make informed clinical decisions.'
date: '2025-09-30'
tags:
  [
    'AI',
    'RAG',
    'FHIR',
    'Healthcare',
    'Django',
    'Next.js',
    'PostgreSQL',
    'Redis',
    'Pinecone',
    'OpenAI',
    'Gemini',
    'Clinical-Decision-Support'
  ]
published: true
demo: 'https://medical-chatbot.medgebra.com'
---

## TL;DR

MedChat is a sophisticated medical chatbot platform that helps doctors make informed clinical decisions by combining real-time Electronic Medical Record (EMR) data via FHIR API with AI-powered medical literature search. The system features innovative PDF citation highlighting with exact coordinate positioning, intelligent question classification, and seamless integration of patient-specific data with general medical knowledge.

**Key Innovation**: Semantic PDF citation matching using LLM to find and highlight exact text positions in medical literature, robust to OCR errors and paraphrasing.

## Tech Stack

### Backend

- **Framework**: Django 5.x with Django REST Framework
- **Database**: PostgreSQL (patient data, chat history)
- **Cache/Queue**: Redis (caching, Celery task queue)
- **Background Processing**: Celery with Beat scheduler
- **Real-time**: Server-Sent Events (SSE) for streaming responses
- **AI Models**:
  - OpenAI GPT-5/GPT-5-mini/Together Ai (Custom models) (main chat)
  - OpenAI text-embedding-3-large (document embeddings)
  - Google Gemini 2.5 Flash Lite (reranking, page filtering, semantic matching)
- **Vector Database**: Pinecone (RAG system)
- **Document Processing**: PyMuPDF, LangChain, llama-index
- **FHIR Integration**: Custom FHIRClient with OpenEMR

### Frontend

- **Framework**: Next.js 14.2 (App Router)
- **UI Library**: React 18 with TypeScript
- **State Management**: Redux Toolkit with Redux Persist
- **Components**: shadcn/ui + Radix UI primitives
- **Styling**: Tailwind CSS with custom theme
- **PDF Viewer**: @react-pdf-viewer (pdfjs-dist)
- **Forms**: React Hook Form + Zod validation
- **Markdown**: marked library with @tailwindcss/typography

### DevOps & Infrastructure

- **Payment**: Stripe integration for subscriptions
- **Monitoring**: Sentry SDK for error tracking
- **Code Quality**: Ruff (linting/formatting), pytest (testing)
- **Testing**: pytest with pytest-django, model-bakery for fixtures
- **Authentication**: JWT with Google OAuth, email verification

## Project Overview

### The Problem

When doctors need to consult medical literature during or after patient consultations, they face significant challenges in finding accurate, contextual information quickly. While most clinical decisions rely on experience, complex cases often require referencing medical guidelines, research papers, or clinical protocols.

Traditional approaches fall short:

- **Time-consuming manual search**: Doctors must search through multiple PDFs, guidelines, and medical databases
- **Lack of patient context**: Medical information isn't automatically connected to specific patient data
- **Citation verification burden**: No easy way to verify the source and context of medical information
- **Fragmented workflow**: Switching between EMR systems, PDF readers, and search engines disrupts clinical workflow

### The Solution

MedChat ensures doctors get accurate medical information with proper context and verifiable sources:

- **Integrates Real-Time EMR Data**: Automatically fetches patient demographics, conditions, medications, lab results via FHIR API
- **AI-Powered Literature Search**: RAG system searches medical PDFs with semantic understanding to find relevant information
- **Verifiable Citations**: Every answer includes citations with exact PDF highlights, ensuring doctors can verify the source and context
- **Context-Aware Responses**: Combines patient-specific data with medical literature for personalized, clinically relevant answers
- **Seamless Workflow**: Single interface eliminates switching between EMR, PDFs, and search engines

## Core Features

### 1. Verifiable PDF Citations with Exact Highlighting

When the AI references medical literature, it provides clickable citations that open the source PDF with the exact text highlighted. This solves the trust problem - doctors can instantly verify where information came from and read the full context.

The system uses semantic matching powered by AI to find and highlight the relevant text, even when there are OCR errors or slight paraphrasing. This two-stage approach first identifies the semantically matching content, then calculates precise coordinates for visual highlighting. Computed positions are cached to ensure fast subsequent loads.

### 2. Real-Time Patient Data via FHIR

The system connects to Electronic Medical Records through FHIR API, automatically fetching patient demographics, conditions, medications, lab results, and more. This eliminates manual data entry and ensures the AI always has current patient information.

Patient data is fetched in parallel for performance, with intelligent caching to balance speed and freshness. The system supports all major FHIR resources including diagnoses, prescriptions, vitals, procedures, allergies, and immunizations.

### 3. Intelligent Question Classification

Not all questions require the same information. The system automatically determines whether a doctor's question needs:

- Only patient data ("What are this patient's current medications?")
- Only medical literature ("What are the side effects of metformin?")
- Both sources ("Based on this patient's conditions, what treatment should I consider?")

This classification is context-aware, understanding conversation history to resolve pronouns and maintain continuity across multiple questions. It generates optimized queries for both the patient database and medical literature search.

### 4. Streaming Responses with Server-Sent Events

Responses stream in real-time using Server-Sent Events, providing immediate value while progressively enhancing with citations and patient data. The interface shows live status updates (analyzing records, searching literature) followed by the answer, then citations with highlights, and finally structured patient data for verification.

This streaming approach ensures doctors see results instantly rather than waiting for the complete response to be generated.

### 5. Smart Document Processing

Uploaded medical PDFs are intelligently processed - AI filters out non-content pages like glossaries and title pages before generating embeddings. Documents are chunked semantically to preserve meaning while maintaining page references.

Retrieved documents are reranked by relevance, filtering out low-quality content like practice questions or random sentences. This ensures doctors only see the most clinically relevant information.

### 6. Patient-Aware Context

When discussing a specific patient, the system personalizes responses by using the patient's name and combining their clinical data with general medical knowledge. This provides tailored recommendations rather than generic advice.

## Architecture Approach

### Service-Oriented Backend

The backend follows a clean service-oriented architecture where each component has a single, well-defined responsibility. Services handle message management, AI model communication, question classification, FHIR data fetching, document processing, and pipeline orchestration.

This separation makes the system maintainable and testable - each service can be independently tested and reused across different parts of the application. The architecture emphasizes clear boundaries between concerns like data fetching, AI processing, and response formatting.

### Coordinated Processing Pipeline

When a question arrives, the system orchestrates a multi-step pipeline:

1. Classify the question to determine what information sources are needed
2. Fetch patient data from FHIR if relevant to the question
3. Search medical literature embeddings if needed
4. Rerank retrieved documents by relevance
5. Combine all context (patient data + literature) for the AI
6. Generate the response with proper citations

This pipeline runs asynchronously with parallel processing where possible to minimize latency.

### Frontend State Management

The frontend uses Redux for predictable state management across the application. State is organized by concern - chat messages and streaming status, patient information, user authentication, and AI model selection.

Critical state like authentication tokens and patient context persists across sessions, ensuring continuity when users return. The state management handles real-time updates from the streaming API, coordinating UI updates as data arrives.

## Performance Optimizations

### Backend

- **Redis Multi-Layer Caching**: Patient data, FHIR resources, and metadata cached with different TTLs for optimal freshness and performance
- **Parallel FHIR Queries**: Multiple resource fetches execute concurrently with controlled concurrency limits
- **Position Caching**: Citation coordinates stored in database to avoid recomputation on subsequent requests
- **Celery Background Tasks**: Document embedding generation and patient summaries processed asynchronously
- **Async/Await Throughout**: Non-blocking I/O for FHIR requests, LLM calls, and database queries

### Frontend

- **React.memo**: Memoize expensive components
- **useMemo/useCallback**: Prevent unnecessary re-renders
- **Debounced Scroll**: useDebounce hook for scroll operations
- **Stream Line Buffering**: Prevents partial JSON parsing errors
- **Citation Context**: O(1) lookups with Map for citation numbering
- **Lazy Loading**: Dynamic imports for heavy components

## Key Technical Challenges & Solutions

### Challenge 1: OpenEMR FHIR Data Inconsistencies

**Problem**: OpenEMR's FHIR API often returns condition data with ICD-10 codes (e.g., "I10") but empty display names.

**Solution**: System prompt instructs LLM to interpret ICD codes using medical knowledge

### Challenge 2: PDF Text Extraction Variability

**Problem**: OCR errors, formatting differences, and text extraction inconsistencies make exact string matching unreliable for citation highlighting.

**Solution**: Semantic matching using LLM to identify equivalent content despite OCR errors or paraphrasing, then calculating precise coordinates for visual highlighting.

### Challenge 3: Context Management in Conversational Flow

**Problem**: Users ask follow-up questions with pronouns ("What about his blood pressure?") without explicitly mentioning the patient.

**Solution**: Context-aware classification that includes chat history to resolve pronouns and maintain conversation continuity.

### Challenge 4: Large Context Windows

**Problem**: Combining patient FHIR data + chat history + retrieved documents + system prompt can exceed token limits.

**Solution**:

- Document reranking reduces retrieved chunks from 10 to top 5 most relevant
- FHIR data formatted into human-readable clinical summaries (not raw JSON)
- Chat history limited to recent messages
- Semantic chunking optimizes chunk sizes.

### Challenge 5: Streaming Response Coordination

**Problem**: Frontend needs to display answer, citations, and FHIR data as they arrive, but in coordinated fashion.

**Solution**: SSE event types with progressive enhancement:

1. Stream answer first (immediate value)
2. Then stream citations one-by-one (allows progressive rendering)
3. Finally stream FHIR data chunks (secondary verification info)
4. Redux state updates trigger component re-renders automatically

## Security & Compliance Considerations

### Authentication & Authorization

- JWT-based authentication with refresh tokens
- Google OAuth integration for SSO
- User-scoped data access (patients tied to authenticated user)
- Automatic token refresh on expiration

### FHIR Security

- OAuth 2.0 for FHIR API authentication
- Token storage in Redis with encryption
- Automatic token refresh on 401 errors
- User consent flow for HIS connection

### Data Privacy

- Patient data cached with short TTLs (10 minutes)
- Last access timestamps track data usage
- Patient information in logs only at debug level
- FHIR data transmitted over HTTPS

### Payment Security

- Stripe integration for PCI-compliant payment processing
- Subscription management with webhook handling
- No credit card data stored locally

## Testing Strategy

### Backend Testing

- **pytest** with pytest-django for Django integration
- **pytest-xdist** for parallel test execution
- **model-bakery** for test data factories
- **Fixtures** in `src/common/tests/fixtures/`
- **Test settings**: Isolated test database configuration

### Code Quality

- **Ruff**: Fast Python linting and formatting
- **Pre-commit hooks**: Automated code quality checks on commit
- **Django test framework**: Integration and unit tests

## Deployment Architecture

### Backend

- Django application served via Daphne (ASGI server)
- PostgreSQL for persistent data
- Redis for caching and Celery queue
- Celery workers for background tasks
- WhiteNoise for static file serving

### Frontend

- Next.js static generation or server-side rendering
- Deployed to Vercel or similar platform
- API calls to backend via configured base URL

### Environment Configuration

- **Development**: Local PostgreSQL + Redis via Docker
- **Production**: Split settings with environment-specific configs
- **Settings Structure**: django-split-settings for modular configuration

## Lessons Learned & Future Enhancements

### Lessons Learned

- **SSE Over WebSockets for AI Chatbots**: Initially tried WebSockets, but Server-Sent Events proved superior for AI chat applications - easier to scale, simpler to manage, and perfect for one-way streaming responses. SSE handles reconnections gracefully and integrates seamlessly with standard HTTP infrastructure.

- **Save Metadata During Embedding Generation**: You won't regret storing extra metadata during document processing, but you will definitely regret not having enough. Plan all your needs upfront and compute everything at the embedding generation stage - page numbers, document references, chunk positions. This makes actual chat responses fast since all necessary data is pre-computed and readily available.

- **DSPy for Prompt Engineering**: DSPy became an invaluable tool for systematic prompt optimization. Instead of manually tweaking prompts, DSPy helps structure and optimize LLM interactions programmatically, making the system more maintainable and improving output quality.

- **Use LLM to Debug LLM Responses**: When AI responses are incorrect, using another LLM to analyze why the mistake happened is surprisingly effective. The debugging LLM can identify context misunderstandings, missing information, or reasoning errors - providing insights that manual inspection might miss.

- **Semantic Matching > Exact Matching**: LLM-based text matching for PDF highlighting proved far more robust than string matching algorithms, handling OCR errors and paraphrasing naturally.

- **Progressive Streaming UX**: Streaming answer first, then citations, then patient data provided the best user experience - doctors get immediate value, then supporting details progressively.

## Conclusion

MedChat solves a real clinical workflow problem by combining real-time patient data from EMR systems with AI-powered medical literature search. Doctors get instant answers backed by verifiable citations with exact PDF highlights, eliminating the need to manually search through documents or switch between multiple systems.

The system integrates multiple AI models for specialized tasks - question classification, document search, semantic matching, and response generation. Built with Django backend and Next.js frontend, it uses FHIR for patient data integration, Pinecone for vector search, and Server-Sent Events for real-time streaming responses.

Key innovations include semantic PDF highlighting that handles OCR errors, intelligent question classification that understands context, and a streamlined interface that brings together patient records and medical knowledge in a single conversation.
