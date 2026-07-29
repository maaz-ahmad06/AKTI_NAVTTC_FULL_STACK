let day = 28;
let month = 1;

let today = new Date();
let currentMonth = today.getMonth() + 1;
let currentDate = today.getDate();

if(currentMonth === month && currentDate === day){
    console.log("Congratulations! Today is your Birthday.");
}
else if(currentMonth > month || (currentMonth === month && currentDate > day)){
    console.log("Wait for next year!");
}
else{
    console.log("Your birthday is coming soon!");
}