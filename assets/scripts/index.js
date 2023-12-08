'use strict';

import  Score  from './Score.js';

import { onEvent, getElement, select, selectAll, print, sleep, randomNumber, filterArray, create}  from './Utilities.js';

  const timerNumbers = select('.timer-numbers');
  const score = select('.score');
  const word = select('.word');
  const wordInput = select('.word-input');
  const startButton = select('.start-button');
  const countDown = select('.countdown');
  const date = select('.date');
  const hits = select('.hits');
  const persentage = select('.persentage');
  const gameOver = select('.game-over');
  const wordInputDiv = select('.word-input-div');
  const backgroundMusic = select('.background-music');
  const timerDiv = select('.timer-div');
  const gameDiv = select('.game-div');

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

    let endTime;
    let gameActive = true; 

    function startTimer(durationInSeconds) {
        endTime = new Date().getTime() + durationInSeconds * 1000;
        wordInputDiv.classList.remove('hidden');

    function updateTimer() {
        let currentTime = new Date().getTime();
        let remainingTime = endTime - currentTime;
        hits.textContent = `Score: ${scoreValue}`;
        // date.textContent = `Date: ${new Date().toLocaleDateString()}`;
        // persentage.textContent = `Percentage: ${Math.round((scoreValue / words.length) * 100)}%`;
        // let finalScoreInfo = new Score(hits.textContent, date.textContent, persentage.textContent);
        // print(finalScoreInfo.getInfo());

        startButton.textContent = 'Restart';
    
        if (remainingTime <= 0) {
            countDown.textContent = '00';
            gameActive = false;
            clearInterval(timerInterval);
            backgroundMusic.pause();
            gameOver.classList.remove('hidden');
            wordInput.classList.add('hidden');
        } else {
            let seconds = Math.floor(remainingTime / 1000);
            seconds = seconds < 10 ? '0' + seconds : seconds;
            countDown.textContent = seconds;
            gameOver.classList.add('hidden');
            wordInput.classList.remove('hidden');
        }
    }

        updateTimer();

        let timerInterval = setInterval(updateTimer, 1000);
}


    function startGame() {
        backgroundMusic.play();
        gameActive = true;
        scoreValue = 0;
        // hits.textContent = 'Score: 0';
        // persentage.textContent = 'Percentage: 0%';
        timerDiv.classList.remove('hidden');
        gameDiv.classList.remove('hidden');
        startTimer(17);
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

    onEvent('input', wordInput, checkInput);
    
    onEvent('click', startButton, startGame);

