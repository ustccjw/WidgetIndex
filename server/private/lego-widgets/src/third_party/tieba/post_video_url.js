var Post_Video_URL = {
    convert_urls : [
		[/http:\/\/my\.tv\.sohu\.com\/u\/vw\/([0-9a-zA-Z_]*)$/ig, 'http://my.tv.sohu.com/fo/v4/$1/my.swf'],
		[/http:\/\/tv\.sohu\.com\/([0-9a-zA-Z_]*)\/([0-9a-zA-Z_]*)\.shtml$/ig, 'http://api.tv.sohu.com/url/$1/$2.shtml'],
		[/http:\/\/client\.joy\.cn\/flvplayer\/([0-9a-zA-Z]*)_([0-9]*)_[1-9]*_([0-9]*)\.swf$/ig, 'http://client.joy.cn/flvplayer/$1_$2_0_$3.swf'],
		[/http:\/\/www\.56\.com\/u([0-9]*)\/v_([0-9a-zA-Z_]*)\.html$/ig, 'http://player.56.com/v_$2.swf'],
		[/http:\/\/www\.56\.com\/w([0-9]*)\/play_album-aid-([0-9]*)_vid-([0-9a-zA-Z_]*)\.html$/ig, 'http://player.56.com/v_$3.swf'],
		[/http:\/\/www\.letv\.com\/ptv\/vplay\/([0-9a-zA-Z_]*)(\.html)?$/ig, 'http://www.letv.com/player/share/baidu/x$1.swf'],
        [/http:\/\/www\.letv\.com\/player\/x([0-9a-zA-Z_]*)\.swf$/ig, 'http://www.letv.com/player/share/baidu/x$1.swf'],
		[/http:\/\/www\.aipai\.com\/([a-z]*)([0-9]*)\/([0-9a-zA-Z]*)\.html$/ig, 'http://www.aipai.com/$1$2/$3/playerOut.swf'],
		[/http:\/\/mv\.molihe\.com\/show\/([0-9]*)$/ig, 'http://mv.molihe.com/molihe_play-1-$1.swf'],
		[/http:\/\/www\.tudou\.com\/programs\/view\/([0-9a-zA-Z]*)\/?$/ig, 'http://www.tudou.com/v/$1\/v.swf'],
		[/http:\/\/www\.boosj\.com\/([0-9]*)\.html$/ig, 'http://static.boosj.com/v/swf/w_player1.0_$1.swf'],
		[/http:\/\/([0-9a-zA-Z_]*)\.kankanews\.com\/vods\/([0-9a-zA-Z_]*)\/([0-9a-zA-Z_]*)(\/)?$/ig, 'http://www.kankanews.com/object/kankanewsplayer-tieba.swf?autoPlay=false&streamType=recorded&mutiDynamicStreamPlay=true&cid=$2&vid=$3&server=http://www.kankanews.com/dataservice/&otherLink=true&bufferTime=4'],
		[/http:\/\/www\.kankanews\.com\/object\/kankanewsplayer([0-9a-zA-Z\-\.]*)\.swf/ig, 'http://www.kankanews.com/object/kankanewsplayer3.0.swf'],	
		[/http:\/\/www\.m1905\.com\/video\/play\/([0-9]*)\.shtml$/ig, 'http://www.m1905.com/video/s/$1/v.swf?autoplay=0'],
		[/http:\/\/www\.m1905\.com\/video\/m\/([0-9]*)\/v\.swf/ig, 'http://www.m1905.com/video/s/$1/v.swf?autoplay=0'],
		// [/http:\/\/([0-9a-zA-Z_]*)\.kankanews\.com\//ig, 'http://www.kankanews_bak.com/'],
		[/http:\/\/v\.ifeng\.com\/news\/([0-9a-zA-Z_\-]*)\/([0-9]{6})\/([0-9a-zA-Z_\-]*)\.shtml/ig, 'http://v.ifeng.com/include/exterior.swf?guid=$3&AutoPlay=false'],
		[/http:\/\/s\.v\.ifeng\.com\/([0-9a-zA-Z_\-]*)\/([0-9a-zA-Z_\-]*)/ig, 'http://s.v.ifeng.com/tieba/$1/$2.swf'],
		//[/(http:\/\/share\.vrs\.sohu\.com\/[0-9a-zA-Z_]*\/v\.swf)(\S*)$/ig, '$1&autoplay=false'],
		[/(http:\/\/share\.vrs\.sohu\.com\/[0-9a-zA-Z_]*\/v\.swf)(\S*)(&xuid\s*)$/ig, '$1&autoplay=false$3'],
		[/http:\/\/v\.youku\.com\/v_show\/id_([0-9a-zA-Z_]+)\.html/ig,'http://player.youku.com/player.php/sid/$1/v.swf'],
		[/http:\/\/www\.tudou\.com\/programs\/view\/([0-9a-zA-Z]*)\/?$/ig, 'http://www.tudou.com/v/$1\/v.swf'],
		[/http:\/\/v\.ku6\.com\/show\/([0-9a-zA-Z_\.&\?]+).html/ig,'http://player.ku6.com/refer/$1/v.swf'],
		[/http:\/\/v\.ku6\.com\/special\/([0-9a-zA-Z_\.&\?]+).html/ig,'http://player.ku6.com/refer/$1/v.swf'],
		[/http:\/\/www\.56\.com\/u([0-9a-zA-Z_]+)\/([0-9a-zA-Z_\.&\?]+).html/ig,'http://player.56.com/$2.swf'],
		[/(http:\/\/www\.cutv\.com\/static\/player\/v\.swf\?(id|pid|video)=[0-9a-zA-Z_\/\:\-\%\.]*)(\S*)$/ig,'$1&autoplay=false']
	],
	 mp4_url : [
            //  [/http:\/\/v\.ku6\.com\/show\/([0-9a-zA-Z_\.&\?]+).html/ig,'http://v.ku6.com/fetchwebm/$1.m3u8']
    ],
    convertToMp4 : function(url){

       var s = this.mp4_url,src = url;
        for(var i=0;i<s.length;i++){
            url = url.replace(s[i][0], s[i][1]);
        }
        if(url==src)
        {
           url = "";
        }
        return url;
    },
    auto_params : [
	    // web site domain, param name, param exp, default stop value 
	    ['client.joy.cn', 'playstatus', /playstatus=/ig, '0'],   
		['//v.ifeng.com', 'AutoPlay', /AutoPlay=/ig, 'false'],
		['m1905.com', 'autoplay', /autoplay=/ig, '0'],
	    ['kankanews.com', 'otherLink', /otherLink=/ig, 'false']  
    ],
    convert : function(url){
		// ['mv.molihe.com', 'ispause', /ispause=/ig, '1'] 
	var s = this.convert_urls;
	for(var i=0;i<s.length;i++){
	    url = url.replace(s[i][0], s[i][1]);
	}
	return url;
    },
    filter_param : function(flash_url_value){
	if(flash_url_value.indexOf('share.vrs.sohu.com')<0){
		flash_url_value = flash_url_value.replace(/(\&)?\w*auto\w*=[\w\d]+/ig,"");
	}
	var ps = this.auto_params;
	for(var i=0;i<ps.length;i++){
	    var p = ps[i];
	    if(flash_url_value.indexOf(p[0])>-1){
			flash_url_value = flash_url_value.replace(p[2], 'old_invalid=');
		    flash_url_value += (flash_url_value.indexOf('?') > -1 ? '&' : '?') + p[1] + '=' + p[3];
	    }
	}
	return flash_url_value;
    }
};
