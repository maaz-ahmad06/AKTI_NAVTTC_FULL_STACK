const numbers = [10, 20, 30, 40, 50];

function calculateSum(...nums){
    let total = 0;
    for (let i = 0; i < nums.length; i++) {
        total += nums[i];
    }
    return total;
}

console.log(calculateSum(...numbers));