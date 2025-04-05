# HandyHood

**HandyHood** is a community-based web application where neighbors help each other by volunteering to fix small household issues. Whether it's fixing a leaky tap, assembling furniture, or walking a pet, HandyHood allows people to post tasks and get help from others nearby.

## Features

- User authentication (signup/login)
- Post and view household help tasks
- View and assign tasks to users
- Responsive UI built with React
- Secure password storage using encryption in SQL Server

---

## Project Structure

```
HandyHood/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── db/
│   ├── server.js
│   ├── .env
|   └── index.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── database/
│   ├── ddl.sql
│   └── dml.sql
│
├── diagrams/
│   ├──Logical ERD.png
│   └──Conceptual ERD.png
│
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js** and **npm** installed
- **SQL Server** running locally or on Docker
- **VS Code** or any code editor

---

## Backend Setup (Node.js + SQL Server)

1. Go to the `backend/` folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with:
   ```env
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_SERVER=localhost
   DB_DATABASE=HandyHood
   JWT_SECRET=your_jwt_secret
   ```

4. Run the server:
   ```bash
   node index.js
   ```

---

## Frontend Setup (React)

1. Go to the `frontend/` folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Visit [http://localhost:3000](http://localhost:3000)

---
## Conceptual & Logical Diagrams

- `Conceptual ERD.png`: Entity Relationship Diagram 
- `Logical ERD.png`: Logical flow (Login > Post Task > Assign)

---

## Future Enhancements

- Task comments and updates
- Location-based filtering
- Notifications and reminders
- Admin dashboard

---

## License

MIT License

