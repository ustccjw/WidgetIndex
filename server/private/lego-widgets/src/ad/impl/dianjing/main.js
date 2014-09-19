/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/dianjing/main.js ~ 2013/02/26 21:19:50
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 11222 $
 * @description
 * main相关的实现逻辑
 **/

goog.require('ad.impl.dianjing.Base');

goog.provide('ad.impl.dianjing.Result');

/**
 * @constructor
 * @extends {ad.impl.dianjing.Base}
 */
ad.impl.dianjing.Result = function(config){
	ad.impl.dianjing.Base.call(this, config);

    this._issetpage1 = false;
};
baidu.inherits(ad.impl.dianjing.Result, ad.impl.dianjing.Base);

ad.impl.dianjing.Result.prototype._setFlagOnSmallImg = function(imgid){
	var dom = this.getDomByImgId(imgid);
	var flag = baidu.dom.create('div', {'style': 'position: absolute;left: 2px;top: 2px;width: 30px;height: 30px;background: url(//bs.baidu.com/adtest/323a70822f8c03c903fbad86a629d848.png) 0 0 no-repeat; _background: none;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled="true", sizingMethod="corp", src="//bs.baidu.com/adtest/323a70822f8c03c903fbad86a629d848.png");'});
	dom.appendChild(flag);
}

ad.impl.dianjing.Result.prototype.requestAd = function(args){
	//alert('result:requestAd');
	var me = this;
    
    if(!me._issetpage1){
        me._issetpage1 = true;
        me.requestAd(me._setArgs());
    }
    if(me._issetpage1){
        var url = me.getAdUrl(args['imageIds']);
        if(url){
            baidu.sio.callByServer(
                url,
                function(adData){
                    if(parseInt(adData['ad_num'],10)){
                        baidu.array.each(adData['ads'], function(item, i){
                            me._setFlagOnSmallImg(item['image_id']);
                        });
                        if(me.enableRequest(args['page'])){
                            me.saveAd(adData['ads'],args['page']);
                        }
                    }
                },{'charset':'gbk'}    
            );
        }
    }
}

ad.impl.dianjing.Result.prototype._setArgs = function(){
    var args = {};
    args['page'] = 1;
    args['imageIds'] = this.getImgListPage1();
    return args;
}

goog.require('ad.Debug');
goog.require('ad.impl.dianjing.Result');

goog.include('ad/impl/dianjing/main.less');

goog.provide('ad.impl.dianjing.Main');

ad.Debug(function(){
    if(AD_CONFIG){
        AD_CONFIG['tpl'] = 1;
        var result = new ad.impl.dianjing.Result(AD_CONFIG);
        result.setTargetDom(baidu.g('imgDetail'));
        result.init();
    }
	
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
