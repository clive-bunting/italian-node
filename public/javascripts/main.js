$(document).ready(function(){
	$.get('/words', function(data){
		viewModel.English(data.English);
		viewModel.wordIndex(data.Index);
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
	Index:viewModel.wordIndex
  },
  function(data,status){
	viewModel.answer(data.answer);
	viewModel.correctAnswer(data.correctAnswer);
	viewModel.shouldShowMessage(true);
	viewModel.English(data.English);
	viewModel.wordIndex(data.Index);
	viewModel.Italian("");
  });
});


var viewModel = {
   English:ko.observable(""),
   wordIndex:ko.observable(0),
   answer:ko.observable(""),
   correctAnswer:ko.observable(""),
   shouldShowMessage:ko.observable(false),
   Italian:ko.observable("")
};

// Activates knockout.js
ko.applyBindings(viewModel);