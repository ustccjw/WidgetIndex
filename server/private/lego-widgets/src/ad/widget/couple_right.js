/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/couple_right.js ~ 2014/02/18 14:32:55
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 10927 $
 * @description
 * couple_right相关的实现逻辑
 **/

goog.require('ad.widget.Widget');
goog.require('ad.fx.moveTo');
goog.include('ad/widget/couple_right.less');
goog.include('ad/widget/couple_right.html');

goog.provide('ad.widget.CoupleRight');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.CoupleRight = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_couple_right';

    /**
     * 当前slide编号，其中0 代表 cover
     * @type {number}
     */
    this.currentIndex = 0;

    /**
     * slide 的数量
     * @type {number}
     */
    this.totalSlide;

    /**
     * 动画是否进行中
     * @type {boolean}
     */
    this.playing = false;

    /**
     * 保存fx
     * @type {ad.fx.Timeline}
     */
    this.fx;

    /**
     * 保存line动画gif
     * @type {string}
     * 配色: 0-蓝橙（默认）；1-黑白 
     */
    this.lineSrc = RT_CONFIG.HOST("ecma.bdimg.com") + "/adtest/d4add6fa5b4093a9ae19ee29c31b061d.gif";
    if(this._data['theme'] == 1){
        this.lineSrc = RT_CONFIG.HOST("ecma.bdimg.com") + "/adtest/5fad070baac7ea958d282ad78c56cfd1.gif";
    }

};
baidu.inherits(ad.widget.CoupleRight, ad.widget.Widget);

/** @override */
ad.widget.CoupleRight.prototype.enterDocument = function() {
    var cover = baidu.g(this.getId('image-0'));
    if (cover) {
        baidu.dom.setStyles(cover, {
            'z-index': "2"
        });
    }
}

/** @override */
ad.widget.CoupleRight.prototype.patchData = function() {
    if (!this._data) {
        return;
    }
    var slides = this.getData("slides.options");
    this.totalSlide = slides.length;
}

/**
 * 隐藏slide的线，左侧鼠标leave时触发.
 */
ad.widget.CoupleRight.prototype.hideLine = function() {
    baidu.array.each(baidu.dom.q('ec-line'), function(item){
        baidu.dom.hide(item);
    });
}

/**
 * 展示第 n 张 slide.
 * @param {number=} n 目标 slide 编号, 0 为封面.
 */
ad.widget.CoupleRight.prototype.gotoAndShow = function(n) {
    if (this.playing || n > this.totalSlide) {
        return;
    }

    var me = this;
    var currentImg = baidu.g(this.getId('image-' + this.currentIndex));
    var currentLine = baidu.g(this.getId('line-' + this.currentIndex));

    // n不变，仅播放line动画
    if (currentLine && n === this.currentIndex) {
        baidu.dom.show(currentLine);
        baidu.dom.setAttr(currentLine, 'src', this.lineSrc);
        return;
    }

    var gotoImg = baidu.g(this.getId('image-' + n));
    var gotoLine = baidu.g(this.getId('line-' + n));
    if (!currentImg || !gotoImg || !gotoLine) {
        return;
    }
    baidu.dom.setAttr(gotoLine, 'src', this.lineSrc);
    baidu.dom.show(gotoLine);
    baidu.setStyle(gotoImg, 'z-index', "1");

    // 切换当前 slide
    this.playing = true;
    if (currentLine) {
        baidu.dom.hide(currentLine);
        baidu.dom.setAttr(currentLine, 'src', '');
    }
    this.fx = ad.fx.moveTo(currentImg, {
        "x": 300,
        "y": 0
    }, {
        "duration": 550,
        "onafterfinish": function() {
            baidu.dom.setStyles(currentImg, {
                'z-index': "0",
                'left': "0"
            });
            me.currentIndex = n;
            currentImg = baidu.g(me.getId('image-' + me.currentIndex));
            if (currentImg) {
                baidu.dom.setStyles(currentImg, {
                    'z-index': "2"
                });
            }
            me.playing = false;
        }
    });
}

/**
 * @override
 */
ad.widget.CoupleRight.prototype.dispose = function() {
    // fx.element 可能为 undefined
    if (this.fx && this.fx.element) {
        this.fx.cancel();
        this.fx = null;
    }
    ad.widget.CoupleRight.superClass.dispose.call(this);
};


/* vim: set ts=4 sw=4 sts=4 tw=100: */
