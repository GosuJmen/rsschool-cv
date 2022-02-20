const words = document.querySelector('.words');
const classesAr = ["word", "transcription", "wordTranslate", "textMeaning", "textMeaningTranslate", "textExample", "textExampleTranslate"]
const left = document.querySelector('.left')
const right = document.querySelector('.right')

//Создаем карточки с классом word
function getListContent(data) {
  let result = [];
  for(let i = 0; i < data.length; i++) {
    let div = document.createElement('div');
    result.push(div);
  }
  return result;
}
//Заолняем карточки элементами
function setWords(classesAr) {
  let result = [];
  for(let i = 0; i < classesAr.length; i++) {
    let div = document.createElement('div');
    div.setAttribute('class', `${classesAr[i]}`)
    result.push(div);
  }
  return result;
}

function wordsCreating(dataUrl) {
  fetch(dataUrl)
  .then((response) => {
  return response.json();
  })
  .then((data) => {
    words.append(...getListContent(data))
    let wordsList = words.querySelectorAll('div')
    wordsList.forEach((word) => word.setAttribute('class', 'wor_d'))
    wordsList = words.querySelectorAll('.wor_d')
    wordsList.forEach((word) => word.append(...setWords(classesAr)))
    wordsList.forEach((word, ind) => {
      let tempData = data[ind]
      classesAr.map((elem) => {
        let temp = word.querySelector(`.${elem}`)
        temp.innerHTML = tempData[elem]
      })
      word.style.backgroundImage = `url(${url}${tempData['image']})`
    })
  })
}

function wordsFilling(dataUrl) {
  fetch(dataUrl)
  .then((response) => {
  return response.json();
  })
  .then((data) => {
    let wordsList = words.querySelectorAll('.wor_d')
    wordsList.forEach((word, ind) => {
      let tempData = data[ind]
      classesAr.map((elem) => {
        let temp = word.querySelector(`.${elem}`)
        temp.innerHTML = tempData[elem]
      })
    })
  })
}

right.addEventListener('click', () => {
  page !== 29 ? page++ : page = 0
  dataUrl = `${url}words?page=${page}&group=${group}`;
  wordsFilling(dataUrl)
  console.log(page)
})

left.addEventListener('click', () => {
  page !== 0 ? page-- : page = 29
  dataUrl = `${url}words?page=${page}&group=${group}`;
  wordsFilling(dataUrl)
  console.log(page)
})

wordsCreating(dataUrl)

