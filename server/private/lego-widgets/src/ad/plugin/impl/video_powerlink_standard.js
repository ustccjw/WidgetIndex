/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * src/ad/plugin/video_powerlink_standard_plugin.js ~ 2013/07/04 14:18:17
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 *  
 **/
goog.require('ad.plugin.Plugin');
goog.require('ad.widget.Video');

goog.provide('ad.plugin.impl.VideoPowerlinkStandard');

/**
 * 图片阿拉丁的功能扩展
 * @implements {ad.plugin.Plugin}
 * @constructor
 */
ad.plugin.impl.VideoPowerlinkStandard = function() {
    ad.plugin.Plugin.call(this);
}
baidu.inherits(ad.plugin.impl.VideoPowerlinkStandard, ad.plugin.Plugin);
ad.plugin.Plugin.register(new ad.plugin.impl.VideoPowerlinkStandard());

/** @expose */
ad.plugin.impl.VideoPowerlinkStandard.prototype.attachTo = function(material) {
    material.addListener(ui.events.BEFORE_MATERIAL_SHOW, function() {
        var fwc = /** @type {ad.widget.FloatWindowContainer} */ (material.getWidget(2));
        var video = new ad.widget.Video(AD_CONFIG['5']);
        fwc.setWidgets([video]);
    });

    material.addListener(ui.events.AFTER_MATERIAL_SHOW, function(){
        baidu.dom.setStyles(
            material.getRoot(),
            {
                'font': '12px/1.5 arial,sans-serif',
                'margin': '0 auto',
                'width': '925px',
                'padding-bottom': '6px',
                'border-bottom': '1px solid #e1e1e1'
            }
        );

        var fwc = material.getWidget(2);
        var video = fwc.getWidget(0, 0);
        fwc.hide();
        video.clearRoot();
        var thumbnail = material.getWidget(0, 0);
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
}





















/* vim: set ts=4 sw=4 sts=4 tw=100: */
