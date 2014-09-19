/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/



/**
 * src/ad/plugin/video_powerlink_basic_plugin.js ~ 2013/07/04 14:28:55
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$
 * @description
 *
 **/
goog.require('ad.plugin.Plugin');
goog.require('ad.widget.Video');

goog.provide('ad.plugin.impl.VideoPowerlinkBasic');

/**
 * 图片阿拉丁的功能扩展
 * @implements {ad.plugin.Plugin}
 * @constructor
 */
ad.plugin.impl.VideoPowerlinkBasic = function() {
    ad.plugin.Plugin.call(this);
};
baidu.inherits(ad.plugin.impl.VideoPowerlinkBasic, ad.plugin.Plugin);
ad.plugin.Plugin.register(new ad.plugin.impl.VideoPowerlinkBasic());

/** @expose */
ad.plugin.impl.VideoPowerlinkBasic.prototype.attachTo = function(material) {
    material.addListener(ui.events.BEFORE_MATERIAL_SHOW, function() {
        var fwc = /** @type {ad.widget.FloatWindowContainer} */ (material.getWidget(2));
        var video = new ad.widget.Video(AD_CONFIG['3']);
        // XXX(user) 如果单独编译这个plugin，生成的代码是存在问题的
        // 因为不存在ad.widget.FloatWindowContainer这个类型，因此setWidgets方法会被重写掉。
        // 如果配合src/ad/impl/lego/video_powerlink_basic一起编译，不会存在问题
        // 因为ad.widget.FloatWindowContainer已经被包含进来了.
        fwc.setWidgets([video]);
    });

    material.addListener(ui.events.AFTER_MATERIAL_SHOW, function() {
        var backgroundData = AD_CONFIG['4'];
        baidu.dom.setStyles(
            material.getRoot(),
            {
                'font': '12px/1.5 arial,sans-serif',
                'background': 'url(' + backgroundData['url'] + ') no-repeat center top ' + backgroundData['color'],
                'position': 'relative'
            }
        );
        if (backgroundData['rcv_url']) {
            baidu.dom.insertHTML(
                material.getRoot(),
                'afterBegin',
                '<a href="' + backgroundData['rcv_url'] + '" title2="背景跳转" target="_blank"'
                    + ' style="position:absolute;top:0;display:block;background:#fff;width:984px;height:375px;left:50%;margin-left:-492px;opacity:0;filter:alpha(opacity=0);"></a>'
            );
        }
        var insides = baidu.q('ad-material-inside', material.getRoot());
        baidu.dom.removeStyle(insides[0], 'width');
        baidu.dom.setStyles(insides[0], {
            'padding-top': '75px',
            'margin': '0 auto',
            'width': '480px'
        });
        var wrappers = baidu.q('ad-material-wrapper', material.getRoot());
        baidu.dom.setStyle(wrappers[0], 'display', 'block');
        var inst1Ctner = baidu.q('ad-inst-1', material.getRoot());
        var inst5Ctner = baidu.q('ad-inst-5', material.getRoot());
        baidu.each([inst1Ctner[0], inst5Ctner[0]], function(ele) {
            baidu.dom.setStyles(ele, {
                'height': '25px',
                'overflow': 'hidden',
                'opacity': '0.9',
                'filter': 'alpha(opacity=90)',
                'background': '#ffffff'
            });
        });

        var fwc = material.getWidget(2);
        var video = fwc.getWidget(0, 0);
        fwc.hide();
        video.clearRoot();
        var thumbnail = material.getWidget(0);
        thumbnail.addListener(
            ui.events.CLICK,
            function() {
                // 发送日志监控(rcv2, cm, ...)
                thumbnail.sendLog({
                    'action': '打开浮层',
                    '__node': thumbnail.getRoot()
                });
                fwc.show();
                ad.base.setTimeout(function() {
                    video.refresh();
                }, 0);
            }
        );
        fwc.addListener(ui.events.CLOSE, function() {
            // 发送日志监控(rcv2, cm, ...)
            fwc.sendLog({
                'action': '关闭浮层',
                '__node': fwc.getRoot()
            });
            video.clearRoot();
        });
        video.addListener(ui.events.VIDEO_FINISH, function() {
            fwc.close();
        });
        // 为在物料外的元素绑定监控事件
        ad.base.setTimeout(function() {
            var canvas = baidu.dom.first(fwc.getRoot());
            if (canvas && canvas.id) {
                material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
            }
        }, 0);
    });
};





















/* vim: set ts=4 sw=4 sts=4 tw=100: */
