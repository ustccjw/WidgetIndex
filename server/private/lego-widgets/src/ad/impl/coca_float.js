/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: coca_float.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/coca_float.js ~ 2013/09/23 18:20:01
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * xuandong相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.FullWindowContainer');
goog.require('ad.widget.Flash');

goog.include('ad/impl/coca_float.less');

goog.provide('ad.impl.CocaFloat');

/**
 * @override
 * 重新FullWindowContainer获取控件所处的元素根节点方法.
 * @return {Element} FullWindowContainer元素的根节点.
 * @expose
 */
ad.widget.FullWindowContainer.prototype.getRoot = function() {
    return baidu.g(this.getId());
};

ad.Debug(function(async) {
    var material = new ad.Material(AD_CONFIG['id']);

    var fwc = new ad.widget.FullWindowContainer(AD_CONFIG['fwc']);
    var flash = new ad.widget.Flash(AD_CONFIG['flash']);

    fwc.setWidgets([flash]);
    material.setWidgets(
        [fwc]
    );
    if (async === true) {
        return material;
    }

    // 浏览器无flash插件
    if (!baidu.swf.version) {
        return false;
    }
    material.show();
    material.initMonitor(AD_CONFIG['main_url']);
    showFwc();
    baidu.dom.setStyles(fwc.getId('bg'), {"height":"400px"});
    fwc.addListener(ui.events.CLOSE, function(){
        hideFwc();
    });
    flash.addListener('FLASH_close', function() {
        hideFwc();
        flash.sendLog('FLASH_close', 'FLASH_close');
    });
    flash.addListener('FLASH_stop', function() {
        hideFwc();
        flash.sendLog('FLASH_stop', 'FLASH_stop');
    });
    flash.addListener('FLASH_start', function() {
        flash.sendLog('FLASH_start', 'FLASH_start');
    });
    flash.addListener('FLASH_track', function(no) {
        flash.sendLog(no, no);
    });

    function showFwc() {
        baidu.show(material.getRoot());
        fwc.show();
        flash.refresh();
        baidu.dom.setStyles(flash.getId('flash'), {
            'width': '1000px',
            'height': '400px'
        });
    }

    function hideFwc() {
        baidu.hide(material.getRoot());
        fwc.hide();
        flash.clearRoot();
    }

});



/* vim: set ts=4 sw=4 sts=4 tw=100: */
