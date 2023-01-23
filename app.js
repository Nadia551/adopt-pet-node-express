const express = require('express')
const app = express()
const port = 3000
const router = express.Router();

const pets = require("./helper");

app.get('/', (req, res) => {
  res.send(`<h1>Adopt a pet</h1>
  <p>Browse through the links below to find your new furry friend</p>
  <ul>
   <li><a href="/animals/dogs">Dogs</a></li> 
   <li><a href="/animals/cats">Cats</a></li> 
   <li><a href="/animals/rabbits">Rabbits</a></li> 
  </ul>`)
})

app.get('/animals', (req, res) => {
  const responseHTML = `<h1>List of pets</h1>`;
  res.send(responseHTML);
});


app.get("/animals/:pet_type", function(req, res) {
  let html = "<ul>";
  let pet_type = req.params.pet_type;
  let id = 0;

  pets[pet_type].forEach(function(pet) {
    html += `<li><a href="/animals/${pet_type}/${id}">` + pet.name + "</a></li>";
    id +=1;
  });
  html += "</ul>";
  res.send(html);
});





app.get("/animals/:pet_type/:pet_id", function(req, res) {
  const pet_type = req.params.pet_type;
  const pet_id = req.params.pet_id;
  const pet = pets[pet_type][pet_id];

  res.send(`<h1>${pet.name}</h1><img src=${pet.url} /><p>${pet.description}</p>
  <ul><li>${pet.breed}</li><li>${pet.age}</li></ul>`)
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})