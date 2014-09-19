/**
 * src/ad/widget/colorlist.js
 * @author xiongjie01
 * @description
 * 带颜色标记的列表
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/colorlist.html');
goog.include('ad/widget/colorlist.less');

goog.provide('ad.widget.Colorlist');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.Colorlist = function(data) {
    ad.widget.Widget.call(this, data);
    this._view = 'AD_ad_widget_colorlist';
};
baidu.inherits(ad.widget.Colorlist, ad.widget.Widget);

/**
 * 配置数据处理，主要是给链接添加颜色信息
 * @override
 */
ad.widget.Colorlist.prototype.patchData = function() {
    var linkList = this._data['options'] || [];
    var len = linkList.length;
    var linkItem = null;
    // 颜色名字，跟less里的selector对应
    var colorNames = this._data['color_names'] || ['green', 'yellow', 'red', 'purple'];
    // 颜色值，优先级比颜色名称高
    var colors = this._data['colors'];
    for (var i = 0; i < len; i++) {
        linkItem = linkList[i];
        linkItem['_color_name'] = colorNames[i % colorNames.length];
        if (colors) {
            linkItem['_color_value'] = colors[i % colors.length];
        }
    }
};



/* vim: set ts=4 sw=4 sts=4 tw=100: */
