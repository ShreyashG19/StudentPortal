-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) CHECK (role IN ('student', 'teacher')) NOT NULL
);

-- Students Table
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE NOT NULL,
    class VARCHAR(50) NOT NULL,
    roll_number SERIAL UNIQUE,  -- auto-increment integer
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


-- Teachers Table
CREATE TABLE teachers (
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE NOT NULL,
    subject VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Attendance Table (Optional)
CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    date DATE NOT NULL,
    status VARCHAR(10) CHECK (status IN ('Present', 'Absent')) NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    UNIQUE (student_id, date) -- Ensures one attendance record per student per day
);
