/*
 * GET home page.
 */
var random = require('random-to');

var verbs = require('../data/verbs.json');

exports.index = function(req, res){
  res.render('index', { title: 'Italian Node' });
};

exports.verbs = function(req, res){
  var x = random.from0to(verbs.verbs.length-1); 
  res.render('verbs', { title: 'Italian Verbs', words: verbs.verbs, whichWord: x });
};

exports.verbsAnswer = function(req, res){
  console.log(req.body.Italian);
  console.log(req.body.Index);
  console.log(verbs.verbs[req.body.Index]);
  if(verbs.verbs[req.body.Index].Italian === req.body.Italian)
  	res.send({answer:"correct",correctAnswer:verbs.verbs[req.body.Index].Italian});
  else
  	res.send({answer:"wrong",correctAnswer:verbs.verbs[req.body.Index].Italian});
};