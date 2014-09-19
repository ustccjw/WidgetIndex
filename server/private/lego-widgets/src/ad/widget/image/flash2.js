    /***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/flash.js ~ 2012/08/27 17:27:07
 * @author wangdawei04@baidu.com (wangdawei)
 * @version $Revision: 10927 $
 * @description
 * flash相关的实现逻辑
 **/

goog.require('ad.env');
goog.require('ad.widget.Widget');
goog.require('ui.events');

goog.include('ad/widget/image/flash2.less');
goog.include('ad/widget/image/flash2.html');

goog.provide('ad.widget.image.Flash2');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.image.Flash2 = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_image_flash2';
};
baidu.inherits(ad.widget.image.Flash2, ad.widget.Widget);

/** @override */
ad.widget.image.Flash2.prototype.bindEvent = function() {
    ad.widget.image.Flash2.superClass.bindEvent.call(this);

    // var me = this;
    // var bg = baidu.g(me.getId('bg'));
    // var close = baidu.g(me.getId('close'));
    // var replay = baidu.g(me.getId('replay'));
    // var bg_img = baidu.g(me.getId('bg_img'));

    /*
    baidu.on(close, 'click', function(){
        if(me.trigger(ui.events.IMAGE_FLASH2_CLOSE) !== false){
            
        }
    });
    baidu.on(replay, 'click', function(){
        if(me.trigger(ui.events.IMAGE_FLASH2_REPLAY) !== false){
            
        }
    });

    
    if(bg){
        baidu.on(bg, 'mouseenter', function(){
            if(me.trigger(ui.events.IMAGE_FLASH2_HOVER) !== false){
                
            }
        });
        baidu.on(bg, 'mouseout', function(){
            if(me.trigger(ui.events.IMAGE_FLASH2_OUT) !== false){
                //me.sendLog('out', 'out');
            }
        });
    }
    */
};

/** @private */
ad.widget.image.Flash2.prototype.patchData = function() {
    if (this._data){
        this._data['is_ipad'] = ad.env.isIpad;
        this._data['jsapi'] = this.getId('jsapi').replace(/[^a-zA-Z]/g, '');
        this._data['width'] = this._data['bg']['width'];
        this._data['height'] = this._data['bg']['height'];
    }
};


/** @override */
ad.widget.image.Flash2.prototype.enterDocument = function() {
    ad.widget.image.Flash2.superClass.enterDocument.call(this);

    var me = this;
    if(me._data['flash']){
        me._flashHTML = baidu.g(me.getId('flash')).innerHTML;
    }
    //派发flash事件
    window[me._data['jsapi']] = function(id, eventType, args){
        me.trigger('FLASH_' + eventType, args);
    };
};

/**
 * 获取flash的html代码
 * @return {string} 
 */
ad.widget.image.Flash2.prototype.getFlashHTML = function() {
    return this._flashHTML;
};












/* vim: set ts=4 sw=4 sts=4 tw=100: */
