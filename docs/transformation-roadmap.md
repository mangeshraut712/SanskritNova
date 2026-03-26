# Sanskrit Learning Platform Transformation Roadmap

## Purpose
This repo is currently a CPU-only Sanskrit RAG prototype. The goal is to evolve it into a practical 2026 Sanskrit learning platform that supports document Q&A, guided study, collaboration, multilingual access, measurable learning outcomes, and a path to scalable deployment.

## Current State Assessment
- The codebase is a small Python prototype centered on CLI interaction, local file ingestion, FAISS retrieval, and llama.cpp generation.
- Core behavior is concentrated in a few scripts under `code/`, with no package boundary, no API layer, no tests, no CI/CD, and no deployment assets.
- Data and model handling are local and manual. The system depends on committed artifacts and hardcoded paths rather than explicit configuration.
- Sanskrit support is functional but shallow: text cleaning is naive, chunking is character-based, retrieval has no reranking, and answers are not citation-backed.
- Product scope is still a demo, not a platform. There is no learner profile, course flow, progress tracking, feedback loop, or classroom experience.

## Target Architecture
Build this as a modular monolith first, then split only when usage forces it.

### Core Services
- `api`: FastAPI backend for ingest, search, answer, sources, health, and evaluation endpoints.
- `ingestion`: document upload, OCR/PDF/DOCX parsing, metadata extraction, normalization, and passage creation.
- `retrieval`: hybrid search using embeddings, lexical matching, and reranking with citations.
- `generation`: model orchestration for answer synthesis, translation, and explanation.
- `learning`: lessons, quizzes, spaced repetition, progress, and teacher/admin workflows.
- `collaboration`: live study rooms, shared annotations, and real-time session state.
- `credentials`: verifiable certificates for course completion and institutional trust.
- `analytics`: events, funnels, retention, learning outcomes, and feedback capture.

### Platform Choices
- Web app: responsive multilingual frontend for learners, teachers, and admins.
- Storage: Postgres for application data, object storage for source files and media, vector store for retrieval.
- Realtime: WebSocket or CRDT-based collaboration for co-study and annotation.
- Deployment: containerized services with a clear path to Kubernetes once the platform has traction.
- AI stack: Sanskrit-aware NLP utilities, multimodal tutoring, and optional offline/local fallback models for constrained environments.

### Sanskrit Intelligence Layer
- Use Sanskrit-aware preprocessing rather than generic character cleaning.
- Add sandhi/morphology support, transliteration, translanguage search, and translation.
- Return citations and source spans with every answer.
- Maintain an evaluation set for retrieval quality, answer faithfulness, and pedagogical usefulness.

## Phased Roadmap

### Phase 0: Foundation
Goal: make the repo reproducible and trustworthy.
- Add packaging, dependency pinning, config management, linting, typing, and tests.
- Replace hardcoded paths with environment-based configuration.
- Add CI checks for formatting, unit tests, and import sanity.
- Remove generated artifacts from version control.

### Phase 1: Product MVP
Goal: ship a usable Sanskrit learning and Q&A experience.
- Expose a stable API and a web interface.
- Support document ingestion, search, cited answers, glossary lookup, transliteration toggle, and multilingual UI.
- Add learner accounts, bookmarks, progress tracking, and feedback collection.

### Phase 2: Learning Platform
Goal: move from chat to structured learning.
- Add lessons, quizzes, spaced repetition, pronunciation practice, and adaptive difficulty.
- Introduce teacher and admin tools for content curation and cohort management.
- Build evaluation dashboards for content quality and learning outcomes.

### Phase 3: Real-Time Collaboration
Goal: support classrooms and study groups.
- Add shared notes, live annotations, and collaborative reading sessions.
- Add session persistence, moderation, and audit trails.
- Introduce real-time tutoring workflows with streaming responses and voice support.

### Phase 4: Scale and Trust
Goal: prepare for institutions and larger communities.
- Split high-load components into services only where needed.
- Add Kubernetes deployment, observability, rate limiting, backups, and rollout discipline.
- Add verifiable credentials for certificates; anchor on-chain only if institutional demand justifies it.

### Phase 5: Advanced Experiences
Goal: extend into high-impact immersive learning.
- Add AR/VR recitation spaces, guided pronunciation exercises, and interactive cultural experiences.
- Evaluate IoT devices only for narrow use cases such as pronunciation practice or classroom playback.
- Keep these as extensions, not prerequisites.

## Prioritized Backlog

### P0
- Package the project and pin dependencies.
- Add a `FastAPI` service surface.
- Replace hardcoded paths with config.
- Add tests for ingestion, preprocessing, retrieval, and prompt assembly.
- Define the first evaluation dataset.

### P1
- Add Sanskrit-aware chunking and metadata.
- Add citations and source surfacing.
- Add multilingual UI and transliteration support.
- Add learner profiles, progress tracking, and feedback capture.
- Add CI/CD and containerization.

### P2
- Add adaptive quizzes and spaced repetition.
- Add teacher/admin content tooling.
- Add collaboration and live study rooms.
- Add speech practice and pronunciation feedback.
- Add analytics and product telemetry.

### P3
- Add verifiable credentials.
- Add managed cloud deployment and autoscaling.
- Add AR/VR and IoT features after product-market proof.

## Status Checklist
- [x] Current repo inventory completed
- [x] Gap analysis completed
- [x] 2026 target architecture defined
- [x] Phased roadmap defined
- [x] Prioritized backlog defined
- [ ] Packaging and dependency pinning implemented
- [ ] API layer added
- [ ] Sanskrit-aware retrieval improved
- [ ] Tests and CI/CD added
- [ ] Web product surface implemented
- [ ] Learning workflows implemented
- [ ] Collaboration and credentialing added
- [ ] Cloud-scale deployment implemented

## Decision Rules
- Prefer the smallest change that improves learner value.
- Build a modular monolith before splitting into services.
- Add AR/VR, blockchain, and IoT only after the core learning product works.
- Keep Sanskrit correctness, citations, and accessibility ahead of feature count.

