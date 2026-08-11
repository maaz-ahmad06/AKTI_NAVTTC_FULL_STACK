const marks = [45, 62, 38, 71, 55];
const hasPassed = marks.some((mark) => {
    return mark >= 70;
})
console.log(hasPassed);