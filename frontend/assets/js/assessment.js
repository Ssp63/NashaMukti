// Assessment Types
const assessmentTypes = {
    ALCOHOL: 'alcohol',
    DRUGS: 'drugs',
    TOBACCO: 'tobacco',
    BEHAVIORAL: 'behavioral'
};

// State Management
let currentAssessment = {
    type: null,
    currentQuestion: 0,
    answers: [],
    score: 0
};

// DOM Elements
const assessmentContainer = document.getElementById('assessment-container');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const progressBar = document.getElementById('progress-bar');

// Assessment Questions (Sample - To be expanded)
const questions = {
    [assessmentTypes.ALCOHOL]: [
        {
            question: "How often do you have a drink containing alcohol?",
            options: [
                "Never",
                "Monthly or less",
                "2-4 times a month",
                "2-3 times a week",
                "4 or more times a week"
            ],
            scores: [0, 1, 2, 3, 4]
        },
        // Add more questions
    ],
    // Add other assessment type questions
};

// Initialize Assessment
function initializeAssessment() {
    displayAssessmentTypes();
    setupEventListeners();
}

// Display Assessment Type Selection
function displayAssessmentTypes() {
    const typeContainer = document.createElement('div');
    typeContainer.className = 'assessment-types';
    
    Object.values(assessmentTypes).forEach(type => {
        const card = createAssessmentCard(type);
        typeContainer.appendChild(card);
    });
    
    assessmentContainer.innerHTML = '';
    assessmentContainer.appendChild(typeContainer);
}

// Create Assessment Type Card
function createAssessmentCard(type) {
    const card = document.createElement('div');
    card.className = 'assessment-card';
    card.setAttribute('data-type', type);
    
    card.innerHTML = `
        <h3>${type.charAt(0).toUpperCase() + type.slice(1)} Assessment</h3>
        <p>Take this assessment to evaluate your ${type} usage patterns</p>
    `;
    
    card.addEventListener('click', () => startAssessment(type));
    return card;
}

// Start Assessment
function startAssessment(type) {
    currentAssessment = {
        type: type,
        currentQuestion: 0,
        answers: [],
        score: 0
    };
    
    displayQuestion();
}

// Display Question
function displayQuestion() {
    const question = questions[currentAssessment.type][currentAssessment.currentQuestion];
    
    quizContainer.innerHTML = `
        <div class="question-container">
            <h3>${question.question}</h3>
            <div class="options-container">
                ${question.options.map((option, index) => `
                    <button class="option-btn" data-index="${index}">${option}</button>
                `).join('')}
            </div>
        </div>
    `;
    
    updateProgress();
    setupQuestionListeners();
}

// Update Progress Bar
function updateProgress() {
    const progress = ((currentAssessment.currentQuestion + 1) / 
                     questions[currentAssessment.type].length) * 100;
    progressBar.style.width = `${progress}%`;
}

// Setup Question Option Listeners
function setupQuestionListeners() {
    const options = document.querySelectorAll('.option-btn');
    options.forEach(option => {
        option.addEventListener('click', () => handleAnswer(parseInt(option.dataset.index)));
    });
}

// Handle Answer Selection
function handleAnswer(optionIndex) {
    const question = questions[currentAssessment.type][currentAssessment.currentQuestion];
    currentAssessment.answers.push(optionIndex);
    currentAssessment.score += question.scores[optionIndex];
    
    if (currentAssessment.currentQuestion < questions[currentAssessment.type].length - 1) {
        currentAssessment.currentQuestion++;
        displayQuestion();
    } else {
        showResults();
    }
}

// Show Assessment Results
function showResults() {
    const maxScore = questions[currentAssessment.type].reduce((total, q) => 
        total + Math.max(...q.scores), 0);
    const percentage = (currentAssessment.score / maxScore) * 100;
    
    resultContainer.innerHTML = `
        <div class="result-content">
            <h2>Assessment Results</h2>
            <div class="score-display">
                <div class="score-circle">
                    <span class="score-number">${Math.round(percentage)}%</span>
                </div>
            </div>
            <div class="result-message">
                ${getResultMessage(percentage)}
            </div>
            <button class="action-btn" onclick="saveResults()">Save Results</button>
            <button class="action-btn secondary" onclick="restartAssessment()">Take Another Assessment</button>
        </div>
    `;
}

// Get Result Message Based on Score
function getResultMessage(percentage) {
    if (percentage < 25) {
        return "Your results indicate low risk. However, if you have concerns, please consult a healthcare professional.";
    } else if (percentage < 50) {
        return "Your results indicate moderate risk. We recommend consulting with a counselor for further evaluation.";
    } else if (percentage < 75) {
        return "Your results indicate high risk. We strongly recommend seeking professional help and support.";
    } else {
        return "Your results indicate severe risk. Please seek immediate professional assistance.";
    }
}

// Save Assessment Results
async function saveResults() {
    try {
        const response = await fetch('/api/assessments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: currentAssessment.type,
                score: currentAssessment.score,
                answers: currentAssessment.answers,
                timestamp: new Date()
            })
        });
        
        if (response.ok) {
            showNotification('Results saved successfully', 'success');
        } else {
            throw new Error('Failed to save results');
        }
    } catch (error) {
        showNotification('Error saving results', 'error');
        console.error('Error:', error);
    }
}

// Show Notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Restart Assessment
function restartAssessment() {
    currentAssessment = {
        type: null,
        currentQuestion: 0,
        answers: [],
        score: 0
    };
    
    displayAssessmentTypes();
}

// Setup Event Listeners
function setupEventListeners() {
    // Add any global event listeners here
    window.addEventListener('load', () => {
        // Initialize any necessary components
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeAssessment); 