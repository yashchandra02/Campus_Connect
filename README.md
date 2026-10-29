# Campus Connect Backend

Express + SQLite API intended to support the Campus Connect frontend.

## Requirements
- Node.js 18 or newer
- npm

## Run locally
1. Extract this backend folder alongside your frontend (or inside the frontend repository).
2. Open a terminal in this folder.
3. Install packages:
   ```bash
   npm install
   ```
4. Copy `.env.example` to `.env` and adjust `CLIENT_ORIGIN` if needed.
5. Start:
   ```bash
   npm start
   ```
6. Test `http://localhost:5000/api/health`.

The SQLite database is created automatically in `database/campus_connect.db` and seeded with the club/event examples from the supplied frontend.

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/clubs` | List clubs |
| GET | `/api/clubs/:id` | Club detail |
| POST | `/api/clubs` | Create club |
| GET | `/api/events` | List events; optional `?club=CodeCraft` or `?category=Workshop` |
| GET | `/api/events/:id` | Event detail |
| POST | `/api/events` | Create event |
| PUT | `/api/events/:id` | Update event |
| DELETE | `/api/events/:id` | Delete event |
| POST | `/api/registrations` | Register a student for an event |
| GET | `/api/registrations?event_id=1` | List registrations (admin use) |

### Example registration body
```json
{
  "event_id": 1,
  "student_name": "Student Name",
  "email": "student@example.com",
  "student_id": "1BMXX"
}
```

## Important integration note
Your supplied frontend currently stores club/event data directly in JavaScript and its admin login is a demo-only hardcoded check. This backend is ready as an API, but the frontend must be updated to call these endpoints with `fetch()` for the site to use persistent database data. The current backend does **not** implement secure admin authentication; protect admin create/update/delete and registration-list routes before deploying publicly. Do not commit `.env` or the generated database file.
