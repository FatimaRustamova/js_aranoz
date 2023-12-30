// ---Details---//
let id = new URLSearchParams(window.location.search).get("id");
let details =  document.querySelector(".details");

fetch(`http://localhost:3000/aranoz/${id}`)
.then(res => res.json())
.then(data => {
    details.innerHTML = `
    <div class="quartz">
        <div class="img">
            <img src="${data.image}" alt="">
        </div>
        <div class="about">
            <h3>${data.name}</h3>
            <p>${data.price}</p>
        </div>
    </div>
    `
})