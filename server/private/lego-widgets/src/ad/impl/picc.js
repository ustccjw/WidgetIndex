/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/picc.js ~ 2012/08/22 15:47:54
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * piccc相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.render.DefaultRender');
goog.require('ad.widget.Image');
goog.require('ad.widget.Iframe');
goog.require('ad.widget.FloatWindow');

goog.include('ad/impl/picc.less');

goog.provide('ad.impl.Picc');

ad.Debug(function(async){
    var material = new ad.Material(AD_CONFIG['id']);
    material.setWidgets(
        [new ad.widget.Image(AD_CONFIG['image'])]
    );
    if (async === true) {
        return material;
    }
    material.show();
    function sendLog(title, xp) {
        material.getCMS().sendLog({
            'r' : new Date().valueOf(),
            'q' : (window['bdQuery'] || ''),
            'xp' : xp,
            'plid' : material.getId().replace(/ec-ma-/g, ''),
            'title' : title
        });
    }
    var image = material.getWidget(0, 0);
    var fw = new ad.widget.FloatWindow(AD_CONFIG['float_layer']);
    var element = baidu.dom.create("div",{"class" : "ec-float-layout-picc"});
    document.body.appendChild(element);
    fw.refresh(element);
    material.handleWidgetEvent(fw);
    var frame = new ad.widget.Iframe({});
    image.addListener(ui.events.CLICK, function(){
        sendLog("打开浮层", "打开浮层");
        /*ad.base.setTimeout(function(){
            frame.refresh(baidu.g(fw.getId("float-iframe")), AD_CONFIG['float_layer']['iframe']);
        },0);*/
        fw.show();
    });
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
