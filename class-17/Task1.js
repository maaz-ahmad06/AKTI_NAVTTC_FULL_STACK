let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
let currentDate = date.getDate();
let day = ["sun", "mon", "tue", "wed", "thi", "fri", "sat"];
day = day[date.getDay()];
let time = date.toLocaleTimeString();

console.log(`Year: ${year} \n Month: ${month} \n Date: ${currentDate} \n Day: ${day} \n Time: ${time}`);
