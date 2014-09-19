/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/image/sticker2.js ~ 2012/11/21 17:54:17
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 11222 $
 * @description
 * sticker2相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
//goog.require('ad.widget.image.Game');
//goog.require('ad.widget.image.Shiyan1');
goog.require('ad.widget.image.Shiyan2');

goog.include('ad/impl/image/sticker2.less');

goog.provide('ad.impl.image.Sticker2');

ad.Debug(function(){
    var material = new ad.Material(AD_CONFIG['id']);
    var data = AD_CONFIG['sticker'];
    setEncoreUrlPageNum(data);
    material.setWidgets(
        //[new ad.widget.image.Game(data)]
        //[new ad.widget.image.Shiyan1(data)]
        [new ad.widget.image.Shiyan2(data)]
    );

    material.show();
    //百度精算监测
    //material.initHMJSMoniter('993d2ad64ea9c7d1eec0bb7995864491');
    //material.initHMJSMoniter('e70c0f16877c30efbe41aacddd060be8');
    material.initHMJSMoniter('169a010b09e8740ef75f7b9c490b44ed');

    
    //当贴片广告加载器上线之后，把展现广告方法挂载到全局，之后不再加载该模板
    if(window['ecom'] && window['ecom']['ma'] && window['ecom']['ma']['sticker']){
        window['ecom']['ma']['sticker']['show'] = function(){
            //重新绑定广告数据
            setEncoreUrlPageNum(AD_CONFIG['sticker']);
            material.getWidget(0,0).setData(AD_CONFIG['sticker']);
            material.show();
        };
    }

    function setEncoreUrlPageNum(data){
        var page;
        var getPage = baidu.getObjectByName('ecom.ma.sticker.getPageNum');
        if(baidu.lang.isFunction(getPage)){
            page = getPage();
        } 
        if(page !== undefined){
            if(data['url']){
                data['url'] += '&attach=' + page;
            }
            if(data['more_url']){
                data['more_url'] += '&attach=' + page;
            }
            if(data['options'] && data['options'].length){
                for(var i = 0; i < data['options'].length; i++){
                    data['options'][i]['url'] += '&attach=' + page;
                }
            }
        }
    }

});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
