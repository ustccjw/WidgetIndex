/**
 * src/ad/widget/game_header.less ~ 2013-07-29 10:45:05;
 * @author xiongjie01
 * @description game cpc htmltext
 *  
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/html_text.html');
goog.include('ad/widget/html_text.less');

goog.provide('ad.widget.HtmlText');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.HtmlText = function(data) {
    ad.widget.Widget.call(this, data);

    this._view = 'AD_ad_widget_html_text';
};
baidu.inherits(ad.widget.HtmlText, ad.widget.Widget);














/* vim: set ts=4 sw=4 sts=4 tw=100: */
