/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/html.js ~ 2014/03/05 12:35:05
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * html相关的实现逻辑
 **/

goog.require('ad.widget.imageplus.BaseWidget');

goog.include('ad/widget/imageplus/html.less');
goog.include('ad/widget/imageplus/html.html');

goog.provide('ad.widget.imageplus.Html');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.BaseWidget}
 */
ad.widget.imageplus.Html = function (data) {
    ad.widget.imageplus.BaseWidget.call(this, data);

    /**
     * 当前widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_html';
};
baidu.inherits(ad.widget.imageplus.Html, ad.widget.imageplus.BaseWidget);

/** @override */
ad.widget.imageplus.Html.prototype.patchData = function () {
    ad.widget.imageplus.Html.superClass.patchData.call(this);
};

/** @override */
ad.widget.imageplus.Html.prototype.enterDocument = function () {
    var me = this;
    ad.widget.imageplus.Html.superClass.enterDocument.call(me);

    var iframe = baidu.g(me.getId('iframe'));
    if (!iframe) {
        return;
    }

    var doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    var htmlCode = me.getData('desc') || '';
    if (baidu.ie && baidu.ie < 10) {
        var extraScript = [
            '<script>',
                'var timer = setInterval(',
                    'function() {',
                        // 检测所有script是否已经加载运行完毕
                        'var arr = document.getElementsByTagName(\'script\');',
                        'var allLoaded = true;',
                        'for(var i = 0; i < arr.length; i++) {',
                            'if (!/loaded|complete/.test(arr[i].readyState)) {',
                                'allLoaded = false;',
                            '}',
                        '}',
                        'if (allLoaded) {',
                            'clearInterval(timer);',
                            'document.close();',
                        '}',
                    '},',
                    '200',
                ');',
            '</script>'
        ].join('');
        doc.write(htmlCode + extraScript);
    }
    else {
        doc.write(htmlCode);
        doc.close();
    }
};





















/* vim: set ts=4 sw=4 sts=4 tw=100  */
