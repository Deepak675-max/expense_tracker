console.log("person1: shows ticket");
console.log("person2: shows ticket");

const preMovie = async () => {

    const promiseWifeBringingTickets = new Promise((resolve, reject) => {
        setTimeout(() => resolve('ticket'), 3000);
    })

    const getPopcorn = new Promise((resolve, reject) => resolve('ticket'));
    const addButter = new Promise((resolve, reject) => resolve('butter'));
    const getColdDrink = new Promise((resolve, reject) => resolve('cold drink'));



    let ticket = await promiseWifeBringingTickets;

    console.log(`wife: i have the ${ticket}`);
    console.log(`husband: we should go in`);
    console.log(`wife: no i am hungry`);

    let popcorn = await getPopcorn;

    console.log(`husband: i got some ${popcorn}`);
    console.log(`husband: we should go in`);
    console.log(`wife: i need butter on my popcorn`);

    let butter = await addButter;

    console.log(`husband: i got some ${butter} on popcorn`);
    console.log(`husband: we should go in`);
    console.log(`husband: i need cold drink`);

    let coldDrink = await getColdDrink;

    console.log(`husband: i got ${coldDrink}`);
    console.log(`husband: anything else darling?`);
    console.log(`wife: lets go we are getting late`);
    console.log(`husband: thank you for the reminder *grins*`);

    return ticket;
}

preMovie().then((msg) => console.log(`person3: shows ${msg}`));

console.log("person4: shows ticket");
console.log("person5: shows ticket");
