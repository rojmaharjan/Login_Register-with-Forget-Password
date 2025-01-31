const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../db");
const cors = require("cors");
const axios = require("axios"); // ✅ Import axios
require("dotenv").config(); // ✅ Load environment variables

const router = express.Router();

// Apply CORS to all routes in this file
router.use(cors());

// ✅ Register Route
router.post("/register", async (req, res) => {
  const { name, email, password, recaptchaToken } = req.body;

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Verify reCAPTCHA
  const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
  const recaptchaURL = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${recaptchaToken}`;

  try {
    const response = await axios.post(recaptchaURL);
    if (!response.data.success) {
      return res.status(400).json({ error: "reCAPTCHA verification failed" });
    }

    // ✅ Insert User into MySQL
    await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    res.json({ success: true, message: "Registration successful!" });
  } catch (error) {
    console.error("❌ Error during registration:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

// ✅ Login Route
router.post("/login", async (req, res) => {
  const { email, password, recaptchaToken } = req.body;

  // Verify reCAPTCHA
  const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
  const recaptchaURL = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${recaptchaToken}`;

  try {
    const response = await axios.post(recaptchaURL);
    if (!response.data.success) {
      return res.status(400).json({ error: "reCAPTCHA verification failed" });
    }

    // ✅ Fetch User from MySQL
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = rows[0];

    // ✅ Check Password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json({ success: true, message: "Login successful", user });
  } catch (error) {
    console.error("❌ Error during login:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
