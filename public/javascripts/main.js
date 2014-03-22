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
    alert("Your answer was " + data.answer + "\nThe correct answer was " + data.correctAnswer);
  });
});
