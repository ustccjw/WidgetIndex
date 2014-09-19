/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/ka_di_ya.js ~ 2013/07/31 16:24:47
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * ka_di_ya相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Table');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.Flash');

goog.include('ad/impl/ka_di_ya.less');

goog.provide('ad.impl.KaDiYa');

ad.Debug(function(async){
    AD_CONFIG['fwc']['material_name'] = 'ec-ka-di-ya';
    var material = new ad.material.BaseMaterial();
    material.setRender(new ad.render.RecursiveRender());

    var leftVideo = new ad.widget.Video(AD_CONFIG['left_video']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var linkTable = new ad.widget.Table(AD_CONFIG['link_table']);
    var imageCartoon = new ad.widget.ImageCartoon(AD_CONFIG['image_cartoon']);
    var smallWeibo = new ad.widget.SmallWeibo(AD_CONFIG['small_weibo']);
    var buttonGroup = new ad.widget.ButtonGroup(AD_CONFIG['button_group']);
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    var fwcVideo = new ad.widget.Video(AD_CONFIG['fwc_videos']['options'][0]);
    var fwcImageCartoon = new ad.widget.ImageCartoon(AD_CONFIG['fwc_image_cartoon']);
    var fwcFlashBg = new ad.widget.Flash(AD_CONFIG['fwc_flash_bg']);
    var curVideoIndex;
    var fwcRendered = false;

    fwc.setWidgets([fwcFlashBg, fwcVideo, fwcImageCartoon]);

    material.setWidgets(
        [
            leftVideo,
            [
                [smallHead],
                [linkTable]
            ]
        ],
        [imageCartoon],
        [smallWeibo],
        [buttonGroup],
        [fwc]
    );
    if (async === true) {
        return material;
    }

    material.show();

    imageCartoon.addListener(ui.events.CLICK, function(index, e) {
        showFWC(index);
        imageCartoon.sendLog('胶片图' + (index + 1) + 'click');
        imageCartoon.sendLog('浮层1open');
        return false;
    });

    var cartoonLinks;
    fwcImageCartoon.addListener(ui.events.CLICK, function(index, e) {
        showFWC(index);
        fwcImageCartoon.sendLog('浮层1胶片图' + (index + 1) + 'click');
        fwcImageCartoon.sendLog('浮层1video' + (index + 1) + 'auto');
        return false;
    });
    fwcImageCartoon.addListener(ui.events.ARROW_LEFT, function() {
        fwcImageCartoon.sendLog('浮层1胶片图arrowleft');
        return false;
    });
    fwcImageCartoon.addListener(ui.events.ARROW_RIGHT, function() {
        fwcImageCartoon.sendLog('浮层1胶片图arrowright');
        return false;
    });
    fwcImageCartoon.addListener(ui.events.NEW_ELEMENT, function (node) {
        if (!cartoonLinks) return;

        var link = baidu.dom.first(node);
        cartoonLinks[cartoonLinks.length] = link;

        link.style.position = 'relative';

        var cover = baidu.dom.create('label');
        baidu.dom.setAttr(cover, 'data-index', baidu.dom.getAttr(node, 'data-index'));
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
    leftVideo.addListener(ui.events.VIDEO_CLICK , function() {
        leftVideo.sendLog('leftvideojump');
        return false;
    });

    fwc.addListener(ui.events.CLOSE, function() {
        imageCartoon.sendLog('浮层1close');
        hideFWC();
    });

    //设置浮层中video的log
    fwcVideo.addListener(ui.events.VIDEO_START , function() {
        fwcVideo.sendLog('浮层1video' + (curVideoIndex + 1) + 'start');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_FINISH , function() {
        fwcVideo.sendLog('浮层1video' + (curVideoIndex + 1) + 'complete');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_CLICK , function() {
        fwcVideo.sendLog('浮层1video' + (curVideoIndex + 1) + 'jump');
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
                fwcVideo.refresh(null, AD_CONFIG['fwc_videos']['options'][index]);
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

        var cartoonLength = AD_CONFIG['image_cartoon']['options'].length;
        baidu.array.each(cartoonLinks, function(link, index) {
            link.style.position = 'relative';

            var cover = baidu.dom.create('label');
            if (index >= cartoonLength) {
                baidu.dom.setAttr(cover, 'data-index', index + 1 - cartoonLength);
            } else {
                baidu.dom.setAttr(cover, 'data-index', index + 1);
            }

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