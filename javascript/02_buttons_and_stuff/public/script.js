function changeColor() {
  /*let header = document.getElementById('header');
  let colors = ["red", "blue", "orange", "green"];
  let randomIndex = Math.floor(Math.random() * colors.length);
  let randomColor = colors[randomIndex];

  header.style.color = randomColor;*/

  /*if (header.style.color === "blue") {
    header.style.color = "red";
  } else {
    header.style.color = "blue";
  }*/

//create a random Hex color
let colorpicker = "ABCDEF123456789"
let color = "#";
//generate 6 numbers for Hex code
for(let i = 0; i < 6;i++) {
  //generate a random number for array index
  let temp = Math.floor(Math.random()*16);
  //add the generated random hex code to variable
  color = color + colorpicker[temp];
}

header.style.color = color;
  console.log("Color changed to" + color);
}