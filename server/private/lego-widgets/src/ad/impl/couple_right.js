/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/couple_right.js ~ 2014/02/19 15:15:55
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 11222 $
 * @description
 * couple_right相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Title');
goog.require('ad.widget.CoupleRight');
goog.require('ad.widget.BaiduShareV2');

goog.include('ad/impl/couple_right.less');

goog.provide('ad.impl.CoupleRight');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    var title = new ad.widget.Title(AD_CONFIG['title']);
    var slide = new ad.widget.CoupleRight(AD_CONFIG['couple_slide']);
    var widgets = [
        [title],
        [slide]
    ]
    var shareButton = AD_CONFIG['baidu_share']['cfg'];
    if ('true' in shareButton) {
        var config = shareButton['true'];
        config['display'] = true;
        config['bds_more_first'] = true;
        widgets.push(new ad.widget.BaiduShareV2(config));
    }

    material.setWidgets(
        widgets
    );

    // 保证线上 在ready后才执行
    var bdsReady = ad.base.getObjectByName('bds.ready');
    if (typeof bdsReady === 'function') {
        bdsReady(function() {
            if (typeof require === 'function') {
                require.config({
                    "baseUrl": RT_CONFIG.HOST("s1.bdstatic.com") + "/r/www/cache/biz",
                    "packages": [{
                        "name": "ecma",
                        "location": RT_CONFIG.HOST("ecma.bdimg.com") + "/public01"
                    }]
                });
                require(['ecma/ui/event_center'], function(m) {
                    m['subscribe']('FLASH_HOVER_DOT', function(ev, dotId) {
                        if (dotId) {
                            slide.gotoAndShow(dotId);
                        }
                    });
                    m['subscribe']('FLASH_LEAVE_DOT', function(ev, dotId) {
                        slide.hideLine();
                    });
                });
            }
        });

    }

    if (async === true) {
        return material;
    }
    material.show();
    title.rewriteTitle2(title.getRoot(), '图片标题', true);

});



/* vim: set ts=4 sw=4 sts=4 tw=100: */
