var passwords = ['accounting', 'balance sheet',  'expenses', 'liabilities', 'cash flows' ];
// var passwords = ['abc'];
var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g',
               'h', 'i', 'j', 'k', 'l', 'm', 'n',
               'o', 'p', 'q', 'r', 's', 't', 'u',
               'v', 'w', 'x', 'y', 'z' ];

var tries = 0; // 9 tries
var getPass = passwords[Math.floor(Math.random()*3)];
var splitPass = getPass.toString(getPass.split(''));
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

// change color
     if (splitPass.indexOf(grabLetter,0) !== -1 ) {
          elem.style = "border-color: #90EE90; color: #90EE90;";
      } else {
          elem.style = "border-color: red; color: red;";

// draw hangman image progress
    if (tries < 9) { tries++;
          document.getElementById('hangman').innerHTML = '<img class=\"image\" src=\"img/' + tries + '.png\"/>';
          }

// wrong answer + hide keyboard + reset
    if (tries == 9) { tries++;
        document.getElementById('letters').innerHTML = '<span class=\"fail\"> Game over! You\'re blown to pieces \;( <br> The password was:' + getPass + '</span> <br> <button class=\"reset\" onclick=\"location.reload()\"> TRY AGAIN </button>';
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
          document.getElementById('letters').innerHTML = 'Well done! <br> <button class=\"reset\" onclick=\"location.reload()\"> TRY AGAIN </button> ' ;
            }
    }
    pass();
}


window.onload = pageOnload;
