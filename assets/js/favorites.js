let favorites = document.querySelector("#favorites")

//---Favorites---//
fetch("http://localhost:3000/favorites")
.then(res => res.json())
.then(data => {
    data.forEach(element => {
        favorites.innerHTML += `
            <div class="quartz">
                <i class="bi bi-heart"></i>
                <div class="img">
                    <img src="${element.image}" alt="">
                </div>
                <div class="about">
                    <h3>${element.name}</h3>
                    <p>${element.price}</p>
                </div>
                <button onclick="deleteFav(${element.id})">Delete</button>
            </div>
        `
    })
})

function deleteFav(id) {
    axios.delete(`http://localhost:3000/favorites/${id}`);
    window.location.reload()
}

//---Go Back---//
let back = document.querySelector(".back");

back.addEventListener("click", ()=>{
    window.location = "./index.html"
})