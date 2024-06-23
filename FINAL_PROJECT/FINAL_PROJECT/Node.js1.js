const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt");

const app = express();
const port = 3000;

// Set up MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",  // Adjust user and password as needed
    password: "",
    database: "user_db",
});

db.connect((err) => {
    if (err) {
        console.error("Failed to connect to MySQL:", err);
        return;
    }
    console.log("Connected to MySQL.");
});

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint for user registration
app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10); // Encrypt password

    db.query(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, hashedPassword],
        (err, result) => {
            if (err) {
                console.error("Registration error:", err);
                res.status(500).send("Error registering user.");
            } else {
                res.status(201).send("User registered successfully.");
            }
        }
    );
});

// Endpoint for user login
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE username = ?",
        [username],
        async (err, results) => {
            if (err) {
                console.error("Login error:", err);
                res.status(500).send("Error during login.");
                return;
            }

            if (results.length === 0) {
                res.status(404).send("User not found. Please register.");
                return;
            }

            const user = results[0];
            const isPasswordCorrect = await bcrypt.compare(password, user.password);

            if (isPasswordCorrect) {
                res.status(200).send("Login successful.");
            } else {
                res.status(401).send("Incorrect password.");
            }
        }
    );
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
