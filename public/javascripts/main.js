$(document).ready(function(){
	$.get('/words', function(data){
		viewModel.English(data.English);
		viewModel.IndexOfWord(data.Index);
	});
});

$("#inputItalian").on('keyup', function(e) {
	if(e.keyCode==13){
		 $('#btnSubmit').trigger('click');
	 }
});

$("#btnSubmit").click(function(){
  $.post('/verbsAnswer',
  {
	Italian:viewModel.Italian,
	Index:viewModel.IndexOfWord
  },
  function(data,status){
	viewModel.addAnswer({question:data.question, answer:data.answer, correctAnswer:data.correctAnswer, correct:data.correct});
	viewModel.English(data.English);
	viewModel.Italian("");
	viewModel.IndexOfWord(data.Index);
  });
});


var QuestionAndAnswerModel = function() {
    var self = this;
	self.English = ko.observable("");
	self.Italian = ko.observable("");
	self.IndexOfWord = ko.observable(0);
    self.answers = ko.observableArray([]);
 
    self.addAnswer = function(answer) {
        self.answers.push(answer);
    };
 
    self.removeAnswer = function(answer) {
        self.answers.remove(answer);
    };
 
	self.correctAnswers = ko.computed(function() {
        return ko.utils.arrayFilter(this.answers(), function(answer) {
            return answer.correct === true;
        });
    }, this);
};
 
var viewModel = new QuestionAndAnswerModel();

/*
var viewModel = {
   English:ko.observable(""),
   wordIndex:ko.observable(0),
   answer:ko.observable(""),
   correctAnswer:ko.observable(""),
   shouldShowMessage:ko.observable(false),
   Italian:ko.observable("")
};
*/

// Activates knockout.js
ko.applyBindings(viewModel);