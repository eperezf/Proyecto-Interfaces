const fs = require('fs');

let catalog = document.getElementById('plants-catalog')

let basePath = __dirname.split('Electron')[0] + 'Electron'
let plants = []
fs.readFile(basePath + '/txt/plants.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  data = data.split('\n')
  for (let plant of data) {
    plant = plant.split(',')
    plants.push({
        name: plant[0],
        scientificName: plant[1],
        src: basePath + '/img/'+ plant[2]
      })
  }
  plants.map(plant => {
    var plantCard = document.createElement('div')
    plantCard.className = 'col-md-6'
    plantCard.innerHTML = renderPlantCard(plant)
    catalog.appendChild(plantCard)
  })
});

createNavbar('plants')

let addPlantBtn = document.getElementById('addPlantBtn')

addPlantBtn.addEventListener('click', () => {
  remote
    .getCurrentWindow()
    .loadURL(
      'file://' + __dirname.split('Electron')[0] + 'Electron/Pages/Plants/AddPlant/index.html'
    )
})
