import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);

  const [newStudent, setNewStudent] = useState({
    name: "",
    roll_no: "",
    class: ""
  });

  const [attendance, setAttendance] = useState({
    student_id: "",
    date: "",
    status: ""
  });

  const [searchDate, setSearchDate] = useState("");
  const [attendanceList, setAttendanceList] = useState([]);

  // =======================
  // Fetch all students
  // =======================
  const fetchStudents = async () => {
    const response = await axios.get("http://localhost:5000/students");
    setStudents(response.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // =======================
  // Add student
  // =======================
  const addStudent = async () => {
    if (!newStudent.name || !newStudent.roll_no || !newStudent.class) {
      alert("Fill all student fields!");
      return;
    }

    await axios.post("http://localhost:5000/students", newStudent);

    alert("Student Added!");
    setNewStudent({ name: "", roll_no: "", class: "" });
    fetchStudents();
  };

  // =======================
  // Mark attendance
  // =======================
  const markAttendance = async () => {
    if (!attendance.student_id || !attendance.date || !attendance.status) {
      alert("Fill all attendance fields!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/attendance", attendance);
      alert("Attendance Submitted!");
      setAttendance({ student_id: "", date: "", status: "" });
    } catch (err) {
      console.error(err);
      alert("Error submitting attendance");
    }
  };

  // =======================
  // Fetch attendance by date
  // =======================
  const fetchAttendanceByDate = async () => {
    if (!searchDate) {
      alert("Select a date");
      return;
    }

    const response = await axios.get(
      `http://localhost:5000/attendance/date/${searchDate}`
    );
    setAttendanceList(response.data);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px" }}>
      <h1>Student Attendance System</h1>

      {/* ===============================
            ADD STUDENT
      =============================== */}
      <h2>Add Student</h2>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newStudent.name}
          onChange={(e) =>
            setNewStudent({ ...newStudent, name: e.target.value })
          }
        />
        <br />

        <input
          type="text"
          placeholder="Roll No"
          value={newStudent.roll_no}
          onChange={(e) =>
            setNewStudent({ ...newStudent, roll_no: e.target.value })
          }
        />
        <br />

        <input
          type="text"
          placeholder="Class"
          value={newStudent.class}
          onChange={(e) =>
            setNewStudent({ ...newStudent, class: e.target.value })
          }
        />
        <br />

        <button onClick={addStudent}>Add Student</button>
      </div>

      {/* ===============================
            SHOW STUDENTS
      =============================== */}
      <h2>All Students</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Roll No</th>
            <th>Class</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.roll_no}</td>
              <td>{s.class}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ===============================
            MARK ATTENDANCE
      =============================== */}
      <h2>Mark Attendance</h2>
      <div>
        <input
          type="number"
          placeholder="Student ID"
          value={attendance.student_id}
          onChange={(e) =>
            setAttendance({ ...attendance, student_id: e.target.value })
          }
        />
        <br />

        <input
          type="date"
          value={attendance.date}
          onChange={(e) =>
            setAttendance({ ...attendance, date: e.target.value })
          }
        />
        <br />

        <select
          value={attendance.status}
          onChange={(e) =>
            setAttendance({ ...attendance, status: e.target.value })
          }
        >
          <option value="">Select Status</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
        <br />

        <button onClick={markAttendance}>Submit Attendance</button>
      </div>

      {/* ===============================
            VIEW ATTENDANCE BY DATE
      =============================== */}
      <h2>Attendance by Date</h2>
      <div>
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <button onClick={fetchAttendanceByDate}>Search</button>
      </div>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Class</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceList.map((a, i) => (
            <tr key={i}>
              <td>{a.name}</td>
              <td>{a.roll_no}</td>
              <td>{a.class}</td>
              <td>{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
