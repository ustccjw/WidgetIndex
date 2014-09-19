/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: intermediate_page.js 12091 2012-09-20 14:06:14Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/xlab/intermediate_page.js ~ 2012/09/20 16:31:26
 * @author leeight@gmail.com (leeight)
 * @version $Revision: 12091 $
 * @description
 * intermediate_page相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.widget.Flash');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.Material');
goog.require('ad.widget.xlab.IntermediatePage');

goog.include('ad/impl/xlab/intermediate_page/intermediate_page.less');

goog.provide('ad.impl.xlab.IntermediatePage');

ad.Debug(function() {
    var material = new ad.Material(AD_CONFIG['id']);
    material.setRender(new ad.render.RecursiveRender({'block_class': 'ad-block'}));
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['float_window_container']);
    fwc.setWidgets([new ad.widget.xlab.IntermediatePage(AD_CONFIG['intermediate_page'])]);
    material.setWidgets(
        [new ad.widget.Flash(AD_CONFIG['flash'])],
        [fwc]
    );
    material.show();
    material.initMonitor(AD_CONFIG['main_url']);

    var flash = material.getWidget(0, 0);
    flash.addListener(ui.events.CLICK, function(link) {
        material.sendLog('float-window-open', '<NIL>');
        fwc.show();
        return false;
    });
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
