# 📚 Student Attendance Management System

A simple and efficient **full-stack web application** to manage student information and daily attendance.
This project is built using:

* **React.js** (Frontend)
* **Node.js + Express** (Backend API)
* **MySQL** (Database)

---

## 🚀 Features

### ✔ Student Management

* Add new students
* View all students
* Store roll number, name, class

### ✔ Attendance Management

* Mark attendance (Present/Absent)
* Select student, date, and status
* View attendance by date
* View attendance history of any student

### ✔ Backend API

* REST API using Express
* CRUD operations
* MySQL relational database
* CORS enabled
* Cleanly structured routes

---

## 📂 Project Structure

```
attendance-system/
│
├── client/            # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── components (optional)
│   └── package.json
│
├── server/            # Node.js Backend
│   ├── index.js
│   ├── package.json
│   └── .env           # (Database credentials)
│
└── README.md
```

---

## 🛠️ Technologies Used

### **Frontend**

* React.js
* Axios
* CSS

### **Backend**

* Node.js
* Express.js
* MySQL2
* dotenv

### **Database**

* MySQL Workbench / MySQL Server

---

## 🗄️ Database Schema

### **students**

| Column  | Type         |
| ------- | ------------ |
| id      | INT (PK)     |
| name    | VARCHAR(100) |
| roll_no | VARCHAR(20)  |
| class   | VARCHAR(20)  |

### **attendance**

| Column     | Type                      |
| ---------- | ------------------------- |
| id         | INT (PK)                  |
| student_id | INT (FK → students.id)    |
| date       | DATE                      |
| status     | ENUM('Present', 'Absent') |

---

## ▶️ How to Run the Project

### **1️⃣ Clone the Repository**

```
git clone https://github.com/AminaAziz220/attendance-system.git
cd attendance-system
```

---

### **2️⃣ Setup Backend**

```
cd server
npm install
```

Create a **.env** file inside `/server`:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=student
```

Start backend:

```
npm run dev
```

Backend runs at:
👉 **[http://localhost:5000](http://localhost:5000)**

---

### **3️⃣ Setup Frontend**

```
cd ../client
npm install
npm start
```

Frontend runs at:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 📌 API Endpoints

### Students

| Method | Endpoint  | Description       |
| ------ | --------- | ----------------- |
| GET    | /students | Get all students  |
| POST   | /students | Add a new student |

### Attendance

| Method | Endpoint                | Description                |
| ------ | ----------------------- | -------------------------- |
| POST   | /attendance             | Mark attendance            |
| GET    | /attendance/date/:date  | View attendance by date    |
| GET    | /attendance/student/:id | View attendance by student |

---

## 🎥 Demo (Optional)

*Add screenshots of UI if needed.*

---

## 📌 Future Enhancements

* Attendance analytics dashboard
* Export attendance to Excel
* Authentication for teachers
* Monthly attendance report

---

## 📝 License

This project is free to use for learning and academic purposes.
