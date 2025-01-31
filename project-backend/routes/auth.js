const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../db");
const cors = require("cors"); // Import cors
const router = express.Router();

// Apply CORS to this route specifically
router.post("/register", cors(), async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );
    res.json({ success: true, message: "Registration successful!" });
  } catch (error) {
    console.error("Error during registration:", error); // Log the error
    res.status(500).json({ error: "Registration failed" });
  }
});

// Apply CORS to this route specifically
router.post("/login", cors(), async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
