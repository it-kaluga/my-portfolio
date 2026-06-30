// Находим нужные элементы на странице
const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('#score');
const startBtn = document.querySelector('#start-btn');

let score = 0;
let lastHole;
let timeUp = false; // Закончилась ли игра
let moleTimer;      // Таймер появления хомяка
let gameTimer;      // Общий таймер игры

// 1. Функция для выбора случайной норки (чтобы хомяк не появлялся в одной и той же дважды подряд)
function randomHole(holes) {
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];
    if (hole === lastHole) {
        return randomHole(holes); // Рекурсия, если норка совпала
    }
    lastHole = hole;
    return hole;
}

// 2. Функция появления хомяка 🐻👩🏼‍🦱🐹😈
function peep() {
    // Хомяк будет показываться на случайное время от 600 до 1200 миллисекунд (0.6 - 1.2 сек)
    const time = Math.round(Math.random() * (1200 - 600) + 600);
    const hole = randomHole(holes);

    hole.textContent = '🐹'; // Сажаем хомяка в норку
    hole.classList.add('has-mole'); // Помечаем, что тут есть хомяка

    // Через заданное время прячем хомяка
    moleTimer = setTimeout(() => {
        if (hole.textContent === '🐹') {
            hole.textContent = ''; // Прячем хомяка, если его не поймали
        }
        hole.classList.remove('has-mole');

        // Если время игры не вышло, запускаем следующего хомяка
        if (!timeUp) {
            peep();
        }
    }, time);
}

// 3. Функция старта игры
function startGame() {
    // Сбрасываем старые таймеры (если игра запускается повторно)
    clearTimeout(moleTimer);
    clearTimeout(gameTimer);

    // Очищаем все норки
    holes.forEach(hole => {
        hole.textContent = '';
        hole.classList.remove('has-mole');
    });

    score = 0;
    scoreBoard.textContent = score;
    timeUp = false;
    startBtn.disabled = true;
    startBtn.textContent = 'Игра идет...';

    peep(); // Запускаем первого хомяка

    // Игра длится 15 секунд (15000 миллисекунд)
    gameTimer = setTimeout(() => {
        timeUp = true;
        startBtn.disabled = false;
        startBtn.textContent = 'Играть снова';
        alert('Время вышло! Твой результат: ' + score + ' очков!');
    }, 15000);
}

// 4. Функция удара по хомяку
function whack(e) {
    // Проверяем, есть ли в этой норке хомяка в момент клика
    if (this.classList.contains('has-mole')) {
        score++; // Увеличиваем счет
        scoreBoard.textContent = score; // Обновляем счет на экране
        this.textContent = '💥'; // Показываем анимацию удара
        this.classList.remove('has-mole'); // хомяка больше нет в этой норке

        // Через 200 миллисекунд убираем взрыв из норки
        setTimeout(() => {
            if (this.textContent === '💥') {
                this.textContent = '';
            }
        }, 200);
    }
}

// Навешиваем событие клика на каждую норку
holes.forEach(hole => hole.addEventListener('click', whack));

// Навешиваем событие клика на кнопку Старт
startBtn.addEventListener('click', startGame);