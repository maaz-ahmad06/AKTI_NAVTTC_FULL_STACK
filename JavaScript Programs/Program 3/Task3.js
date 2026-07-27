// Movie playlist Editor

let movies = ["Inception", "Avatar", "Titanic", "Joker", "Interstellar"];
console.log(movies);


// first three movies for the user
let newMovies = movies.slice(0, 3);
console.log(newMovies);
// last two movies are removed

// Adding "The Matrix" at the index 2 of the newMovies aray
newMovies.splice(2, 0, "The Matrix");
console.log(newMovies);
// "The Matrix" is added and the final list is printed