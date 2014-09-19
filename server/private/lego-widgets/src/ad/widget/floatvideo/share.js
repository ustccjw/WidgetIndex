/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/floatvideo/share.js ~ 2012/12/25 15:58:54
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 10927 $
 * @description
 * share相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/floatvideo/share.less');
goog.include('ad/widget/floatvideo/share.html');

goog.provide('ad.widget.floatvideo.Share');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.floatvideo.Share = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_floatvideo_share';
};
baidu.inherits(ad.widget.floatvideo.Share, ad.widget.Widget);

/** @override */
ad.widget.floatvideo.Share.prototype.enterDocument = function() {
    ad.widget.floatvideo.Share.superClass.enterDocument.call(this);

    //window['bds_config '] = this._data;
    var script = baidu.dom.create('script', {'type': "text/javascript", 'id': "bdshare_js", 'data': "type=tools&mini=1"});
    var me = this;
    document.getElementsByTagName('head')[0].appendChild(script);
    baidu.sio.callByBrowser(RT_CONFIG.HOST("bdimg.share.baidu.com") + "/static/js/shell_v2.js?cdnversion=" + Math.ceil(new Date()/3600000), function(){
         baidu.on(baidu.g('bdshare'), 'click', function(e) {
            //alert(baidu.g('bdshare'));
            var target = baidu.event.getTarget(e);
            var name, index;
            if (target && target.nodeType == 1 && target.tagName.toLowerCase() == 'a') {
                // 发送分享按钮监控
                index = baidu.getAttr(target, 'data-index');
                //name = me._data['default'][index]['name'];
                me.trigger(ui.events.CLICK, index);
            }
        });
    });
};























/* vim: set ts=4 sw=4 sts=4 tw=100: */
