let page = 0;
let group = 0;
const url = 'https://gosujmen-learnwords.herokuapp.com/';
let dataUrl = `${url}words?page=${page}&group=${group}`;

const ansBlock = document.querySelector('.answer-block');
const possibleAnswers = document.querySelectorAll('.answer');
const audioButton = document.querySelector('.question');
const startButton = document.querySelector('.button');
const resultBlock = document.querySelector('.result')
const resetBtn = document.querySelector('.reset');
const gameReset = document.querySelector('body');

const data = getData(dataUrl);

function getData(dataUrl) {
  let b = [];
  fetch(dataUrl)
  .then((response) => {
  return response.json();
  })
  .then((data) => data.forEach(el => b.push(el)))
  return b;
}

//функция установки вопроса
function setQuestion(url, sound) {
  let questionUrl = `${url}${sound}`;
  let audio = new Audio(questionUrl);
  audio.play();
}



//фунция которая тасует ответы
function shuffleAnswers(answers) {
  for (let i = answers.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * i)
    const temp = answers[i]
    answers[i] = answers[j]
    answers[j] = temp
  }
  return answers;
}

//получаем массив с четырьмя ответами и тасуем его
function getRandomAnswers(correctAnswer, answers) {
  let arr = [];
  arr.push(correctAnswer)
  while(arr.length < 4) {
      let ind = Math.floor(Math.random() * answers.length);
      if(!arr.includes(answers[ind].word)) arr.push(answers[ind].word); 
  }
  return shuffleAnswers(arr)
}

//функция установки четырех случайных ответов
function setRandAns(correctAnswer, data) {
  let arr = getRandomAnswers(correctAnswer, data)
  possibleAnswers.forEach((elem, index) => elem.textContent = arr[index])
}

function result(ar) {
  ansBlock.classList.toggle('hidden');
  resultBlock.classList.toggle('hidden');
  ar.map(({correct, user}) =>{
    correct === user
    ? resultBlock.innerHTML += `<div class="resultTable"><div>${correct}</div><div>${user}</div><div class="plus"></div>`
    : resultBlock.innerHTML += `<div class="resultTable"><div>${correct}</div><div>${user}</div><div class="minus"></div>`
  })
}

function game(ind, data, url) {
  let correctAnswer = data[ind].word
  let sound = data[ind].audio
  setQuestion(url, sound)
  setRandAns(correctAnswer, data)
  return correctAnswer
}

function testStart(dataUrl) {
  ansBlock.classList.toggle('hidden')
  resultBlock.innerHTML = '';
  fetch(dataUrl)
  .then((response) => {
  return response.json();
  })
  .then((data) => {
    let ind = 0
    let res = []
    let correctAnswer = game(ind, data, url)
    audioButton.addEventListener('click', () =>
    {
      let questionUrl = `${url}${data[ind].audio}`;
      audio = new Audio(questionUrl);
      audio.play();
      console.log('click');
    })
    ansBlock.addEventListener('click', (event) => {
      if (event.target.matches('.answer')) {
        res.push({correct: correctAnswer, user: event.target.textContent})
        if (event.target.textContent !== correctAnswer) {
          event.target.classList.toggle('incorrect');
          setTimeout(() => event.target.classList.toggle('incorrect'), 400)
          ind++;
          console.log(correctAnswer, event.target.textContent)
          ind < data.length ? correctAnswer = game(ind, data, url) : result(res);
        } else {
          event.target.classList.toggle('correct');
          setTimeout(() => event.target.classList.toggle('correct'), 400)
          ind++
          console.log(correctAnswer, event.target.textContent)
          ind < data.length ? correctAnswer = game(ind, data, url) : result(res);
        }
      }
    })
  })
}

startButton.addEventListener('click', () => {
  testStart(dataUrl);
  startButton.classList.toggle('hidden')
  resetBtn.classList.toggle('hidden')
})

resetBtn.addEventListener('click', () => {
  document.location.reload();
})