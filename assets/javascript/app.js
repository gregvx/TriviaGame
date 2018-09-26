//event handlers
$('#startButton').click(function() {
    startGame();
});
$('#answer1').click(function() {
    answerClicked(0);
});
$('#answer2').click(function() {
    answerClicked(1);
});
$('#answer3').click(function() {
    ganswerClicked(2);
});
$('#answer4').click(function() {
    answerClicked(3);
});
$('#answer5').click(function() {
    answerClicked(4);
});

//global variables
var gamePlayStarted = false;
var wins= 0;
var losses = 0;
var wallet = 0;
var target = 0;
var gemValues = [0,0,0,0];
function startGame() {
    alert("time to start game.");
    document.getElementById('openingSplash').style.display = "none";
    document.getElementById('runningGameBox').style.display = "inline-block";
}
//this main function gets called when user clicks on an answer. a paramater x is passed
// in corresponding to the index of the answer clicked.
function answerClicked(x) {
    alert("you clicked answer of index " + x);
}

