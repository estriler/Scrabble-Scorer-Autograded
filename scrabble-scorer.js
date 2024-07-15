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

let userWord = "";
let finalScore = 0;

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

 function simpleScorer(word) {
   finalScore = word.length;
   return finalScore;
 }

 function vowelBonusScorer(word) {
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
      return finalScore;
 }

 function scrabbleScorer(word){
   word = word.toLowerCase();
      for (let i = 0; i < word.length; i++) {
         finalScore += newPointStructure[word[i]];
      }
   return finalScore;
   }
 

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //


function initialPrompt() {
   userWord = input.question("Let's play some Scrabble! \n\nEnter a word: ");
   return userWord;
};

let newPointStructure = transform(oldPointStructure);

const scoringAlgorithms = [
   {
      name: "Simple Score",
      description: "Each letter is worth 1 point.",
      scorerFunction: simpleScorer
   }, 
   {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer
   },
   {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scorerFunction: scrabbleScorer
   }, 
];

function scorerPrompt() {
   console.log("\nWhich scoring algorithm would you like to use? ");
   for(let i = 0; i < scoringAlgorithms.length; i++){
      console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`);
   }
   let userChoice = input.question("Enter 0, 1, or 2: ");
   let functionChoice;
   if (userChoice === "0"){
      functionChoice = scoringAlgorithms[0].scorerFunction(userWord);
   } else if(userChoice === "1"){
      functionChoice = scoringAlgorithms[1].scorerFunction(userWord);
   } else if(userChoice === "2"){
      functionChoice = scoringAlgorithms[2].scorerFunction(userWord);
   } else{
      console.log("OOps! SomTHing BrOke!!!!");
   }
   return functionChoice;
   
}

function transform(obj) {
   let newObj = {};
   for (item in obj) {
      for(let i = 0; i < obj[item].length; i++){
         newObj[obj[item][i].toLowerCase()] = Number(item);
      }
   }
   return newObj;
};

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
