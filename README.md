# Orvia

A functional prototype exploring how authorized Notion database schemas can be transformed into adaptive form interfaces.

---

## Overview

Orvia began as an exploration of extending Notion Forms without abandoning the simplicity of the native workflow.

The original direction investigated conditional logic, validation layers, and structured feedback systems for technical teams.

The current prototype focuses on a broader technical question:

> How can external schemas become interfaces?

Through OAuth authorization, schema retrieval, and dynamic rendering, the system generates editable form interfaces directly from existing Notion databases.

---

## What Works

- Notion OAuth authentication
- Workspace authorization
- Protected dashboard
- Dynamic database listing
- Schema retrieval from Notion
- Schema interpretation
- Dynamic field rendering
- Editor / Preview interface
- Session persistence

---

## Not Implemented

- Public form publishing
- Submission pipeline
- Response synchronization
- Validation-rule engine
- Conditional logic execution
- Persistent form configurations

---

## Architecture

### Frontend

- Next.js
- React
- Tailwind CSS

### Logic Layer

- TypeScript
- tRPC
- Zod

### Persistence

- Supabase
- PostgreSQL
- Prisma

### Integration

- Notion API
- OAuth 2.0

### Deployment

- Vercel

---

## Technical Investigation

The project investigates how external schemas can be interpreted and transformed into adaptive interfaces.

Particular attention was given to:

- OAuth authorization flows
- Dynamic schema interpretation
- Runtime UI generation
- External API constraints
- Product-oriented architecture

---

## Key Technical Questions

The project explored several technical questions:

- How can external database schemas become interfaces?
- How can OAuth permissions be translated into application state?
- How can dynamic field structures be rendered at runtime?
- How can validation and conditional logic be layered on top of an existing ecosystem without replacing it?

---

## Live Prototype

https://orvia.vercel.app

---

## Current Status

Functional Prototype

The project reached a working architectural state but was never developed into a complete SaaS product.

Today, Orvia is preserved as a technical artifact and research prototype documenting an investigation into schema-driven interfaces, OAuth-based integrations, and dynamic UI generation within the Notion ecosystem.

---

## Local Development

```bash
npm install
npm run dev
```

Required services:

- Notion OAuth Application
- Supabase Database
- Environment Variables

```
