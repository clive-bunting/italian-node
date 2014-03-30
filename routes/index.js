/*
 * GET home page.
 */
var random = require('random-to');

var verbs = require('../data/verbs.json');

exports.index = function(req, res){
  res.render('index', { title: 'Italian Node' });
};

exports.verbs = function(req, res){
  res.render('verbs', { title: 'Italian Verbs' });
};

exports.verbsAnswer = function(req, res){
  if(verbs.verbs[req.body.Index].Italian === req.body.Italian)
  	res.send({
	    correct:true,
		question:verbs.verbs[req.body.Index].English,
		answer:req.body.Italian, 
		correctAnswer:verbs.verbs[req.body.Index].Italian,
		English:verbs.verbs[req.body.NextIndex].English, 
		Index:req.body.NextIndex
		});
  else
  	res.send({
	    correct:false,
		question:verbs.verbs[req.body.Index].English,
		answer:req.body.Italian, 
		correctAnswer:verbs.verbs[req.body.Index].Italian,
		English:verbs.verbs[req.body.NextIndex].English, 
		Index:req.body.NextIndex
		});
};

exports.words = function(req, res){
  res.send({english:verbs.verbs[Number(req.body.wordIndex)].English});
};

exports.generateRandomQuestionList = function(req, res) {
	var questions = [];
    var count = Number(req.body.maxQuestionIndex) + 1;
	
    for (var i = count - req.body.numberOfQuestions; i < count; i++) {
        var questionIndex = random.from0to(i + 1);
        if (questions.indexOf(questionIndex) != -1)
            questions.push(i);
        else
            questions.push(questionIndex);
    }
	res.send({QuestionList: questions});
};
