/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/siva/slide.js ~ 2013/09/11 21:27:17
 * @author yangfan12@baidu.com (yangfan12)
 * @version $Revision: 150523 $
 * @description
 * slide相关的实现逻辑
 **/

goog.require('ad.fx.Timeline');
goog.require('ad.fx.moveTo');
goog.require('ad.widget.Widget');
goog.include('ad/widget/siva/slide.less');
goog.include('ad/widget/siva/slide.html');

goog.provide('ad.widget.siva.Slide');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.siva.Slide = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_siva_slide';
    this.switchTime = this._data['switchTime'];
};
baidu.inherits(ad.widget.siva.Slide, ad.widget.Widget);

/** @override */
ad.widget.siva.Slide.prototype.enterDocument = function() {
    ad.widget.siva.Slide.superClass.enterDocument.call(this);

    this.initSivaSlide();
};

/** @override */
ad.widget.siva.Slide.prototype.bindEvent = function() {
    ad.widget.siva.Slide.superClass.bindEvent.call(this);
};

/** @override */
ad.widget.siva.Slide.prototype.patchData = function() {
    if (this._data) {
        this._data['switchTime'] = 8000;
        this._data['height'] = 140;
        this._data['duration'] = 300;
    }
};

/**
 * @param {int} relatePos 滑动的相对位置.
 * @param {bool} mod 是否对位置取余.
 * @param {Object} options 选项.
 */
ad.widget.siva.Slide.prototype.slideTo = function(relatePos, mod, options ) {
    this.slide(this.currentIdx + relatePos, mod, options);
};

/**
 * @param {int} pos 滑动的绝对位置.
 * @param {bool} mod 是否对位置取余.
 * @param {Object} options 选项.
 */
ad.widget.siva.Slide.prototype.slide = function(pos, mod, options ) {
    if (mod === undefined) {
        mod = true;
    }
    options = baidu.object.extend({duration: this._data['duration']}, options);
    this.slideStop();
    var height = this._data['height'];
    this.currentIdx = pos;
    if (mod) {
        this.currentIdx %= this.numOfSlides;
    }
    var $slide = this.getDomById('slides');
    if (!$slide) {
        return;
    }
    ad.fx.moveTo($slide, {x: 0, y: height * -1 * this.currentIdx}, options);
    this._setControl();
    this.slideStart();
};


/**
 * 设置轮播控件
 */
ad.widget.siva.Slide.prototype._setControl = function() {
    var $root = this.getRoot(),
    currentControl = baidu.q('ad-widget-siva-slide-current', $root)[0];
    baidu.removeClass(currentControl, 'ad-widget-siva-slide-current');
    var controls = baidu.q('ad-widget-siva-slide-control', $root);
    this.currentIdx = this.currentIdx % this.numOfSlides;
    baidu.addClass(controls[this.currentIdx], 'ad-widget-siva-slide-current');
};

/**
 * 绑定轮播相关的事件
 */
ad.widget.siva.Slide.prototype._bindSlideEvent = function() {
    var $slidesContainer = this.getDomById('slides'),
        me = this;
    ad.dom.enter($slidesContainer, function() {
        me.slideStop();
    });
    ad.dom.leave($slidesContainer, function() {
        me.slideStart();
    });
};

/**
 * 绑定轮播控件相关的事件
 */
ad.widget.siva.Slide.prototype._bindControlEvent = function() {
    var $slidesContainer = this.getDomById('slides'),
        me = this,
        $root = this.getRoot(),
        controls = baidu.q('ad-widget-siva-slide-controls', $root)[0];

    baidu.event.on(controls, 'click', function(e ) {
        e = new baidu.event.EventArg(e);
        var target = e.target, idx;
        if (target.tagName == 'LI' && !baidu.dom.hasClass(target, 'ad-widget-siva-current')) {
            idx = parseInt(baidu.dom.getAttr(target, 'data-idx'), 10) - 1;
            me.slide(idx);
        }
    });
};

/**
 * 滚向下一个轮播
 */
ad.widget.siva.Slide.prototype.next = function() {
    if (this.currentIdx == this.numOfSlides - 1) {
        var slideContainer = this.getDomById('slides');
        this.slideTo(1, false, {
            finish: function() {
                baidu.dom.setStyle(slideContainer, 'top', 0);
            }
        });
    } else {
        this.slideTo(1);
    }
};

/**
 * 轮播开始
 */
ad.widget.siva.Slide.prototype.slideStart = function() {
    var me = this,
        switchTime = this._data['switchTime'];

    this.t = ad.base.setInterval(function() {
        me.next();
    }, switchTime);
};

/**
 * 轮播停止
 */
ad.widget.siva.Slide.prototype.slideStop = function() {
    ad.base.clearInterval(this.t);
};

/**
 * 根据 id 得到 dom
 * @param {string} id dom节点的id.
 */
ad.widget.siva.Slide.prototype.getDomById = function(id ) {
    id = this.getId(id);
    return baidu.g(id);
};

/**
 * 初始化 widget
 */
ad.widget.siva.Slide.prototype.initSivaSlide = function() {
    var $slides = this.getDomById('slides').getElementsByTagName('li');
    this.numOfSlides = $slides.length;
    this.currentIdx = 0;
    this.initImgs();
    this.initControls();
    this._bindSlideEvent();
    this._bindControlEvent();
    this.slideStart();
};

/**
 * 初始化轮播图片
 */
ad.widget.siva.Slide.prototype.initImgs = function() {
    var slideContainer = this.getDomById('slides'),
        slides = slideContainer.getElementsByTagName('li'),
        firstSlide = slides[0],
        cloneSlide = firstSlide.cloneNode(true),
        lastSlide = slides[slides.length - 1];
    baidu.dom.insertAfter(cloneSlide, lastSlide);
};

/**
 * 初始化轮播控件
 */
ad.widget.siva.Slide.prototype.initControls = function() {
    if (this.numOfSlides <= 1) {
        return;
    }
    var $slidesContainer = this.getDomById('slides'), klass;
    var $slides = this.getDomById('slides').getElementsByTagName('li');
    var $ul = document.createElement('ul');
    baidu.dom.addClass($ul, 'ad-widget-siva-slide-controls');
    var innerHtml = '';
    for (var i = 0; i < this.numOfSlides; i++) {
        if (i === 0) {
            klass = 'ad-widget-siva-slide-current ad-widget-siva-slide-control-first';
        } else {
            klass = '';
        }
        innerHtml += '<li class="ad-widget-siva-slide-control ' + klass +'" data-idx="' + (i + 1) + '"></li>';
    }
    $ul.innerHTML = innerHtml;
    baidu.dom.insertAfter($ul, $slidesContainer);
    var height = 12 * this.numOfSlides + 7;
    baidu.dom.setStyle($ul, 'margin-top', Math.floor(-0.5 * height) + 'px');
};

/**
 * @override
 */
ad.widget.siva.Slide.prototype.dispose = function() {
    this.slideStop();
    ad.widget.siva.Slide.superClass.dispose.call(this);
};

/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
