const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "database");
fs.mkdirSync(dataDir, { recursive: true });
const db = new sqlite3.Database(path.join(dataDir, "campus_connect.db"));

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
}
function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => err ? reject(err) : resolve(rows));
  });
}
function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => err ? reject(err) : resolve(row));
  });
}

async function initializeDatabase() {
  await run("PRAGMA foreign_keys = ON");
  await run(`CREATE TABLE IF NOT EXISTS clubs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT DEFAULT '',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`);
  await run(`CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    club TEXT NOT NULL,
    category TEXT DEFAULT '',
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    rules TEXT DEFAULT '',
    link TEXT DEFAULT '',
    image TEXT DEFAULT '',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`);
  await run(`CREATE TABLE IF NOT EXISTS registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id INTEGER NOT NULL,
    student_name TEXT NOT NULL,
    email TEXT NOT NULL,
    student_id TEXT DEFAULT '',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(event_id) REFERENCES events(id) ON DELETE CASCADE,
    UNIQUE(event_id, email)
  )`);

  const clubCount = await get("SELECT COUNT(*) AS count FROM clubs");
  if (clubCount.count === 0) {
    const clubs = [
      ["CodeCraft","TECHNOLOGY","Build projects, explore new technologies, and grow your coding skills together.","images/campus-hero.jpg"],
      ["Creative Canvas","ART & DESIGN","Explore your creativity through design, illustration, photography, and art.","images/campus-hero.jpg"],
      ["Echo Music Society","MUSIC","Connect with fellow music lovers, jam together, and perform on campus.","images/campus-hero.jpg"],
      ["Impact Collective","SOCIAL IMPACT","Make a difference through volunteering, community projects, and campus initiatives.","images/campus-hero.jpg"]
    ];
    for (const c of clubs) await run("INSERT INTO clubs(name,category,description,image) VALUES(?,?,?,?)", c);
  }

  const eventCount = await get("SELECT COUNT(*) AS count FROM events");
  if (eventCount.count === 0) {
    const events = [
      ["Buildathon 2026","CodeCraft","Workshop","2026-10-24","10:00 AM","Innovation Lab","Team up with fellow students to build creative solutions to real-world problems.","","", "images/campus-hero.jpg"],
      ["Design Your World","Creative Canvas","Workshop","2026-10-26","2:00 PM","Design Studio","Explore visual storytelling, creative thinking, and the fundamentals of design.","","", "images/campus-hero.jpg"],
      ["Campus Open Mic","Echo Music Society","Performance","2026-10-28","5:00 PM","Main Auditorium","Enjoy an evening of live music, singing, and performances by fellow students.","","", "images/campus-hero.jpg"],
      ["Green Campus Drive","Impact Collective","Community","2026-10-30","9:00 AM","College Garden","Join fellow volunteers for a campus clean-up and sustainability initiative.","","", "images/campus-hero.jpg"],
      ["Coding Night","CodeCraft","Meetup","2026-11-02","4:00 PM","Computer Lab 2","Share ideas, solve coding challenges, and learn from other student developers.","","", "images/campus-hero.jpg"],
      ["Creative Showcase","Creative Canvas","Exhibition","2026-11-05","12:00 PM","Student Centre","Discover original student artwork, photography, illustrations, and design projects.","","", "images/campus-hero.jpg"]
    ];
    for (const e of events) await run("INSERT INTO events(title,club,category,date,time,location,description,rules,link,image) VALUES(?,?,?,?,?,?,?,?,?,?)", e);
  }
}

module.exports = { db, run, all, get, initializeDatabase };
