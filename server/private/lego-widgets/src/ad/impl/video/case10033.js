/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: case10033.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/video/case10033.js ~ 2013/09/26 18:37:29
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 150523 $
 * @description
 * image_slide相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.PlayerLookImage');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Button');
goog.require('ad.widget.BaiduShareV2');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.Flash');

goog.include('ad/impl/video/case10033.less');

goog.provide('ad.impl.video.Case10033');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['4']);
    var flash = new ad.widget.Flash(AD_CONFIG['5']);
    fwc.setWidgets([flash]);
    var img = new ad.widget.PlayerLookImage(AD_CONFIG['0']);
    material.setWidgets(
        [
            [img],
            [
                new ad.widget.SmallHead(AD_CONFIG['1']),
                new ad.widget.Button(AD_CONFIG['2'])
            ]
        ],
        [
            new ad.widget.BaiduShareV2(AD_CONFIG['3'])
        ],
        [fwc]
    );
    if (async === true) {
        return material;
    }
    material.show();
    
    img.addListener(ui.events.CLICK, function(){
        showFWC();
        img.sendLog({
            'action': '打开浮层',
            '__node': fwc.getRoot()
        });
        return false;
    });
    fwc.addListener(ui.events.CLOSE, function() {
        hideFWC();
        fwc.sendLog({
            'action': '关闭浮层',
            '__node': fwc.getRoot()
        });
    });
    var fwcRenderd = false;
    
    /**
     * 显示对应的视频浮层
     */
    function showFWC() {
        if(!fwc) {
            return;
        }
        fwc.show();
        if(flash) {
            flash.refresh(null, AD_CONFIG['5']);
        }
        if (!fwcRenderd) {
            var canvas = baidu.dom.first(fwc.getRoot());
            if (canvas && canvas.id) {
                material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
                fwcRenderd = true;
            }
        }
    }
    
    /**
     * 隐藏视频浮层
     */
    function hideFWC() {
        if(flash) {
            flash.clearRoot();
        }
        fwc.hide();
    }
    return material;
});