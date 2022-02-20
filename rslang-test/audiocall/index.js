let page = 0;
let group = 0;
let res = [];
const url = 'https://gosujmen-learnwords.herokuapp.com/';
const dataUrl = `${url}words?page=${page}&group=${group}`;
let correctAnswer = null;
let randomAnswer = null;
let counter = 0;
let answerScore = 10;

const timerCount = document.querySelector('.timer');
const scoreCount = document.querySelector('.score');
const correctCount = document.querySelectorAll('.correctCount');
const correctSound = document.querySelector('.correctSound');
const questionSection = document.querySelector('.question');
const questionNotT = document.querySelector('.questionNotT');
const questionT = document.querySelector('.questionT');
const unCorrect = document.querySelector('.unCorrect');
const correct = document.querySelector('.correct');
const resultBlock = document.querySelector('.result');
const answerBlock = document.querySelector('.answer-block');
const startButton = document.querySelector('.button');
const resetBtn = document.querySelector('.reset');
const gameReset = document.querySelector('body');

const data = getData(dataUrl);

function getData(dataUrl) {
  let b = [];
  fetch(dataUrl)
  .then((response) => {
  return response.json();
  })
  .then((data) => {
    data.forEach((elem) => b.push(elem));
  })
  return b;
}

//Функция установки слова на английском
function setQuest(data, count) {
  questionNotT.textContent = data[count].word;
  return data[count].wordTranslate;
}

//Функция установки рандомного переведенного слова
function setRandQuest(data, count) {
  let min = 0;
  let max = 0;
  let ind = 0;
  if(count < 18 && count > 2) {
    min = count - 2;
    max = count + 2;
  } else if (count < 3) {
    min = 0;
    max = 5;
  } else if (count > 17) {
    min = 17;
    max = 21;
  }
  ind = Math.floor(Math.random() * (max - min)) + min;
  questionT.textContent = data[ind].wordTranslate;
  console.log(ind);
  return data[ind].wordTranslate;
}

//Устанавливает правильное слово и рандомный перевод
function setQA(data, count) {
  correctAnswer = setQuest(data, count);
  randomAnswer = setRandQuest(data, count);
}

//Начинает новый раунд
function newRound(data, count, res, t) {
  res.push({correct: correctAnswer, user: randomAnswer});
  count < data.length ? setQA(data, count) : result(res, t);
  console.log(correctAnswer, randomAnswer)
}

function timer(res) {
  let time = 30;
  function showTime() {
    timerCount.textContent = time;
    time--;
  }
  let timerInt = setInterval(showTime, 1000);
  let timerTout = setTimeout(() => {
    clearInterval(timerInt);
    result(res);
    timerCount.textContent = 0;
  }, time * 1000)
  return [timerInt, timerTout];
}

//Показывает результат
function result(ar, t) {
  clearInterval(t[0]);
  clearTimeout(t[1]);
  resultBlock.classList.toggle('hidden')
  resultBlock.innerHTML += `<div class="resultTable"><div>Ваш счёт: ${score}</div></div>`
  answerBlock.classList.toggle('hidden')
  questionSection.classList.toggle('hidden')
  ar.map(({correct, user}) =>{
    correct === user
    ? resultBlock.innerHTML += `<div class="resultTable"><div>${correct}</div><div>${user}</div><div class="plus"></div>`
    : resultBlock.innerHTML += `<div class="resultTable"><div>${correct}</div><div>${user}</div><div class="minus"></div>`
  })
}

function testStart(dataUrl) {
  answerBlock.classList.toggle('hidden')
  let res = [];
  resultBlock.innerHTML = '';
  counter = 0;
  score = 0;
  answerScore = 10;
  scoreCount.textContent = score;
  fetch(dataUrl)
  .then((response) => {
  return response.json();
  })
  .then((data) => {
    correctAnswer = setQuest(data, counter)
    randomAnswer = setRandQuest(data, counter)
    correctSound.addEventListener('click', () =>
    {
      let questionUrl = `${url}${data[counter].audio}`;
      audio = new Audio(questionUrl);
      audio.play();
    })
    let t = timer(res);
    unCorrect.addEventListener('click', () => {
      if(correctAnswer !== randomAnswer) {
        score += answerScore;
        scoreCount.textContent = score;
      }
      counter++;
      newRound(data, counter, res, t)
    })
    correct.addEventListener('click', () => {
      if(correctAnswer === randomAnswer) {
        score += answerScore;
        scoreCount.textContent = score;
      }
      counter++;
      newRound(data, counter, res, t)
    })
  })
}

startButton.addEventListener('click', () => {
  testStart(dataUrl);
  resetBtn.classList.toggle('hidden')
  startButton.classList.toggle('hidden')
})

resetBtn.addEventListener('click', () => {
  document.location.reload();
})