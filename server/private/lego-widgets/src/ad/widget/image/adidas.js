/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/image/adidas.js ~ 2013/11/10 01:27:43
 * @author wdw0705@gmail.com (wangdawei04)
 * @version $Revision: 10927 $
 * @description
 * adidas相关的实现逻辑
 **/

goog.require('ad.base');
goog.require('ad.dom');
goog.require('ad.widget.Widget');

goog.include('ad/widget/image/adidas.less');
goog.include('ad/widget/image/adidas.html');

goog.provide('ad.widget.image.Adidas');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.image.Adidas = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_image_adidas';
};
baidu.inherits(ad.widget.image.Adidas, ad.widget.Widget);

/** @override */
ad.widget.image.Adidas.prototype.enterDocument = function() {
    ad.widget.image.Adidas.superClass.enterDocument.call(this);

    this._main = baidu.g(this.getId('main'));
    this._left = baidu.g(this.getId('left'));
    this._link = baidu.g(this.getId('link'));
    this._rightContainerDom = baidu.g('rightContainer');
};

/** @override */
ad.widget.image.Adidas.prototype.bindEvent = function() {
    ad.widget.image.Adidas.superClass.bindEvent.call(this);

    var me = this;
    if(me._link && me._left){
        ad.dom.on(me._main, 'mouseover', function(){
            me._showLeft();
        });
        ad.dom.on(me._main, 'mouseout', function(){
            me._hideLeft();
        });
        
    }
};

/** @override */
ad.widget.image.Adidas.prototype.patchData = function() {
    if (this._data) {
        var re = /^.+.(png|jpg|jpeg|bmp|gif)$/i;
        this._data['is_img'] = re.test(this._data['swf_src']);
    }
}

/** 显示左边 */
ad.widget.image.Adidas.prototype._showLeft = function() {
    var me = this;
    if(me._rightContainerDom){
        me._rightContainerDom.style.zIndex = 20;
    }
    if(me._timeoutId_delay_hide){
        ad.base.clearTimeout(me._timeoutId_delay_hide);
    }
    me._timeoutId_delay_show = ad.base.setTimeout(function(){
        var start = parseInt(ad.dom.getStyle(me._left, 'left'), 10);
        var isTransitionSupported = 'transition' in document.createElement('div').style;
        isTransitionSupported ? baidu.dom.setStyle(me._left, 'left', '-' + me.getData('width') + 'px') : me._animation(start, -200);
    }, 200);
}

/** 隐藏左边 */
ad.widget.image.Adidas.prototype._hideLeft = function() {
    var me = this;
    if(me._rightContainerDom){
        me._rightContainerDom.style.zIndex = 0;
    }
    if(me._timeoutId_delay_show){
        ad.base.clearTimeout(me._timeoutId_delay_show);
    }
    me._timeoutId_delay_hide = ad.base.setTimeout(function(){
        var start = parseInt(ad.dom.getStyle(me._left, 'left'), 10);
        var isTransitionSupported = 'transition' in document.createElement('div').style;
        isTransitionSupported ? baidu.dom.setStyle(me._left, 'left', '0') : me._animation(start, 0);
    }, 50);
}

/** 
 * 动画 
 *
 * @param {number} start 起始数值
 * @param {number} end 结束数值
 */
ad.widget.image.Adidas.prototype._animation = function(start, end) {
    var me = this;
    var count = 0;
    var left;
    if(me._intervalId){
        ad.base.clearInterval(me._intervalId);
    }
    me._intervalId = ad.base.setInterval(function(){
        left = start + count * (end - start) * 10 / 500;
        baidu.dom.setStyle(me._left, 'left', left + 'px');
        if(left == end || Math.abs(left) > 200){
            ad.base.clearInterval(me._intervalId);
        }
        count ++;
    }, 10);
}
















/* vim: set ts=4 sw=4 sts=4 tw=100: */
