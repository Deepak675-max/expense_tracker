console.log("person1: shows ticket");
console.log("person2: shows ticket");

const promiseWifeBringingTickets = new Promise((resolve, reject) => {
    setTimeout(() => resolve('ticket'), 3000);
})

let getPopcorn = promiseWifeBringingTickets.then((ticket) => {
    console.log(`wife: i have the ${ticket}`);
    console.log(`husband: we should go in`);
    console.log(`wife: no i am hungry`);
    return new Promise((resolve, reject) => resolve('popcorn'));
});



let addButter = getPopcorn.then((popcorn) => {
    console.log(`husband: i got some ${popcorn}`);
    console.log(`husband: we should go in`);
    console.log(`wife: i need butter on my popcorn`);
    return new Promise((resolve, reject) => resolve('butter'));
});

let getColdDrink = addButter.then((butter) => {
    console.log(`husband: i got some ${butter} on popcorn`);
    console.log(`husband: we should go in?`);
    console.log(`wife: i need cold drink`);
    return new Promise((resolve, reject) => resolve('cold drink'));
});

getColdDrink.then((coldDrink) => {
    console.log(`husband: i got some ${coldDrink}`);
    console.log(`husband: anything else darling?`);
    console.log(`wife: lets go we are getting late`);
    console.log(`husband: thank you for the reminder *grins*`);
    console.log('person3: shows ticket');
})

console.log("person4: shows ticket");
console.log("person5: shows ticket");
