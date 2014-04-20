var random = require('random-to');

var verbs = require('../data/verbs.json');

exports.index = function (req, res) {
    "use strict";
    res.render('index', { title: 'Italian Node' });
};

exports.verbs = function (req, res) {
    "use strict";
    res.render('verbs', { title: 'Italian Verbs' });
};

exports.verbsAnswer = function (req, res) {
    "use strict";
    var nextQuestion = "";

    console.log(req.body.Index);
    console.log(req.body.Italian.toLowerCase());
    console.log(req.body.NextIndex);

    if (req.body.NextIndex === "-1") {
        console.log("Answering last question");
    } else {
        nextQuestion = verbs.verbs[req.body.NextIndex].English;
    }

    if (verbs.verbs[req.body.Index].Italian === req.body.Italian.toLowerCase()) {
        res.send({
            correct: true,
            question: verbs.verbs[req.body.Index].English,
            answer: req.body.Italian,
            correctAnswer: verbs.verbs[req.body.Index].Italian,
            English: nextQuestion,
            Index: req.body.NextIndex
        });
    } else {
        res.send({
            correct: false,
            question: verbs.verbs[req.body.Index].English,
            answer: req.body.Italian,
            correctAnswer: verbs.verbs[req.body.Index].Italian,
            English: nextQuestion,
            Index: req.body.NextIndex
        });
    }
};

exports.words = function (req, res) {
    "use strict";
    res.send({english: verbs.verbs[Number(req.body.wordIndex)].English});
};

exports.generateRandomQuestionList = function (req, res) {
    "use strict";
    var questions = [],
        count = Number(req.body.maxQuestionIndex) + 1,
        i,
        questionIndex;

    for (i = count - req.body.numberOfQuestions; i < count; i = i + 1) {
        questionIndex = random.from0to(i + 1);
        if (questions.indexOf(questionIndex) !== -1) {
            questions.push(i);
        } else {
            questions.push(questionIndex);
        }
    }

    console.log(questions);

    res.send({QuestionList: questions});
};
