const questions = [
    {
        question: "¿Cuál es el océano más grande del mundo?",
        answers: [
            { text: "Océano Atlántico", correct: false },
            { text: "Océano Índico", correct: false },
            { text: "Océano Pacífico", correct: true },
            { text: "Océano Ártico", correct: false }
        ]
    },
    {
        question: "¿Cuántos continentes hay en la Tierra?",
        answers: [
            { text: "5", correct: false },
            { text: "6", correct: false },
            { text: "7", correct: true },
            { text: "8", correct: false }
        ]
    },
    {
        question: "¿Qué gas necesitan las plantas para realizar la fotosíntesis?",
        answers: [
            { text: "Oxígeno", correct: false },
            { text: "Nitrógeno", correct: false },
            { text: "Dióxido de carbono", correct: true },
            { text: "Hidrógeno", correct: false }
        ]
    },
    {
        question: "¿Cuál es el río más largo del mundo?",
        answers: [
            { text: "Río Amazonas", correct: true },
            { text: "Río Nilo", correct: false },
            { text: "Río Yangtsé", correct: false },
            { text: "Río Misisipi", correct: false }
        ]
    },
    {
        question: "¿Cuál es el símbolo químico del oro?",
        answers: [
            { text: "Ag", correct: false },
            { text: "Au", correct: true },
            { text: "Fe", correct: false },
            { text: "O", correct: false }
        ]
    }
];

function showFinalScore() {
    const gameElement = document.getElementById('game');
    const percentage = (score / questions.length) * 100;

    let message = "";

    if (percentage < 60) {
        message = `
            <h2>😅 Necesitas practicar más.</h2>
            <p>Obtuviste ${score} de ${questions.length}.</p>
        `;
    } else if (percentage < 100) {
        message = `
            <h2>🙂 ¡Buen trabajo!</h2>
            <p>Obtuviste ${score} de ${questions.length}.</p>
        `;
    } else {
        message = `
            <h2>🏆 ¡Excelente!</h2>
            <p>¡Respuesta perfecta! Obtuviste ${score} de ${questions.length}.</p>
        `;
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