
const possibleAnswers = document.querySelectorAll('.answer');
const dataUrl = 'https://gosujmen-learnwords.herokuapp.com/words?page=0&group=0';
const url = 'https://gosujmen-learnwords.herokuapp.com/';
const audioButton = document.querySelector('.question');
const data = getData(dataUrl);
console.log(data)

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
    audioButton.addEventListener('click', () =>
    {
        audio.play();
        console.log('click');
    })
}

function getRandomAnswers(correctAnswer, answers) {
    let arr = [];
    arr.push(correctAnswer)
    while(arr.length < 4) {
        let ind = Math.floor(Math.random() * data.length);
        if(!arr.includes(data[ind].word)) arr.push(data[ind].word); 
    }
    return arr
}

//функция генерации четырех случайных ответов
function getRandAnsNum(possibleAnswers, data) {
  let arr = [];
  while(arr.length < possibleAnswers.length)
  {
    let ind = Math.floor(Math.random() * data.length) + 1;
    if(arr.indexOf(ind) === -1) arr.push(ind);
  }
  return arr
}

//функция установки четырех случайных ответов
function setRandAns(possibleAnswers, data) {
  let arr = getRandAnsNum(possibleAnswers, data);
  possibleAnswers.forEach((elem, index) => elem.textContent = data[arr[index]].word)
}

function startGame(url, possibleAnswers, data) {
    let count = 0
    let correctAnswer = data[count].word
    setRandAns(possibleAnswers, data)
    setQuestion(url, data[count].audio)
    possibleAnswers.addEventListener('click', (click) => {
        
    })
}


