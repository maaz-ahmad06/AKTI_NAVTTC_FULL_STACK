let date = new Date();
let hours = date.getHours();

if(hours < 12){
    console.log("Good Morning");
}
else if(hours < 18){
    console.log("Good Afternoon");
}
else{
    console.log("Good Evening");
}