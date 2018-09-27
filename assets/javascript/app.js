//event handlers
$('#startButton').click(function () {
    startGame();
});
$('#answer1').click(function () {
    answerClicked(1);
});
$('#answer2').click(function () {
    answerClicked(2);
});
$('#answer3').click(function () {
    answerClicked(3);
});
$('#answer4').click(function () {
    answerClicked(4);
});
$('#answer5').click(function () {
    answerClicked(5);
});
$('#dialogDisplay').click(function () {
    restartGame();
});

//global variables
var hits = 0;
var misses = 0;
var currentIndex = 0;
var intervalNeedsClearing = false;
var gameFinished = false;
var q1 = ["Who hosted The Tonight Show before Johnny Carson?", "Jack Paar", ["Dick Van Dyke", "Jimmy Stewart", "Jown Wayne", "Tom Ford"]];
var q2 = ["Who did Johnny Carson hope would host The Tonight Show after him?", "Dave Letterman", ["Jay Leno", "Gary Shandling", "Joan Rivers", "Chevy Chase"]];
var q3 = ["What late night talk show host used to host The Man Show on Comedy Central?", "Jimmy Kimmel", ["Tom Green", "Connan O'brian", "Samantha Bee", "Stephen Colbert"]];
var q4 = ["Tom Green hosted a late night talk show on what network?", "MTV", ["TBS", "FOX", "CBS", "Comedy Central"]];
var q5 = ["After Connan O'Brian left The Tonight Show, he went to what network?", "TBS", ["AMC", "FOX", "HBO", "MTV"]];
var q6 = ["Johnny Carson holds the record for longest time hosting a late night show, but who holds the record for most shows aired?", "Jay Leno", ["John Stewart", "David Letterman", "Jimmy Kimmel", "Connan O'Brian"]];
var q7 = ["Who currently hosts a late night show on the same stage that The Beatles performed on during their American television debut?", "Stephen Colbert", ["David Letterman", "Connan O'Brian", "Jimmy Kimmel", "Seth Meyers"]];
var q8 = ["Who is the current house band for The Tonight Show?", "The Roots", ["Cleto and the Cletones", "Jon Batiste and Stay Human", "Kevin Eubanks", "Paul Shaffer and CBS Orchestra"]];
var q9 = ["So far, in 2018, who has had the best ratings?", "Stephen Colbert", ["Jimmy Fallon", "Jimmy Kimmel", "Trevor Noah", "Seth Meyers"]];
var q10 = ["Who used to work on The Dana Carvey Show in the '90s?", "Stephen Colbert", ["Jimmy Fallon", "Seth Meyers", "Jimmy Kimmel", "John Oliver"]];
var questions = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];


function startGame() {
    // alert("time to start game.");
    document.getElementById('openingSplash').style.display = "none";
    document.getElementById('runningGameBox').style.display = "inline-block";
    displayQuestion();
}
//this main function gets called when user clicks on an answer. a paramater x is passed
// in corresponding to the index of the answer clicked.
function answerClicked(x) {
    //first, clear out the countdown clock display, that way, it wont show the wrong thing later
    $('#timerClock').html("<p></p>");
    //second figure out what the user clicked
    var selectorStr = '#answer' + x;
    var selectedAnswer = $(selectorStr).text();
    //third, figure out correct answer
    var corAnswer = questions[currentIndex][1];
    //now, handle response to user selection
    if (selectedAnswer === corAnswer) {
        hits++;
        intervalNeedsClearing = true;
        showCongrats();
    }
    else {
        misses++;
        intervalNeedsClearing = true;
        showCorrect();
    }
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

    //now, prepare the view for the choices to display
    answerChoicesHtml = "";
    for (var j = 0; j < 5; j++) {
        var idN = j + 1;
        answerChoicesHtml = ("<p>" + answers[j] + "</p>");
        $('#answer' + idN).html(answerChoicesHtml);
    }

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
    var t = 15;
    var timer = setInterval(function () {
        $('#timerClock').html("<p>Time remaining: " + t + "s</p>");
        //first check and see if time is remaining. if so, check and see if user
        //clicked a choice, which would have set the intNeedsClearing bool to true
        if (t > 0) {
            if (intervalNeedsClearing === true) {
                clearInterval(timer);
                //here, we clear out the countdown clock display, that way, it won't show the wrong thing later
                $('#timerClock').html("<p></p>");
                intervalNeedsClearing = false;
            }
        }
        //now handle business of timer running out
        else if (t === 0) {
            clearInterval(timer);
            //here, we clear out the countdown clock display, that way, it won't show the wrong thing later
            $('#timerClock').html("<p></p>");
            misses++;
            showCorrect();
        }
        //now decrement the timer
        t--;
    }, 1000);
}

//this function is called when the user selects the wrong answer or
//when the clock runs out. It splashes the correct answer on the screen for a
//few seconds, then moves on to the next question.
function showCorrect() {
    document.getElementById('runningGameBox').style.display = "none";
    document.getElementById('responseSplash').style.display = "inline-block";
    var displayText = "The correct answer was: " + questions[currentIndex][1];
    $('#dialogDisplay').html("<p>" + displayText + "</p>");
    // console.log(displayText);
    setTimeout(function () {
        document.getElementById('responseSplash').style.display = "none";
        document.getElementById('runningGameBox').style.display = "inline-block";
        currentIndex++;
        moveOn();
    }, 3000);
}

//this function is called when the user selects the right answer or
//It splashes a congradulatory remark on the screen for a
//few seconds, then moves on to the next question.
function showCongrats() {
    document.getElementById('runningGameBox').style.display = "none";
    document.getElementById('responseSplash').style.display = "inline-block";
    var displayText = "That was correct!";
    $('#dialogDisplay').html("<p>" + displayText + "</p>");
    // console.log(displayText);
    setTimeout(function () {
        document.getElementById('responseSplash').style.display = "none";
        document.getElementById('runningGameBox').style.display = "inline-block";
        currentIndex++;
        moveOn();
    }, 2000);
}

//this function gets called after the current index has been incremented and
//it is now time to display another question (if available) or show the final score
function moveOn() {
    if (currentIndex < questions.length) {
        displayQuestion();
    }
    else {
        displayScore();
    }
}

//this function handles the end of game logic and displays the final score
function displayScore() {
    // alert("Game over. You got " + hits + " questions right and " + misses + " questions wrong.");
    document.getElementById('runningGameBox').style.display = "none";
    document.getElementById('responseSplash').style.display = "inline-block";
    var displayText = "Game over. You got " + hits + " question(s) right and " + misses + " question(s) wrong. Click here to start over.";
    $('#dialogDisplay').html("<p>" + displayText + "</p>");
    gameFinished = true;
}

function restartGame() {
    if (gameFinished) {
        gameFinished = false;
        currentIndex = 0;
        hits = 0;
        misses = 0;
        document.getElementById('responseSplash').style.display = "none";
        startGame();
    }
}