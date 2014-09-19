/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/image/sticker2.js ~ 2013/07/02 12:27:46
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 10927 $
 * @description
 * sticker2相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/image/sticker2.less');
goog.include('ad/widget/image/sticker2.html');

goog.provide('ad.widget.image.Sticker2');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.image.Sticker2 = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_image_sticker2';

    /**
     * 图片宽度
     * @type {number}
     * @private
     */
    this.width;

    /**
     * 图片高度
     * @type {number}
     * @private
     */
    this.height;

    /**
     * 贴片广告按钮
     * @type {HTMLElement}
     * @private
     */
    this.stickerBtn;

    /**
     * 开始展示标注信息的时刻
     * @type {Date}
     * @private
     */
    this._startDJ;

    /**
     * 鼠标是否进入了贴片区域
     * @type {boolean}
     * @private
     */
    this._isEnterSticker = false;
};
baidu.inherits(ad.widget.image.Sticker2, ad.widget.Widget);

/** @override */
ad.widget.image.Sticker2.prototype.enterDocument = function() {
    ad.widget.image.Sticker2.superClass.enterDocument.call(this);

    this.stickerBtn = baidu.q('ad-widget-image-sticker2-show', this.getRoot(), 'a')[0];
};

/** @override */
ad.widget.image.Sticker2.prototype.bindEvent = function() {
    ad.widget.image.Sticker2.superClass.bindEvent.call(this);

    var me = this;
    var close = baidu.q('close', me.getRoot(), 'a')[0];
    if(close){
        baidu.on(close, 'click', function(){
            me._sendLog(me._getRcvByIndex(0, 'ads'), 5);
            baidu.dom.first(me.getRoot()).style.height = '0px';
            baidu.cookie.set('ecom-ma-sticker-enable', false);
        });
    }
    baidu.on(this.getRoot(), 'mouseenter', function(){
        me._isEnterSticker = true;
        if(baidu.cookie.get('ecom-ma-sticker-enable') !== 'false'){
            baidu.dom.first(me.getRoot()).style.height = '75px';
        }
    });
    baidu.on(this.getRoot(), 'mouseleave', function(){
        me._isEnterSticker = false;
        if(baidu.cookie.get('ecom-ma-sticker-enable') !== 'false'){
            baidu.dom.first(me.getRoot()).style.height = '0px';
            me.hideSticker();
        }
    });
    /*
    baidu.on(baidu.dom.first(this.getRoot()), 'webkitTransitionEnd', function(){
        if(parseInt(baidu.dom.first(me.getRoot()).style.height, 10) == 0){
            //alert(123);
        }
    });
    */
    baidu.on(me.stickerBtn, 'click', function(){
        me.stickerBtn.style.display = 'none';
        baidu.dom.first(me.getRoot()).style.height = '75px';
        baidu.cookie.set('ecom-ma-sticker-enable', true);
    });

    //阻止冒泡
    var img = baidu.g(me.getId('img'));
    if(img){
        img.onmouseup=function(e) {
            //baidu.event.stopPropagation(e);
            baidu.event.stop(e || window.event);
        };
    }
};

/** @override */
ad.widget.image.Sticker2.prototype.patchData = function() {
    if (this._data) {
        this.width = this._data['width_change'];
        this.height = this._data['height_change'];
        if(this._data['ads'] && this._data['ads'].length){
            this._data['ads'].splice(1, this._data['ads'].length - 1);
        }
    }
}

/**
 * 发送监测
 * @param {string} rcvurl
 * @param {number} actionid
 * @param {number} showtime
 */
ad.widget.image.Sticker2.prototype._sendLog = function(rcvurl, actionid, showtime) {
    if(rcvurl === ''){
        return;
    }
    var url = rcvurl + '&actionid=' + actionid;
    if(actionid == 3){
        url += '&attach=' + showtime;
    }
    else{
        url += '&attach=0';
    }
    baidu.sio.log(url);
}

/**
 * 获取广告展现时间 单位：秒
 * @return {number} 
 */
ad.widget.image.Sticker2.prototype._getShowtime = function() {
    var end = new Date();
    return (end - this._startDJ)/1000;
}

/**
 * 获取rcv链接
 * @param {number} index 
 * @param {string} type 
 */
ad.widget.image.Sticker2.prototype._getRcvByIndex = function(index, type) {
    if(this._data[type] && this._data[type][index]){
        return this._data[type][index]['encry_url']
    }
    else {
        return '';
    }
}


/**
 * 显示贴片
 */
ad.widget.image.Sticker2.prototype.showSticker = function() {
    this._sendLog(this._getRcvByIndex(0, 'ads'), 1);
    this._startDJ = new Date();
}

/**
 * 隐藏贴片
 */
ad.widget.image.Sticker2.prototype.hideSticker = function() {
    this._sendLog(this._getRcvByIndex(0, 'ads'), 3, this._getShowtime());
}

/**
 * 发送标注展现log
 */
ad.widget.image.Sticker2.prototype.sendShowBZLog = function() {
    this._sendLog(this._getRcvByIndex(0, 'ads'), 4);
}










/* vim: set ts=4 sw=4 sts=4 tw=100: */
