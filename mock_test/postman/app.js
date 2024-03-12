const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let students = []; // Array to hold student details

// Routes for CRUD operations
// Read all students
app.get('/students', (req, res) => {
  res.json(students);
});

// Add a student
app.post('/students', (req, res) => {
  const student = req.body;
  // Basic validation to check if the student object has a name
  if (!student.name) {
    return res.status(400).send('Student name is required');
  }
  students.push(student);
  res.send('Student added');
});


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
