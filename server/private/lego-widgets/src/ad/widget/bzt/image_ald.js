/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/bzt/image_ald.js ~ 2013/02/19 16:29:14
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 10927 $
 * @description
 * image_ald相关的实现逻辑 适用于非品牌广告主，广告结果之后紧跟自然结果
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/bzt/image_ald.less');
goog.include('ad/widget/bzt/image_ald.html');

goog.provide('ad.widget.bzt.ImageAld');

baidu.event._eventFilter.mouseenter;
baidu.event._eventFilter.mouseleave;

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.bzt.ImageAld = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_bzt_image_ald';

    this._smallBlock = [];

    this._middleBlock = [];

    this._middleDiv = [];

    this._middleImg = [];

    this._middleLine = [];

    /**
     * @type {number}
     * @private
     */
    this._timeoutID;

};
baidu.inherits(ad.widget.bzt.ImageAld, ad.widget.Widget);

/** @override */
ad.widget.bzt.ImageAld.prototype.enterDocument = function() {
    ad.widget.bzt.ImageAld.superClass.enterDocument.call(this);

    // CODE HERE
    var me = this;
    me._smallBlock = baidu.q('ec-block',me.getRoot());
    me._middleBlock = baidu.q('ec-middle',me.getRoot());
    me._middleDiv = baidu.q('ec-middle-block',me.getRoot());
    me._middleImg = baidu.q('ec-middle-img',me.getRoot());
    me._middleLine = baidu.q('ec-middle-line',me.getRoot());

    //把hover中图dom挂到body上
    //return;
    var middle = baidu.g(me.getId('ald-middle'));
    document.body.appendChild(middle);
    me.trigger(ui.events.NEW_AD_CANVAS, middle);
};

/** @override */
ad.widget.bzt.ImageAld.prototype.bindEvent = function() {
    ad.widget.bzt.ImageAld.superClass.bindEvent.call(this);

    // CODE HERE
    var me = this;
    //return;
    if(this._smallBlock && this._smallBlock.length){
        baidu.array.each(this._smallBlock, function(item, i){
            baidu.on(item, 'mouseenter', function(){
                if(me._timeoutID !== undefined){
                    ad.base.clearTimeout(me._timeoutID);
                }
                //延时500ms显示
                me._timeoutID = ad.base.setTimeout(function(){
                    var pos = baidu.dom.getPosition(/** @type {Element} */(item));
                    me._reset(i, pos);
                    me._middleBlock[i].style.display = 'block';
                    me._animation(i, me._data['ads'][i]['middle_width'], me._data['ads'][i]['middle_height'], 200, pos);
                    // me.sendLog('图片' + (i + 1) + '悬停', '图片' + (i + 1) + '悬停');
                }, 50);
            });
            baidu.on(item, 'mouseleave', function(){
                if(me._timeoutID !== undefined){
                    ad.base.clearTimeout(me._timeoutID);
                }
            });
        });
    }
    if(this._middleBlock && this._middleBlock.length){
        baidu.array.each(this._middleBlock, function(item, i){
            baidu.on(item, 'mouseleave', function(){
                me._reset(i, baidu.dom.getPosition(me._smallBlock[i]));
            });
        });
    }

};

/** @override */
ad.widget.bzt.ImageAld.prototype.patchData = function() {
    if (this._data) {
        if(this._data['ads'] && this._data['ads'].length){
            for(var i = 0; i < this._data['ads'].length; i ++){
                this._data['ads'][i]['text_width'] = this._data['ads'][i]['small_width'] - 15 - 27;
            }
        }
    }
}


ad.widget.bzt.ImageAld.prototype._animation = function(index, endWidth, endHeight, dur, position) {
    //position.left = position.left - 11;
    //position.top = position.top - 11;
    var middleBlock = this._middleBlock[index];
    var imgDiv = this._middleDiv[index];
    var img = this._middleImg[index];
    var line = this._middleLine[index];

    dur = dur || 1000;
    var interval = 25;
    var left = position.left;
    var top = position.top;
    var width = imgDiv.offsetWidth;
    var height = imgDiv.offsetHeight;
    var totalStep = dur / interval;
    var step = 1;
    var changeWidth = (endWidth - width) / totalStep;
    var changeHeight = (endHeight - height) / totalStep;

    var intervalId = ad.base.setInterval(function(){
        if(step > totalStep){
            ad.base.clearInterval(intervalId);
            return;
        }
        //img页面升级，左边距变小
        var leftChange = left - step * changeWidth / 2;
        var topChange = top - step * changeHeight / 2;
        if(leftChange < 0){
            leftChange = 0;
        }
        if(topChange < 0){
            topChange = 0;
        }
        baidu.setStyles(middleBlock, {'left': leftChange + 'px', 'top': topChange + 'px', 'width': width + step * changeWidth + 'px', 'height': 'auto'});
        baidu.setStyles(imgDiv, {'width': width + step * changeWidth + 'px', 'height': height + step * changeHeight + 'px'});
        baidu.setAttrs(img, {'width': width + step * changeWidth, 'height': height + step * changeHeight});
        baidu.setStyles(line, {'width': width + step * changeWidth + 'px'});

        step ++;

    },interval);
}

ad.widget.bzt.ImageAld.prototype._reset = function(index, position) {
    //position.left = position.left - 0;
    //position.top = position.top - 0;
    var middleBlock = this._middleBlock[index];
    var imgDiv = this._middleDiv[index];
    var img = this._middleImg[index];
    var line = this._middleLine[index];

    var width = this._data['ads'][index]['small_width'];
    var height = this._data['ads'][index]['small_height'];

    baidu.setStyles(middleBlock, {'left': position.left + 'px', 'top': position.top + 'px', 'width': width + 'px', 'display': 'none'});
    baidu.setStyles(imgDiv, {'width': width + 'px', 'height': height + 'px'});
    baidu.setAttrs(img, {'width': width, 'height': height});
    baidu.setStyles(line, {'width': width + 'px'});

}

/**
 * 获取mid容器
 * @expose
 */
ad.widget.bzt.ImageAld.prototype.getMidDomId = function(){
    return this.getId('ald-middle');
}

















/* vim: set ts=4 sw=4 sts=4 tw=100: */
