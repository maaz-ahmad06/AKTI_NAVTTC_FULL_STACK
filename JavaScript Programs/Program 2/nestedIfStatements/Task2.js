let price = prompt("Enter the price of a product:");
let memberShip = prompt("What is your membership staus: (Gold/Platinum)");

if(price>=1000){
    if(memberShip==="Gold" || memberShip==="Platinum"){
        console.log("You eligible for a discount!");
    }else{
        console.log("You are not in membership, so you are not eligible");
    }
}else{
    console.log("price is low, so you are not eligible");
}