/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: guolinaiyou.js 150523 2013-06-05 14:06:00Z  fanxueliang$
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/guolinaiyou.js ~ 2013/06/05 14:06:00
 * @author fanxueliang@baidu.com
 * @version $Revision: 150523 $
 * @description
 * coca2相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.Image');
goog.require('ad.widget.Title');
goog.require('ad.widget.Flash');

goog.include('ad/impl/new_custom/guolinaiyou.less');

goog.provide('ad.impl.new_custom.GuoLiNaiYou');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    var video = new ad.widget.Video(AD_CONFIG['video']);
    if(AD_CONFIG['title']['logoimg'] && !AD_CONFIG['title']['logoimg']['logoimg']){
        delete AD_CONFIG['title']['logoimg'];
    }
    var title = new ad.widget.Title(AD_CONFIG['title']);
    var head = new ad.widget.SmallHead(AD_CONFIG['head']);
    var products = new ad.widget.ImageNormal(AD_CONFIG['products']);
    var img = new ad.widget.Image(AD_CONFIG['image']);
    var app;
    if(AD_CONFIG['app']) {
        app = new ad.widget.Flash(AD_CONFIG['app']);
    }
    
    if(!AD_CONFIG['app']) {
        material.setWidgets(
            [title],
            [
                [video],
                [
                    head,
                    products
                ]
            ],
            [img]
        );
    }
    else {
        material.setWidgets(
            [title],
            [
                [video],
                [
                    head,
                    products
                ]
            ],
            [img],
            [app]
        );
    }
    
    if (async === true) {
        return material;
    }
    material.show();
    //material.initMonitor(AD_CONFIG['main_url']);
    /* if(AD_CONFIG['color'] && AD_CONFIG['color']['border']) {
        baidu.dom.setStyles(material.getRoot(), {"border-color": AD_CONFIG['color']['border']});
    }
    else {
        baidu.dom.setStyles(material.getRoot(), {"border-color": "#fa6c6b"});
    } */
    if(app) {
        baidu.hide(app.getRoot());
        img.addListener(ui.events.CLICK, function(){
            baidu.show(app.getRoot());
            img.sendLog("app_float_open", "app_float_open");
            return false;
        });
        var div = baidu.dom.create('div', {"class": "ec-float-close"});
        baidu.g(app.getId('flash')).appendChild(div);
        baidu.on(div, 'click', function(){
            baidu.hide(app.getRoot());
        });
    }
    return material;
});