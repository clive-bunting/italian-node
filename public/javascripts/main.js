$(document).ready(function(){
	$.get('/words', function(data){
		AppViewModel.English(data.English);
		AppViewModel.wordIndex(data.Index);
	});
});

$("#inputItalian").on('keyup', function(e) {
	if(e.keyCode==13){
		 $('#btnSubmit').trigger('click');
	 }
});

$("#btnSubmit").click(function(){
  txt=$("#inputItalian").val();
  whichWord=AppViewModel.wordIndex;
  $.post('/verbsAnswer',
  {
	Italian:txt,
	Index:whichWord
  },
  function(data,status){
	AppViewModel.answer(data.answer);
	AppViewModel.correctAnswer(data.correctAnswer);
	AppViewModel.shouldShowMessage(true);
	AppViewModel.English(data.English);
	AppViewModel.wordIndex(data.Index);
	$("#inputItalian").val("");
  });
});


var AppViewModel = {
   English:ko.observable("hello"),
   wordIndex:ko.observable(0),
   answer:ko.observable(""),
   correctAnswer:ko.observable(""),
   shouldShowMessage:ko.observable(false)
};

// Activates knockout.js
ko.applyBindings(AppViewModel);