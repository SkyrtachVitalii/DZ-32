const myPetUrl = "https://petstore.swagger.io/v2/pet/findByStatus?status=";

document.getElementById("searchMyPet").addEventListener("click", searchMyPet);


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

async function searchMyPet(){
    document.getElementById("myPets").innerHTML = "";
    let myForm = document.forms.searchMyPet;
    let petStatus = myForm.petStatus.value;

    let myRes = await fetch(`${myPetUrl}${petStatus}`);
    let myData = await myRes.json();
    console.log(myData);

    try{
        let attr = [{
            name: "src",
            value: "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg"
        }, {
            name: "alt",
            value: "------"
        }]

        myData.forEach((element, index) =>{
            let myPetItem = createNodeElem("div", ["user__item"]);
            let myPetName = createNodeElem("div", ["user__name"], "Name: " + myData[index].name);
            let myPetId = createNodeElem("div", ["user__phone"], "ID: " + myData[index].id);
            let myPetStatus = createNodeElem("div", ["user__phone"], "Status: " + myData[index].status);          
        
            if(!myData[index].photoUrls[0]){
                myPetImg = createNodeElem("img", ["user__img"], "", [{name: "src", value: "images/invalid_img_src.jpg"}]);
            }else{
                myPetImg = createNodeElem("img", ["user__img"], "", [{name: "src", value: myData[index].photoUrls[0]}]);
            }

            myPetItem.append(myPetImg, myPetName, myPetId, myPetStatus);
            document.getElementById("myPets").appendChild(myPetItem);
        })
    }catch (e){
        console.log(e);
        document.getElementById("myPets").innerText = "???????????????? ???? ????????????????";
    }
}