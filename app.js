const express = require("express");
const app = express();
const PORT = 3002;

// Middleware to parse incoming JSON payloads
app.use(express.json());

// In-memory array acting as our database
const students = [];

// 1. Add a new student
app.post("/students", (req, res) => {
    const { name, age, major, email, stateOfOrigin, nationality, regNo } = req.body;

    // Validate required fields
    if (!name || !age || !regNo) {
        return res.status(400).json({ error: "Name, age, and registration number (regNo) are required" });
    }

    const newStudent = {
        id: Date.now(), // Unique system ID
        name,
        age,
        major: major || "Undeclared",
        email: email || "N/A",
        stateOfOrigin: stateOfOrigin || "N/A",
        nationality: nationality || "Nigerian",
        regNo
    };

    students.push(newStudent);
    res.status(201).json(newStudent);
});

// 2. Get all students
app.get("/students", (req, res) => {
    res.json(students);
});

// 3. Get a student by ID
app.get("/students/:id", (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find((s) => s.id === studentId);

    if (!student) {
        return res.status(404).json({ error: "Student not found" });
    }

    res.json(student);
});

// 4. Update student information
app.put("/students/:id", (req, res) => {
    const studentId = parseInt(req.params.id);
    const { name, age, major, email, stateOfOrigin, nationality, regNo } = req.body;

    const student = students.find((s) => s.id === studentId);

    if (!student) {
        return res.status(404).json({ error: "Student not found" });
    }

    if (name) student.name = name;
    if (age) student.age = age;
    if (major) student.major = major;
    if (email) student.email = email;
    if (stateOfOrigin) student.stateOfOrigin = stateOfOrigin;
    if (nationality) student.nationality = nationality;
    if (regNo) student.regNo = regNo;

    res.json(student);
});

// 5. Delete a student
app.delete("/students/:id", (req, res) => {
    const studentId = parseInt(req.params.id);
    const index = students.findIndex((s) => s.id === studentId);

    if (index === -1) {
        return res.status(404).json({ error: "Student not found" });
    }

    students.splice(index, 1);
    res.json({ message: "Student deleted successfully" });
});

app.listen(PORT, () => {
    console.log(`Student API running at http://localhost:${PORT}`);
});