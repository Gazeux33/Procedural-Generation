
let matrice = []

WIN_SIZE = 600;
SIZE = 600;
NOISE_STEP = 0.02;

colors = [
  {"color":"#052F66","name":"abyss"},               // abyss
  {"color":"#004AAD","name":"deep sea"},            // deep sea
  {"color":"#38B6FF","name":"sea"},                 // sea
  {"color":"#0CC0DF","name":"lagoon"},              // lagoon
  {"color":"#5CE1E6","name":"transparent water"},   // transparent water
  {"color":"#FFDE59","name":"beach"},               // beach
  {"color":"#FFBD59","name":"sand/land"},           // sand/land
  {"color":"#C28221","name":"land"},                // land
  {"color":"#96651B","name":"mud"},                 // mud
  {"color":"#7ED957","name":"light grass"},        // light grass
  {"color":"#05AD5C","name":"grass"},              // grass
  {"color":"#545454","name":"dark rock"},          // dark rock
  {"color":"#737373","name":"grey rock"},          // grey rock
  {"color":"#A6A6A6","name":"light grey rock"},    // light grey rock
  {"color":"#D9D9D9","name":"very light grey rock"},// very light grey rock
  {"color":"#FFFFFF","name":"snow"}        // snow
  ]

const gen_btn = document.getElementById('generate-button')
const save_btn = document.getElementById('save-button')


gen_btn.addEventListener('click', e=>{
  console.log("generating")
  fillMatrice()
  draw()
})

save_btn.addEventListener('click', e=>{
  console.log("saving")
  let timeStamp = 
            year() + "-" + month() + "-" + day() + 
            "-" + hour() + "-" + minute() + "-" + second() 
            + "-" + nf(millis(), 3, 0);

        save(timeStamp + '.png');
})



function setup() {
  let cnv = createCanvas(WIN_SIZE,WIN_SIZE);
  cnv.id('cnv');
  cnv.parent("canva-container")
  fillMatrice()
  printMatrice()
}

function draw() {
  drawMatrice()
  noLoop()
}

function printMatrice(){
  for(let x=0; x<matrice.length; x++){
    let row = "";
    for(let y=0; y<matrice[x].length; y++){
      row += matrice[x][y] + " ";
    }
    console.log(row);
  }
}

function fillMatrice(){
  console.log("filling matrice");
  noiseSeed(randomSeed())
  yoff = 0
  for(let x=0;x<SIZE;x++){
    xoff = 0
    matrice[x] = []
    for(let y=0;y<SIZE;y++){
      let colorValue = Math.round(map(noise(xoff,yoff), 0, 1, 0, 15));
      if(colorValue < 0){ colorValue = 0; }
      if(colorValue > 15){ colorValue = 15; }

      matrice[x][y] = colorValue;
      xoff += NOISE_STEP;
    }
    yoff += NOISE_STEP;
  }
}

function drawMatrice(){
  step = WIN_SIZE/SIZE
  for(let x=0;x<SIZE;x++){
    for(let y=0;y<SIZE;y++){

      color = colors[matrice[x][y]].color
      fill(color)
      stroke(color)
      rect(x*step,y*step,step,step)
    }
  }
}








