/*

  Created by: Emile, Arjun, and Abhi

*/
//promts the user for a phrase or dificaalty
var cOrV = prompt('Enter your own phrase or word, enter 1 for a random easy word, enter 2 for random moderate  word, enter 3 for a random hard word, enter 4 for a phrase, or enter 5 for a 612 inside joke').trim();
while (( cOrV.toUpperCase() != cOrV.toLowerCase() && cOrV.length <= 1) &&cOrV != "1" && cOrV != "2" && cOrV != "3" && cOrV != "4" && cOrv !="5")  {
  cOrV = prompt('Please enter your own phrase or word, enter 1 for a random easy word, enter 2 for random moderate  word, enter 3 for a random hard wordenter 4 for a phrase, or enter 5 for a 612 inside joke');
}

if (cOrV.length >= 1 && cOrV.toUpperCase() != cOrV.toLowerCase() ){
  var askUser = cOrV;
  while (askUser.length > 32 || cOrV.length < 1) {
    askUser = prompt("Error, please try again make sure it is between 1 and 26 characters");
  }
} else {
  var difficulty = cOrV;
}

let dash;
let wds;
let bg;

var isPrompt = false;
var askUser;
var nextPhrase;

function setup() {
  font = loadFont('handlee-regular.ttf')
  textFont(font)
  bg = loadImage('chalkboard-slate-green-blackboard-preview .jpg')
  wds = new Words();
  createCanvas(400, 400);

  if (askUser != null) dash = new Dashes(150, 148, askUser);
  else { 
    dash = new Dashes(150, 148, wds.randomWord(difficulty));
  }
  dash.spaceFix();
  dash.convertor();


}

function draw() {
  background(bg);
  textSize(35);
  dash.displayBlanks();
  dash.displayDificalty(difficulty)
  
  //Draws title
  strokeWeight(3)
  fill(255, 255, 255)
  textSize(40);
  strokeWeight(1)
  text("Hang", 20, 55)
  text("Man!!!", 70, 95)
  strokeWeight(3)

  //Draws the hanger
  push();
  translate(-75, 5);
  rect(125, 250, 150, 1);
  translate(-25, 0);
  rect(200, 100, 1, 150);
  rect(200, 100, 50, 1);
  rect(250, 100, 1, 25);
  pop();

  //Draws incorect gussses
  textSize(22)
  strokeWeight(1)
  text("Incorrect Guesses", 199, 40)
  strokeWeight(3)

  noFill();
  textSize(35);
  stroke(color(255, 255, 255));
  rect(200, 50, 176, 100);
  rect(200, 150, 38, 36);
  rect(238, 150, 137, 36);
  fill(255, 255, 255)
  strokeWeight(1)
  text("ENTER", 245, 180)
  dash.displayKey();
  strokeWeight(3)

  
  dash.hangTheMan();
  dash.winCheck();

  
  if (dash.isPlayAgain()) {
    startGame();
   if (nextPhrase != null) dash.reset(nextPhrase);
    else {
    dash.reset(wds.randomWord(difficulty));
  }
    dash.spaceFix();
    dash.convertor();
    dash.setPlayAgain(false);
  }
}


//re-promts the user
function startGame() {
  var cvp = prompt('Enter your own phrase or word, enter 1 for a random easy word, enter 2 for random moderate  word, enter 3 for a random hard word, enter 4 for a phrase, or enter 5 for a 612 inside joke').trim();
  while (( cvp.toUpperCase() != cvp.toLowerCase() && cvp.length <= 1) && cvp != "1" && cvp != "2" && cvp != "3" && cvp != "4" &&cvp != "5")  {
    cvp = prompt('Please enter your own phrase or word, enter 1 for a random easy word, enter 2 for random moderate  word, enter 3 for a random hard word, enter 4 for a phrase, or enter 5 for a 612 inside joke');
  }

  if (cvp.length > 1  || cvp.toUpperCase() != cvp.toLowerCase()) {
    nextPhrase = cvp;
    while (nextPhrase.length > 32 || nextPhrase.length < 1) {
      nextPhrase = prompt("Error, please try again make sure it is between 1 and 26 characters");
    }
  } else{
     difficulty = cvp;
  }
} 