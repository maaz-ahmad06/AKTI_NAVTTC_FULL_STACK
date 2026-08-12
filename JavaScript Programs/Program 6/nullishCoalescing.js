const user = {
name: null,
city: "Peshawar"
};
console.log(user?.name ?? "Unknown");
console.log(user?.city ?? "Unknown");