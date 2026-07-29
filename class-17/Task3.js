let date = new Date();
let day = ["sun", "mon", "tue", "wed", "thi", "fri", "sat"];
day = day[date.getDay()];

if(day === "sun" || day === "sat"){
    console.log(`Today is ${day}. Enjoy! it's Weekend`);
}else{
    console.log(`Today is ${day}. Study Hard! it's a Working Day`);
}