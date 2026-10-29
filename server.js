require("dotenv").config();
const express = require("express");
const cors = require("cors");
const clubsRouter = require("./routes/clubs");
const eventsRouter = require("./routes/events");
const registrationsRouter = require("./routes/registrations");
const { initializeDatabase } = require("./database");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_ORIGIN ? process.env.CLIENT_ORIGIN.split(",") : true
}));
app.use(express.json({ limit: "1mb" }));

app.get("/", (_req, res) => {
  res.json({ name: "Campus Connect API", status: "running", version: "1.0.0" });
});
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/clubs", clubsRouter);
app.use("/api/events", eventsRouter);
app.use("/api/registrations", registrationsRouter);

app.use((req, res) => res.status(404).json({ error: "Endpoint not found" }));
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

initializeDatabase()
  .then(() => app.listen(PORT, () => console.log(`Campus Connect API running on port ${PORT}`)))
  .catch(err => {
    console.error("Database initialization failed:", err);
    process.exit(1);
  });
