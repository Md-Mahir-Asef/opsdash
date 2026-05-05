---
title: OpsDash Product Requirement Document (PRD)
project_name: OpsDash
Developed By: Md. Mahir Asef
date: 19 Feb 2026
version: 1.0
---

## 1. Project Overview

**Objective:**
OpsDash is an internal operations dashboard designed for small agencies to manage clients, projects, tasks, and team members efficiently. It includes advanced reporting, activity logging, and role-based access control.

**Primary Goals:**

- Centralize client, project, and task management.
- Provide polished, enterprise-like dashboards for Admin, Staff, and Client users.
- Generate CSV and PDF reports.
- Log all user activity for audit purposes.
- REST API-driven backend using Node.js + Express + TypeScript and PostgreSQL.
- Frontend built with React + Vite.
- Authentication & role management via Clerk.

---

## 2. User Roles

| Role   | Permissions                                                                                                |
| ------ | ---------------------------------------------------------------------------------------------------------- |
| Admin  | Full access: manage clients, projects, tasks, users, view all dashboards, generate reports, activity logs. |
| Staff  | Access to assigned projects & tasks, can update task status, view dashboards relevant to assignments.      |
| Viewer | Read-only access to assigned projects/tasks.                                                               |
| Client | Can view, edit, add only their own projects and tasks, limited dashboard.                                  |

**Notes:** Roles can be extended in the future.

---

## 3. Functional Requirements

### 3.1 - [x] Authentication & Authorization

- Use Clerk for authentication.
- Roles and permissions enforced on backend (via middleware) and frontend.
- Session validation for all API endpoints.
- Users linked to PostgreSQL `users` table via Clerk `user_id`.

### 3.2 Member Management

- CRUD operations: create, read, update, delete clients.
- Store fields: `id`, `name`, `email`, `company`, `phone`, `address`, `created_at`, `updated_at`.
- Assign multiple projects to each client.

#### Actions

- [x] Load Memebrs of that organization in the Backend from Clerk.
- Load Memebrs of that organization by page in the Backend from Clerk.
- [x] Load Members of that organization in the Frontend from Backend.
- Load Members of that organization by page in the Frontend from Backend.

#### Features for later

- [] Invite Member
- [] Search Member
- [] Filter Member

### 3.3 Project Management

- CRUD operations for projects.
- Fields: `id`, `client_id`, `title`, `description`, `status`, `start_date`, `end_date`, `priority`, `budget`, `created_at`, `updated_at`.
- Status predefined (To Do, In Progress, Done) and customizable by Admin.
- Projects linked to one client only.

### 3.4 Task Management

- CRUD operations for tasks within projects.
- Fields: `id`, `project_id`, `title`, `description`, `status`, `assigned_user_id`, `priority`, `due_date`, `created_at`, `updated_at`.
- Subtasks optional in future updates.
- Status predefined and customizable.

### 3.5 Activity Logs

- Log all actions by users: create/update/delete clients, projects, tasks.
- Store: `id`, `user_id`, `action`, `entity_type`, `entity_id`, `timestamp`, `metadata`.
- Viewable by Admin; Staff may view logs for assigned projects.

### 3.6 Dashboard

- Separate dashboards for Admin, Staff, Client.
- Cards: total clients, active projects, completed tasks, upcoming deadlines.
- Charts: projects over time, task status distribution.
- KPIs calculated from real data (initially fake for testing).
- Filters by client, status, date range.

### 3.7 Reports & Exports

- Generate CSV and PDF reports.
- Reports can be filtered by client, project, status, or date range.
- Server-side generation recommended (Node.js).

### 3.8 Search & Filtering

- Table search/filter for clients, projects, tasks.
- Filters include text, status, assigned user, date range.

---

## 4. Technical Requirements

### 4.1 Backend

- **Stack:** Node.js + Express + TypeScript
- **Database:** PostgreSQL
- **API:** REST only
- **Auth:** Clerk integration
- **Middleware:** role-based access, session verification
- **Data modeling:** normalized tables (users, clients, projects, tasks, activity_logs)

### 4.2 Frontend

- **Stack:** React + Vite + TypeScript
- **Routing:** React Router
- **UI:** polished enterprise look, dashboards with cards & charts
- **Components:** reusable tables, forms, modals, filters
- **Integration:** Clerk auth, REST API calls

### 4.3 Development Environment

- **Local dev:** PostgreSQL local instance
- **Clerk dev mode** for authentication without internet latency
- **Mock/fake data** for early UI testing

### 4.4 Deployment

- Deployment-ready code structure
- Environment variables for database, Clerk API keys
- Scripts for DB migrations/seeding optional

---

## 5. Database Schema (High-Level)

### Tables

- `users` → Clerk-linked users, role, metadata
- `clients` → client details
- `projects` → linked to clients
- `tasks` → linked to projects, assigned users
- `activity_logs` → logs of all actions

**Relationships:**

- One client → many projects
- One project → many tasks
- One user → can be assigned to many tasks

---

## 6. API Endpoints (REST)

**Authentication:**

- `POST /auth/login` → handled by Clerk
- `POST /auth/signup` → handled by Clerk

**Clients:**

- `GET /clients` → list clients
- `POST /clients` → create client
- `GET /clients/:id` → get client details
- `PUT /clients/:id` → update client
- `DELETE /clients/:id` → delete client

**Projects:**

- `GET /projects` → list projects
- `POST /projects` → create project
- `GET /projects/:id` → project details
- `PUT /projects/:id` → update project
- `DELETE /projects/:id` → delete project

**Tasks:**

- `GET /tasks` → list tasks
- `POST /tasks` → create task
- `GET /tasks/:id` → task details
- `PUT /tasks/:id` → update task
- `DELETE /tasks/:id` → delete task

**Activity Logs:**

- `GET /activity-logs` → list logs (Admin only)

**Reports:**

- `GET /reports/csv` → generate CSV report
- `GET /reports/pdf` → generate PDF report

---

## 7. Frontend Page Structure

- **Login / Signup** → Clerk integration
- **Admin Dashboard** → KPI cards + charts + filters
- **Staff Dashboard** → assigned tasks + projects
- **Client Dashboard** → view-only projects/tasks
- **Clients Page** → CRUD table
- **Projects Page** → CRUD table, project details page
- **Tasks Page** → CRUD table, task details page
- **Activity Logs Page** → Admin only
- **Reports Page** → generate/download CSV & PDF

---

## 8. Deliverables

1. Fully coded MERN + TypeScript OpsDash project
2. PostgreSQL database with all tables and relations
3. REST API endpoints implemented with role-based access
4. Frontend dashboards and CRUD pages
5. Clerk authentication integrated
6. CSV and PDF report generation
7. Activity logging system
8. Local dev setup instructions

---

## 9. Milestones

1. **Week 1–2:** Backend schema, Clerk integration, basic REST APIs
2. **Week 3:** Frontend dashboards (Admin + Staff + Client), CRUD pages
3. **Week 4:** Search/filter functionality, activity logging, dashboard KPIs
4. **Week 5:** Reports (CSV & PDF), advanced charts, UI polish
5. **Week 6:** Testing, bug fixes, final deployment-ready project

---

## 10. Notes

- All features should be **modular**, allowing future expansion (new roles, subtasks, AI features).
- Focus on **production-readiness and maintainability**, not experimental fancy features.
- Use **Clerk dev mode** during development to minimize internet latency issues.

---

\*\*End
