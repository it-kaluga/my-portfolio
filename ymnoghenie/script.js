let num1, num2, correctAnswer;
let correctCount = 0;  // Количество правильных ответов
let totalCount = 0;   // Общее количество отвеченных примеров

// Функция для генерации нового примера
function generateExample() {
    num1 = Math.floor(Math.random() * 10) + 1; // Число от 1 до 10
    num2 = Math.floor(Math.random() * 10) + 1; // Число от 1 до 10
    correctAnswer = num1 * num2;
    
    // Отображаем пример
    document.getElementById('num1').textContent = num1;
    document.getElementById('num2').textContent = num2;
    
    // Очищаем поле ввода и результат
    document.getElementById('userAnswer').value = '';
    document.getElementById('result').textContent = '';
    document.getElementById('result').className = '';
    
    // Показываем кнопку «Проверить ответ», скрываем «Новый пример»
    document.getElementById('checkBtn').classList.remove('hidden');
    document.getElementById('newExampleBtn').classList.add('hidden');
}

// Функция проверки ответа
function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('userAnswer').value);
    const resultElement = document.getElementById('result');
    
    if (isNaN(userAnswer)) {
        resultElement.textContent = 'Пожалуйста, введите число!';
        resultElement.className = 'incorrect';
        return;
    }
    
    totalCount++; // Увеличиваем общее количество попыток
    
    if (userAnswer === correctAnswer) {
        correctCount++; // Увеличиваем количество правильных ответов
        resultElement.textContent = 'Правильно! Молодец!';
        resultElement.className = 'correct';
    } else {
        resultElement.textContent = `Неправильно. Правильный ответ: ${correctAnswer}`;
        resultElement.className = 'incorrect';
    }
    
    // Обновляем отображение статистики
    document.getElementById('correctCount').textContent = correctCount;
    document.getElementById('totalCount').textContent = totalCount;
    
    // Скрываем кнопку «Проверить», показываем «Новый пример»
    document.getElementById('checkBtn').classList.add('hidden');
    document.getElementById('newExampleBtn').classList.remove('hidden');
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Генерируем первый пример
    generateExample();
    
    // Назначаем обработчики событий
    document.getElementById('checkBtn').addEventListener('click', checkAnswer);
    document.getElementById('newExampleBtn').addEventListener('click', generateExample);
    
    // Также можно проверять по нажатию Enter в поле ввода
    document.getElementById('userAnswer').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });
});

