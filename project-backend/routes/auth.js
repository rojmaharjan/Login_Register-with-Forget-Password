const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../db");
const cors = require("cors");
const axios = require("axios"); 
require("dotenv").config(); 

const router = express.Router();

router.use(cors());

// Registration Endpoint
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if email is already taken
    const [existingUser] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    res.json({ success: true, message: "Registration successful!" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Registration failed. Please try again." });
  }
});

// Login Endpoint
router.post("/login", async (req, res) => {
  const { email, password, recaptchaToken } = req.body;

  // Ensure email and password are provided
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // Verify reCAPTCHA only for login
    if (recaptchaToken) {
      const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
      const recaptchaURL = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${recaptchaToken}`;

      const response = await axios.post(recaptchaURL);
      if (!response.data.success) {
        return res.status(400).json({ error: "reCAPTCHA verification failed" });
      }
    }

    // Fetch user from database
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = rows[0];

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json({ success: true, message: "Login successful", user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Login failed. Please try again." });
  }
});

module.exports = router;
