/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/image/tour.js ~ 2013/01/16 11:09:49
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 10927 $
 * @description
 * tour相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/image/tour.less');
goog.include('ad/widget/image/tour.html');

goog.provide('ad.widget.image.Tour');

baidu.event._eventFilter.mouseenter;
baidu.event._eventFilter.mouseleave;

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.image.Tour = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_image_tour';

    this._lastTabHeader;

    this._lastTabBody;

};
baidu.inherits(ad.widget.image.Tour, ad.widget.Widget);

/** @override */
ad.widget.image.Tour.prototype.enterDocument = function() {
    ad.widget.image.Tour.superClass.enterDocument.call(this);

    this._lastTabHeader = baidu.dom.children(baidu.g(this.getId('tab-header')))[0];
    this._lastTabBody = baidu.g(this.getId('tour'));
};

/** @override */
ad.widget.image.Tour.prototype.bindEvent = function() {
    ad.widget.image.Tour.superClass.bindEvent.call(this);

    var me = this;
    var tabHeads = baidu.dom.children(baidu.g(me.getId('tab-header')));
    if(tabHeads && tabHeads.length){
        baidu.array.each(tabHeads, function(item, i){
            baidu.on(item, 'mouseenter', function(){
                if(me._lastTabHeader == item){
                    return;
                }
                var curTabBody = baidu.g(baidu.getAttr(item,'data-rid'));
                baidu.dom.addClass(item, 'ec-hover');
                curTabBody.style.display = 'block';
                baidu.dom.removeClass(me._lastTabHeader, 'ec-hover');
                me._lastTabBody.style.display = 'none';

                me._lastTabHeader = item;
                me._lastTabBody = curTabBody;
            });
        });
    }
};

/** @override */
ad.widget.image.Tour.prototype.patchData = function() {
    if (this._data) {
        if(this._data['tour']['options'] && this._data['tour']['options'].length){
            for(var i = 0; i < this._data['tour']['options'].length; i ++){
                this._data['tour']['options'][i]['_tourIndex'] = i+1;
            }
        }
        if(this._data['hotel']['options'] && this._data['hotel']['options'].length){
            for(var i = 0; i < this._data['hotel']['options'].length; i ++){
                this._data['hotel']['options'][i]['_hotelIndex'] = i+1;
            }
        }
        if(this._data['hotel']['brand']['options'] && this._data['hotel']['brand']['options'].length){
            for(var i = 0; i < this._data['hotel']['brand']['options'].length; i ++){
                this._data['hotel']['brand']['options'][i]['_brandIndex'] = i+1;
            }
        }
        if(this._data['hotel']['level']['options'] && this._data['hotel']['level']['options'].length){
            for(var i = 0; i < this._data['hotel']['level']['options'].length; i ++){
                this._data['hotel']['level']['options'][i]['_levelIndex'] = i+1;
            }
        }
        if(this._data['ticket']['options'] && this._data['ticket']['options'].length){
            for(var i = 0; i < this._data['ticket']['options'].length; i ++){
                this._data['ticket']['options'][i]['_ticketIndex'] = i+1;
            }
        }
    }
}























/* vim: set ts=4 sw=4 sts=4 tw=100: */
