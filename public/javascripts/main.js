var QuestionAndAnswerModel = function () {
    "use strict";

    var self = this;
    self.questionList = ko.observableArray([]);

    self.questionNumber = ko.observable(0);
    self.totalNumberOfQuestions = 10;

    self.currentQuestion = {};
    self.currentQuestion.english = ko.observable("");
    self.currentQuestion.italian = ko.observable("");
    self.currentQuestion.indexOfWord = ko.observable(0);

    self.answers = ko.observableArray([]);

    self.addAnswer = function (answer) {
        self.answers.unshift(answer);
    };

    self.removeAnswer = function (answer) {
        self.answers.remove(answer);
    };

    self.correctAnswers = ko.computed(function () {
        return ko.utils.arrayFilter(this.answers(), function (answer) {
            return answer.correct === true;
        });
    }, this);

    self.percentCorrect = ko.computed(function () {
        if (this.answers().length === 0) { return '0%'; }
        return Math.floor((this.correctAnswers().length / this.answers().length) * 100) + '%';
    }, this);
};

var viewModel = new QuestionAndAnswerModel();

$(document).ready(function () {
    "use strict";
    $.post('/generateRandomQuestionList', {
        maxQuestionIndex: 179,
        numberOfQuestions: 10
    },
            function (data) {
            viewModel.questionList(data.QuestionList);
            viewModel.currentQuestion.indexOfWord(viewModel.questionList()[viewModel.questionNumber()]);
            $.post('/words', {
                wordIndex: viewModel.currentQuestion.indexOfWord()
            },
                function (data) {
                    viewModel.currentQuestion.english(data.english);
                });

        });
});

$("#inputItalian").on('keyup', function (e) {
    "use strict";
    if (e.keyCode === 13 && viewModel.currentQuestion.italian().length > 0) {
        $('#btnSubmit').trigger('click');
    }
});

$("#btnSubmit").click(function () {
    "use strict";
    $.post('/verbsAnswer',
        {
            Italian: viewModel.currentQuestion.italian,
            Index: viewModel.currentQuestion.indexOfWord,
            NextIndex: viewModel.questionList()[viewModel.questionNumber() + 1]
        },
        function (data) {
            viewModel.addAnswer({question: data.question, answer: data.answer, correctAnswer: data.correctAnswer, correct: data.correct});
            viewModel.currentQuestion.english(data.English);
            viewModel.currentQuestion.italian("");
            viewModel.currentQuestion.indexOfWord(data.Index);
            viewModel.questionNumber(viewModel.questionNumber() + 1);
        });
});

// Activates knockout.js
ko.applyBindings(viewModel);