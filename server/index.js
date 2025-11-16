// index.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '121121121', // your MySQL password
    database: 'student'
});

db.connect(err => {
    if (err) {
        console.log("Database connection error:", err);
    } else {
        console.log("MySQL connected");
    }
});

// Default route
app.get('/', (req, res) => {
    res.send("Attendance System Backend Running");
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});

// =======================
//  STUDENT ROUTES
// =======================

// Fetch all students
app.get("/students", (req, res) => {
    const query = "SELECT * FROM students ORDER BY id DESC";
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// Add new student
app.post("/students", (req, res) => {
    const { name, roll_no, class: studentClass } = req.body;

    const query = "INSERT INTO students (name, roll_no, class) VALUES (?, ?, ?)";
    db.query(query, [name, roll_no, studentClass], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Student added successfully", id: result.insertId });
    });
});


// =======================
//  ATTENDANCE ROUTES
// =======================

// Mark attendance
app.post("/attendance", (req, res) => {
    const { student_id, date, status } = req.body;

    const query = "INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?)";
    db.query(query, [student_id, date, status], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Attendance marked", id: result.insertId });
    });
});

// Get attendance for a date
app.get("/attendance/date/:date", (req, res) => {
    const date = req.params.date;

    const query = `
        SELECT a.id, s.name, s.roll_no, s.class, a.status
        FROM attendance a
        JOIN students s ON a.student_id = s.id
        WHERE a.date = ?
    `;

    db.query(query, [date], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// Get attendance for a single student
app.get("/attendance/student/:id", (req, res) => {
    const student_id = req.params.id;

    const query = `
        SELECT a.id, a.date, a.status, s.name
        FROM attendance a
        JOIN students s ON a.student_id = s.id
        WHERE student_id = ?
        ORDER BY a.date DESC
    `;

    db.query(query, [student_id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});
