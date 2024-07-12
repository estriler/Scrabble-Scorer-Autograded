// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

// function oldScrabbleScorer(word) {
// 	word = word.toUpperCase();
// 	let letterPoints = "";
 
// 	for (let i = 0; i < word.length; i++) {
 
// 	  for (const pointValue in oldPointStructure) {
 
// 		 if (oldPointStructure[pointValue].includes(word[i])) {
// 			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
// 		 }
 
// 	  }
// 	}
// 	return letterPoints;
//  }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

let userWord = "";
let finalScore = 0;
function initialPrompt() {
   userWord = input.question("Let's play some scrabble! Enter a word: ");
   return userWord;
};

// console.log(oldScrabbleScorer(initialPrompt()));

let newPointStructure;

let simpleScorer = {
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: function (word){
      word = word.toUpperCase();
      finalScore = word.length;
      return word.length;
   }
};

let vowelBonusScorer = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: function (word){
      word = word.toUpperCase();
      let letterPoints = 0;
      for(let i = 0; i < word.length; i++){
         if(word[i] === "A" || word[i] === "E" || word[i] === "I" || word[i] === "O" || word[i] === "U"){
            letterPoints += 3;
         }else{
            letterPoints += 1;
         }
      }
      finalScore = letterPoints;
      return letterPoints;
   }
};

let scrabbleScorer = {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: function (word) {
      word = word.toUpperCase();
      let letterPoints = "";
   
      for (let i = 0; i < word.length; i++) {
   
      for (const pointValue in oldPointStructure) {
   
         if (oldPointStructure[pointValue].includes(word[i])) {
            letterPoints += `Points for '${word[i]}': ${pointValue}\n`
            finalScore += Number(pointValue);
         }
         }
      }
	return letterPoints;
   }
};

const scoringAlgorithms = [scrabbleScorer, simpleScorer, vowelBonusScorer];

function scorerPrompt() {
   let userChoice = input.question("Which scoring algorithm would you like to use? 0: Simple Scorer, 1: Bonus Vowels, 2: Traditional Scrabble ");
   let scrabbleChoice;
   if (userChoice === "0"){
      scrabbleChoice = scoringAlgorithms[1].scorerFunction(userWord);
   } else if(userChoice === "1"){
      scrabbleChoice = scoringAlgorithms[2].scorerFunction(userWord);
   } else if(userChoice === "2"){
      scrabbleChoice = scoringAlgorithms[0].scorerFunction(userWord);
   } else{
      console.log("OOps! SomTHing BrOke!!!!");
   }
   return scrabbleChoice;
   
}

function transform() {};

function runProgram() {
   initialPrompt();
   scorerPrompt();
   console.log(`Score for "${userWord}": ${finalScore}`);
}



// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
