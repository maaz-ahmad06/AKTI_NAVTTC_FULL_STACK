let siblings = prompt("How many siblings do you have?")

if(siblings > 5){
    console.log(`You have a big family, you have ${siblings} siblings`);
}
else if(siblings>=3 && siblings<=5){
    console.log(`You have a medium family, you have ${siblings} siblings`);
}
else if(siblings>=1 && siblings<=3){
    console.log(`You have a small family, you have ${siblings} siblings`);
}
else{
    console.log("it's ok if you have no family");   
}