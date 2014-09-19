/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/siva/slide_v2.js ~ 2013/11/19 13:21:39
 * @author taoxutian@baidu.com (taoxutian)
 * @version $Revision: 150523 $
 * @description
 * slide_v2相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/siva/slide_v2.less');
goog.include('ad/widget/siva/slide_v2.html');

goog.provide('ad.widget.siva.SlideV2');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.siva.SlideV2 = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_siva_slide_v2';
};
baidu.inherits(ad.widget.siva.SlideV2, ad.widget.Widget);

/** @override */
ad.widget.siva.SlideV2.prototype.enterDocument = function() {
    ad.widget.siva.SlideV2.superClass.enterDocument.call(this);
    var me = this;
    if(COMPILED){
        if (document.readyState === 'complete') {
           this.initSlide();
        } else {
            baidu.on(window, 'load', function(){
               me.initSlide();
            });
        }
    }else{
       this.initSlide();
    }
};

/** @override */
ad.widget.siva.SlideV2.prototype.bindEvent = function() {
    ad.widget.siva.SlideV2.superClass.bindEvent.call(this);


};

/** @override */
ad.widget.siva.SlideV2.prototype.patchData = function() {
    if (this._data) {
        this._data['_custom_data'] = new Date();
    }
}

/**
 * 创建轮播
 */
ad.widget.siva.SlideV2.prototype.initSlide = function(){
    var that = this;
    var options = this._getOption();

    ad.base.require(that.getId(), RT_CONFIG.HOST("ecma.bdimg.com") + "/public01/ui/image_slide_show259x146.js", function(wrapper){
        wrapper.set('AD_CONFIG', {
            "id": "siva-slide" + new Date().getTime(),
            "auto_slide_duration" : 5000,
            "options": options
        });

        // 获取广告的实例，true是必须的，意思是在异步的情况下展示广告
        var ad = wrapper.start(true);

        // 轮播容器
        var canvas = that._getDomById('slides_v2');
        canvas.id = ad.getId();

        // 展示
        ad.show();
    });
}

/**
 * 获取轮播配置
 * @return {[type]} 轮播图片地址、链接配置数组
 */
ad.widget.siva.SlideV2.prototype._getOption = function(){

    var options = [];
    var slides = this._data['slides'];
    var length = slides['length'];
    for (var i = 0; i < length; i++) {
        options.push({
            "img_src": slides[i]['img_url'],
            "img_rcv_url" : slides[i]['target_rcv_url']
        })
    };
    return options;
}

/**
 * 根据 id 得到 dom
 * @param {string} id dom节点的id.
 */
ad.widget.siva.SlideV2.prototype._getDomById = function(id ) {
    id = this.getId(id);
    return baidu.g(id);
};






















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
