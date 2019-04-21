


$(document).ready(function () {

    $("#timer").hide();
    $("#begin_Game").on('click', cultureTrp.startGame);
    $(document).on('click', '.option', cultureTrp.guessChecker);

})

var cultureTrp = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId: '',

    questions: {
        q1: 'Seinfeld: What Manhattan neighborhood did Jerry Seinfeld reside in?',
        q2: 'Friends: Which store did Rachel and Ross both buy the same apothecary table from?',
        q3: 'Law & Order: What did the creator of Law and Order orginally want to name it?'

    },
    options: {
        q1: ['Upper East Side', 'Upper West Side', 'Lower East Side'],
        q2: ['Pottery Barn', 'Anthropologie', 'Crate & Barrel'],
        q3: ['NYPD Best', 'Night and Day', 'Cops and Court']
    },
    answers: {
        q1: 'Upper West Side',
        q2: 'Pottery Barn',
        q3: 'Night and Day'
    },

    startGame: function () {
        cultureTrp.currentSet = 0;
        cultureTrp.correct = 0;
        cultureTrp.incorrect = 0;
        cultureTrp.unanswered = 0;
        clearInterval(cultureTrp.timerId);

        $('#questions').show();

        $('#results').html('');

        $('#timer').text(cultureTrp.timer);

        $('#begin_Game').hide();

        $('#intro_text').hide();

        $('#timer').show();

        cultureTrp.nextQuestion();

    },
    nextQuestion: function () {
        $('#results').hide();
        $('#selections').show();

        cultureTrp.timer = 10;
        $('#timer').text(cultureTrp.timer);

        if (!cultureTrp.timerOn) {
            cultureTrp.timerId = setInterval(cultureTrp.timerRunning, 1000);
        }

        var questionContent = Object.values(cultureTrp.questions)[cultureTrp.currentSet];
        $('#trivia_question').text(questionContent);

        var potentialAnswer = Object.values(cultureTrp.options)[cultureTrp.currentSet];

        $.each(potentialAnswer, function (index, key) {
            $('#selections').html('<button class="selections btn btn-info btn-lg">' + key + '</button>');


        })

    },

    timerRunning: function () {
        if (cultureTrp.timer > -1 && cultureTrp.currentSet < Object.keys(cultureTrp.questions).length) {
            $('#timer').text(cultureTrp.timer);
            cultureTrp.timer--;
            if (cultureTrp.timer === 4) {
                $('#timer').addClass('last-seconds');

            }
        }
        else if (cultureTrp.timer === -1) {
            cultureTrp.result = false;
            clearInterval(cultureTrp.timerId);
            resultId = setTimeout(cultureTrp.guessResult, 1000);
            $('#results').html('<h4> Too late! The answer was ' + Object.values(cultureTrp.answers)[cultureTrp.currentSet] + '</h4>');
        }
        else if (cultureTrp.currentSet === Object.keys(cultureTrp.questions).length) {

            $('#results')
                .html('<h3>Thank you for playing!</h3>' +
                    '<p>Correct: ' + cultureTrp.correct + '</p>' +
                    '<p>Incorrect: ' + cultureTrp.incorrect + '</p>' +
                    '<p>Please play again!</p>');

            $('#trivia_questions').hide();

            $('#introduction').show();
        }

    },

    guessChecker: function () {

        var resultId;

        var currentAnswer = Object.values(cultureTrp.answers)[cultureTrp.currentSet];

        if ($(this).text() === currentAnswer) {
            $(this).addClass('btn-success').removeClass('btn-info');

            cultureTrp.correct++;
            clearInterval(cultureTrp.timerId);
            resultId = setTimeout(cultureTrp.guessResult, 1000);

        }
        else {
            $(this).addClass('btn-danger').removeClass('btn-info');

            cultureTrp.incorrect++;
            clearInterval(cultureTrp.timerId);
            resultId = setTimeout(cultureTrp.guessResult, 1000);
            $('#results').html('<h3>Better luck next time! ' + currentAnswer + '</h3>');
        }

    },
    guessResult: function () {

        cultureTrp.currentSet++;

        $('#trivia_questions').remove();
        $('#results').remove();

        cultureTrp.nextQuestion();

    }

}

