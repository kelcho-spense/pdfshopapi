# Topics covered in this API
## Phase 1
- [API Endpoints](#api-endpoints)
- Routes: /api/v1/contacts
  - [GET](#get)
  - [POST](#post)
  - [PUT](#put)
  - [DELETE](#delete)
- Middlewares
  - [Error Handling](#error-handling) - notFound Route
  - [Validation](#validation) - Zod
  - [inbuilt Middlewares](#inbuilt-middlewares--3rd-party-middlewares) - csrf, prettyJSON, cors, trailing-slash, logger
  - [3rd Party Middlewares](#inbuilt-middlewares--3rd-party-middlewares) - prometheus, express-rate-limit
- API Versioning
- Microservice Architecture(route, controller, service, model)
## Phase 2

- Add dependencies for drizzle
```bash
pnpm add drizzle-orm pg drizzle-zod
pnpm add -D @types/pg drizzle-kit typescript
```
- Create drizzle folder in src
  - Create db.ts
  - create schema.ts
  - Create migrate.ts
