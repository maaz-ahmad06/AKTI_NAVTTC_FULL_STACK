// Program to check if user is multilingual
let numLanguages = parseInt(prompt("How many languages do you speak?"));

if (numLanguages === 0) {
  console.log("You don't speak any languages yet. Start learning!");
} else if (numLanguages === 1) {
  let language = prompt("What language do you speak?");
  console.log("You speak: " + language + "\nYou are monolingual.");
} else {
  let languages = prompt("What languages do you speak? (separated by commas)\nExample: Urdu, English, Punjabi");
  console.log("You speak: " + languages + "\nYou know many languages!");
}