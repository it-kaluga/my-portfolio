const { peep } = require("./peep");

// Находим нужные элементы на странице
export const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('#score');
const startBtn = document.querySelector('#start-btn');

let score = 0;
let lastHole;
export let timeUp = false; // Закончилась ли игра
export let moleTimer;      // Таймер появления хомяка
let gameTimer;      // Общий таймер игры

// 1. Функция для выбора случайной норки (чтобы хомяк не появлялся в одной и той же дважды подряд)
export function randomHole(holes) {
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];
    if (hole === lastHole) {
        return randomHole(holes); // Рекурсия, если норка совпала
    }
    lastHole = hole;
    return hole;
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