
goog.require('ad.Debug');
goog.require('ad.impl.dianjing.BigPic2');

//goog.include('ad/impl/dianjing/detail.less');

// goog.provide('ad.impl.dianjing.realnav-detail.Detail');

ad.Debug(function(){
	

	if(AD_CONFIG){
		AD_CONFIG['tpl'] = 2;
		var bigPic = new ad.impl.dianjing.BigPic2(AD_CONFIG);
		bigPic.setTargetDom(baidu.g('srcPic'));
		bigPic.init();
		bigPic._qid = '978234';
		var imgList = ['4113246612,1529687070', '188042248,1061824292'];
		var index = Math.random().toString()[10] % 2;
		bigPic.requestAd({'imageIds': imgList, 'page': 1});
		setTimeout(function(){
			bigPic._showAd({'imaId': imgList[index], 'zoom': 1});
		}, 1000);
	}

});
