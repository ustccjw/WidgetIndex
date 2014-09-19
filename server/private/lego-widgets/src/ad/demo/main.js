function getDateByStr(str){
	var arrDateinfo = str.split('-');
	return new Date(parseInt(arrDateinfo[0], 10), parseInt(arrDateinfo[1]-1, 10),parseInt(arrDateinfo[2], 10));
}

var data_hc;
var curDay_data_map = {};
var data_curDay_map = {};
function setData(){
	if(data && data.length){
		for(var i=0; i< data.length; i++){
			data[i]['start2'] = getDateByStr(data[i]['start']);
			data[i]['src'] = getUrlByWLName(data[i]['name']);
		}
	}
	data_hc = data;
	data_hc.sort(function(s1, s2){
		return s1['start2'] - s2['start2'];
	});
	for(var i=0; i< data_hc.length; i++){
		if(i == 0){
			data_hc[i]['curDay'] = 0;
		}
		else {
			data_hc[i]['curDay'] = (data_hc[i]['start2']  - data_hc[0]['start2'] )/24/60/60/1000;
		}
		curDay_data_map[data_hc[i]['curDay']] = i;
		data_curDay_map[i] = data_hc[i]['curDay'];
	}
}
setData();

function getTotalDays(){
	return (data_hc[data_hc.length-1]['start2']  - data_hc[0]['start2'] )/24/60/60/1000;
}
var totalDays = getTotalDays(); //总长（这里是天数）
var curDay = 0; //当天长度(第几天)
var curData;
var progressSlider_length;
var intervalID;
var interval = 1000;
var mode = 'pause'; //'pause','play','stop'

$(function(){
	setEnd();
	//bindevent
	//上一个
	$("#btn-prev").mouseenter(function(){
		$(this).addClass('wg-button-hover');
	});
	$("#btn-prev").mouseleave(function(){
		$(this).removeClass('wg-button-hover');
	});
	$("#btn-prev").mousedown(function(){
		$(this).addClass('wg-button-active');
	});
	$("#btn-prev").mouseup(function(){
		$(this).removeClass('wg-button-active');
		prev();
	});
	//下一个
	$("#btn-next").mouseenter(function(){
		$(this).addClass('wg-button-hover');
	});
	$("#btn-next").mouseleave(function(){
		$(this).removeClass('wg-button-hover');
	});
	$("#btn-next").mousedown(function(){
		$(this).addClass('wg-button-active');
	});
	$("#btn-next").mouseup(function(){
		$(this).removeClass('wg-button-active');
		next();
	});
	//播放暂停
	$("#btn-play-stop").mouseenter(function(){
		$(this).addClass('wg-button-hover');
	});
	$("#btn-play-stop").mouseleave(function(){
		$(this).removeClass('wg-button-hover');
	});
	$("#btn-play-stop").mousedown(function(){
		$(this).addClass('wg-button-active');
	});
	$("#btn-play-stop").mouseup(function(){
		$(this).removeClass('wg-button-active');
		var pNode = $(this).parent();
		if(mode != 'play'){
			pNode.removeClass('stop');
		}
		else {
			pNode.addClass('stop');
		}
		playstop();
	});

	$("#play-bar-bg").click(function(){
		//alert(arguments[0].pageX);
		var w = arguments[0].pageX-190;
		$("#play-bar").width(w);
		$("#cursor").css('left', w);
		resetCurDay(w);
	});
	$( "#cursor" ).draggable({ 
		axis: "x", 
		containment: "#progressSlider", 
		drag: function(){
			stopInterval();
			$("#play-bar").width(arguments[1].position.left);
		},
		stop: function(){
			resetCurDay(arguments[1].position.left);
			startInterval();
			//$("#msg").html($("#msg").html() + 'finish<br />');
			//alert(arguments[1].position.left);
		} });
	progressSlider_length = $("#progressSlider").width();
	//startInterval();
});

function startInterval(){
	intervalID = setInterval(function(){
		if(curDay < totalDays){
			setStart();
			setPlayBarLength();
			hitData();
			curDay++;
			resetCurData();
		}
		else {
			stopInterval();
			end();
		}
	},interval);
}

function stopInterval(){
	if(intervalID){
		clearInterval(intervalID);
	}
}

function setPlayBarLength(){
	$("#play-bar").width(100 * curDay / totalDays + '%');
	$("#cursor").css('left', 100 * curDay / totalDays + '%');
}

function hitData(){
	if(curDay_data_map[curDay] >= 0){
		//$("#msg").html(getWL()['text']);
		setWLInfo();
		showWL();
		return;
		stopInterval();
		setTimeout(function(){
			startInterval();
		}, 3000);
	}
}

function setStart(){
	var startDay = getDateByStr(data_hc[0]['start']);
	startDay.setDate(startDay.getDate() + curDay);
	$("#day-start").html((startDay.getMonth()+1) + '-' + startDay.getDate());
}

function setEnd(){
	var endDay = data_hc[data_hc.length - 1]['start2'];
	$("#day-end").html((endDay.getMonth()+1) + '-' + endDay.getDate());
}

function getWL(){
	return data_hc[curDay_data_map[curDay]];
}

function setWLInfo(){
	var wl_info = getWL();
	$("#wl-text").html(wl_info['text']);
	var price = wl_info['income'] == '-' ? '不详' : wl_info['income'] + "万";
	$("#wl-income").html("收入：" + price);
}

function resetCurDay(w){
	curDay =  Math.ceil(totalDays*w/progressSlider_length);
	resetCurData();
}

function resetCurData(){
	if(curDay_data_map[curDay] >= 0){
		curData = curDay_data_map[curDay];
	}
}

function prev(){
	if(curData != undefined && curData >= 1){
		curData --;
	}
	curDay = data_curDay_map[curData];
}

function next(){
	if(curData != undefined && curData < data_hc.length){
		curData ++;
	}
	curDay = data_curDay_map[curData];
}

function playstop(){
	if(mode != 'play'){
		if(curDay == totalDays){
			curDay = 0;
		}
		startInterval();
		mode = 'play';
	}
	else{
		stopInterval();
		mode = 'pause';
	}
}

function end(){
	var pNode = $("#btn-play-stop").parent();
	pNode.addClass('stop');
	mode = 'stop';
}

function getUrlByWLName(name){
	return '../impl/' + name + '.app.html';
}

var isRenderCanvas = false;
function showWL(){
	if(!isRenderCanvas){
		var html = [];
		html.push('<div class="canvas">');
		html.push('<iframe width="800" height="600" FRAMEBORDER=0 SCROLLING=NO ></iframe>');
		html.push('</div>');
		var canvas = $(html.join(''));
		//canvas.css('zIndex',wl['curDay']);
		//canvas.draggable();
		$("#wl_panel").append(canvas);
		isRenderCanvas = true;
	}

	var wl = getWL();
	var iframe = $('iframe', canvas);
	iframe.attr('src', wl['src']);
	return;
	if(!wl['showed']){
		wl['showed'] = true;
	}
	//$("#canvas iframe").attr('src', wl['src']);
}

