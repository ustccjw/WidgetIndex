/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: nike.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/nike.js ~ 2013/03/18 13:45:50
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * lv2相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.Video');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.ImageLink');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.Flash');
goog.require('ui.events');

goog.include('ad/impl/nike.less');

goog.provide('ad.impl.Nike');

ad.Debug(function(async) {
    AD_CONFIG['fwc']['material_name'] = 'ec-nike';
    var material = new ad.Material();
    var arrTabWidget = [];
    var leftVideo = new ad.widget.Video(AD_CONFIG['video']);
    var tab1 = new ad.widget.ImageLink(AD_CONFIG['tab1']);
    arrTabWidget.push(tab1);
    var tab2 = new ad.widget.ImageLink(AD_CONFIG['tab2']);
    arrTabWidget.push(tab2);
    var tab3 = new ad.widget.ImageCartoon(AD_CONFIG['tab3']);
    arrTabWidget.push(tab3);
    var tab4 = new ad.widget.ImageLink(AD_CONFIG['tab4']);
    arrTabWidget.push(tab4);
    AD_CONFIG['tab']['options'] = [];
    AD_CONFIG['tab']['options'].push({"tab_title": AD_CONFIG['tab1']['tab_title']});
    AD_CONFIG['tab']['options'].push({"tab_title": AD_CONFIG['tab2']['tab_title']});
    AD_CONFIG['tab']['options'].push({"tab_title": AD_CONFIG['tab3']['tab_title']});
    AD_CONFIG['tab']['options'].push({"tab_title": AD_CONFIG['tab4']['tab_title']});
    var tc = new ad.widget.TabContainer(AD_CONFIG['tab']);
    tc.setWidgets(arrTabWidget);
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    var options = ad.base.getObjectByName('fwc.options', AD_CONFIG);
    var fwcVideo = new ad.widget.Video(options[0]);
    for(var i = 0; i < options.length; i++) {
        if(options[i] && options[i]['imgsrc']){
            AD_CONFIG['fwc_image_cartoon']['options'].push(
                {
                    'imgsrc': options[i]['imgsrc'],
                    'linktext': options[i]['linktext']
                }
            );
        }
    }
    var fwcImageCartoon = new ad.widget.ImageCartoon(AD_CONFIG['fwc_image_cartoon']);
    fwc.setWidgets([fwcVideo, fwcImageCartoon]);
    material.setWidgets(
        [
            [leftVideo],
            [
                new ad.widget.SmallHead(AD_CONFIG['head']),
                new ad.widget.SmallWeibo(AD_CONFIG['weibo'])
            ]
        ],
        [tc],
        [fwc]
    );
    
    
    if (async === true) {
        return material;
    }
    
    material.show();
    
    material.initMonitor(AD_CONFIG['main_url']);
    
    var fwcRendered;
    var cartoonLinks;
    fwcImageCartoon.addListener(ui.events.CLICK, function(index, e) {
        showFWC(index);
        fwcImageCartoon.sendLog('浮层胶片图' + (index + 1) + 'click');
        fwcImageCartoon.sendLog('浮层video' + (index + 1) + 'auto');
        return false;
    });
    fwcImageCartoon.addListener(ui.events.ARROW_LEFT, function() {
        fwcImageCartoon.sendLog('浮层胶片图arrowleft');
        return false;
    });
    fwcImageCartoon.addListener(ui.events.ARROW_RIGHT, function() {
        fwcImageCartoon.sendLog('浮层胶片图arrowright');
        return false;
    });
    fwcImageCartoon.addListener(ui.events.NEW_ELEMENT, function (node) {
        if (!cartoonLinks) return;

        var link = baidu.dom.first(node);
        cartoonLinks[cartoonLinks.length] = link;

        link.style.position = 'relative';

        var cover = baidu.dom.create('label');
        baidu.dom.setAttr(cover, 'data-index', cartoonLinks.length);
        baidu.dom.insertBefore(cover, baidu.dom.first(link));
    });

    //设置左侧video的log
    leftVideo.addListener(ui.events.VIDEO_START , function() {
        leftVideo.sendLog('leftvideostart');
        return false;
    });
    leftVideo.addListener(ui.events.VIDEO_FINISH , function() {
        leftVideo.sendLog('leftvideocomplete');
        return false;
    });
    leftVideo.addListener(ui.events.VIDEO_CLICK, function() {
        leftVideo.sendLog('floatopen');
        showFWC(0);
        return false;
    });
    
    fwc.addListener(ui.events.CLOSE, function() {
        hideFWC();
    });
    var curVideoIndex = -1;
    //设置浮层中video的log
    fwcVideo.addListener(ui.events.VIDEO_START , function() {
        fwcVideo.sendLog('浮层video' + (curVideoIndex + 1) + 'start');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_FINISH , function() {
        fwcVideo.sendLog('浮层video' + (curVideoIndex + 1) + 'complete');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_CLICK , function() {
        fwcVideo.sendLog('浮层video' + (curVideoIndex + 1) + 'jump');
        return false;
    });

    /**
     * 显示对应的浮层
     * @param {number} index 索引.
     */
    function showFWC(index) {
        if(curVideoIndex == index) {
            return;
        }
        hideFWC();
        if(!fwc) {
            return;
        }

        //重绘浮层视频
        if(fwcVideo) {
            ad.base.setTimeout(function() {
                fwcVideo.refresh(null, options[index]);
            }, 10);
        }

        fwc.show();
        if(!fwcRendered) {
            cartoonLinks = baidu.g(fwcImageCartoon.getId('images')).getElementsByTagName('a');
            initFwcImageCartoon();

            var canvas = baidu.dom.first(fwc.getRoot());
            if (canvas && canvas.id) {
                material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
            }
        }
        fwcRendered = true;
        
        highlight(index);
        curVideoIndex = index;
    }

    //隐藏浮层
    function hideFWC() {
        if(fwcVideo) {
            fwcVideo.clearRoot();//销毁widget
        }
        fwc.hide();
        curVideoIndex = -1;
    }

    //初始化浮层胶带
    function initFwcImageCartoon() {
        var cartoonWrapper = baidu.dom.first(fwcImageCartoon.getRoot());
        var cartoonBg = baidu.dom.create('div', {'class': 'ec-cartoon-bg'});
        baidu.dom.insertBefore(cartoonBg, baidu.dom.first(cartoonWrapper));
        baidu.array.each(cartoonLinks, function(link, index) {
            link.style.position = 'relative';
            var cover = baidu.dom.create('label');
            baidu.dom.setAttr(cover, 'data-index', index + 1);
            baidu.dom.insertBefore(cover, baidu.dom.first(link));
        });
    }

    //高亮浮层胶带中当前选择的视频
    function highlight(index) {
        var cartoonLength = cartoonLinks.length;
        var cartoonWrapper = baidu.dom.first(fwcImageCartoon.getRoot());
        var prevShowItem = baidu.dom.q('ec-current', cartoonWrapper);
        baidu.array.each(prevShowItem, function(label) {
            baidu.dom.removeClass(label, 'ec-current');
        });

        baidu.array.each(cartoonLinks, function (link) {
            if (baidu.dom.first(link) && (baidu.dom.getAttr(baidu.dom.first(link), 'data-index') == index + 1)) {
                baidu.dom.addClass(baidu.dom.first(link), 'ec-current');
            }
        });
    }
});

















/* vim: set ts=4 sw=4 sts=4 tw=100: */
