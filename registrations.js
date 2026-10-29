const express = require("express");
const router = express.Router();
const { all, get, run } = require("../database");

router.post("/", async (req, res, next) => {
  try {
    const { event_id, student_name, email, student_id = "" } = req.body || {};
    if (!event_id || ![student_name, email].every(v => typeof v === "string" && v.trim())) {
      return res.status(400).json({ error: "event_id, student_name and email are required" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ error: "Enter a valid email address" });
    }
    const event = await get("SELECT id FROM events WHERE id = ?", [event_id]);
    if (!event) return res.status(404).json({ error: "Event not found" });
    const result = await run("INSERT INTO registrations(event_id,student_name,email,student_id) VALUES(?,?,?,?)",
      [event_id, student_name.trim(), email.trim().toLowerCase(), student_id.trim()]);
    res.status(201).json({ id: result.id, message: "Registration successful" });
  } catch (e) {
    if (e.message.includes("UNIQUE")) return res.status(409).json({ error: "This email is already registered for the event" });
    next(e);
  }
});
router.get("/", async (req, res, next) => {
  try {
    const { event_id } = req.query;
    const rows = event_id
      ? await all("SELECT * FROM registrations WHERE event_id = ? ORDER BY created_at DESC", [event_id])
      : await all("SELECT * FROM registrations ORDER BY created_at DESC");
    res.json(rows);
  } catch (e) { next(e); }
});
module.exports = router;
