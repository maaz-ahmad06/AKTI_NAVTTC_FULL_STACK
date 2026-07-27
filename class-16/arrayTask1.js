let cart = ["milk", "bread","eggs"];
console.log(cart);

cart.push("butter");
console.log(cart);

cart.shift();
console.log(cart);

if(cart.includes("eggs")){
    console.log("Eggs available in cart");
}else{
    console.log("Eggs not available");
}
console.log(cart);