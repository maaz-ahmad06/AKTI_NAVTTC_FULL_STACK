type Course = "Web Development" | "App Development" | " Graphic Design";
type StudentID = string | number;

interface Student {
  name: string;
  age: number;
  email: string;
  course: Course;
  id: StudentID;
}

let Student1: Student = {
  name: "Ali",
  age: 25,
  email: "ali@gmail.com",
  course: "Web Development",
  id: 201,
};
let Student2: Student = {
  name: "Ahmad",
  age: 25,
  email: "amad@gmail.com",
  course: "Web Development",
  id: 202,
};

console.log(Student1);
console.log(Student2);
