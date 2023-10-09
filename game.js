// function for getting the computer selection
function getComputerSelection() {
  // selecton variable holds a random number from 0-2
  const selection = Math.floor(Math.random() * 3);
  // return variable
  return selection;
}

// function for getting the player selection
function getPlayerSelection() {
  // variable for player selecton
  let selection;

  do {
    // receive player input from prompt
    selection = prompt("Choose Rock, Paper, or Scissors: ");
    // check to see if player chose to cancel the game
    selection === null ? (selection = "Canceled!") : false;
    // make player input text into lowercase
    selection = selection.toLowerCase();
    // check to see player input and assign proper value
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
  } while (
    // while selection is false, repeat block of code
    selection === false
  );
  // return variable
  return selection;
}

// function for playing a single round
function playRound(computerChoice, playerChoice) {
  // variable for game selection
  const GAME = ["Rock", "Paper", "Scissors"];
  // variable for player 1/user selection
  let player1 = playerChoice() - 1;
  // variable for player 2/computer selection
  let player2 = computerChoice();
  // variable for displaying
  let displayMsg = null;

  // check to see if player quit game
  if (player1 === -1) return "Canceled. Player quit.";

  do {
    // check if displayMsg is true
    if (displayMsg) {
      // get player 1 selection again
      player1 = playerChoice() - 1;
      // get player 2 selection again
      player2 = computerChoice();
    }
    // calculate the winner and assign the result
    displayMsg = calculateRound(GAME[player1], GAME[player2]);

    // check if the result is a tie
    if (displayMsg.includes("Tie")) {
      // display tie message to player
      alert(displayMsg);
      displayMsg = true;
    } else {
      // return variable
      return displayMsg;
    }
  } while (
    // repeat round until tie breaker
    player1 === player2
  );
}

// function for calculating game results
function calculateRound(selection1, selection2) {
  // variable for game winner
  let winner;

  // checks to see player 1 chose rock and player 2 chose paper
  if (selection1 === "Rock" && selection2 === "Paper") {
    // player 1 loses
    winner = "You Lose! Paper beats Rock.";
  }
  // checks to see player 1 chose rock and player 2 chose scissors
  else if (selection1 === "Rock" && selection2 === "Scissors") {
    // player 1 wins
    winner = "Congrats, You win! Rock beats Scissors.";
  }
  // checks to see player 1 chose paper and player 2 chose scissors
  else if (selection1 === "Paper" && selection2 === "Scissors") {
    // player 1 loses
    winner = "You Lose! Scissors beats Paper.";
  }
  // checks to see player 1 chose paper and player 2 chose rock
  else if (selection1 === "Paper" && selection2 === "Rock") {
    // player 1 wins
    winner = "Congrats, You win! Paper beats Rock.";
  }
  // checks to see player 1 chose scissors and player 2 chose rock
  else if (selection1 === "Scissors" && selection2 === "Rock") {
    // player 1 loses
    winner = "You Lose! Rock beats Scissors.";
  }
  // checks to see player 1 chose scissors and player 2 chose paper
  else if (selection1 === "Scissors" && selection2 === "Paper") {
    // player 1 wins
    winner = "Congrats, You win! Scissors beats Paper.";
  } else {
    // both players are tied
    winner = "Tie! Try again.";
  }
  // return variable
  return winner;
}

// display and play one round
alert(playRound(getComputerSelection, getPlayerSelection));
