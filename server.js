import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// MySQL database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hospital_db" 
});

db.connect((err) => {
    if (err) {
        console.log("Database connection failed");
    } else {
        console.log("MySQL connected successfully to hospital_db");
    }
});

// ------------------ BOOK APPOINTMENT POST API ------------------
app.post("/book-appointment", (req, res) => {
    const { patient_name, doctor_name, appointment_date, appointment_time } = req.body;

    const sql = `
        INSERT INTO appointments (patient_name, doctor_name, appointment_date, appointment_time)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [patient_name, doctor_name, appointment_date, appointment_time], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Database error" });
        }
        res.json({
            message: "Appointment booked successfully!",
            patient: patient_name,
            doctor: doctor_name
        });
    });
});

app.get("/", (req, res) => {
    res.send("Hospital API is working");
});

// Start Server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
