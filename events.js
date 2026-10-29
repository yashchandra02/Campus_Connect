const express = require("express");
const router = express.Router();
const { all, get, run } = require("../database");

const fields = ["title","club","date","time","location","description"];
router.get("/", async (req, res, next) => {
  try {
    const { club, category } = req.query;
    let sql = "SELECT * FROM events";
    const params = [];
    const conditions = [];
    if (club) { conditions.push("club = ?"); params.push(club); }
    if (category) { conditions.push("category = ?"); params.push(category); }
    if (conditions.length) sql += " WHERE " + conditions.join(" AND ");
    sql += " ORDER BY date, time";
    res.json(await all(sql, params));
  } catch (e) { next(e); }
});
router.get("/:id", async (req, res, next) => {
  try {
    const event = await get("SELECT * FROM events WHERE id = ?", [req.params.id]);
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (e) { next(e); }
});
router.post("/", async (req, res, next) => {
  try {
    const body = req.body || {};
    if (!fields.every(k => typeof body[k] === "string" && body[k].trim())) {
      return res.status(400).json({ error: "title, club, date, time, location and description are required" });
    }
    const data = fields.map(k => body[k].trim());
    const extras = ["category","rules","link","image"].map(k => body[k] || "");
    const result = await run("INSERT INTO events(title,club,date,time,location,description,category,rules,link,image) VALUES(?,?,?,?,?,?,?,?,?,?)",
      [...data, ...extras]);
    res.status(201).json(await get("SELECT * FROM events WHERE id = ?", [result.id]));
  } catch (e) { next(e); }
});
router.put("/:id", async (req, res, next) => {
  try {
    const existing = await get("SELECT * FROM events WHERE id = ?", [req.params.id]);
    if (!existing) return res.status(404).json({ error: "Event not found" });
    const body = { ...existing, ...req.body };
    if (!fields.every(k => typeof body[k] === "string" && body[k].trim())) {
      return res.status(400).json({ error: "Required event fields are missing" });
    }
    await run(`UPDATE events SET title=?,club=?,date=?,time=?,location=?,description=?,category=?,rules=?,link=?,image=? WHERE id=?`,
      [...fields.map(k => body[k].trim()), body.category || "", body.rules || "", body.link || "", body.image || "", req.params.id]);
    res.json(await get("SELECT * FROM events WHERE id = ?", [req.params.id]));
  } catch (e) { next(e); }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const result = await run("DELETE FROM events WHERE id = ?", [req.params.id]);
    if (!result.changes) return res.status(404).json({ error: "Event not found" });
    res.json({ message: "Event deleted" });
  } catch (e) { next(e); }
});
module.exports = router;
