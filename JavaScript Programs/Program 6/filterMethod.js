const ages = [12, 18, 25, 15, 30, 17, 22];
const adults = ages.filter((age) => {
    return age > 18;
})
console.log(adults);