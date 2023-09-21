/*----- constants -----*/
const INIT_STATE = {
    boredom: 0,
    hunger: 0,
    sleepiness: 0,
  };

/*----- state variables -----*/
let boredom; // integer
let hunger; // integer
let sleepiness; // integer

let age; // integer
let cycles; // integer

let timer; // object
let interval; // integer

/*----- cached elements  -----*/
const boredomStatEl = document.querySelector("#boredom-stat");
const hungerStatEl = document.querySelector("#hunger-stat");
const sleepyStatEl = document.querySelector("#sleepiness-stat");

const gameMessageEl = document.querySelector("#tama-message0");
const gameMessageEl1 = document.querySelector("#tama-message1");
const gameMessageEl2 = document.querySelector("#tama-message2");

const tamaGraphic = document.querySelector("#tama-graphic")
const gameBtnEls = document.querySelectorAll("button");
const gamePlayAgainEl = document.querySelector("#restart");

/*----- event listeners -----*/

gameBtnEls.forEach((btn) => btn.addEventListener("click", handleBtnClick));

gamePlayAgainEl.addEventListener("click", init);


/*----- functions -----*/
function handleBtnClick(e) {
  
    const convertProp = {
      feed: "hunger",
      sleep: "sleepiness",
      play: "boredom",
    };
    
    
    const btnText = convertProp[e.target.innerText];
    
    
    const newValue = -1 * (3 + Math.floor(Math.random() * 3));
    
    
    updateStat(btnText, newValue);
  
    
    render();
  }


function gameOver() {
    console.log(state.hunger)
  if (state.hunger >= 10) {
    gamePlayAgainEl.classList.remove("hidden");
    gameMessageEl.classList.remove("hidden");
    let rotate = tamaGraphic.style.transform = "rotate(180deg)";

  } else if (state.boredom >= 10) {
    gamePlayAgainEl.classList.remove("hidden");
    gameMessageEl1.classList.remove("hidden");
    let rotate = tamaGraphic.style.transform = "rotate(180deg)";

  } else if (state.sleepiness >= 10) {
    gamePlayAgainEl.classList.remove("hidden");
    gameMessageEl2.classList.remove("hidden");
    let rotate = tamaGraphic.style.transform = "rotate(180deg)";
  } else 


//   gamePlayAgainEl.classList.remove("hidden");
//   gameMessageEl.classList.remove("hidden");

  // stop timer
  clearInterval(timer);
}

function runGame() {
    cycles++;

    const requestAnitmationFrame = (() => {
        tamaGraphic.style.fadeIn = "fadeIn" ;
    })
    
  
    if (continueGame()) {
      updateStats();
  
      // Icebox - call checkAge helper function to age up Tama
      // Icebox - add aging cycle to calculate aging up tama as a factor of cycles.
      // Icebox - add a message render state or game engine for parsing the state > UI changes. 
  
    } else {
      // if any stat is >= 10 -> end game cycle
      return gameOver();
    }
  
    render();
  }

  function updateStat(stat, value) {
    // normalize data to prevent state values less than 0
    if (state[stat] + value >= 0) {
      state[stat] += value;
    } else {
      state[stat] = 0;
    }
  }
  
  function updateStats() {
    for (key in state) {
      updateStat(key, Math.floor(Math.random() * 3));
    }
  }

  
function renderStats() {

    boredomStatEl.textContent = state.boredom;
    hungerStatEl.textContent = state.hunger;
    sleepyStatEl.textContent = state.sleepiness;
  
  }
  

  function render() {
    renderStats();
  }

  
function continueGame() {
    const testGame = Object.values(state).every((stat) => stat < 10);
    return testGame;
  }
  


  


init();

// Initialize all state, then call render()
function init() {
    state = { ...INIT_STATE }; // create a copy of the default data
  
    age = 0; // integer
    cycles = 0; // integer
  
    interval = 1000; // integer
    timer = setInterval(runGame, interval); // object

    function resetUI() {
        // display game over messaging
        //grabbing css
        gamePlayAgainEl.classList.add("hidden");
        gameMessageEl.classList.add("hidden");
        gameMessageEl1.classList.add("hidden");
        gameMessageEl2.classList.add("hidden");
        //pure js
        tamaGraphic.style.transform = "rotate(0deg)";
        //grabbing css
        
        //tamaGraphic.classList.add("game-graphic");
        tamaGraphic.style.fadeIn = "none";
    }
    resetUI();
    
  
    render();
  }

 