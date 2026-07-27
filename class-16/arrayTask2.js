let students = ["Ali", "Ahmad", "Sara"];
console.log(students);

students.push("Hmaza");
console.log(students);

console.log(students.indexOf("Sara"));

if(students.includes("Sara") === true){
    console.log("Sara is enrolled");
}else{
    console.log("Sara is not enrolled");
}