---
# OpsDash

OpsDash is a production-ready **internal operations dashboard** designed for small agencies and teams to manage clients, projects, and tasks efficiently. Built with **TypeScript MERN stack** and **PostgreSQL**, it includes **role-based access**, **activity logging**, and **report generation**.

---

## Features

- User authentication & role management via **Clerk**
- CRUD for **Clients, Projects, Tasks**
- **Activity logs** for all user actions
- **Admin, Staff, Viewer, Client dashboards**
- **Advanced filtering and search**
- **CSV & PDF report generation**
- Polished **enterprise-style UI** with charts & KPIs

---

## Tech Stack

- **Frontend:** React + Vite + TypeScript
- **Backend:** Node.js + Express + TypeScript
- **Database:** PostgreSQL
- **Authentication:** Clerk
- **Deployment-ready**: Configurable for production

---

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd opsdash
```

2. Install dependencies for backend and frontend:
```bash
cd backend
npm install
cd ../frontend
npm install
```

3. Set up PostgreSQL database and environment variables (`.env`):
```env
DATABASE_URL=postgresql://user:password@localhost:5432/opsdash
CLERK_API_KEY=<your-clerk-api-key>
```

4. Run the backend:
```bash
cd backend
npm run dev
```

5. Run the frontend:
```bash
cd frontend
npm run dev
```

6. Open the app in your browser: `http://localhost:5173`

---

## Folder Structure

```
opsdash/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── app.ts
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.tsx
│   └── package.json
├── .env
└── README.md
```

---

## Usage

- Admin can create clients, projects, tasks, view dashboards, and generate reports.
- Staff can manage assigned projects and tasks.
- Clients can view only their own projects and tasks.
- All actions are logged and can be viewed in activity logs (Admin only).

---

## Contribution

- Fork the repo
- Create your feature branch (`git checkout -b feature-name`)
- Commit your changes (`git commit -m 'Add feature'`)
- Push to the branch (`git push origin feature-name`)
- Create a Pull Request

---

## License

MIT License

