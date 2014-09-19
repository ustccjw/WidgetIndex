/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/tieba/meizhiyuan/right.js ~ 2013/08/19 11:07:50
 * @author liyubei@baidu.com (liyubei)
 * @version $Revision: 11222 $
 * @description
 * right相关的实现逻辑
 **/

goog.require('ad.env');
goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.Flash');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.Image');

goog.include('ad/impl/tieba/meizhiyuan/right.less');

goog.provide('ad.impl.tieba.meizhiyuan.Right');

ad.Debug(function() {
    var material = new ad.Material(AD_CONFIG['id']);

    var flash = new ad.widget.Flash(AD_CONFIG['flash']);
    var image = new ad.widget.Image(AD_CONFIG['image']);

    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    fwc.setWidgets([flash]);

    material.setWidgets(
        [image],
        [fwc]
    );
    material.show();

    image.addListener(ui.events.CLICK, function() {
        fwc.show();
    });

    if (!ad.env.isServer) {
        // jsdom渲染的时候，不要生成fwc相关的内容
        // 只有在浏览器环境下面，js加载完毕并且执行之后开始生成fwc的内容.
        ad.base.setTimeout(function(){
            fwc.show();
            // 播放完毕之后，也就是12s之后自动关闭
            var timerId = ad.base.setTimeout(function(){
                fwc.close();
            }, 12 * 1000);
            fwc.addListener(ui.events.CLOSE, function(){
                if (timerId) {
                    ad.base.clearTimeout(timerId);
                    timerId = 0;
                }
            });
        }, 0);
    }

    return material;
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
