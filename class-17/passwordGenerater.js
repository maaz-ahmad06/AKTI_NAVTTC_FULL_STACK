// password generater

let char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
let password = "";
let length = 8;

for (let i = 0; i < length; i++) {
  let random = Math.floor(Math.random() * char.length);
  password = password + char[random];
}

console.log(password);