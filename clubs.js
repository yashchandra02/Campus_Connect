const express = require("express");
const router = express.Router();
const { all, get, run } = require("../database");

router.get("/", async (_req, res, next) => {
  try { res.json(await all("SELECT * FROM clubs ORDER BY name")); } catch (e) { next(e); }
});
router.get("/:id", async (req, res, next) => {
  try {
    const club = await get("SELECT * FROM clubs WHERE id = ?", [req.params.id]);
    if (!club) return res.status(404).json({ error: "Club not found" });
    res.json(club);
  } catch (e) { next(e); }
});
router.post("/", async (req, res, next) => {
  try {
    const { name, category, description, image = "" } = req.body;
    if (![name, category, description].every(v => typeof v === "string" && v.trim())) {
      return res.status(400).json({ error: "name, category and description are required" });
    }
    const result = await run("INSERT INTO clubs(name,category,description,image) VALUES(?,?,?,?)",
      [name.trim(), category.trim(), description.trim(), image]);
    res.status(201).json(await get("SELECT * FROM clubs WHERE id = ?", [result.id]));
  } catch (e) {
    if (e.message.includes("UNIQUE")) return res.status(409).json({ error: "Club name already exists" });
    next(e);
  }
});
module.exports = router;
