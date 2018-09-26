//event handlers
$('#startButton').click(function () {
    startGame();
});
$('#answer1').click(function () {
    answerClicked(0);
});
$('#answer2').click(function () {
    answerClicked(1);
});
$('#answer3').click(function () {
    ganswerClicked(2);
});
$('#answer4').click(function () {
    answerClicked(3);
});
$('#answer5').click(function () {
    answerClicked(4);
});

//global variables
var hits = 0;
var misses = 0;
var currentIndex = 0;
var q1 = ["Question 1", "answer 1", ["false1", "false2", "false3", "false4"]];
var q2 = ["Question 2", "answer 2", ["false2.1", "false2.2", "false3.2", "false4.2"]];
var questions = [q1, q2];
function startGame() {
    // alert("time to start game.");
    document.getElementById('openingSplash').style.display = "none";
    document.getElementById('runningGameBox').style.display = "inline-block";
    displayQuestion();
}
//this main function gets called when user clicks on an answer. a paramater x is passed
// in corresponding to the index of the answer clicked.
function answerClicked(x) {
    alert("you clicked answer of index " + x);
}

//this funtion gets called every time a new question needs to be displayed
//it looks at the global variables to determine what to put on screen
function displayQuestion() {
    var q = questions[currentIndex][0];
    $('#questionField').html("<p>" + q + "</p>");
    var answers = [];
    answers.push(questions[currentIndex][1]);
    for (var i = 0; i < 4; i++) {
        answers.push(questions[currentIndex][2][i])
    }

    //now answers is an array of five strings. The first string is the correct answer,
    //the next four strings are wrong answers. Need to shuffle the answers
    answers = shuffleAnswers(answers);

    //now, prepare the html for the choices to display
    answerChoicesHtml = "";
    for (var j = 0; j < 5; j++) {
        answerChoicesHtml += ("<p>" + answers[j] + "</p>");
    }
    //now put that markup into the view
    $('#choiceField').html(answerChoicesHtml);

    //now, start a countdown timer
    startTimer();
}

//this function takes an array of five strings and shuffles the order of the strings
function shuffleAnswers(answers) {
    //TODO write logic to shuffle the order...
    return answers;
}

//this function starts a countdown and updates the view every second show the time remaining
function startTimer() {
    var t = 5;
    var timer = setInterval(function () {
        $('#timerClock').html("<p>Time remaining: " + t + "s</p>");
        t--;
        if (t === 0) {
            clearInterval(timer);
            misses++;
            showCorrect();
        }
    }, 1000);

}

//this function is called when the user selects the wrong answer or
//when the clock runs out. It splashes the correct answer on the screen for a
//few seconds, then moves on to the next question.

function showCorrect() {
    document.getElementById('runningGameBox').style.display = "none";
    document.getElementById('wrongSplash').style.display = "inline-block";
    var displayText = "The correct answer was: " + questions[currentIndex][1];
    $('#dialogDisplay').html("<p>" + displayText + "</p>");
    // console.log(displayText);
    setTimeout(function () {
        document.getElementById('wrongSplash').style.display = "none";
        document.getElementById('runningGameBox').style.display = "inline-block";
        currentIndex++;
        if (currentIndex < questions.length) {
            displayQuestion();
        }
        else {
            displayScore();
        }
    }, 3000);
}

function displayScore() {
    alert("Game over. You got " + hits + " questions right and " + misses + " questions wrong.");
}
