var buttonColors = ["red", "blue", "green", "yellow"];
var choose = [];
var level = 0;
var started = false;
var userClickedPattern = [];

$(document).keypress(function () {
    if(!started){
        $("#level-title").text("level" + " " + level);
        nextSequence();
        started = true;
    } 
});

$(".btn").click(function () {
    var userClickedColor = $(this).attr("id");;
    userClickedPattern.push(userClickedColor);
    console.log(userClickedPattern);
    console.log(userClickedPattern.length)
    playSound(userClickedColor);
    animatePressed(userClickedColor);
    checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(len) {
    if (choose[len] === userClickedPattern[len]) {
        console.log("success");
        if (userClickedPattern.length === choose.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
     else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("press any key to restart");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }

}

function nextSequence() {
    userClickedPattern = [];
    level++;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColorChoosen = buttonColors[randomNumber];
    console.log(randomColorChoosen);
    choose.push(randomColorChoosen);
    console.log(choose);
    console.log(choose.length);
    $("#" + randomColorChoosen).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
    playSound(randomColorChoosen);
    $("#level-title").text("level" + " "+ level);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePressed(color) {
    $("#" + color).addClass("pressed")
    setTimeout(function () {
        $("#" + color).removeClass("pressed");
    }, 100);
}


function startOver(){
    level = 0;
    choose = [];
    started = false;    
}