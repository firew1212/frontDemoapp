import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import "dotenv/config";
import pool from "./poolconfig.js";



const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Server running");
});

// ✅ ADD EMPLOYEE (PostgreSQL)
app.post("/addemployee", async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Request body is missing. Did you send JSON?"
    });
  }

  const { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO employee_test (first_name, last_name, email, password)
      VALUES ($1, $2, $3, $4)
    `;

    await pool.query(sql, [
      first_name,
      last_name,
      email,
      hashedPassword,
    ]);

    res.status(200).json({
      status: "success",
      message: "Employee added successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Database error",
    });
  }
});

// ✅ LOGIN (PostgreSQL)
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM employee_test WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      status: "success",
      message: "Login successful",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
