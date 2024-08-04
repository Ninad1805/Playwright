let card1 = 5
let card2 = 15
let sum = card1+card2

if(sum<21){
    console.log("Do you want to draw a new card");
}else if(sum===21){
    console.log("Congratulations you have a BlackJack");
}else if(sum>21){
    console.log("You are out of the game");
}
