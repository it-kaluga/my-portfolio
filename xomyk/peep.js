const { randomHole, holes, moleTimer, timeUp } = require("./script");

// 2. Функция появления хомяка 🐻👩🏼‍🦱🐹😈
export function peep() {
    // Хомяк будет показываться на случайное время от 600 до 1200 миллисекунд (0.6 - 1.2 сек)
    const time = Math.round(Math.random() * (1200 - 600) + 600);
    const hole = randomHole(holes);

    hole.textContent = '🐱‍👤☕⚔'; // Сажаем хомяка в норку
    hole.classList.add('has-mole'); // Помечаем, что тут есть хомяка


    // Через заданное время прячем хомяка
    moleTimer = setTimeout(() => {
        if (hole.textContent === '🐱‍👤☕') {
            hole.textContent = ''; // Прячем хомяка, если его не поймали
        }
        hole.classList.remove('has-mole');

        // Если время игры не вышло, запускаем следующего хомяка
        if (!timeUp) {
            peep();
        }
    }, time);
}
