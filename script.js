// Sample questions data (Atualizado com as perguntas da foto)
const questions = [
    'I work hard.',
    'I consistently follow a structured plan in my work.',
    'I consistently focus on what is truly important in my work.',
    'I have no trouble declining tasks that are designated for others.',
    'I decompose every major task into manageable parts and address them individually.',
    'I devote considerable effort to my work.',
    'I understand precisely what actions to take and the appropriate timing for each.',
    'I complete as much of my work as quickly as possible.',
    'When tackling a task, I fully commit to it.',
    'The task needs to be done to the fullest extent possible.',
    'I often stay late at work.',
    'It’s not excessive for me to put in extra effort to finish my tasks.',
    'I always make time for important things in my work, whether it’s convenient or not.',
    'I’m a real go-getter.',
    'I adhere to the primary focus in my work.',
    'I consistently gather the appropriate individuals and resources to perform my job to the highest standards.',
    'I fully understand what the management/company expects from me.',
    'I ensure that I can work without interruptions.',
    'Every time coworkers need me or visit me, I make sure to let them know about my priorities and the time I can allocate for them.',
    'I excel at organizing and ensure my desk is consistently tidy.',
    'I thrive in busy environments.',
    'If necessary, I’ll also put in some additional effort.',
    'I’m fully committed.',
    'I am recognized for consistently addressing the core issue promptly.',
    'Regardless of the situation, I find it challenging to set aside my personal priorities.',
    'Generally, I am someone who is clear about his desires.',
    'I keep my phone calls brief and focused.',
    'In my work, I always aim for a specific outcome and know the direction I need to take.',
    'I’m highly focused on my work and not easily distracted by other things.',
    'I always spend 10 minutes at the end of the day planning for tomorrow.',
    'People often say I’m very "driven".',
    'I am very skilled at setting priorities.',
    'When I have to address an issue, I prioritize by determining what needs to be addressed first.',
    'I don’t usually focus on details.',
    'I often feel exhausted after a day’s work.',
    'I tackle my task list daily.',
    'I tend to feel drained after expending an excessive amount of energy into my work.',
    'I get very frustrated when I can’t complete my tasks.',
    'I consistently use SMART goals in my work.',
    'Each day, I organize and manage the flow of incoming and outgoing emails.',
    'I don’t waste time browsing the internet or searching for information.',
    'When I set a goal, I rarely need to change it.',
    'I am thoroughly familiar with all the responsibilities and goals of my position.',
    'I frequently find myself thinking about work, even when I’m off.'
];

// Define an object for initial scores for each category
let totalScores = { effectiveness: 0, efficiency: 0, energy: 0 };
let currentQuestion = 0;
const maxScorePerCategory = 150;  // Maximum score for each category (15 questions * 10 points)

// Start the assessment by hiding the welcome section and showing the questions
function startAssessment() {
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('assessment').style.display = 'block';
    loadQuestion();  // Start loading questions immediately after starting the assessment
}

// Load questions one at a time with 5 answer buttons
function loadQuestion() {
    const questionContainer = document.getElementById('questionContainer');
    questionContainer.innerHTML = '';  // Clear previous content

    if (currentQuestion < questions.length) {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.textContent = `${currentQuestion + 1}. ${questions[currentQuestion]}`;

        const answerButtonsDiv = document.createElement('div');
        answerButtonsDiv.classList.add('answer-buttons');

        // Create buttons for each option
        const options = [
            { label: 'Almost Never', score: 2 },
            { label: 'Rarely', score: 4 },
            { label: 'Sometimes', score: 6 },
            { label: 'Often', score: 8 },
            { label: 'Almost Always', score: 10 }
        ];

        options.forEach(option => {
            const button = document.createElement('button');
            button.classList.add('answer-button');
            button.textContent = option.label;
            button.addEventListener('click', () => handleAnswer(option.score));
            answerButtonsDiv.appendChild(button);
        });

        questionContainer.appendChild(questionDiv);
        questionContainer.appendChild(answerButtonsDiv);
    } else {
        calculateResults();  // Automatically calculate and show results after last question
    }
}

// Handle answer click
function handleAnswer(score) {
    // Add score to the correct category based on question index (rotation logic)
    const categoryOrder = ['effectiveness', 'efficiency', 'energy'];  // Order for category cycling
    let category = categoryOrder[currentQuestion % 3];

    if (totalScores.hasOwnProperty(category)) {
        totalScores[category] += score;  // Add score to the respective category
    }

    currentQuestion++;
    loadQuestion();  // Load next question
}

// Calculate the results and update the score and progress bars
function calculateResults() {
    // Extracting the total scores for each category
    const effectivenessScore = totalScores.effectiveness;
    const efficiencyScore = totalScores.efficiency;
    const energyScore = totalScores.energy;

    // Display the results in absolute points without adding "points" again in JavaScript
    document.getElementById('effectivenessScore').textContent = `${effectivenessScore}`;
    document.getElementById('efficiencyScore').textContent = `${efficiencyScore}`;
    document.getElementById('energyScore').textContent = `${energyScore}`;

    // Update the progress bar widths based on the max score of 150
    document.getElementById('effectivenessBar').style.width = (effectivenessScore / maxScorePerCategory) * 100 + '%';
    document.getElementById('efficiencyBar').style.width = (efficiencyScore / maxScorePerCategory) * 100 + '%';
    document.getElementById('energyBar').style.width = (energyScore / maxScorePerCategory) * 100 + '%';

    // Display result section
    document.getElementById('result').style.display = 'block';
}

// Feedback based on score thresholds
function logFeedback(effectiveness, efficiency, energy) {
    console.log('Final Scores:');
    console.log('Effectiveness:', getFeedback(effectiveness));
    console.log('Efficiency:', getFeedback(efficiency));
    console.log('Energy:', getFeedback(energy));
}

// Determine feedback based on score ranges
function getFeedback(score) {
    if (score > 100) {
        return "High";
    } else if (score >= 80 && score <= 100) {
        return "Medium";
    } else {
        return "Low";
    }
}
