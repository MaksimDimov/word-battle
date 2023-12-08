'use strict';

// import  Score  from './Score.js';

import { onEvent, getElement, select, selectAll, print, sleep, randomNumber, filterArray, create}  from './Utilities.js';

  const word = select('.word');
  const wordDiv = select('.word-div');
  const wordInput = select('.word-input');
  const startButton = select('.start-button');
  const countDown = select('.countdown');
  const hits = select('.hits');
  const persentage = select('.persentage');
  const gameOver = select('.game-over');
  const wordInputDiv = select('.word-input-div');
  const backgroundMusic = select('.background-music');
  const timerDiv = select('.timer-div');
  const gameDiv = select('.game-div');
  const scoreZone = select('.score-zone');
  const scoreDiv = select('.score-div');
  const scoreButton = select('.score-button');
  const hideScoreButton = select('.close-button');
  const scoreTable = select('.score-table');
  const container = select('.container');

    let scoreValue = 0;

const words = [
    'dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building',
    'population', 'weather', 'bottle', 'history', 'dream', 'character', 'money',
    'absolute', 'discipline', 'machine', 'accurate', 'connection', 'rainbow',
    'bicycle', 'eclipse', 'calculator', 'trouble', 'watermelon', 'developer',
    'philosophy', 'database', 'periodic', 'capitalism', 'abominable',
    'component', 'future', 'pasta', 'microwave', 'jungle', 'wallet', 'canada',
    'coffee', 'beauty', 'agency', 'chocolate', 'eleven', 'technology', 'promise',
    'alphabet', 'knowledge', 'magician', 'professor', 'triangle', 'earthquake',
    'baseball', 'beyond', 'evolution', 'banana', 'perfume', 'computer',
    'management', 'discovery', 'ambition', 'music', 'eagle', 'crown', 'chess',
    'laptop', 'bedroom', 'delivery', 'enemy', 'button', 'superman', 'library',
    'unboxing', 'bookstore', 'language', 'homework', 'fantastic', 'economy',
    'interview', 'awesome', 'challenge', 'science', 'mystery', 'famous',
    'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow',
    'keyboard', 'window', 'beans', 'truck', 'sheep', 'band', 'level', 'hope',
    'download', 'blue', 'actor', 'desk', 'watch', 'giraffe', 'brazil', 'mask',
    'audio', 'school', 'detective', 'hero', 'progress', 'winter', 'passion',
    'rebel', 'amber', 'jacket', 'article', 'paradox', 'social', 'resort', 'escape'
    ];

    // localStorage.clear();
    let endTime;
    let gameActive = true; 

    function startTimer(durationInSeconds) {
        endTime = new Date().getTime() + durationInSeconds * 1000;
        wordInputDiv.classList.remove('hidden');

    function updateTimer() {
        let currentTime = new Date().getTime();
        let remainingTime = endTime - currentTime;
        hits.textContent = `Score: ${scoreValue}`;
        startButton.textContent = 'Restart';
    
        if (remainingTime <= 0) {
            countDown.textContent = '00';
            gameActive = false;
            clearInterval(timerInterval);
            backgroundMusic.pause();
            scoreArray.push({ score: scoreValue, percentage: Math.round((scoreValue / words.length) * 100) + '%' });
            saveData('scores', scoreArray);
            gameOver.classList.remove('hidden');
            wordInput.classList.add('hidden');
            scoreButton.classList.remove('hidden');
            wordDiv.classList.add('hidden');
        } else {
            let seconds = Math.floor(remainingTime / 1000);
            seconds = seconds < 10 ? '0' + seconds : seconds;
            countDown.textContent = seconds;
            gameOver.classList.add('hidden');
            wordInput.classList.remove('hidden');
            scoreButton.classList.add('hidden');
            wordDiv.classList.remove('hidden');
        }
    }
        updateTimer();
        let timerInterval = setInterval(updateTimer, 1000);
}

    function startGame() {
        backgroundMusic.play();
        gameActive = true;
        scoreValue = 0;
        timerDiv.classList.remove('hidden');
        gameDiv.classList.remove('hidden');
        startTimer(15,9999);
        changeWord();
    }

    function changeWord() {
        let randomWord = words[Math.floor(Math.random() * words.length)];
        word.textContent = randomWord;
        wordInput.value = '';
        wordInput.focus();
    }

    function checkInput() {
        if (!gameActive) {
            return; 
        }
    
        if (wordInput.value.toLowerCase() === word.textContent.toLowerCase()) {
            scoreValue++;
            changeWord();
        }
      }

    function hideScore() {
      scoreZone.classList.add('hidden');
      scoreDiv.classList.add('hidden');
      container.classList.remove('hidden');
      
    }

    function saveData(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
  }
  
  function getData(key) {
      const storedData = localStorage.getItem(key);
      return storedData ? JSON.parse(storedData) : null;
  }
  
  const retrievedData = getData('user');
  console.log(retrievedData); 

  const scoreArray = []; 

function updateScoreTable() {
  scoreArray.sort((a, b) => b.score - a.score);

  for (let i = 0; i < Math.min(scoreArray.length, 9); i++) {
    const row = scoreTable.rows[i + 1]; 
    const placeCell = row.cells[0];
    const scoreCell = row.cells[1];
    const percentageCell = row.cells[2];

    placeCell.textContent = `#${i + 1}`;
    scoreCell.textContent = scoreArray[i].score;
    percentageCell.textContent = scoreArray[i].percentage;
  }
}

function loadScoresFromStorage() {
  const storedScores = getData('scores');
  if (storedScores) {
    scoreArray.push(...storedScores);
    updateScoreTable();
  }
}

function showScore() {
  scoreZone.classList.remove('hidden');
  updateScoreTable();
  container.classList.add('hidden');
}

loadScoresFromStorage();

    onEvent('click', scoreButton, showScore);

    onEvent('click', hideScoreButton, hideScore);

    onEvent('input', wordInput, checkInput);
    
    onEvent('click', startButton, startGame);

