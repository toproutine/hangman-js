var getPass = localStorage.getItem('choice');
console.log(getPass);

// var passwords = ['abc'];
var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g',
               'h', 'i', 'j', 'k', 'l', 'm', 'n',
               'o', 'p', 'q', 'r', 's', 't', 'u',
               'v', 'w', 'x', 'y', 'z' ];


var correct = new Audio('../hang/snd/correct.wav');
var wrong = new Audio('../hang/snd/wrong.wav');
var won = new Audio('../hang/snd/won.wav');
var lost = new Audio('../hang/snd/lost.wav');

var tries = 0; // 9 tries
// var getPass = passwords[Math.floor(Math.random()*5)];
var splitPass = getPass.toString(getPass.split(''));
console.log(splitPass);
var hidePass = "";


// load functions // +
function pageOnload() {
  pass();
  buildLetters();
  whichone();
  checkNo();
}



// hide password // -
for (i=0; i<splitPass.length; i++) {
  if (splitPass[i]==" ") {
    hidePass = hidePass + " ";
  } else {
    hidePass = hidePass + "-";
  }
}

window.onload = pass;

//generate password
function pass() {
  document.getElementById('password').innerHTML = hidePass;
  //document.getElementById('password').innerHTML = getPass.replace(/[a-zA-Z]/g, '-');
}

//build keyboard
function buildLetters() {
  for (var i=0; i<letters.length; i++) {
      keyboard = '<div class=\"letter\" onclick=\"whichone(this);checkNo(' + i + ')\" >' + letters[i] + "</div>";
      document.getElementById('letters').innerHTML += keyboard;
  }
}

//prototype replacing letters
String.prototype.replaceChar = function (position, char) {
  if (position > this.length-1) return this.toString();
  else return this.substr(0,position) + char + this.substr(position+1);
}

//check which letter was selected
function whichone (elem) {
  grabLetter = elem.textContent;

// change color of selected letter
     if (splitPass.indexOf(grabLetter,0) !== -1 ) {
       correct.play();
          elem.style = "border-color: #90EE90; color: #90EE90;";
      } else {
          elem.style = "border-color: red; color: red;";

// draw hangman image progress
    if (tries < 9) { tries++;
      wrong.play();
          document.getElementById('hangman').innerHTML = '<img class=\"image\" src=\"img/' + tries + '.png\"/>';
          }

// wrong answer + hide keyboard + reset
    if (tries == 9) { tries++;
      lost.play();
        document.getElementById('letters').innerHTML = '<h3 > Game over! </h3><p class=\"fail\">You\'re blown to pieces \;( <br> </p> <button class=\"reset\" onclick=\"document.location = \'./index.html\' \"> CATEGORIES </button> <button  class=\"reset\" onclick=\"location.reload()\"> TRY AGAIN </button> ';
        }
    }
}



function checkNo (no) {

  for (i=0; i<splitPass.length; i++) {

    if (splitPass.charAt(i) == letters[no]) {

        hidePass = hidePass.replaceChar(i,letters[no]);
      }
// if password correct
      if (getPass == hidePass) {
        won.play();
          document.getElementById('letters').innerHTML = 'Well done! <br> <br> <button class=\"reset\" onclick=\"document.location = \'./index.html\' \"> CATEGORIES </button> ' ;
            }
    }
    pass();
}


window.onload = pageOnload;
