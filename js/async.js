// async function getTrue(){
//     return true;
// }

// const { reject } = require("async");

// getTrue().then(res => {
//     console.log(res);
// })

const delay = ms => {
    return new Promise((resolve, reject) => setTimeout(() => resolve(), ms));
}

// delay(3000).then(() => console.log("after 3 sec"));

const url = "https://jsonplaceholder.typicode.com/users";

// function fetchUsers(){
//     return delay(3000).then(() => {
//         return fetch(url).then(response => response.json())
//     })

// }

// fetchUsers().then(res => {
//     console.log(res);
// })

async function asyncFetchUsers(){
    console.log("Старт");
    try{
        // await delay(1000);
        let response = await fetch(url);
        data = await response.json();
        console.log(data);
    } catch (e){
        console.log(e)
    } finally {
        console.log("we are here")
    }
    
}

asyncFetchUsers();