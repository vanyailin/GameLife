var appWidth=10;
var appHeight=10;
var startGame = [];

$.ajax({url:'https://github.com/vanyailin/GameLife/live.json', 
		dataType: "json"
		}).then(function(data){
		startGame=data;
		console.log(startGame);
	$(function(){
	for (var x = 1; x <= appWidth; x++) {
		for (var y = 1; y <= appHeight; y++) {
			$('<div></div>')
				.addClass('field').addClass('dead')
				.attr('id','field'+x.toString()+'-' + y.toString())
				.data('x',x).data('y',y)
				.appendTo('#app')
		}
	} 
	$.each(startGame, function() {
		console.log(this);
		$('#field'+this[0]+'-'+this[1]).addClass('live').removeClass('dead');
	});
	timerId = setInterval(function() {
		var newGeneration = [];
		$('.field').each(function() {
			var x = $(this).data('x');
			var y = $(this).data('y');
			var count = neigbours(x,y);
			var elements = [];
			if (this.className != 'field live' && count==3){
				elements = [x, y, "live"];
				newGeneration.push(elements);
			} else if (this.className == 'field live' && count!=3 && count!=2) {
				elements = [x, y, "dead"];
				newGeneration.push(elements);
			}
		});
		$.each(newGeneration, function() {
			$('#field' + this[0] + '-' + this[1]).attr('class', 'field ' + this[2]);
		});
		console.log(newGeneration);
		if (newGeneration.length==0) {
			alert("Game over!");
			clearInterval(timerId);
	        alert("Спасибо за игру! :)");
		}
	},2000);
	
	function neigbours(x, y) {
	var life = 0;
	var directions = [{x:-1,y:-1},{x:-1, y:0},{x:-1, y:1},{x:0, y:1},{x:0,y:-1},{x:1, y:1},{x:1, y:0},{x:1, y:-1}]
			for (var i=0; i<directions.length; i++){
		if ($('#field'+(x+directions[i].x)+'-'+(y+directions[i].y)).hasClass('live')) {
		life++;
	}	
	}
	return life;
	}
})
		});
	
	

