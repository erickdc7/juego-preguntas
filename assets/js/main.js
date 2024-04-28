const questions = [
    {
        question: "¿Cuál es mi animal favorito?",
        answers: [
            { text: "Perro 🐶", correct: true },
            { text: "Gato 🐱", correct: false },
            { text: "León 🦁", correct: false },
            { text: "Delfín 🐬", correct: false }
        ]
    },
    {
        question: "¿Cuál es mi estación del año preferida?",
        answers: [
            { text: "Primavera 🌸", correct: false },
            { text: "Verano 🌞", correct: false },
            { text: "Otoño 🍂", correct: false },
            { text: "Invierno ☃️", correct: true }
        ]
    },
    {
        question: "¿Cuál es mi película favorita?",
        answers: [
            { text: "Star Wars ⭐", correct: true },
            { text: "Harry Potter 🧙‍♂️", correct: false },
            { text: "Avengers 🦸‍♂️", correct: false },
            { text: "El Señor de los Anillos 🧝‍♂️", correct: false }
        ]
    },
    {
        question: "¿Qué tipo de música prefiero?",
        answers: [
            { text: "Pop 🎤", correct: false },
            { text: "Rock 🎸", correct: true },
            { text: "Jazz 🎷", correct: false },
            { text: "Clásica 🎻", correct: false }
        ]
    },
    {
        question: "¿Cuál es mi deporte favorito?",
        answers: [
            { text: "Fútbol ⚽", correct: true },
            { text: "Baloncesto 🏀", correct: false },
            { text: "Tenis 🎾", correct: false },
            { text: "Natación 🏊‍♂️", correct: false }
        ]
    },
    {
        question: "¿Cuál es mi libro favorito?",
        answers: [
            { text: "El Principito 🤴", correct: false },
            { text: "Cien años de soledad 📚", correct: false },
            { text: "El Gran Gatsby 🎩", correct: true },
            { text: "Crónica de una muerte anunciada ⚔️", correct: false }
        ]
    },
    {
        question: "¿Cuál es mi serie de televisión favorita?",
        answers: [
            { text: "Friends 👫", correct: false },
            { text: "Game of Thrones 🐉", correct: false },
            { text: "Stranger Things 🚲", correct: false },
            { text: "The Office 📊", correct: true }
        ]
    },
    {
        question: "¿Qué instrumento musical me gustaría aprender a tocar?",
        answers: [
            { text: "Guitarra 🎸", correct: false },
            { text: "Piano 🎹", correct: true },
            { text: "Violín 🎻", correct: false },
            { text: "Batería 🥁", correct: false }
        ]
    },
    {
        question: "¿Qué actividad me relaja más?",
        answers: [
            { text: "Leer 📖", correct: false },
            { text: "Yoga 🧘‍♀️", correct: false },
            { text: "Escuchar música 🎧", correct: false },
            { text: "Dibujar ✏️", correct: true }
        ]
    },
    {
        question: "¿Qué tipo de película prefiero ver?",
        answers: [
            { text: "Comedia 🎬", correct: false },
            { text: "Acción 💥", correct: true },
            { text: "Drama 🎭", correct: false },
            { text: "Ciencia ficción 👽", correct: false }
        ]
    },
];

function showFinalScore() {
    const gameElement = document.getElementById('game');
    let message = ''; // Mensaje inicial

    if (score <= 5) {
        message = `<h2>Tu puntuación final es: ${score} de ${questions.length} 😢</h2>`; // Emoji triste
    } else {
        message = `<h2>Tu puntuación final es: ${score} de ${questions.length} 😄</h2>`; // Emoji feliz
    }

    gameElement.innerHTML = message;
}

let currentQuestionIndex = 0;
let question = 0;
let score = 0;
let timer;

document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('startScreen');
    const startButton = document.getElementById('startButton');
    const gameElement = document.getElementById('game');

    // Asegúrate de que la pantalla de inicio sea visible y el juego no, al cargar la página
    startScreen.style.display = 'block'; // Mostrar pantalla de inicio
    gameElement.style.display = 'none'; // Ocultar juego

    startButton.addEventListener('click', () => {
        startScreen.style.display = 'none'; // Ocultar pantalla de inicio
        gameElement.style.display = 'block'; // Mostrar juego
        showQuestion(questions[currentQuestionIndex]);
        updateProgressBar();
    });
});

function showQuestion(question) {
    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');
    questionElement.textContent = question.question;
    answersElement.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.classList.add('answer');
        button.textContent = answer.text;
        button.onclick = () => selectAnswer(answer.correct, button);
        answersElement.appendChild(button);
    });
    startTimer();
}


function startTimer() {
    const timerElement = document.getElementById('timer');
    let timeLeft = 10; // Inicializar el tiempo restante
    let emoji = '⏳'; // Emoji inicial

    // Función para actualizar el emoji según el tiempo restante
    function updateEmoji() {
        if (timeLeft <= 5) {
            emoji = '⌛'; // Cambiar a otro emoji cuando el tiempo sea menor o igual a 5 segundos
        }
    }

    timerElement.textContent = `${emoji}${timeLeft}`; // Mostrar emoji y tiempo inicial

    clearInterval(timer); // Asegúrate de detener cualquier temporizador anterior
    timer = setInterval(() => {
        timeLeft--;
        updateEmoji(); // Actualizar el emoji según el tiempo restante
        timerElement.textContent = `${emoji}${timeLeft}`; // Mostrar emoji y tiempo actualizado

        if (timeLeft <= 0) {
            clearInterval(timer);
            showNextQuestion(); // Mostrar la siguiente pregunta o finalizar si es la última
        }
    }, 1000);
}

function selectAnswer(correct, button) {
    clearInterval(timer); // Detener el temporizador
    const answersButtons = document.querySelectorAll('.answer');
    answersButtons.forEach(btn => {
        btn.disabled = true; // Deshabilita todos los botones para evitar múltiples respuestas
        if (btn === button) {
            btn.classList.add(correct ? 'correct' : 'incorrect');
        }
    });
    question++;
    if (correct) {
        score++;
    }
    document.getElementById('score').textContent = `Puntuación ${score} / ${question}`;
    setTimeout(showNextQuestion, 2000); // Espera 2 segundos antes de mostrar la siguiente pregunta

}

function showNextQuestion() {
    if (currentQuestionIndex + 1 < questions.length) {
        showQuestion(questions[currentQuestionIndex + 1]);
    } else {
        showFinalScore();
    }
    currentQuestionIndex++;
    updateProgressBar();
    document.getElementById('questionCount').textContent = `Pregunta ${question + 1} de ${questions.length}`;
}

function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    progressBar.innerHTML = ''; // Limpia la barra de progreso
    questions.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('progressDot');
        if (index === currentQuestionIndex) {
            dot.classList.add('active'); // Asegúrate de que esto se actualice correctamente
        }
        progressBar.appendChild(dot);
    });
}