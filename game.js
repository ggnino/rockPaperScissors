// function for getting the computer selection
function getComputerSelection() {
  const selection = Math.floor(Math.random() * 3);
  return selection;
}

// function for getting the player selection
function getPlayerSelection() {
  let selection;

  do {
    selection = prompt("Choose Rock, Paper, or Scissors: ");

    // check to see if player chose to cancel the game
    selection === null ? (selection = "Canceled!") : false;

    selection = selection.toLowerCase();

    switch (selection) {
      case "rock":
        selection = 1;
        break;
      case "paper":
        selection = 2;
        break;
      case "scissors":
        selection = 3;
        break;
      case "canceled!":
        selection = 0;
        break;
      default:
        selection = false;
        alert("Sorry Incorrect choice. Please try again.");
        break;
    }
  } while (selection === false);

  return selection;
}

// function for playing a single round
function playRound(computerChoice, playerChoice) {
  const GAME = ["Rock", "Paper", "Scissors"];
  let player1 = playerChoice() - 1;
  let player2 = computerChoice();
  let displayMsg = null;

  do {
    if (displayMsg) {
      player1 = playerChoice() - 1;
      player2 = computerChoice();
    }

    if (player1 === -1) {
      displayMsg = "Canceled. Player quit.";
      return displayMsg;
    }

    displayMsg = calculateRound(GAME[player1], GAME[player2]);

    if (displayMsg.includes("Tie")) {
      alert(displayMsg);
      displayMsg = true;
    } else return displayMsg;
  } while (player1 === player2);
}

// function for calculating game results
function calculateRound(selection1, selection2) {
  let winner;

  if (selection1 === "Rock" && selection2 === "Paper") {
    winner = "You Lose! Paper beats Rock.";
  } else if (selection1 === "Rock" && selection2 === "Scissors") {
    winner = "Congrats, You win! Rock beats Scissors.";
  } else if (selection1 === "Paper" && selection2 === "Scissors") {
    winner = "You Lose! Scissors beats Paper.";
  } else if (selection1 === "Paper" && selection2 === "Rock") {
    winner = "Congrats, You win! Paper beats Rock.";
  } else if (selection1 === "Scissors" && selection2 === "Rock") {
    winner = "You Lose! Rock beats Scissors.";
  } else if (selection1 === "Scissors" && selection2 === "Paper") {
    winner = "Congrats, You win! Scissors beats Paper.";
  } else {
    winner = "Tie! Try again.";
  }

  return winner;
}

// a function to play an enitre game which consists of five rounds
function game(aRound, compSel, playSel) {
  let roundWinner,
    player1 = 0,
    player2 = 0,
    quit = false;

  // starts the five round game
  for (let count = 1; count <= 5; count++) {
    roundWinner = aRound(compSel, playSel);

    if (roundWinner && roundWinner.includes("quit")) {
      quit = true;
      break;
    }

    if (roundWinner.includes("win")) player1++;
    else player2++;

    console.log(`Round ${count}: ${roundWinner}`);
  }

  if (quit) console.log(roundWinner);
  else if (player1 > player2) console.log("YAY! You won the game!");
  else console.log("Sorry! You lose.");
}

const gameContainer = document.getElementById("game-container");
const [welcomeHeading, startBtn] = createElements("h1", "button");

addContent(startBtn, "Start Game");
addContent(welcomeHeading, "Welcome to Rock Paper Scissors!");

gameContainer.appendChild(welcomeHeading);
gameContainer.appendChild(startBtn);

// function for creating elemenets
function createElements(...elements) {
  let arr = [];

  for (let prop in elements) {
    arr.push(document.createElement(elements[prop]));
  }
  return arr;
}
// function for adding text content to element
function addContent(element, content) {
  element.textContent = content;
}
