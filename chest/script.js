let moneyChest = null;

let gameActive = true;

let z = document.querySelector("h1")

// Инициализация игры

function initGame() {

    // Случайным образом выбираем сундук с деньгами (1, 2 или 3)

    moneyChest = Math.floor(Math.random() * 3) + 1;
    console.log(moneyChest)
    z.innerHTML = (`Игра сун${moneyChest}уки`)

    gameActive = true;

    document.getElementById('result').textContent = '';

    

    // Возвращаем сундуки в закрытое состояние

    for (let i = 1; i <= 3; i++) {

        const chest = document.getElementById(`chest${i}`);

        const img = chest.querySelector('img');

        img.src = '1.png';

        chest.style.opacity = '1';

    }

}


// Функция открытия сундука

function openChest(chestNumber) {

    if (!gameActive) return;

    

    const chest = document.getElementById(`chest${chestNumber}`);

    const img = chest.querySelector('img');

    

    if (chestNumber === moneyChest) {

        // В сундуке деньги!

        img.src = '2.png';

        document.getElementById('result').innerHTML = '<span style="color: green;">Поздравляем! Вы нашли деньги!</span>';

    } else {

        // Сундук пустой

        img.src = '3.png';

        document.getElementById('result').innerHTML = '<span style="color: red;">Увы, сундук пуст!</span>';

    }

    

    // Затемняем неоткрытые сундуки

    for (let i = 1; i <= 3; i++) {

        if (i !== chestNumber) {

            document.getElementById(`chest${i}`).style.opacity = '0.5';

        }

    }

    

    gameActive = false;

}


// Сброс игры

function resetGame() {

    initGame();

}


// Запускаем игру при загрузке страницы

window.onload = initGame;
