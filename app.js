let minValue;
let maxValue;
let answerNumber;
let orderNumber = 1;
let gameRun = true;

const listAnswer = [
    'Да это легко! Ты загадал ',
    'Наверное, это число ',
    'Я думаю, это ',
];
const listWin = [
    'Я всегда угадываю!!!',
    'Я выиграл!!!',
    'Для меня это было слишком легко!!!',
];

function numberToText(number) {
    const numbersText = ['ноль', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять', 
                         'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 
                         'семнадцать', 'восемнадцать', 'девятнадцать'];
    const tensText = ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
    if (number >= 0 && number < 20) {
        return numbersText[number];
    } else if (number < 100) {
        return tensText[Math.floor(number / 10)] + ' ' + (number % 10 === 0 ? '' : numbersText[number % 10]);
    } else {
        return number.toString();
    }
}

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');
const btnStart = document.querySelector('.btn-start');

btnStart.addEventListener('click', () => {
    startGame();
    document.querySelector('.game-random').classList.toggle('collapse');
})

function startGame(){
    minValue = parseInt(document.querySelector('.min-input').value) || 0;
    maxValue = parseInt(document.querySelector('.max-input').value) || 100;

    minValue = (minValue < -999) ? -999 : (minValue > 999 ? 999 : minValue);
    maxValue = (maxValue > 999) ? 999 : (maxValue < -999 ? -999 : maxValue);
    
    document.querySelector('.game-data').classList.toggle('collapse');
    alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
    
    answerNumber  = Math.floor((minValue + maxValue) / 2);
    gameRun = true;
    answerField.innerText = `Вы загадали число ${numberToText(answerNumber)}?`;
    orderNumberField.innerText = orderNumber;
}

function randomAnswer(list){
    let number = Math.floor(Math.random() * list.length);
    return list[number];
}

document.getElementById('btnRetry').addEventListener('click', function () {
    minValue = 0;
    maxValue = 100;
    answerNumber = 0;
    orderNumber = 1;
    document.querySelector('.game-data').classList.toggle('collapse');
    document.querySelector('.game-random').classList.toggle('collapse');
});

document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round(Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;
            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber + 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerField.innerText = `${randomAnswer(listAnswer)} ${numberToText(answerNumber)}?`;
        }
    }
});

document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round(Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;
            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            maxValue = answerNumber - 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerField.innerText = `${randomAnswer(listAnswer)} ${numberToText(answerNumber)}?`;
        }
    }
});

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){
        answerField.innerText = `${randomAnswer(listWin)} \n\u{1F60E}`;
        gameRun = false;
    }
});
