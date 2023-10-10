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

// function for creating elemenets
function createElements(...elements) {
  let arr = [];

  for (let prop in elements) {
    arr.push(document.createElement(elements[prop]));
  }
  return arr;
}
// function for adding text content to element
function addElementContent(element, content, type) {
  if (type === "txt") element.textContent = content;
  if (type === "img") element.src = content;
}

// function for styling an element
function addElementStyling(element, styleObj) {
  for (let styleProp in styleObj) {
    element.style[styleProp] = styleObj[styleProp];
  }
}
// function for setting an atrribute to a element
function setElementAttribute(element, attribute, attValue) {
  element.setAttribute(attribute, attValue);
}

function setElementEvent(element, event, handler) {
  element.addEventListener(event, handler);
}

function startBtnHandler(element) {
  element.style.opacity = 0;
  setTimeout(() => (element.style.display = "none"), 500);
}

function startBtnHover(e, element) {
  if (e.type === "mouseenter") element.style.color = "red";
  else element.style.color = "white";
}

function optionHover(e, element) {
  if (e.type === "mouseenter") {
    element.children[0].style.transform = "scale(1.2)";
    element.style.color = "green";
  } else {
    element.children[0].style.transform = "scale(1)";
    element.style.color = "black";
  }
}

// function that starts to build the game GUI
function buildGameUI() {
  const bodyStyle = { padding: 0, margin: 0 };
  const body = document.getElementsByTagName("body")[0];

  addElementStyling(body, bodyStyle);

  const [
    welcomeHeading,
    startBtn,
    welcomeContainer,
    gameContainer,
    gameHeading,
    gameOptionsContainer,
    gameOptionsImage1,
    gameOptionText1,
    gameOptionContainer1,
    gameOptionsImage2,
    gameOptionText2,
    gameOptionContainer2,
    gameOptionsImage3,
    gameOptionText3,
    gameOptionContainer3,
  ] = createElements(
    "h1",
    "button",
    "div",
    "div",
    "h2",
    "div",
    "img",
    "p",
    "div",
    "img",
    "p",
    "div",
    "img",
    "p",
    "div"
  );

  setElementAttribute(welcomeContainer, "id", "welcome-container");
  setElementAttribute(gameContainer, "id", "game-container");
  addElementContent(gameHeading, "Choose One", "txt");
  addElementContent(startBtn, "Start Game", "txt");
  addElementContent(welcomeHeading, "Welcome to Rock Paper Scissors!", "txt");
  addElementContent(gameOptionText1, "Rock", "txt");
  addElementContent(gameOptionText2, "Paper", "txt");
  addElementContent(gameOptionText3, "Scissors", "txt");
  addElementContent(gameOptionsImage1, "./images/rock.png", "img");
  addElementContent(gameOptionsImage2, "./images/p.png", "img");
  addElementContent(gameOptionsImage3, "./images/s.png", "img");

  gameOptionContainer1.append(gameOptionsImage1, gameOptionText1);
  gameOptionContainer2.append(gameOptionsImage2, gameOptionText2);
  gameOptionContainer3.append(gameOptionsImage3, gameOptionText3);
  gameOptionsContainer.append(
    gameOptionContainer1,
    gameOptionContainer2,
    gameOptionContainer3
  );

  welcomeContainer.appendChild(welcomeHeading);
  welcomeContainer.appendChild(startBtn);
  gameContainer.append(gameHeading, gameOptionsContainer);
  body.append(welcomeContainer, gameContainer);

  setElementEvent(startBtn, "click", () => startBtnHandler(welcomeContainer));
  setElementEvent(startBtn, "mouseenter", (e) => startBtnHover(e, startBtn));
  setElementEvent(startBtn, "mouseleave", (e) => startBtnHover(e, startBtn));
  setElementEvent(gameOptionContainer1, "mouseenter", (e) =>
    optionHover(e, gameOptionContainer1)
  );
  setElementEvent(gameOptionContainer1, "mouseleave", (e) =>
    optionHover(e, gameOptionContainer1)
  );
  setElementEvent(gameOptionContainer2, "mouseenter", (e) =>
    optionHover(e, gameOptionContainer2)
  );
  setElementEvent(gameOptionContainer2, "mouseleave", (e) =>
    optionHover(e, gameOptionContainer2)
  );
  setElementEvent(gameOptionContainer3, "mouseenter", (e) =>
    optionHover(e, gameOptionContainer3)
  );
  setElementEvent(gameOptionContainer3, "mouseleave", (e) =>
    optionHover(e, gameOptionContainer3)
  );

  const welcomeStyle = {
    display: "none",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: "32px",
    backgroundColor: "black",
    color: "white",
    minHeight: "100vh",
    fontSize: "42px",
    transition: "all 0.5s ease-out",
  };

  const welcomeBtnStyle = {
    fontSize: "32px",
    padding: "20px",
    borderRadius: "10px",
    cursor: "pointer",
    color: "white",
    backgroundColor: "green",
    border: "2px solid green",
  };

  const gameStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    minHeight: "100vh",
    fontSize: "40px",
  };

  const gameOptionsStyle = {
    display: "flex",
    padding: "10px",
    gap: "10px",
    // alignItems: "center",
    margin: "auto 0",
  };

  const gameOptionStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontStyle: "italic",
    fontSize: "18px",
    cursor: "pointer",
    // border: "2px solid black",
    transition: "color 0.2s linear",
  };
  const gameOptionImgStyle = {
    transition: "transform 0.2s linear",
  };

  addElementStyling(startBtn, welcomeBtnStyle);
  addElementStyling(welcomeContainer, welcomeStyle);
  addElementStyling(gameContainer, gameStyle);
  addElementStyling(gameOptionsContainer, gameOptionsStyle);
  addElementStyling(gameOptionContainer1, gameOptionStyle);
  addElementStyling(gameOptionsImage1, gameOptionImgStyle);
  addElementStyling(gameOptionContainer2, gameOptionStyle);
  addElementStyling(gameOptionsImage2, gameOptionImgStyle);
  addElementStyling(gameOptionContainer3, gameOptionStyle);
  addElementStyling(gameOptionsImage3, gameOptionImgStyle);
}
// build game UI
buildGameUI();
