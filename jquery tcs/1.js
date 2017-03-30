$(function () {
	
	// 画场景
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 20; j++) {
			var el = "<div id='"+i+"-"+j+"'></div>";
			$(".changjing").append(el);
			$(".changjing>div").addClass("block");
		}
	}

	//画蛇
	var she = [{x:0,y:0},{x:0,y:1},{x:0,y:2}];
	for (var i = 0; i < she.length; i++) {
		$("#"+she[i].x+"-"+she[i].y+"").addClass("she");
	};

	// 画食物
	var fangshiwu = function(){
		var a = Math.floor(Math.random()*20);
		var b = Math.floor(Math.random()*20);
		return {x:a,y:b};
	}
	var shiwu = fangshiwu();
	$("#"+shiwu.x+"-"+shiwu.y+"").addClass("shiwu");

	var fangxiang = "xia";
	var move = function(){
		var jiutou = she[she.length-1];
		if (fangxiang == "you") {
			var xintou = {x:jiutou.x,y:jiutou.y+1}
		}else if (fangxiang == "zuo") {
			var xintou = {x:jiutou.x,y:jiutou.y-1}
		}else if (fangxiang == "shang") {
			var xintou = {x:jiutou.x-1,y:jiutou.y}
		}else if (fangxiang == "xia"){
			var xintou = {x:jiutou.x+1,y:jiutou.y}
		}
		she.push(xintou);
		$("#"+xintou.x+"-"+xintou.y+"").addClass("she");

		if (xintou.x == 20 || xintou.x == -1 || xintou.y == 20 || xintou.y == -1) {
			clearInterval(t);
			alert("game over!");
		}

		if (xintou.x == shiwu.x && xintou.y == shiwu.y) {
			$("#"+shiwu.x+"-"+shiwu.y+"").removeClass("shiwu");
			shiwu = fangshiwu();
			$("#"+shiwu.x+"-"+shiwu.y+"").addClass("shiwu");
		}else{
			var weiba = she.shift();
			$("#"+weiba.x+"-"+weiba.y+"").removeClass("she");
		}
	}

	document.onkeydown = function(e){
		if (e.keyCode == 37) {
			fangxiang = "zuo";
		}else if(e.keyCode == 38){
			fangxiang = "shang";
		}else if (e.keyCode == 39) {
			fangxiang = "you";
		}else if (e.keyCode == 40) {
			fangxiang = "xia";
		}
	}

	var t;
	$(".start").click(function(){
		t = setInterval(move,200);
	})

	$(".again").click(function(){
		location.reload();
	})

})