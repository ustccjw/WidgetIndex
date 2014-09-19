/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/couple_left.js ~ 2014/02/18 12:35:01
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 11222 $
 * @description
 * couple_left相关的实现逻辑
 **/

goog.require('ad.env');
goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.Flash');
goog.require('ad.widget.Image');
goog.require('ad.widget.ShowUrl');

goog.include('ad/impl/couple_left.less');

goog.provide('ad.impl.CoupleLeft');

ad.Debug(function(async) {
    var config = _convertConfig(AD_CONFIG['flash']);
    AD_CONFIG['flash']['flashvars_param'] = config['param'];
    AD_CONFIG['flash']['ipad_link_rcv_url'] = AD_CONFIG['flash']['buttonUrl'];

    var material = new ad.material.BaseMaterial();
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var bg = new ad.widget.Image(config['image']);
    var flash = new ad.widget.Flash(AD_CONFIG['flash']);
    var buttonGroup = new ad.widget.ButtonGroup(AD_CONFIG['button_group']);
    var showUrl = new ad.widget.ShowUrl(AD_CONFIG['show_url']);

    material.setWidgets(
        [smallHead], [bg, flash], [buttonGroup], [showUrl]
    );

    flash.addListener('FLASH_HOVER_DOT', function(dotId) {
        flash.sendLog('锚点' + dotId);
    });
    flash.addListener('FLASH_MBTN_CLICK', function() {
        flash.sendLog('活动按钮');
    });

    var bdsReady = ad.base.getObjectByName('bds.ready');
    if (typeof bdsReady === 'function') {
        bdsReady(function() {
            if (typeof require === 'function') {
                require.config({
                    'baseUrl': RT_CONFIG.HOST('s1.bdstatic.com') + '/r/www/cache/biz',
                    'packages': [{
                        'name': 'ecma',
                        'location': RT_CONFIG.HOST('ecma.bdimg.com') + '/public01'
                    }]
                });
                require(['ecma/ui/event_center'], function(m) {
                    flash.addListener('FLASH_HOVER_DOT', function(dotId) {
                        m['publish']('FLASH_HOVER_DOT', dotId);
                    });
                    flash.addListener('FLASH_LEAVE_DOT', function(dotId) {
                        m['publish']('FLASH_LEAVE_DOT', dotId);
                    });
                });
            }
        });
    }

    if (async === true) {
        return material;
    }
    material.show();

    baidu.each(buttonGroup.getRoot().getElementsByTagName('a'), function(item, index) {
        buttonGroup.rewriteTitle2(item, '底部文字链' + (index + 1), true);
    });

    function _convertConfig(conf) {
        var arr = [];
        var dotsParam = '';
        var buttonParam = '';
        var buttonUrl = encodeURIComponent(conf['buttonUrl']);
        var image = conf['ipad_img'];
        var button = conf['button'];
        var dots = conf['dots'];
        var colorTheme = conf['theme'];

        for (var p in button) {
            arr.push(button[p]);
        }
        buttonParam = arr.join(',');

        arr = [];
        for (var d in dots) {
            arr.push(dots[d]['x']);
            arr.push(dots[d]['y']);
        }
        dotsParam = arr.join(',');

        return {
            'image': {
                'image_url': image,
                'image_rcv_url': ad.env.isIpad ? buttonUrl : null
            },
            'param': '&theme=' + colorTheme + '&btn=' + buttonParam + '&btnurl=' + buttonUrl + '&dots=' + dotsParam
        };
    }
});



/* vim: set ts=4 sw=4 sts=4 tw=100: */
