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

  const toyHeader = document.createElement('h2')
  toyHeader.textContent = toy.name
  card.appendChild(toyHeader)

  const toyImage = document.createElement('img')
  toyImage.className = "toy-avatar"
  toyImage.src = toy.image
  card.appendChild(toyImage)

  const toyLikes = document.createElement('p')
  toyLikes.textContent = `${toy.likes} Likes`
  card.appendChild(toyLikes)

  const toyButton = document.createElement('button')
  toyButton.addEventListener('click', () => {
    toy.likes++
    toyLikes.textContent = `${toy.likes} Likes`
    console.log(toy.likes)
  })
  toyButton.textContent = 'Like ❤️'
  card.appendChild(toyButton)

  toyList.appendChild(card)
}

function getAllToys(){
  fetch(`http://localhost:3000/toys`)
  .then(res => res.json())
  .then(toys => toys.forEach(toy => renderToy(toy)))
}

getAllToys()

// innerHTML = `
//   <img class="toy-avatar" src = "${toy.image}">
//   `