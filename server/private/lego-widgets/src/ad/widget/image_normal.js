/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: image_multi_region.js 2012-07-16 10:25:19Z wangdawei $
 *
 **************************************************************************/



/**
 * src/ad/widget/image_multi_region.js ~ 2012/07/17 22:07:55
 * @author wangdawei
 * @version $Revision: $
 * @description
 * 多区域点击图片
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/image_normal.html');
goog.include('ad/widget/image_normal.less');

goog.provide('ad.widget.ImageNormal');
/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.ImageNormal = function(data) {
    ad.widget.Widget.call(this, data);

    this._view = 'AD_ad_widget_image_normal';
};
baidu.inherits(ad.widget.ImageNormal, ad.widget.Widget);

ad.widget.ImageNormal.prototype.bindEvent = function(){
    var me = this;
    var as = baidu.g(this.getId('imgnormal')).getElementsByTagName('a');
    if(as && as.length){
        baidu.array.each(as,function(item, i){
            baidu.on(item,"mouseover",function(e){
                // fix ie6 hover bug
                baidu.dom.addClass(/** @type {Node} */(item), 'ec-hover');
                me.trigger(ui.events.MOUSE_OVER,i);
            });
            baidu.on(item,"mouseout",function(e){
                // fix ie6 hover bug
                baidu.dom.removeClass(/** @type {Node} */(item), 'ec-hover');
                me.trigger(ui.events.MOUSE_OUT,i);
            });
            baidu.on(item,"click",function(e){
                if(me.trigger(ui.events.CLICK,i,e) === false){
                    baidu.event.stop(e);
                }
            });
        })
    }
}














/* vim: set ts=4 sw=4 sts=4 tw=100: */
