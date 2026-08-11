const numbers = [10, 20, 30, 40, 50];
const allGreaterThanFive = numbers.every((number) => {
    return number > 5;
})
console.log(allGreaterThanFive);