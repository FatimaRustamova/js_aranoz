// ---Update Data---//
let id = new URLSearchParams(window.location.search).get("id");
let form = document.querySelector("#form");
let image = document.querySelector("#image");
let name = document.querySelector("#name");
let price = document.querySelector("#price");
let file = document.querySelector("input[type=file]");

fetch(`http://localhost:3000/aranoz/${id}`)
.then(res => res.json())
.then(data => {
    image.src = data.image,
    name.value = data.name,
    price.value = data.price
})

file.addEventListener("input", (e)=>{
    let file = e.target.files[0];
    if(file){
        let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = ()=> {
            image.src = reader.result
        }
    }
})

form.addEventListener("submit", (event)=> {
    event.preventDefault();
    let obj = {
        image: image.src,
        name: name.value,
        price: price.value
    }
    axios.patch(`http://localhost:3000/aranoz/${id}`, obj)
    .then(res => {
        window.location = "./index.html"
    })
})

//---Go Back---//
let back = document.querySelector(".back");

back.addEventListener("click", ()=>{
    window.location = "./index.html"
})