$(document).ready(function() {
    

    var questionCounter = 0;
    var time = 20;
    var correctGuesses = 0;
    var incorrectGuesses = 0;

    var questions = [
    
        {
            question: "Where was Jon Snow born?",
            choices: ["Winterfell", "The North", "Dorne", "Westoros"],
            correctAnswer: "Dorne",
            img: "dorne.jpg"
        },
    
        {
            question: "where was Qyburn initally found before he went to Kings Landing?",
            choices: ["Harrenhall", "Winterfell", "RiverRun", "Bear Island"],
            correctAnswer: "Harrenhall",
            img: "qyburn.gif"

        },

        {
            question: "The Night King kills which dragon?",
            choices: ["Viserion", "Rhaegar", "Rhaegal", "Viserys"],
            correctAnswer: "Viserion",
            img: "viserion.gif"

        },

        {
            question: "Sir Davos is also know as what?",
            choices: ["The Onion Knight", "Smugglers Snook", "The Night King", "Ser davos seaworth"],
            correctAnswer: "The Onion Knight",
            img: "onionknight.gif"

        },

        {
            question: "Which City does Daenerys conquer first?",
            choices: ["Yunkai", "Astapor", "Slaverys Bay", "Meeren"],
            correctAnswer: "Meeren",
            img: "meereen.gif"

        },

        {
            question: "What is the name of Jon Snows Uncle?",
            choices: ["Benji", "Benjen", "Ricky", "Rico"],
            correctAnswer: "Benjen",
            img: "benjen.gif"

        },

        {
            question: "What is the name of the actress the saves Arya?",
            choices: ["Lady Kane", "Lady Crane", "Lady Pain", "Lady Lane"],
            correctAnswer: "Lady Crane",
            img: "ladycrane.gif"

        },

        {
            question: "Valar Morghulis mean what?",
            choices: ["All gluten must die", "All swords must bend", "All men must die", "All dogs go to heaven"],
            correctAnswer: "All men must die",
            img: "valar.gif"
         },

        {
            question: "Samwell Tarly is from where?",
            choices: ["Thorn hill", "Corn hill", "Horn hill", "River run"],
            correctAnswer: "Horn Hill",
            img: "sam.gif"

             },

        {
            question: "Tormunds last name is?",
            choices: ["giantsbane", "longtooth", "theen", "lord of bones"],
            correctAnswer: "giantsbane",
            img: "tormund.gif"

         },

        {
            question: "Arya gets her training in what free city?",
            choices: ["sim city", "Bravoos", "Essos", "Westoros"],
            correctAnswer: "Bravoos",
            img: "braavos.gif"
         }];

        function questionContent() {

        $("#gameScreen").append("<p><strong>" + 
    		questions[questionCounter].question + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[0] + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[1] + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[2] + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[3] + 
    		"</strong></p>");
	}

	
	function userWin() {
		//$("#gameScreen").html("<p>You know everything Jon Snow</p>");
		$("#gameScreen").html("You know everything Jon Snow<br><img src='assets/images/" + questions[questionCounter].img + "' class='answer'>");
		correctGuesses++;
		var correctAnswer = questions[questionCounter].correctAnswer;
		$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
			correctAnswer + 
			"</span></p>" + 
			questions[questionCounter].img);
		setTimeout(nextQuestion, 4000);
		questionCounter++;
	}

	
	function userLoss() {
		$("#gameScreen").html("<strong>You know nothing Jon Snow<br></strong><img src='assets/images/" + questions[questionCounter].img + "' class='answer'>");
		incorrectGuesses++;
		var correctAnswer = questions[questionCounter].correctAnswer;
		$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
			correctAnswer + 
			"</span></p>" + 
			questions[questionCounter].img);
		setTimeout(nextQuestion, 5000);
		questionCounter++;
	}

	
	function userTimeout() {
		if (time === 0) {
			$("#gameScreen").html("<p>Winter has come!</p>");
			incorrectGuesses++;
			var correctAnswer = questions[questionCounter].correctAnswer;
			$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
				correctAnswer + 
				"</span></p>" + 
				questions[questionCounter].img);
			setTimeout(nextQuestion, 4000);
			questionCounter++;
		}
	}

	
	function resultsScreen() {
		if (correctGuesses === questions.length) {
			var endMessage = "THE NORTH REMEMBERS";
			
		}
		else if (correctGuesses > incorrectGuesses) {
			var endMessage = "<strong>The night is dark and full of terror's</strong>";
			
		}
		else {
			var endMessage = "<strong>When you play the game of thrones you win or die</strong>";
			
		}
		$("#gameScreen").html("<p>" + endMessage + "</p>" + "<p>You got <strong>" + 
			correctGuesses + "</strong> right.</p>" + 
			"<p>You got <strong>" + incorrectGuesses + "</strong> wrong.</p>");
		$("#gameScreen").append("<h1 id='start'>March to the Wall!!!</h1>");
		
		gameReset();
		$("#start").click(nextQuestion);
	}

	
	function timer() {
		clock = setInterval(countDown, 1000);
		function countDown() {
			if (time < 1) {
				clearInterval(clock);
				userTimeout();
			}
			if (time > 0) {
				time--;
			}
			$("#timer").html("<strong>" + time + "</strong>");
		}
	}
	function nextQuestion() {
		if (questionCounter < questions.length) {
			time = 20;
			$("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
			questionContent();
			timer();
			userTimeout();
		}
		else {
			resultsScreen();
		}
	
	}

	
	function gameReset() {
		questionCounter = 0;
		correctGuesses = 0;
		incorrectGuesses = 0;
	}

    function startGame() {
    	$("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> </p>");
    	$("#start").hide();
    	
		questionContent();
    	timer();
    	userTimeout();
    }

    
//	$("#start").click(nextQuestion);
	$(".container").on("click", "#start", function() {
		startGame();
	});

    
	$("#gameScreen").on("click", ".choices", (function() {
		
		var userGuess = $(this).text();
		if (userGuess === questions[questionCounter].correctAnswer) {
			clearInterval(clock);
			userWin();
		}
		else {
			clearInterval(clock);
			userLoss();
		}
	}));
});

        

        
        
