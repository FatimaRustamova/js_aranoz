//---Data---//
let aranoz = document.querySelector(".aranoz");
let page = 8;
let search = document.querySelector("#search");
let arr_1 = [];
let arr_2 = [];

function getAllData (){
    fetch("http://localhost:3000/aranoz")
    .then(res => res.json())
    .then(data => {
        arr_2 = data;
        aranoz.innerHTML = "";
        arr_1 = arr_1.length || search.value ? arr_1 : data;
        arr_1.slice(0, page).forEach(element => {
            aranoz.innerHTML += `
                <div class="quartz">
                    <i class="bi bi-heart" onclick="getFavorites(${element.id})"></i>
                    <div class="img">
                        <img src="${element.image}" alt="">
                    </div>
                    <div class="about">
                        <h3>${element.name}</h3>
                        <p>${element.price}</p>
                    </div>
                    <button onclick="viewDetails(${element.id})">View Details</button>
                    <button onclick="deleteEl(${element.id})">Delete</button>
                    <button onclick="updateEl(${element.id})">Update</button>
                </div>
            `
        })
    })
}

getAllData();

//---View Details---//
function viewDetails(id) {
    window.location = `./details.html?id=${id}`
}

//---Delete---//
function deleteEl(id) {
    axios.delete(`http://localhost:3000/aranoz/${id}`);
    window.location.reload();
}

//---Update---//
function updateEl(id) {
    window.location = `./update.html?id=${id}`
}

//---Load More---//
let load = document.querySelector("#load");

load.addEventListener("click", ()=> {
    if(load.innerText == "Load More"){
        page +=4;
        aranoz.innerHTML = "";
        getAllData();
        load.innerText = "Less More"
    }
    else{
        page -=4;
        aranoz.innerHTML = "";
        getAllData();
        load.innerText = "Load More"
    }
})

//---Favorites---//
function getFavorites(id) {
    axios.get(`http://localhost:3000/aranoz/${id}`)
    .then(res => {
        axios.post("http://localhost:3000/favorites", res.data)
        alert("Your chosen element have been sent to Favorite Page");
    })
}

//---Search---//
search.addEventListener("input", (e)=>{
    arr_1 = arr_2;
    arr_1 = arr_1.filter((el)=> {
        el.name.toLowerCase().includes(e.target.value.toLowerCase())
    });
    getAllData();
})

//---Sort---//
let sort = document.querySelector("#sort");
let sorted = "descending";

sort.addEventListener("click", function(){
    if(sorted == "ascending"){
        arr_1.sort((a,b) => b.price - a.price);
        sorted = "descending";
        sort.innerHTML = "SORT ASC"
    }
    else if(sorted == "descending"){
        arr_1.sort((a,b) => a.price - b.price);
        sorted = "def";
        sort.innerHTML = "SORT DSC"
    }
    else{
        arr_1 = arr_2;
        sorted = "ascending";
        sort.innerHTML = "SORT"
    }
    getAllData();
})

//---Hurricane---//
let hurricane = document.querySelector(".hurricane");

window.addEventListener("scroll", ()=> {
    if(window.scrollY > 250){
        hurricane.style.visibility = "visible"
    }
    else{
        hurricane.style.visibility = ""
    }
})

hurricane.addEventListener("click", ()=> {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
})