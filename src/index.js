const toyForm = document.getElementById("toy-form")
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
    updateLikes(toy)
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

toyForm.addEventListener('submit', toySubmit)

function toySubmit(e){
  e.preventDefault()
  console.log(e.target.image)
  let toyObj = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }
  console.log(toyObj)
  renderToy(toyObj)
  createToy(toyObj)
}

function createToy(toyObj){
  if (toyObj.name){
  console.log(JSON.stringify(toyObj))
  fetch('http://localhost:3000/toys',{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body:JSON.stringify(toyObj)
  })
  .then(res => res.json())
  .then(toy => console.log(toy))
  .catch((error) => {document.body.innerHTML(error)}
)}else{console.log('nothing')}
}

function updateLikes(toyObj){
  fetch(`http://localhost:3000/toys/${toyObj.id}`,{
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(toyObj)
  })
  .then(res => res.json())
  .then(toy => console.log(toy))
}