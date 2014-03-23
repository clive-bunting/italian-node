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
  var x = random.from0to(verbs.verbs.length-1); 
  if(verbs.verbs[req.body.Index].Italian === req.body.Italian)
  	res.send({
	    correct:true,
		question:verbs.verbs[req.body.Index].English,
		answer:req.body.Italian, 
		correctAnswer:verbs.verbs[req.body.Index].Italian,
		English:verbs.verbs[x].English, 
		Index:x
		});
  else
  	res.send({
	    correct:false,
		question:verbs.verbs[req.body.Index].English,
		answer:req.body.Italian, 
		correctAnswer:verbs.verbs[req.body.Index].Italian,
		English:verbs.verbs[x].English, 
		Index:x
		});
};

exports.words = function(req, res){
  var x = random.from0to(verbs.verbs.length-1); 
  res.send({English:verbs.verbs[x].English, Index:x});
};
