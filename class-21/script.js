// Objects

let student1 = {
    name: "maaz",
    age: 22,
    isStudent: true,
    greet: function(){
        console.log("hello!");
        
    }
}
console.log(student1.name);
console.log(student1.age);
console.log(student1.isStudent);
student1.greet();
console.log(Object.keys(student1));

// array of objects
let students = [
    {
        name: "maaz",
        age: 22,
        isStudent: true
    },
    {
        name: "ali",
        age: 24,
        isStudent: true
    }
];
console.log(students[0].name);
console.log(students[1].age);
console.log(Object.keys(students[1]));

// BOM(Browser Object Model) objects
// location object
// history object
// navigator object