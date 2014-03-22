$("#inputItalian").on('keyup', function(e) {
	if(e.keyCode==13){
		 $('#btnSubmit').trigger('click');
	 }
});

$("#btnSubmit").click(function(){
  txt=$("#inputItalian").val();
  whichWord=$("#inputIndex").val();
  $.post('/verbsAnswer',
  {
	Italian:txt,
	Index:whichWord
  },
  function(data,status){
	AppViewModel.answer(data.answer);
	AppViewModel.correctAnswer(data.correctAnswer);
  });
});


var AppViewModel = {
   English:ko.observable("hello"),
   wordIndex:0,
   answer:ko.observable(""),
   correctAnswer:ko.observable("")
};

// Activates knockout.js
ko.applyBindings(AppViewModel);