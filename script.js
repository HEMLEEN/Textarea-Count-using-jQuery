window.onload = () => {
  if (window.scrollY > 80) {
    document.querySelector("#loading").classList.add("active");
  } else {
    document.querySelector("#result").classList.remove("active");
  }

  fadeOut();
};
function loader() {
  document.querySelector(".loader-container").classList.add("active");
}

function fadeOut() {
  setTimeout(loader, 2000);
}

// set max-length of Characters....

$(document).ready(function () {
  var max_length = 250;
  $(".text-input").keyup(function () {
    var textlen = max_length - $(this).val().length;
    $(".rchars").text(textlen);
   
  });
  
});


//word counter starts here....
// Regex
// Modifiers:
// i	----> Perform case-insensitive matching
// g	----> Perform a global match (find all matches rather than stopping after the first match)
// m -----> m	Perform multiline matching

//Metacharacter:
// \s ---->	Find a whitespace character

//Groups:
// [a-z]--->	Any character from lowercase a to lowercase z

//Quantifiers:
// + * ? $ ^
 

function atLeastTwoCharacters(text) {
  const letters = text.match(/[a-z]/gi) || []; 

  return letters.length >= 2;
}

function abscenceOfThreeConsecutiveCharacters(text) {
  for (const character of text) {
    const occurrences = Array.from(text).filter((v) => v == character).length;

    if (occurrences >= 3) {
      return false;
    }
  }

  return true;
}

const checks = [atLeastTwoCharacters, abscenceOfThreeConsecutiveCharacters];
const textInput = document.querySelector(".text-input");
const wordCountElement = document.querySelector(".word-count");
const letterCountElement = document.querySelector(".letter-count");
const spaceCountElement = document.querySelector(".space-count");

textInput.addEventListener("input", () => {
  const splitted = textInput.value.trim().split(/[\s-]/); 
  const letterCount = (textInput.value.match(/[a-z]/gi) || []).length;
  const spaceCount = (textInput.value.match(/\s+/g) || []).length;
  let wordCount = 0;

  outer: for (const text of splitted) {
    for (const check of checks) {
      if (!check(text)) {
        continue outer;
      }
    }

    wordCount++;
  }

  wordCountElement.textContent = wordCount;
  letterCountElement.textContent = letterCount;
  spaceCountElement.textContent = spaceCount;
});
