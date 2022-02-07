const possibleAnswers = document.querySelectorAll('.answer');
let tempArray = Array.from('https://gosujmen-learnwords.herokuapp.com/words?page=0&group=0')
let audio = new Audio('https://gosujmen-learnwords.herokuapp.com/files/01_0018.mp3')
const audioButton = document.querySelector('.question')
audioButton.addEventListener('click', () => {
  audio.play()
  console.log('click')
})

function getData() {
  let b = []
  fetch('https://gosujmen-learnwords.herokuapp.com/words?page=0&group=0')
  .then((response) => {
  return response.json();
  })
  .then((data) => data.forEach(el => b.push(el)))
  return b
};


//функция генерации четырех случайных ответов
function getRandAnsNum(x) {
  let arr = [];
  while(arr.length < 4)
  {
    let r = Math.floor(Math.random() * x) + 1;
    if(arr.indexOf(r) === -1) arr.push(r);
  }
  return arr
}

//функция установки четырех случайных ответов
function setRandAns(x) {
  let arr = getRandAnsNum(x);
  fetch('https://gosujmen-learnwords.herokuapp.com/words?page=0&group=0')
  .then((response) => {
  return response.json();
  })
  .then((data) => {
    possibleAnswers.forEach((elem, index) => {
      console.log(arr)
      elem.textContent = data[arr[index]].word;
    })
  });
}


