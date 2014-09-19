
goog.require('ad.Debug');
goog.require('ecom.ma.sticker');
//goog.require('ad.impl.image.StickerLoader');

goog.provide('ad.impl.dianjing.realnavdetail.Right');

ad.Debug(function(){
	/*
	function getImgList(len){
		var list = [];
		for(var i = 0; i < len; i ++){
			list.push(i + '.' + i);
		}
		return list;
	}

	var rightLoader = new ad.impl.image.StickerLoader();
	rightLoader.setWord('阳光了');
	rightLoader._qid = '123234235';
	rightLoader._imgIds = getImgList(100);
	rightLoader._detailEventHandler({'imaURL': '18.18'});
	*/

	///*
	if(!COMPILED){
		var curIndex = -1;
		var arrRcv = [
			'http://www.baidu.com',
			'http://www.baidu.com',
			'http://www.baidu.com',
			'http://www.baidu.com',
			'http://ad.doubleclick.net/clk;275655297;102678886;d?http://cruze.chevrolet.com.cn/?utm_source=Baidu-TY&utm_medium=Banner&utm_campaign=KLZ1309-Baidu-TY',
			'http://www3.wyethbb.com.cn/s-26_nutrilearn_contributor/',
			'http://www.baidu.com',
			'http://www.163.com',
			//'http://image.baidu.com/channel/advertise?col=美汁源',
			'http://click.hm.baidu.com/clk?8b8f00f450d16952e4ce372e37505c2f',
			'http://click.hm.baidu.com/clk?0fa143db7943e570a75de3671c54ac1b',
			'http://click.hm.baidu.com/clk?a4f6b56fe6d5c611e00545691c613766',
			[
				'http://t.yaowan.com/game/jdsjbdtpcs.php?tguser=07',
				'http://t.yaowan.com/game/jqxsbdtpcs.php?tguser=07',
				'http://t.yaowan.com/game/tlcsbdtpcs.php?tguser=07',
				'http://t.yaowan.com/game/sgfybdtpcs.php?tguser=071',
				'http://t.yaowan.com/game/jzwcbdtpcs.php?tguser=07',
				'http://t.yaowan.com/game/yltxbdtpcs.php?tguser=07',
				'http://t.yaowan.com/game/html/tyym02/index.php?tguser=tpcs_001'
			],
			'http://image.baidu.com/i?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=result&fr=sugrec&sf=1&fmq=1375775531072_R&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=%E8%8A%AC%E8%BE%BE', //接口升级后的fenda
			'http://bzclk.baidu.com/click.php?t=PjFkXjQ-SGTGFfVi00000Prf1dfz0000n6000cbH00aFDs000f000Z.mLFW5HcdnW6k0A-Vu1dvO5nJn0KWp1Y3f16dP1wDwH6sfW0dnHPan17KrHuAnbDYPDuKwbn4w6Kk5Tj8Y27xTgN-TMb0IgF_5y9YIZ0lQzq-QhP8QhdGmyqlpAN8QhPEUiqzQhIGuWqo5HDsnjm3rHnhTjY1XyNLNj0hIhtqnvw9rHIBmhN-FMuz5HchTMfqnBu8T1dUHNqKwD-fgiu8pHdUHNqFwNPFw7YhUhDqyYdxHR7jgiuE5y9YIZ0-nYD-nbm-nbuYIMn8XyqdpLR8mvqVFHFAphqCUh4GugI9UAV-T60', //jw
			'http://image.baidu.com/i?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=result&fr=sugrec&sf=1&fmq=1375775531072_R&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=%E8%8A%AC%E8%BE%BE' //fenda窄版
		]

		var arrRender = [
			'http://ecma.bdimg.com/lego-tpl/2002900779.js',
			'http://ecma.bdimg.com/lego-tpl/2002892137.js', //惠氏0917
			'http://ecma.bdimg.com/lego-tpl/2002478711.js',//惠氏2
			'http://ecma.bdimg.com/adtest/5f9f7b0df3746f7b400cd1457830e576.js', //科鲁兹
			'http://ecma.bdimg.com/lego-tpl/2002474469.js', //lego-api test
			'http://bcs-sandbox.baidu.com/lego-tpl/2002474119.js',
			'http://ecma.bdimg.com/adtest/e4e406e579bfad076cf2f3f2da63fa26.js',//惠氏奶粉
			'http://bcs-sandbox.baidu.com/lego-tpl/2000075812.js', //test1
			'http://bcs-sandbox.baidu.com/lego-tpl/2000075812.js', //test2
			//'http://ecma.bdimg.com/adtest/92aed71b04abaf6e61aec85a9e679a94.js',//美汁源
			'http://ecma.bdimg.com/adtest/934d059c39769294dbf8a6effa861212.js', //沃尔沃1
			'http://ecma.bdimg.com/adtest/0b08d9dbb48b648f2437dcb7e4107d1c.js', //2
			'http://ecma.bdimg.com/adtest/de9bf3240bf1f0c0551a1fa7cd5d845b.js', //3
			'http://ecma.bdimg.com/adtest/db8e949e162733193ce34e369f3ef003.js', //要玩排行榜
			'http://ecma.bdimg.com/adtest/36429529aaaf6991ebad11de7eee6153.js', //接口升级后的芬达物料
			'http://bcscdn.baidu.com/adtest/c02ae028f3cc7a368ac17c39bf23c183.js', //jw
			'http://ecma.bdimg.com/adtest/d2d7c7ea7c9717a7a7b21044e52b8c78.js' //fenda窄版
		]


		function getData(){
			curIndex ++;
			var len = arrRender.length;
			if(curIndex == len){
				curIndex = 0;
			}
			if(arrRcv[curIndex] instanceof Array){
				return {'rcv': arrRcv[curIndex], 'render': arrRender[curIndex]};
			}
			else {
				return {'rcv': [arrRcv[curIndex]], 'render': arrRender[curIndex]};
			}
		}

		function changeAd(){
			var data = getData();
			for(var i = 0; i < data.rcv.length; i ++){
				data.rcv[i] += '&r=' + Math.random();
			}
			ecom.ma.sticker._instance._removeMat();
			ecom.ma.sticker._instance._renderRCV(data);
			//ecom.ma.sticker._instance._renderASP({});
			var config = {
		        "logo_url":"http://t.womenwan.com/dw/baidu/yw.jpg",
		        "show_url":"http://www.yaowan.com",
		        "site_url":"http://www.yaowan.com",
		        "ads" : [
		            {
		                "desc":"两大图广告1test123",
		                "image_url":"http://t.womenwan.com/dw/baidu/jdsj/jdsj03.jpg",
		                "click_url":"http://10.65.7.31:8765/click.php?t=S-30d15frnsmhxKw000002swl8mX0000Z6000Q6Q00a3as000s0000.mLFW5HR3njb40A-Vu1Y0mv_qrDn3PHTYwDR3nDcsPHD1fWnkfHbvwWFKPjwAfRujrRm0THLiJ_LhgL7dugF40ZNzUjdCIZwsrBtEIa44myqLmy38mvqVQvI9UyREphw1phFbIZKWTz4spZ0OIAIdTvNz5H0100"
		            },
		            {
		                "desc":"两大图广告2test123",
		                "image_url":"http://t.womenwan.com/dw/baidu/jdsj/jdsj04.jpg",
		                "click_url":"http://10.65.7.31:8765/click.php?t=S-30d15frnsmhxKw000002swl8mX0000Z6000Q6Q00a4as000s0000.mLFW5HRLrj010A-Vu1Y0mv_qrDn3PHTYwDR3nDcsPHD1fWnkfHbvwWFKPjwAfRujrRm0THLiJ_LhgL7dugF40ZNzUjdCIZwsrBtEIa44myqLmy38mvqVQvI9UyREphw1phFbIZKWTz4spZ0OIAIdTvNz5H0Y00"
		            }
		        ]
		    };
			//ecom.ma.sticker._instance._renderConfig(config);
		}

		function createTest(){
			var testDom = baidu.dom.create(
				'div', {
				'id': 'testDom',
				'style':'position:absolute;top:0;right:0;cursor:pointer;border:solid 1px #000;padding:10px;z-Index:9999999;background-color: #fff;'
			});
			testDom.innerHTML = '翻页测试';
			baidu.g('srcPic').appendChild(testDom);
			testDom.onclick = changeAd;
			ecom.ma.sticker._instance.setWord(encodeURIComponent("神曲了"));
			testDom.click();
		}

		createTest();
	}
	//*/
	
		
});
