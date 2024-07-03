Campus Pass
Description
Campus Pass is a revolutionary web application designed to simplify the process of generating outpasses for hostel students. With its intuitive interface and robust functionality, Campus Pass aims to streamline the outpass issuance process, making it hassle-free for both students and administrative staff.

Features
Multi-User Authentication: Secure login pages for students, tutors, HODs, and wardens.
Outpass Request Workflow: Students can submit outpass requests through the platform, which are then routed through a structured approval process involving tutors, HODs, and wardens.
Real-Time Status Updates: Students can track the status of their outpass requests in real-time through the checkStatus feature.
Offline Usage: Once approved, students can download their outpasses for offline use, providing convenience and flexibility.
Technologies Used
Frontend: React.js
Backend: Node.js, Express.js
Database: MongoDB
Styling: CSS, Bootstrap
API Endpoints
Student Endpoints
GET /Students: Retrieve all student details.

Response: Returns a JSON array of student personal details.
Status Codes: 200 on success, 500 on internal server error.
POST /StudentsLogin: Student login.

Request Body: { rollno, password }
Response: { message: "User found" } on successful login, { message: "No user found" } on failure.
Status Codes: 200 on success, 404 if user not found, 500 on internal server error.
POST /StudentsLogin: Save student login details.

Request Body: { rollno, password }
Response: { message: "user already existed" } if user already exists, { message: "record registered" } on successful registration.
Status Codes: 200 on success, 500 on internal server error.
PUT /Students/:id: Update student details.

Request Body: { isTutor }
Response: Returns the updated student details.
Status Codes: 200 on success, 500 on internal server error.
DELETE /Students/:id: Delete student.

Response: Returns the deleted student details.
Status Codes: 200 on success, 500 on internal server error.

Tutor Endpoints
POST /TutorLogin: Tutor login.
Request Body: { emailId, password }
Response: { message: 'Login successful' } on successful login, { error: 'Invalid staff ID or password' } on failure.
Status Codes: 200 on success, 401 on invalid credentials, 500 on internal server error.
PUT /Students/:id: Update student details.

Request Body: { isTutor }
Response: Returns the updated student details.
Status Codes: 200 on success, 500 on internal server error.
HOD Endpoints
POST /HodLogin: HOD login.

Request Body: { emailId, password }
Response: { message: 'Login successful' } on successful login, { error: 'Invalid hod ID or password' } on failure.
Status Codes: 200 on success, 401 on invalid credentials, 500 on internal server error.
PUT /HodUpdate/:id: Update HOD details.

Request Body: { isHod }
Response: Returns the updated student details.
Status Codes: 200 on success, 500 on internal server error.
Warden Endpoints
POST /WardenLogin: Warden login.

Request Body: { emailId, password }
Response: { message: 'Login successful' } on successful login, { error: 'Invalid warden ID or password' } on failure.
Status Codes: 200 on success, 401 on invalid credentials, 500 on internal server error.
PUT /WardenUpdate/:id: Update warden details.

Request Body: { isWarden }
Response: Returns the updated student details.
Status Codes: 200 on success, 500 on internal server error.
General Endpoints
POST /StudentsAdd: Add a new student.
Request Body: { name, rollNo, department, year, email, numberOfDays, outDate, inDate, roomNo, reason, place }
Response: { message: "Saved successfully" } on successful addition.
Status Codes: 200 on success, 500 on internal server error.

Installation
Prerequisites
Ensure you have the following installed:
Node.js
MongoDB
Git
