// defining the variables

var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[]
var started= false;
var level=0;


//user choosen variables

$(".btn").click(function () {
    var userChoosenColor= $(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickedPattern.length-1);
    });

$("body").keydown(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});


function checkAnswer(currentLevel) {
    console.log(gamePattern)
    console.log(userClickedPattern)
    console.log(currentLevel);

    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){

        console.log("success");

        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);      
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){ 
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press any key to restart");
    }
}


function nextSequence(){

    userClickedPattern= [];

    level++;
    $("#level-title").text("Level "+level);
    
    // random number and color selection and pusing into the array.

    var randomNumber = Math.floor(Math.random()*4);
    var randomChoosenColor= buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);

    // random choosen animation

    $("#"+randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
    
}

// callback for making sound

function playSound(name) {
    var audio=new Audio("./sounds/"+name+".mp3");
    audio.play();
}

//callback for animation

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){ 
        $("#"+currentColor).removeClass("pressed");
    },100);

}

