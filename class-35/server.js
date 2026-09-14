const express = require('express')
const app = express()

app.use(express.json());

let students = [
    {id:1, name:"Ali"},
    {id:2, name:"Ahmad"}
]

app.get('/students', (req, res) => {
    res.json(students);
});

app.post('/students', (req, res) => {
    const student = req.body;
    students.push(student);
    res.send('Student added successfully');
});

app.listen(3000, () => {
    console.log('server is running');
})