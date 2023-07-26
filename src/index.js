const toyButton = document.getElementById("create-toy")
const toyList = document.getElementById("toy-list")
let addToy = false;


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function newToy() {
  toyButton.addEventListener('click', (e) => {
    e.preventDefault()
    console.log("success?")
  })
}

newToy()

function renderToy(toy) {
  let card = document.createElement('li')
  card.className = ('card')
  card.innerHTML = `
  <img src = "${toy.image}"
  `
  toyList.appendChild(card)
}

function getAllToys(){
  fetch(`http://localhost:3000/toys/2`)
  .then(res => res.json())
  .then(toys => renderToy(toys))
}

getAllToys()