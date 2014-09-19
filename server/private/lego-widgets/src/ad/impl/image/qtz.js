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
 * sticker3相关的实现逻辑
 * 这是右侧非tag的物料代码
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.image.Flash');

goog.include('ad/impl/image/sticker2.less');

goog.provide('ad.impl.image.Qtz');

ad.Debug(function(){
    configAdaptor(); //flash物料的数据适配
    var material = new ad.Material(AD_CONFIG['id']);
    var data = AD_CONFIG['sticker'];
    setEncoreUrlPageNum(data);
    material.setWidgets(
        [new ad.widget.image.Flash(data)]
    );

    material.show();

    /* 由于以前一次加载只出现一种样式，所以有这个机制，后来取消了
    //当贴片广告加载器上线之后，把展现广告方法挂载到全局，之后不再加载该模板
    if(window['ecom'] && window['ecom']['ma'] && window['ecom']['ma']['sticker']){
        window['ecom']['ma']['sticker']['showTag'] = function(){
            configAdaptor();
            var material = new ad.Material(AD_CONFIG['id']);
            var data = AD_CONFIG['sticker'];
            //setEncoreUrlPageNum(data);
            material.setWidgets(
                //[new ad.widget.image.Game(data)]
                //[new ad.widget.image.Shiyan1(data)]
                //[new ad.widget.image.Shiyan2(data)]
                [new ad.widget.image.Flash(data)]
            );

            material.show();
        };
    }
    */

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

    function configAdaptor(){
        AD_CONFIG['sticker']['width'] = 205;
        AD_CONFIG['sticker']['height'] = 520;
        AD_CONFIG['sticker']['link'] = AD_CONFIG['sticker']['options'][0]['url'];
        AD_CONFIG['sticker']['src'] = AD_CONFIG['sticker']['options'][0]['src'];
    }

});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
