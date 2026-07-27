let age = prompt("Enter your Age:");
let gradeLevel = +prompt("Enter your Grade level:(11/12)");
let gpa = prompt("Enter your GPA:");

if(age >= 17){
    if(gradeLevel===11 || gradeLevel===12){
        if(gpa>=3.5){
            console.log("You are eligible for Scholarship!");
        }else{
            console.log("Sorry, your gpa is less then 3.5");
        }
    }else{
        console.log("Sorry, your Grade level is not 11 or 12");
    }
}else{
    console.log("Sorry, you are under age")
}