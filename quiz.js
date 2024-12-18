// 預設題目
const defaultQuestions = [
    {
        type: "multiple",
        question: "當同學遇到困難時，下列哪種回應最適當？",
        A: "我了解你的感受，需要幫忙嗎？",
        B: "這種小事有什麼好煩惱的",
        C: "你自己想辦法解決吧",
        D: "我也遇過，但我都自己解決",
        answer: "A"
    },
    {
        type: "multiple",
        question: "在團體討論時，有人提出與你不同的意見，最好的回應是？",
        A: "直接說他的想法不對",
        B: "默默不說話",
        C: "認真聆聽並理性討論",
        D: "離開討論現場",
        answer: "C"
    },
    {
        type: "multiple",
        question: "當你看到同學被排擠時，最適當的做法是？",
        A: "視而不見",
        B: "跟著大家一起排擠",
        C: "私下告訴老師",
        D: "主動關心並邀請他加入活動",
        answer: "D"
    },
    {
        type: "multiple",
        question: "在進行小組活動時，遇到意見分歧，最好的處理方式是？",
        A: "堅持自己的想法",
        B: "投票表決並尊重多數決",
        C: "讓組長決定",
        D: "不表達意見",
        answer: "B"
    },
    {
        type: "multiple",
        question: "當同學考試成績進步時，最適當的回應是？",
        A: "你終於考好一次",
        B: "一定是題目太簡單",
        C: "恭喜你！努力有了成果",
        D: "不要太得意",
        answer: "C"
    }
];

let currentQuestions = [];
let currentScore = 0;
const QUESTIONS_PER_QUIZ = 5;

// 初始化
window.onload = function() {
    initializeQuiz();
};

function initializeQuiz() {
    const startBtn = document.getElementById('startBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    if (startBtn) {
        startBtn.onclick = startQuiz;
    }
    
    if (submitBtn) {
        submitBtn.onclick = submitQuiz;
    }
}

function startQuiz() {
    currentQuestions = [...defaultQuestions];
    console.log('開始測驗，題目：', currentQuestions);
    
    document.getElementById('startPage').style.display = 'none';
    document.getElementById('quizContainer').style.display = 'block';
    
    displayQuestions();
}

function displayQuestions() {
    const container = document.querySelector('.questions-container');
    container.innerHTML = '';
    
    currentQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        
        questionDiv.innerHTML = `
            <p data-number="${index + 1}">${q.question}</p>
            <div class="options">
                <label>
                    <input type="radio" name="q${index}" value="A" required>
                    <span>A. ${q.A}</span>
                </label>
                <label>
                    <input type="radio" name="q${index}" value="B" required>
                    <span>B. ${q.B}</span>
                </label>
                <label>
                    <input type="radio" name="q${index}" value="C" required>
                    <span>C. ${q.C}</span>
                </label>
                <label>
                    <input type="radio" name="q${index}" value="D" required>
                    <span>D. ${q.D}</span>
                </label>
            </div>
        `;
        
        container.appendChild(questionDiv);
    });
}

function submitQuiz() {
    // 檢查是否所有題目都已作答
    let allAnswered = true;
    const unansweredQuestions = [];
    
    currentQuestions.forEach((_, index) => {
        const answered = document.querySelector(`input[name="q${index}"]:checked`);
        if (!answered) {
            allAnswered = false;
            unansweredQuestions.push(index + 1);
        }
    });
    
    if (!allAnswered) {
        alert(`❗ 請完成所有題目\n未作答題號：${unansweredQuestions.join(', ')}`);
        return;
    }
    
    // 計算分數
    currentScore = 0;
    const detailedResults = [];
    
    currentQuestions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        const userAnswer = selected.value;
        const isCorrect = userAnswer === q.answer;
        
        if (isCorrect) currentScore++;
        
        detailedResults.push({
            questionNumber: index + 1,
            isCorrect: isCorrect
        });
    });
    
    showResults(detailedResults);
}

function showResults(detailedResults) {
    const resultPage = document.createElement('div');
    resultPage.className = 'result-page';
    
    const percentage = (currentScore / QUESTIONS_PER_QUIZ) * 100;
    let emoji, message;
    
    if (percentage === 100) {
        emoji = '🌟';
        message = '太棒了！你是人際互動高手！';
    } else if (percentage >= 80) {
        emoji = '✨';
        message = '表現優秀！你的社交技巧很好喔！';
    } else if (percentage >= 60) {
        emoji = '💫';
        message = '不錯喔！繼續加油！';
    } else {
        emoji = '💝';
        message = '謝謝參與！讓我們一起學習成長！';
    }

    resultPage.innerHTML = `
        <div class="result-content">
            <div class="result-emoji">${emoji}</div>
            <div class="score-display">得分：${currentScore} / ${QUESTIONS_PER_QUIZ}</div>
            <div class="encouragement">${message}</div>
            <div class="detailed-results">
                ${detailedResults.map(result => `
                    <p class="${result.isCorrect ? 'correct' : 'incorrect'}">
                        第 ${result.questionNumber} 題：
                        ${result.isCorrect ? '答對了！👍' : '可以再想想～💪'} 
                    </p>
                `).join('')}
            </div>
            <button onclick="restartQuiz()" class="btn">🔄 再測一次</button>
        </div>
    `;

    document.body.appendChild(resultPage);
}

function restartQuiz() {
    const resultPage = document.querySelector('.result-page');
    if (resultPage) {
        resultPage.remove();
    }
    
    document.getElementById('startPage').style.display = 'block';
    document.getElementById('quizContainer').style.display = 'none';
    currentScore = 0;
} 