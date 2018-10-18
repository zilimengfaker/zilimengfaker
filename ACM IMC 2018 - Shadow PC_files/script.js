function toggle_program(){
	if ($('.collapse.in').length == 0){
		$('.panel-collapse').collapse('show');
		$('a#btn_toggle').text('Hide all');
	}
	else{
		$('.panel-collapse').collapse('hide');
		$('a#btn_toggle').text('Show all');
	}
}
