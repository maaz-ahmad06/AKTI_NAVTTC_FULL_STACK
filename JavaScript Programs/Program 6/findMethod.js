const numbers = [10, 25, 40, 55, 70];
const firstGreaterThan50 = numbers.find((number) => {
    return number > 50;
})
console.log(firstGreaterThan50);