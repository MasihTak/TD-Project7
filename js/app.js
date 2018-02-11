document.addEventListener('DOMContentLoaded', () => {

  // Global variables
  const overlay = document.getElementById('overlay');
  const title = document.querySelector('.title');
  const keyboard = document.getElementById('qwerty');
  const phrase = document.getElementById('phrase');
  const startGame = document.querySelector('.btn__reset');
  const phrases = ['love is painful', 'what we think we become', 'blood and glory', 'smile and be happy', 'keep moving'];
  const phraseArray = getRandomPhraseAsArray(phrases);
  let missed = 0;

  // function to assign property dynamically
  function assignProperty(element, property, value) {
    element[property] = value;
    return element;
  }

  // Hide the overlay when start game button clicked
  startGame.addEventListener('click', (e) => {
    overlay.style.display = "none";
    //restart the game when click on Play Again
    if(e.target.textContent === 'Play Again') {
      missed = 0;
      const letter = document.querySelectorAll('.letter')
      const ul = phrase.firstElementChild;
      const chosenKey = document.querySelectorAll('.chosen');
      while (ul.hasChildNodes()) {
        ul.removeChild(ul.firstChild);
      }

      //new phrase
      addPhraseToDisplay(getRandomPhraseAsArray(phrases));

      // unselect selected keys and remove disabled attribute
      for (let i = 0; i < chosenKey.length; i++) {
        chosenKey[i].classList.remove('chosen');
        chosenKey[i].removeAttribute('disabled');
      };

      // re-add lives
      const ol = document.querySelector('ol');

      while (ol.children.length < 5) {
        const li = document.createElement('li');
        const img = document.createElement('img');
        li.className = 'tries';
        ol.appendChild(li);
        li.appendChild(img);
        img.src = "images/liveHeart.png";
      };
    };
  });

  // get random phrase
  function getRandomPhraseAsArray(arr) {
    let randomPhrase = Math.floor(Math.random() * arr.length)
    let splitPhrase = arr[randomPhrase].split('');
    return splitPhrase;
  };

  function addPhraseToDisplay(arr) {
    // loop  through an array of characters
    for (let i = 0; i < arr.length; i++) {
      let li = document.createElement('li');
      li.innerHTML = (arr)[i];
      const ul = document.querySelector('#phrase ul');
      ul.appendChild(li);
      if (li.textContent === " ") {
        li.className = 'space';
      } else {
        li.className = 'letter';
      };
    };
  };

  addPhraseToDisplay(phraseArray);
  const allLeters = document.querySelectorAll('.letter');

  function checkLetter(letterGuessed) {
    letterFound = false;
    for (let i = 0; i < allLeters.length; i++) {
      const letter = allLeters[i];
      if (letter.textContent === letterGuessed.textContent) {
        letter.classList.add('show');
        letterFound = true;
      };
    };
    return letterFound ? letterGuessed.textContent : null;
  };


  function checkWin() {
    const correctLetters = document.querySelectorAll('.show');
    if (correctLetters.length === allLeters.length) {
      overlay.style.display = 'flex';
      assignProperty(title, 'textContent', 'Wow! You Won!');
      assignProperty(startGame, 'textContent', 'Play Again');
      overlay.style.backgroundColor = '#17c671';
    } else if (missed >= 5) {
      overlay.style.display = 'flex';
      assignProperty(title, 'textContent', 'Oops! Game Over!');
      assignProperty(startGame, 'textContent', 'Play Again');
      overlay.style.backgroundColor = '#c4183c';
    }
  };


  //Add click event listener to the keyboard
  keyboard.addEventListener('click', (e) => {
    if (e.target.nodeName === 'BUTTON') {
      const activeKey = e.target;
      let letterFound = checkLetter(activeKey);
      activeKey.className = 'chosen';
      activeKey.setAttribute('disabled', "");
      if (letterFound === null) {
        missed++;
        const lives = document.querySelectorAll('.tries')[0];
        const ol = lives.parentNode;
        while(missed <= 5) {
          ol.removeChild(lives);
          break;
        };
      };
      checkWin();
    };
  });
});
