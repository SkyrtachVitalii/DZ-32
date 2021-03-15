let authButton = document.getElementById("login");
const usersUrl = "https://jsonplaceholder.typicode.com/users";

// console.log(authButton);

if(authButton){
authButton.addEventListener("click", logIn);
}

function logIn(){
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let user = {
        username,
        password,
        role: "admin",
        token: "Baerer dsofjsdoijfsdiofjsdiofjsdoigjsdo"
    }
    // console.log(user);

    localStorage.setItem("user", JSON.stringify(user));
    // console.log(localStorage.getItem("user"));
    window.location.href = "index.html"
}

document.addEventListener("DOMContentLoaded", function() {
    let userElem = document.getElementById("user");
    if(userElem){
        let user = JSON.parse(localStorage.getItem('user'));
        console.log(user);
    }
  });



document.addEventListener("DOMContentLoaded", () => {
    let userElem = document.getElementById("user");
    console.log(localStorage.getItem("user"));
    if(userElem){
        
        let user = JSON.parse(localStorage.getItem("user"));
        console.log(user);
        userElem.innerText = "Привіт " + user.username;
    }
    let usersContainer = document.getElementById("users");
    if(usersContainer){
        getUsers()
    }
});

async function getUsers(){
    try{
        let response = await fetch(usersUrl);
        let data = await response.json();
        appendAllUsers(data);
    } catch(e){
        console.log(e)
    } finally {

    }
} 

function appendAllUsers(users){
    console.log(users)

    users.forEach(user =>{
        let userItem = createNodeElem("div", ["user__item"]);
        let attr = [{
            name: "src",
            value: "https://img.icons8.com/bubbles/2x/user-male.png"
        }, {
            name: "alt",
            value: user.name
        }]
        let imgElem = createNodeElem("img", ["user__img"], "", attr);
        let nameElem = createNodeElem("div", ["user__name"], user.name);
        let emailElem = createNodeElem("div", ["user__email"], user.email);
        let phoneElem = createNodeElem("div", ["user__phone"], user.phone);

        userItem.append(imgElem, nameElem, emailElem, phoneElem);

        document.getElementById("users").appendChild(userItem);
    })
}




function createNodeElem(type, classes, content, attributes){
    let node = document.createElement(type);
    classes.forEach(classItem => {
        node.classList.add(classItem);
    })
    if(content){
        node.innerText = content;
    }
    if(attributes && attributes.length > 0){
        attributes.forEach(attribute =>{
            node.setAttribute(attribute.name, attribute.value)
        })
    }
    return node;
}

const getPetUrl = "https://petstore.swagger.io/v2/pet/";

document.getElementById("searchPet").addEventListener("click", searchPet);

async function searchPet(){
    document.getElementById("pets").innerHTML = "";
    // console.log(document.forms.searchPet.petId.value)
    let form = document.forms.searchPet;
    let id = form.petId.value;
    try{
        let response = await fetch(`${getPetUrl}${id}`);
        let data = await response.json();
        console.log(data);

        let petItem = createNodeElem("div", ["user__item"]);
        let imgElem = createNodeElem("img", ["user__img"], "", [{name: "src", value: data.photoUrls[0]}]);
        let nameElem = createNodeElem("div", ["user__name"], data .name);

        petItem.append(imgElem, nameElem);
        document.getElementById("pets").appendChild(petItem);
    } catch (e){
        console.log(e);
        document.getElementById("pets").innerText = "Нічого не знайдено!!!";
    }
} 


