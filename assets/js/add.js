// ---Add Data---//
let form = document.querySelector("#form");
let image = document.querySelector("#image");
let name = document.querySelector("#name");
let price = document.querySelector("#price");
let file = document.querySelector("input[type=file]");

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

form.addEventListener("submit", (event)=>{
    event.preventDefault();
    let obj = {};
    let reader = new FileReader();
    let src = file.files[0];

    reader.onload = (e)=>{
        obj = {
            image: e.target.result,
            name: name.value,
            price: price.value
        }
        axios.post("http://localhost:3000/aranoz", obj)
        .then(res => {
            window.location = "./index.html"
        })
    }

    reader.readAsDataURL(src);
})

//---Go Back---//
let back = document.querySelector(".back");

back.addEventListener("click", ()=>{
    window.location = "./index.html"
})