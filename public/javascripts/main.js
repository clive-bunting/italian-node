$(document).ready(function(){
	$.get('/words', function(data){
		viewModel.English(data.English);
		viewModel.IndexOfWord(data.Index);
	});
	$.post('/generateRandomQuestionList', {maxQuestionIndex:200, numberOfQuestions:10}, function(data, status) {/*alert(data.QuestionList); */});
});

$("#inputItalian").on('keyup', function(e) {
	if(e.keyCode==13 && viewModel.Italian().length > 0){
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
        self.answers.unshift(answer);
    };
 
    self.removeAnswer = function(answer) {
        self.answers.remove(answer);
    };
 
	self.correctAnswers = ko.computed(function() {
        return ko.utils.arrayFilter(this.answers(), function(answer) {
            return answer.correct === true;
        });
    }, this);
	
	self.percentCorrect = ko.computed(function() {
		if (this.answers().length === 0) return '0%';
		return Math.floor((this.correctAnswers().length / this.answers().length) * 100) + '%'; 
	}, this);
};
 
var viewModel = new QuestionAndAnswerModel();

// Activates knockout.js
ko.applyBindings(viewModel);