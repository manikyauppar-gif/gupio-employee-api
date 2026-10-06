# Employee Management REST API - Gupio Placement Drive

A production-ready RESTful API for Employee Management built with Node.js, Express, SQLite, and Prisma ORM.

## Live Deployment
- **API Base URL:** https://gupio-employee-api-production.up.railway.app
- **Health Check:** `GET /health`

---

## Tech Stack
- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js
- **Database & ORM:** SQLite with Prisma ORM
- **Validation:** Joi
- **Deployment:** Render

---

## API Endpoints Specification

| Method | Endpoint | Description | Query / Body Params |
|---|---|---|---|
| `GET` | `/health` | Health Check | None |
| `POST` | `/api/employees` | Create employee | JSON: `{ name, email, department, designation }` |
| `GET` | `/api/employees` | List/Search/Filter employees | `?search=` (matches name or email), `?department=` |
| `GET` | `/api/employees/:id` | Get employee by ID | URL parameter `:id` |
| `PUT` | `/api/employees/:id` | Update employee | JSON: Any employee fields |
| `DELETE` | `/api/employees/:id` | Delete employee | URL parameter `:id` |

---

## Verification Test Cases (As Required by Brief)

### 1. Complete CRUD Sequence
- **POST `/api/employees`**: Created `Alice Smith` (`alice@example.com`, `Engineering`, `Software Engineer`) $\to$ Returned `201 Created` with generated UUID.
- **GET `/api/employees/:id`**: Retrieved the newly created employee record $\to$ Returned `200 OK`.
- **PUT `/api/employees/:id`**: Updated designation $\to$ Returned `200 OK` with updated timestamp.
- **DELETE `/api/employees/:id`**: Removed employee by ID $\to$ Returned `200 OK` with confirmation.

### 2. Invalid Input Case
- **POST `/api/employees`** with invalid body `{"name":""}` $\to$ Returned `400 Bad Request` with validation error messages:
  - `"name" is not allowed to be empty`
  - `"email" is required`
  - `"department" is required`
  - `"designation" is required`

### 3. Missing Record Case
- **GET `/api/employees/00000000-0000-0000-0000-000000000000`** $\to$ Returned `404 Not Found` with message: `"Employee with ID 00000000-0000-0000-0000-000000000000 not found"`.

### 4. Search and Filter Cases
- `GET /api/employees?search=Alice` $\to$ Returned matching records matching name or email.
- `GET /api/employees?department=Engineering` $\to$ Filtered exclusively to Engineering department records.

---

## Local Setup & Run

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/manikyauppar-git/gupio-employee-api.git](https://github.com/manikyauppar-git/gupio-employee-api.git)
   cd gupio-employee-api