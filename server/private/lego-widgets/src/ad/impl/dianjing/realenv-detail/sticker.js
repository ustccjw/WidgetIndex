
goog.require('ad.Debug');
//goog.require('ad.impl.dianjing.BigPic');
goog.require('ad.plugin.imageplus.BZLoaderSync');
goog.provide('ad.impl.dianjing.realnavdetail.Detail');

ad.Debug(function(){
	//var bigPic = new ad.impl.dianjing.BigPic(AD_CONFIG);
	//bigPic.setTargetDom(baidu.g('srcPic'));
	//var bigPic = new ad.plugin.imageplus.BZLoader();
	if(COMPILED){
		//.init();
	}
	else {
		

		/*
		var imgId = '123,456';
		bigPic.setCurImgId(imgId);
		bigPic.init();
		var ads = {
			'width_change':'500',
			'style_type': 2,
			'bks': [
				{
					'image_id':'123,456',
					'title': '路虎RANDROVER',
					'desc':'路虎（Landrover），曾在曾在中国大陆翻译成陆虎（香港地区称为越野路华”）路虎（Landrover），曾在曾在中国大陆翻译成陆虎（香港地区称为越野路华”）路虎（Landrover），曾在曾在中国大陆翻译成陆虎（香港地区称为越野路华”）',
					'price':'13980.00',
					'seller_name':'淘宝网',
					'idea_url':'',
					'encry_url':'10.65.6.159:8900/eye.php?t=af000jc000070000K0000jc0000C0000060000c000a_DXoR000005-86aD1RyYAQd3_Rf00000.mLFW5HfsnW00pydM5HDznzsYPHm0m1Y0IgF_5y9YIZ0lQzqLILT8mh7GuZR8mvqV0ZKz5HDsn0KVugcqIA7Emh7E00',
					'image_height':'360',
					'image_width':'500',
					'icon_top_left_x':'100',
					'icon_top_left_y':'50',
					'icon_top_left_x_change':'100',
					'icon_top_left_y_change':'50',
					'price_change':'13980.00'
				},
				{
					'image_id':'123,456',
					'title': '路虎RANDROVER',
					'desc':'韩国代购正品奢华狐狸毛皮草连帽2韩国代购正品奢华狐狸毛皮草连帽韩国代购正品奢华狐狸毛皮草连帽',
					'price':'13980.01',
					'seller_name':'淘宝网',
					'idea_url':'http://bs.baidu.com/adtest/344744931936a2bfda51819b6fe3302b.jpg',
					'encry_url':'10.65.6.159:8900/eye.php?t=af000jc000070000K0000jc0000C0000060000c000a_DXoR000005-86aD1RyYAQd3_Rf00000.mLFW5HfsnW00pydM5HDznzsYPHm0m1Y0IgF_5y9YIZ0lQzqLILT8mh7GuZR8mvqV0ZKz5HDsn0KVugcqIA7Emh7E00',
					'image_height':'360',
					'image_width':'500',
					'icon_top_left_x':'150',
					'icon_top_left_y':'200',
					'icon_top_left_x_change':'150',
					'icon_top_left_y_change':'200',
					'width_change':'355',
					'price_change':'13980.01'
				}
			],
			'ads': [
				{
					'image_id':'123,456',
					'title': '',
					'desc':'韩国代购正品奢华狐狸毛皮草连帽',
					'price':'13980.00',
					'seller_name':'淘宝网',
					'idea_url':'http://bs.baidu.com/adtest/344744931936a2bfda51819b6fe3302b.jpg',
					'encry_url':'10.65.6.159:8900/eye.php?t=af000jc000070000K0000jc0000C0000060000c000a_DXoR000005-86aD1RyYAQd3_Rf00000.mLFW5HfsnW00pydM5HDznzsYPHm0m1Y0IgF_5y9YIZ0lQzqLILT8mh7GuZR8mvqV0ZKz5HDsn0KVugcqIA7Emh7E00',
					'image_height':'360',
					'image_width':'500',
					'icon_top_left_x':'50',
					'icon_top_left_y':'100',
					'icon_top_left_x_change':'50',
					'icon_top_left_y_change':'100',
					'width_change':'500',
					'price_change':'13980.00'
				},
				{
					'image_id':'123,456',
					'title': '',
					'desc':'韩国代购正品奢华狐狸毛皮草连帽2韩国代购正品奢华狐狸毛皮草连帽韩国代购正品奢华狐狸毛皮草连帽',
					'price':'13980.01',
					'seller_name':'淘宝网',
					'idea_url':'http://bs.baidu.com/adtest/344744931936a2bfda51819b6fe3302b.jpg',
					'encry_url':'10.65.6.159:8900/eye.php?t=af000jc000070000K0000jc0000C0000060000c000a_DXoR000005-86aD1RyYAQd3_Rf00000.mLFW5HfsnW00pydM5HDznzsYPHm0m1Y0IgF_5y9YIZ0lQzqLILT8mh7GuZR8mvqV0ZKz5HDsn0KVugcqIA7Emh7E00',
					'image_height':'360',
					'image_width':'500',
					'icon_top_left_x':'200',
					'icon_top_left_y':'150',
					'icon_top_left_x_change':'200',
					'icon_top_left_y_change':'150',
					'width_change':'355',
					'price_change':'13980.01'
				}
			],
			'vds':[
		        {
		            'image_id':'123,456',
		            'desc':'大唐年间妖魔横行，一小渔村因为饱受鱼妖之害请来道士（冯勉恒 饰）除妖，年轻驱魔人陈玄奘（文章 饰）前来帮忙却被误认为骗子',
		            'price':'',
		            'seller_name':'腾讯视频',
		            'idea_url':'http://bcscdn.baidu.com/adtest/9e46fca91c637d8e5b112c9a2a66dc85.jpg',
		            'encry_url':'http://bzclk.baidu.com/eye.php?t=6mfX0cADZ6aK9K300f0005fK00jY0f00HfD005C000a_DX_jn0000F9GBb3aWWAWRfezRf00000.mLFW5HD1nWn30A-Vu1YknWf1n1csPj61QjbYnHn1PHT0m1Y3f16dP1wDwH6sfW0dnHPan17KrHuAnbDYPDuKwbn4w6KdThsqpZwYTjCEQLm8TgD8mvqVQvPEIhNzQLREIyG8mydLTZ7Mng9MrZ7VQh9YUys0TZcq0Ad-TWLnvVAvzV5AVf0',
		            'image_height':'360',
					'image_width':'500',
		            'icon_top_left_x':'333',
		            'icon_top_left_y':'250',
		            'icon_top_left_x_change':'100',
		            'icon_top_left_y_change':'100',
		            'title':''
		        },
		        {
		            'image_id':'123,456',
		            'desc':'赵薇大荧幕导演处女作',
		            'price':'',
		            'seller_name':'优酷',
		            'idea_url':'http://bcscdn.baidu.com/adtest/5afad8d43c8d44ae85807da79db2cae6.jpg',
		            'encry_url':'http://bzclk.baidu.com/eye.php?t=6CfX0c2DZ6aa9K30060005fK00jY0f00HfD005C000a_DX_jn0000F9GBb3aWWAWRfezRf00000.mLFW5HnLn1fY0A-Vu1YzrHDkrj0YPj04QjRzrjnkPWb4nsKW5H9jrjRLPDw7rjKanjRknYc1nRD4PbmzfHfYwb7Af1-A0ZNzUjdCIZwsrBtEIB44ULNoIi4WUvYEI-q1pAqLQv-bgd9rN7bYH-w7nDqRm1c8pZwVU0KsTWY0UyNz5I57ESD0',
		            'image_height':'360',
					'image_width':'500',
		            'icon_top_left_x':'333',
		            'icon_top_left_y':'250',
		            'icon_top_left_x_change':'150',
		            'icon_top_left_y_change':'150',
		            'title':'致我们终将逝去的青春'
		        }
		    ]
		};
		bigPic.saveAd(ads, 1);
		setTimeout(function(){
			bigPic._showAd({
				'imaId': imgId, 
				'zoom': 1
			});
		}, 200);
		*/
		//品专
		var curIndex = 0;
		var imgList = ['20956177,2234485812',null,'3624230435,2661833792',null,'2470081840,3097474080'];
		
		function changeAd(){
			if (curIndex >= imgList.length){
				curIndex = 0;
			}
			else {
				bz._show(imgList[curIndex]);
				curIndex ++;
			}
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
		}
		createTest();
		

		changeAd();
	}
	
	
});
