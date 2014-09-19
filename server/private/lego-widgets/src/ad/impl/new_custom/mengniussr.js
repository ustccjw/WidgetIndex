/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/mengniussr.js ~ 2014/04/14 11:24:29
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * mengniussr相关的实现逻辑
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
goog.require('ad.widget.ButtonGroup');

goog.include('ad/impl/new_custom/mengniussr.less');

goog.provide('ad.impl.new_custom.Mengniussr');

ad.Debug(function(async) {
    // 处理数据
    var videosConfig = (function (videos, player, merge) {
        for (var i = videos.length - 1; i >= 0; --i) {
            merge(videos[i], player);
        };
        return videos;
    })(
        AD_CONFIG['video']['videos'],
        AD_CONFIG['video']['player'], 
        baidu.object.merge
    );
    var lastShowVideoIndex = 0;
    
    var material = new ad.material.BaseMaterial();
    var video = new ad.widget.Video(videosConfig[lastShowVideoIndex]);
    if(AD_CONFIG['title']['logoimg'] 
            && !AD_CONFIG['title']['logoimg']['logoimg']){
        delete AD_CONFIG['title']['logoimg'];
    }
    var title = new ad.widget.Title(AD_CONFIG['title']);
    var head = new ad.widget.SmallHead(AD_CONFIG['head']);
    var products = new ad.widget.ImageNormal(AD_CONFIG['products']);
    var buttons = new ad.widget.ButtonGroup(AD_CONFIG['buttons']);
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
            [buttons],
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
            [buttons],
            [img],
            [app]
        );
    }


    if (async === true) {
        return material;
    }
    material.show();

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

    if (products) {
        products.addListener(ui.events.CLICK, function(index){
            showVideo(index);
            return false;
        });
    }

    return material;

    function showVideo (index) {
        if (lastShowVideoIndex === index) {
            return ;
        }
        if (!video) {
            return ;
        }
        videosConfig[index]['is_play'] = true;
        video.refresh(null, videosConfig[index]);
        lastShowVideoIndex = index;
    }

});


















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
