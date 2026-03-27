# Sanskrit Learning Platform Roadmap

## Current State

- `api/` and `public/` are the active web product
- `code/` preserves the original Sanskrit RAG pipeline and index workflow
- grounded answers are already connected to the original retrieval layer
- transliteration and study tracks are already available in the current product
- chat modes exposed by the main API are `learn`, `translate`, and `analyze`

## What Is Implemented

- OpenRouter-backed study chat
- grounded-answer endpoint using the original Sanskrit corpus
- Devanagari to IAST transliteration
- API-served study tracks
- static frontend with API-backed interactions
- Vercel, Docker, and Kubernetes deployment files

## What Is Missing

- richer citation handling in the main chat path
- stronger Sanskrit-aware retrieval and morphology support
- saved progress, accounts, and bookmarks
- lesson and quiz flows
- persistent conversation history

## Near-Term Order

### P0

- keep the web app and grounded-answer path stable
- keep the original RAG workflow usable from `code/`
- improve retrieval output and citation quality

### P1

- add learner accounts and saved state
- add lessons, quizzes, and progress tracking
- improve transliteration and Sanskrit-specific language handling

### P2

- add analytics, moderation, and classroom workflows if the product needs them
- harden deployment only when usage justifies it

## Decision Rules

- prefer the smallest change that improves learner flow
- keep `api/` and `public/` focused on the web product
- keep corpus and retrieval changes in `code/`
- avoid speculative platform work until the core learning path is solid
