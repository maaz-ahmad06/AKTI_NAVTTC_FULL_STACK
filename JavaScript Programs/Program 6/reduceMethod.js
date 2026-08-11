// using reduce() to find the total price
const prices = [500, 1200, 800, 1500];
const totalPrice = prices.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
},0);
console.log(totalPrice);