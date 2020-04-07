class Dashes {

  constructor(x, y, phrase) {
    this.x = x;
    this.y = y;
    this.phrase = phrase.toUpperCase().trim();
    this.splitedPhrase = split(this.phrase, "")
    this.counter;
    this.lastKey;
    this.numOfWrongs = 0;
    this.lettersUsed = [];
    this.blanks = [];
    this.wrongLetters = [];
    this.wordsInPhrase = split(this.phrase, " ");
    this.safeLength = 0;
    this.minus = 0;
    this.lost = false;
    this.playAgain = false;
    this.isChar;

  }

  //fixes the lines of code to make sure a word is not cut off
  spaceFix() {
    var isTooLong = false;

    //Checkes to make sure every word is less than 13 characters
    for (var i = 0; i < this.wordsInPhrase.length; i++) {
      if (this.wordsInPhrase[i].length > 13) {
        isTooLong = true;
      }
    }
    //this will re prompt when there is a word with more then 13 characters
    while (isTooLong) {
      this.phrase = prompt('One word in this phrase is too long. Please enter a new phrase').toUpperCase().trim();
      while (this.phrase.length > 32 || this.phrase.length < 1) {
        this.phrase = prompt('This phrase is too long. Please enter a new phrase between 1 and 26 characters').toUpperCase().trim();
      }
      this.splitedPhrase = split(this.phrase, "")
      this.wordsInPhrase = split(this.phrase, " ");
      for (var i = 0; i < this.wordsInPhrase.length; i++) {
        this.wordsInPhrase[i] += " ";
        if (this.wordsInPhrase[i].length > 13) isTooLong = true;
        else isTooLong = false
      }
    }


    //will make sure the words btween the first and second line dont get cut off
    //will check if the last letter on the first line and the first letter in the second line are charaters
    //if they are, it will add spaces until the word is entirely on the second line
    var indexOfNeededSpace = 0;
    while (this.splitedPhrase.length > 13 && this.splitedPhrase[12].toUpperCase() != this.splitedPhrase[12].toLowerCase() && this.splitedPhrase[13].toUpperCase() != this.splitedPhrase[13].toLowerCase()) {
      var replaceWithSpaces = 0;
      for (var i = 12; i > 0; i--) {
        if (this.splitedPhrase[i] != " ") {
          replaceWithSpaces++;
        } else {
          indexOfNeededSpace = i;
          break;
        }
      }

      if (replaceWithSpaces < 12) {
        for (var j = 0; j <= replaceWithSpaces; j++) {
          this.splitedPhrase.splice(indexOfNeededSpace, 0, " ");
        }
      }
    }
    //checks to make sure the first character of a line is not a space
    while (this.splitedPhrase[13] == " ") {
      this.splitedPhrase.splice(13, 1);
    }
    //will make sure the words btween the second and third line dont get cut off
    indexOfNeededSpace = 0;
    while (this.splitedPhrase.length > 26 && this.splitedPhrase[25].toUpperCase() != this.splitedPhrase[25].toLowerCase() && this.splitedPhrase[26].toUpperCase() != this.splitedPhrase[26].toLowerCase()) {

      var newReplaceWithSpaces = 0;
      for (var a = 25; a > 13; a--) {
        if (this.splitedPhrase[a] != " ") {
          newReplaceWithSpaces++;
        } else {
          indexOfNeededSpace = a;
          break;
        }
      }

      for (var l = 0; l <= newReplaceWithSpaces; l++) {
        this.splitedPhrase.splice(indexOfNeededSpace, 0, " ");
      }
    }
    //checks to make sure the first character of a line is not a space
    while (this.splitedPhrase[26] == " ") {
      this.splitedPhrase.splice(26, 1);
    }
  }

  //creates a new array and converts the phrase into an array of dashes
  convertor() {
    for (var i = 0; i < this.splitedPhrase.length; i++) {
      if (this.splitedPhrase[i] != this.splitedPhrase[i].toLowerCase()) {
        this.blanks[i] = ' _';
      } else {
        this.blanks[i] = this.splitedPhrase[i];
      }
    }
  }

  //Draws the dashes and the correct letters on the screen
  displayBlanks() {
    strokeWeight(1)
    textSize(15);
    textAlign(CENTER)
    textSize(26);
    var Xpos = 29;
    var Ypos = 300;
    for (var i = 0; i < this.blanks.length; i++) {
      if (i % 13 == 0 && i != 0) {
        Ypos += 32;
        Xpos -= 364;
      }
      text(this.blanks[i], Xpos + (i * 28), Ypos)
    }
    textAlign(LEFT);
  }

  //displays the dificalty the user has selecte above the phrase
  displayDificalty(diff) {
    difficulty = diff;
    textSize(15);
    if (difficulty == 5) {
      text("Inside joke:", 19, 273);
    } else if (difficulty == 4) {
      text("Phrase:", 19, 273);

    } else if (difficulty == 2) {
      text("Moderate phrase:", 19, 273);

    } else if (difficulty == 3) {
      text("Hard phrase:", 19, 273);

    } else if (difficulty == 1) {
      text("Easy phrase:", 19, 273);
    } else {
      text("Your phrase:", 19, 273);
    }
  }

  //displays the key in the key box, when the enter key in pressed it check if the word in in the phrase. 
  //If it is in the phrase it will display it on screen. 
  //If it is not in the phrase then it will be displayed in the incorrect guesses box
  displayKey() {
    var keyVal = key;
    //checks if the key prseed is a char
    if (keyVal.toUpperCase() != keyVal.toLowerCase() && keyVal.length == 1) {
      this.lastKey = keyVal.toUpperCase();
      this.isChar = true;
      textAlign(CENTER)
      text(keyVal.toUpperCase(), 219, 180)
      textAlign(LEFT)
      this.counter = 0;

    }
  if (keyIsPressed && !keyIsDown(13)){
      this.isChar = false;
  } 
    
  //check when the enter key is pressed; when it is it check if the letter is in the phrase or not
  if (keyIsDown(13) && this.counter == 0 && !this.lost && this.isChar) {
    var repeat = false
    var inPhrase = false;
    //checks if the letter is in the phrase or not
    for (var i = 0; i < this.splitedPhrase.length; i++) {
      if (this.splitedPhrase[i] == this.lastKey) {
        this.blanks[i] = this.splitedPhrase[i];
        text(this.blanks[i], (i * 30), 340)
        inPhrase = true;
      }
    }
    for (var j = 0; j <= this.lettersUsed.length; j++) {
      if (this.lastKey != this.lettersUsed[j]) {
        this.counter++;
      } else repeat = true
    }
    if (inPhrase == false && repeat == false) {
      this.numOfWrongs++;
    }
    if (this.counter != 0 && !repeat && !inPhrase) {
      this.lettersUsed.push(this.lastKey);
    }
  }
  //displays the wrong letters
  textSize(20);
  var Ypos = 70;
  var Xpos = 213;
  textAlign(CENTER);
  for (var i = 0; i < this.lettersUsed.length; i++) {
    if (i % 7 == 0 && i != 0) {
      Ypos += 23;
      Xpos -= 175;
    }
    text(this.lettersUsed[i], Xpos + i * 25, Ypos);
  }
  textAlign(LEFT);
}

//Shows the man on screen based on the amount of letters wrong
hangTheMan() {
  //draws the head
  if (this.numOfWrongs >= 1) {
    noFill()
    ellipse(this.x, this.y, 35, 35);
    fill(255, 255, 255, 255)
  }
  //draws the back
  if (this.numOfWrongs >= 2) {
    rect(this.x, this.y + 20, 1, 50);
  }
  //draws the left arm
  if (this.numOfWrongs >= 3) {
    line(this.x, this.y + 42, this.x - 25, this.y + 17);
  }
  //draws right arm
  if (this.numOfWrongs >= 4) {
    line(this.x, this.y + 42, this.x + 25, this.y + 17);
  }
  //draws the left leg
  if (this.numOfWrongs >= 5) {
    line(this.x, this.y + 68, this.x - 25, this.y + 89);
  }
  //draws right leg
  if (this.numOfWrongs >= 6) {
    line(this.x, this.y + 68, this.x + 25, this.y + 89);
  }
  //draws the eye on the left
  if (this.numOfWrongs >= 7) {
    strokeWeight(1);
    line(140, 143, 146, 149)
    line(140, 149, 146, 143)
  }
  //draws the eye on the right
  if (this.numOfWrongs >= 8) {
    line(153, 143, 159, 149)
    line(153, 149, 159, 143)
  }
  //draws the mounth and the you lose screen
  if (this.numOfWrongs >= 9) {
    line(145, 155, 153, 155);
    fill('#537960');
    arc(151, 156, 4, 6, 0, PI);
    this.lost = true;
    //covers unwanted draws
    strokeWeight(0);
    rect(13, 261, 362, 95);
    //draws play Again box
    textSize(40);
    strokeWeight(3);
    rect(228, 233, 125, 36);
    strokeWeight(1);
    fill('#ffffff');
    //draws you lost, play again, and correct phrase text
    textSize(30);
    text("You lose :(", 225, 220);
    textSize(23)
    text("Play Again?", 234, 258)
    textSize(15);
    text("Correct phrase:", 19, 273);
    textSize(28);
    textAlign(CENTER);
    //draws text for the correct phrase
    var Xpos = 29;
    var Ypos = 300;
    for (var i = 0; i < this.blanks.length; i++) {
      if (i % 13 == 0 && i != 0) {
        Ypos += 32;
        Xpos -= 364;
      }
      text(this.splitedPhrase[i], Xpos + (i * 28), Ypos)
    }
    textAlign(LEFT);
    if (mouseX > 228 && mouseX < 353 && mouseY > 233 && mouseY < 269 && mouseIsPressed) {
      this.playAgain = true;
    }
  }
}


//check if the player has guesed the correct phrase and displays the you win screen
winCheck() {
  if (this.blanks.indexOf(" _") == -1) {
    this.lost = true;
    //covers unwanted draws
    strokeWeight(1);
    fill('#537960');
    strokeWeight(0);
    rect(13, 261, 362, 95);
    textSize(40);
    strokeWeight(3);
    rect(228, 233, 125, 36);
    //draws you won, play again, and correct phrase text
    strokeWeight(1);
    fill('#ffffff');
    textSize(32);
    text("You won!!!", 225, 220);
    textSize(23)
    text("Play Again?", 234, 258)
    textSize(15);
    text("Correct phrase:", 19, 273);
    //draws the correct phrase text
    textSize(28);
    textAlign(CENTER);
    var Xpos = 29;
    var Ypos = 300;
    for (var i = 0; i < this.blanks.length; i++) {
      if (i % 13 == 0 && i != 0) {
        Ypos += 32;
        Xpos -= 364;
      }
      text(this.splitedPhrase[i], Xpos + (i * 28), Ypos)
    }
    textAlign(LEFT);
    if (mouseX > 228 && mouseX < 353 && mouseY > 233 && mouseY < 269 && mouseIsPressed) {
      this.playAgain = true;
    }
  }
}

//geter and setter method for playAgain
isPlayAgain() {
  return this.playAgain;
}
setPlayAgain(playing) {
  this.playAgain = playing;
}
//restes goloal variables for a new phrase
reset(newPhrase) {
  this.phrase = newPhrase.toUpperCase().trim();
  this.splitedPhrase = split(this.phrase, "")
  this.numOfWrongs = 0;
  this.lettersUsed = [];
  this.blanks = [];
  this.wrongLetters = [];
  this.wordsInPhrase = split(this.phrase, " ");
  this.safeLength = 0;
  this.minus = 0;
  this.lost = false;
  this.playAgain = false;

}


}