var appWidth=10;
var appHeight=10;
var startGame = [];
$.getJSON('live.json', function(data){
		startGame=data;
		console.log(startGame);
	});
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
	function neigbours(i, j) {
	var life = 0;		
	if (i-1 > 0 && j-1 > 0 && $('#field'+(i-1)+'-'+(j-1)).hasClass('live')) {
		life++;
	}
	if (i-1 > 0 && $('#field'+(i-1)+'-'+j).hasClass('live')) {
		life++;
	}
	if (i-1 > 0 && j+1 > 0 && $('#field'+(i-1)+'-'+(j+1)).hasClass('live')) {
		life++;
	}
	if (j-1 > 0 && $('#field'+i+'-'+(j-1)).hasClass('live')) {
		life++;
	}
	if (j+1 < 11 && $('#field'+i+'-'+(j+1)).hasClass('live')) {
		life++;
	}
	if (i+1 < 11 && j-1 > 0 && $('#field'+(i+1)+'-'+(j-1)).hasClass('live')) {
		life++;
	}
	if (i+1 < 11 && $('#field'+(i+1)+'-'+j).hasClass('live')) {
		life++;
	}
	if (i+1 < 11 && j+1 < 11 && $('#field'+(i+1)+'-'+(j+1)).hasClass('live')) {
		life++;
	}
	return life;
	}
});