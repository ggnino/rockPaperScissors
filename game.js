// function for getting the computer selection
function getComputerSelection() {
  const selection = Math.floor(Math.random() * 3);
  return selection;
}

// function for playing a single round
async function playRound(player1, player2) {
  const GAME = ["Rock", "Paper", "Scissors"];

  let displayMsg = null;
  do {
    displayMsg = calculateRound(GAME[player1], GAME[player2]);
    if (displayMsg.includes("Tie")) {
      let displayElement = document.getElementById("gameHeading");
      let el = document.getElementById("game-options-container");
      setTimeout(() => {
        el.style.display = "flex";
        el.style.opacity = 1;
      }, 1500);

      addElementContent(displayElement, displayMsg, "txt");
      displayMsg = true;
      player1 = await getPlayerSelection();
      player2 = getComputerSelection();
    }
  } while (displayMsg === true);

  return displayMsg;
}

// function for calculating game results
function calculateRound(selection1, selection2) {
  let winner = null;

  if (selection1 === "Rock" && selection2 === "Paper") {
    winner = "You lose! Paper beats Rock.";
  } else if (selection1 === "Rock" && selection2 === "Scissors") {
    winner = "Congrats, You win! Rock beats Scissors.";
  } else if (selection1 === "Paper" && selection2 === "Scissors") {
    winner = "You lose! Scissors beats Paper.";
  } else if (selection1 === "Paper" && selection2 === "Rock") {
    winner = "Congrats, You win! Paper beats Rock.";
  } else if (selection1 === "Scissors" && selection2 === "Rock") {
    winner = "You lose! Rock beats Scissors.";
  } else if (selection1 === "Scissors" && selection2 === "Paper") {
    winner = "Congrats, You win! Scissors beats Paper.";
  } else if (selection1 === selection2) {
    winner = "Tie! Try again.";
  }

  return winner;
}

// a function to play an enitre game which consists of five rounds
async function game(aRound, compSel, playSel) {
  let player1,
    player2,
    roundWinner,
    player1Score = 0,
    player2Score = 0,
    quit = false,
    gamePlay = document.getElementById("game-play-container"),
    gameScore = document.getElementById("gameHeading"),
    el = document.getElementById("game-options-container"),
    roundHeading = document.getElementById("gameRoundHeading");

  for (let count = 1; count <= 5; count++) {
    console.log("Round " + count + " waiting...");
    player1 = await playSel();
    player2 = compSel();
    console.log("selected!");

    roundWinner = await aRound(player1, player2);
    if (roundWinner) {
      if (roundWinner.includes("win")) player1Score++;
      else if (roundWinner.includes("lose")) player2Score++;
      else if (roundWinner.includes("Tie")) {
        addElementContent(roundHeading, ` ${roundWinner}`, "txt");
      }

      gamePlay.style.display = "flex";
      gamePlay.children[1].style.opacity = 1;
      gamePlay.children[0].style.opacity = 1;
      setTimeout(() => {
        gamePlay.children[0].style.transform = "translateX(0)";
        gamePlay.children[1].style.transform = "translateX(0)";
      }, 1100);

      setTimeout(() => {
        gamePlay.style.display = "none";
        gamePlay.children[0].style.opacity = 0;
        gamePlay.children[0].style.transform = "translateX(-1500px)";
        gamePlay.children[1].style.opacity = 0;
        gamePlay.children[1].style.transform = "translateX(1500px)";
        el.style.display = "flex";
        el.style.opacity = 1;
      }, 1500);
      if (!roundWinner.includes("Tie")) {
        addElementContent(
          gameScore,
          `Score ${player1Score}-${player2Score}`,
          "txt"
        );
        addElementContent(
          roundHeading,
          `Round ${count}: ${roundWinner}`,
          "txt"
        );
      }
      addElementContent(roundHeading, `Round ${count}: ${roundWinner}`, "txt");
      roundWinner = "";
    } else {
      quit = true;
    }
  }
  if (player1Score > player2Score) console.log("Congrats! You won,");
  if (player1Score < player2Score) console.log("LOL! YOU LOSE! LOSER!");
  if (player1Score === player2Score)
    console.log("WOW! What a game, but it is tied.");
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
// function for getting the player selection after the click event has been fired
async function getPlayerSelection() {
  let clickedElement = document.getElementById("game-options-container");

  let value = null;
  value = await new Promise((resolved) => {
    clickedElement.addEventListener("click", (e) => {
      resolved(optionClicker(e, clickedElement));
    });
  });

  return value;
}
// click handler function for game options
function optionClicker(e, selection) {
  selection.children[0].children[0].style.transform = "scale(4)";
  selection.children[1].children[0].style.transform = "scale(0)";
  selection.children[1].children[1].style.transform = "scale(0)";
  selection.children[2].children[0].style.transform = "scale(0)";
  selection.children[2].children[1].style.transform = "scale(0)";

  selection.style.opacity = 0;
  setTimeout(() => {
    selection.style.display = "none";
    selection.children[0].children[0].style.transform = "scale(1)";
    selection.children[1].children[0].style.transform = "scale(1)";
    selection.children[1].children[1].style.transform = "scale(1)";
    selection.children[2].children[1].style.transform = "scale(1)";
    selection.children[2].children[1].style.transform = "scale(1)";
  }, 500);

  return e.target.attributes[0].value;
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
    gameRoundHeading,
    gameOptionsContainer,
    gameOptionImage1,
    gameOptionText1,
    gameOptionContainer1,
    gameOptionImage2,
    gameOptionText2,
    gameOptionContainer2,
    gameOptionImage3,
    gameOptionText3,
    gameOptionContainer3,
    gamePlayContainer,
    gamePlayImg1,
    gamePlayImg2,
  ] = createElements(
    "h1",
    "button",
    "div",
    "div",
    "h2",
    "h3",
    "div",
    "img",
    "p",
    "div",
    "img",
    "p",
    "div",
    "img",
    "p",
    "div",
    "div",
    "img",
    "img"
  );

  setElementAttribute(gamePlayImg1, "id", "game-play-img-1");
  setElementAttribute(gamePlayImg2, "id", "game-play-img-2");
  setElementAttribute(gameRoundHeading, "id", "gameRoundHeading");
  setElementAttribute(gameHeading, "id", "gameHeading");
  setElementAttribute(gamePlayContainer, "id", "game-play-container");
  setElementAttribute(welcomeContainer, "id", "welcome-container");
  setElementAttribute(gameContainer, "id", "game-container");
  setElementAttribute(gameOptionsContainer, "id", "game-options-container");
  setElementAttribute(gameOptionContainer1, "value", 0);
  setElementAttribute(gameOptionImage1, "value", 0);
  setElementAttribute(gameOptionText1, "value", 0);
  setElementAttribute(gameOptionContainer2, "value", 1);
  setElementAttribute(gameOptionImage2, "value", 1);
  setElementAttribute(gameOptionText2, "value", 1);
  setElementAttribute(gameOptionContainer3, "value", 2);
  setElementAttribute(gameOptionImage3, "value", 2);
  setElementAttribute(gameOptionText3, "value", 2);
  addElementContent(gameHeading, "Choose One", "txt");
  addElementContent(startBtn, "Start Game", "txt");
  addElementContent(welcomeHeading, "Welcome to Rock Paper Scissors!", "txt");
  addElementContent(gameOptionText1, "Rock", "txt");
  addElementContent(gameOptionText2, "Paper", "txt");
  addElementContent(gameOptionText3, "Scissors", "txt");
  addElementContent(gameOptionImage1, "./images/rock.png", "img");
  addElementContent(gameOptionImage2, "./images/p.png", "img");
  addElementContent(gameOptionImage3, "./images/s.png", "img");

  addElementContent(gamePlayImg1, "./images/fist2.png", "img");
  addElementContent(gamePlayImg2, "./images/fist.png", "img");

  gameOptionContainer1.append(gameOptionImage1, gameOptionText1);
  gameOptionContainer2.append(gameOptionImage2, gameOptionText2);
  gameOptionContainer3.append(gameOptionImage3, gameOptionText3);
  gameOptionsContainer.append(
    gameOptionContainer1,
    gameOptionContainer2,
    gameOptionContainer3
  );

  gamePlayContainer.append(gamePlayImg1, gamePlayImg2);

  welcomeContainer.appendChild(welcomeHeading);
  welcomeContainer.appendChild(startBtn);
  gameContainer.append(
    gameHeading,
    gameRoundHeading,
    gameOptionsContainer,
    gamePlayContainer
  );
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
    transition: "opacity 0.2s ease-out",
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
  const gamePlayStyle = {
    display: "none",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  };
  const gamePlayImg1Style = {
    transform: "translateX(-1500px)",
    transition: "all 0.2s linear",
  };
  const gamePlayImg2Style = {
    transform: "translateX(1500px)",
    transition: "all 0.2s linear",
  };

  addElementStyling(startBtn, welcomeBtnStyle);
  addElementStyling(welcomeContainer, welcomeStyle);
  addElementStyling(gameContainer, gameStyle);
  addElementStyling(gameOptionsContainer, gameOptionsStyle);
  addElementStyling(gameOptionContainer1, gameOptionStyle);
  addElementStyling(gameOptionImage1, gameOptionImgStyle);
  addElementStyling(gameOptionContainer2, gameOptionStyle);
  addElementStyling(gameOptionImage2, gameOptionImgStyle);
  addElementStyling(gameOptionContainer3, gameOptionStyle);
  addElementStyling(gameOptionImage3, gameOptionImgStyle);
  addElementStyling(gamePlayImg1, gamePlayImg1Style);
  addElementStyling(gamePlayImg2, gamePlayImg2Style);
  addElementStyling(gamePlayContainer, gamePlayStyle);
}
// build game UI
buildGameUI();

game(playRound, getComputerSelection, getPlayerSelection);
