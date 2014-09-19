/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: tab.js 9607 2012-06-08 17:10:22Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/widget/tab.js ~ 2012/06/09 00:30:31
 * @author fanxueliang
 * @version $Revision: 9607 $
 * @description
 * Only a proxy
 **/
goog.require('ui.events');
goog.require('ad.widget.tab.Item');
goog.require('ad.widget.TabContainer');

goog.provide('ad.widget.Tab');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.Tab = function(data) {
    ad.widget.TabContainer.call(this, data);
};
baidu.inherits(ad.widget.Tab, ad.widget.TabContainer);

/** @override */
ad.widget.Tab.prototype.getMainHtml = function() {
    var widgets = [];
    var options = this.getData('options');
    for (var i = 0; i < options.length; i ++) {
        widgets.push(new ad.widget.tab.Item(options[i]['item'] || {}));
    }

    this.setWidgets(widgets);

    return ad.widget.Tab.superClass.getMainHtml.call(this);
}












/* vim: set ts=4 sw=4 sts=4 tw=100: */
