/**
 * src/ad/widget/button_list.js
 * @author xiongjie
 * @description
 * 类按钮链接
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/button_list.html');
goog.include('ad/widget/button_list.less');

goog.provide('ad.widget.ButtonList');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.ButtonList = function(data) {
    ad.widget.Widget.call(this, data);
    this._view = 'AD_ad_widget_button_list';
};
baidu.inherits(ad.widget.ButtonList, ad.widget.Widget);

/** @private */
ad.widget.ButtonList.prototype.patchData = function() {
    var tdWidth = 100 / this._data['options'].length + "%";
    this._data['_width'] = this._data['button_width'] || tdWidth;
};