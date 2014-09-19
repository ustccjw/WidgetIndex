/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/sticker/image_carousel.js ~ 2014/05/20 23:08:32
 * @author songao@baidu.com (songao)
 * @version $Revision: 10927 $
 * @description
 * image_carousel相关的实现逻辑
 **/

goog.require('ad.dom');
goog.require('ad.widget.imageplus.BaseWidget');
goog.require('ad.fx.Timeline');

goog.include('ad/widget/imageplus/sticker/image_carousel.less');
goog.include('ad/widget/imageplus/sticker/image_carousel.html');

goog.provide('ad.widget.imageplus.sticker.ImageCarousel');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.BaseWidget}
 */
ad.widget.imageplus.sticker.ImageCarousel = function(data) {
    ad.widget.imageplus.BaseWidget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_sticker_image_carousel';

    /**
     * 当前显示的第几个图片
     */
    this.current = 0;
};
baidu.inherits(ad.widget.imageplus.sticker.ImageCarousel, ad.widget.imageplus.BaseWidget);

/** @override */
ad.widget.imageplus.sticker.ImageCarousel.prototype.enterDocument = function() {
    ad.widget.imageplus.sticker.ImageCarousel.superClass.enterDocument.call(this);

    /**
     * @type {ad.plugin.imageplus.ILoaderApi}
     */
    var loaderApi = this.getData('api');
    if (loaderApi) {
        var rect = loaderApi.getImgRect();
    }
    else {
        var rect = {'width': 616};
    }
    this.itemWidth = 263;
    // 根据图片宽度计算能显示的图文的个数
    this.availableWidth = Math.max(rect['width'] - 100, 0);
    this.availableItemCount = parseInt((this.availableWidth + 10) / this.itemWidth, 10);
    var adlist = this.getData('adlist');
    this.totalCount = adlist.length;

    var body = baidu.g(this.getId('body'));
    baidu.dom.setStyle(body, 'width', (this.itemWidth * this.totalCount) + 'px');

    var wrapper = baidu.g(this.getId('wrapper'));
    baidu.dom.setStyle(wrapper, 'width', this.availableWidth + 'px'); // or this.itemWidth * this.availableItemCount

    this.checkArrowStatus();

    // this.showImage();
};

ad.widget.imageplus.sticker.ImageCarousel.prototype.showImage = function() {
    var items = baidu.q('ad-slide-item', this.getId('body'));

    var me = this;
    baidu.each(items, function(item, i) {
        var img = item.getElementsByTagName('img')[0];
        var url = img.getAttribute('data-src');

        me.loadImage(url, function(size) {
            var ratio;
            if (size.width < 120 && size.height < 90) {
                ratio = 1;
            }
            else {
                ratio = Math.min(
                    120/size.width,
                    90/size.height
                );
            }
            var width = size.width*ratio;
            var height = size.height*ratio;
            img.src = url;
            var top = parseInt((90 - height) / 2, 10);
            var left = parseInt((120 - width) / 2, 10);
            top = Math.max(top - 10, 0);
            baidu.dom.setStyles(img, {
                'width': width + 'px',
                'height': height + 'px',
                'top': top + 'px',
                'left': left + 'px'
            });
        });
    });
};

/**
 * 预加载图片
 * @param {string} url 图片地址
 * @param {function({width: number, height: number})} callback 回调函数，图片加载完之后执行此函数
 * @param {*=} opt_scope 可选，作用域，用于回调函数
 */
ad.widget.imageplus.sticker.ImageCarousel.prototype.loadImage = function(url, callback, opt_scope){
    var me = opt_scope || this,
        width = 300,
        // 创建一个Image对象，实现图片的预下载
        img = new Image();
    img.src = url;

    // 如果图片已经存在于浏览器缓存，直接调用回调函数
    if (img.complete) {
        callback.call(me, {
            'width': img.width,
            'height': img.height
        });
        return;
    }

    // 图片下载完毕时异步调用callback函数。
    img.onload = function () {
        img.onload = null;
        callback.call(me, {
            'width': img.width,
            'height': img.height
        });
    };
};

/**
 * 更新按钮的状态
 */
ad.widget.imageplus.sticker.ImageCarousel.prototype.checkArrowStatus = function() {
    var current = this.current;
    var available = this.availableItemCount;
    var total = this.totalCount;
    var prev = baidu.g(this.getId('prev'));
    var next = baidu.g(this.getId('next'));

    if (current > 0) {
        baidu.dom.removeClass(prev, 'ad-arrow-prev-disable');
    }
    else {
        baidu.dom.addClass(prev, 'ad-arrow-prev-disable');
    }
    if (current + available < total) {
        baidu.dom.removeClass(next, 'ad-arrow-next-disable');
    }
    else {
        baidu.dom.addClass(next, 'ad-arrow-next-disable');
    }
};

/** @override */
ad.widget.imageplus.sticker.ImageCarousel.prototype.bindEvent = function() {
    ad.widget.imageplus.sticker.ImageCarousel.superClass.bindEvent.call(this);

    var available = this.availableItemCount;
    var total = this.totalCount;
    var prev = baidu.g(this.getId('prev'));
    var next = baidu.g(this.getId('next'));
    var me = this;
    baidu.on(prev, 'click', function(e) {
        if (me.current > 0) {
            me.current--;
            me.moveTo(me.current);
            me.checkArrowStatus();
        }
        baidu.event.preventDefault(e);
    });
    baidu.on(next, 'click', function(e) {
        if (me.current + available < total) {
            me.current++;
            me.moveTo(me.current);
            me.checkArrowStatus();
        }
        baidu.event.preventDefault(e);
    });
    var items = baidu.q('ad-slide-item', this.getId('body'));
    baidu.each(items, function(item, i) {
        baidu.on(item, 'mouseover', function() {
            baidu.dom.addClass(item, 'ad-slide-item-hover');
        });
        baidu.on(item, 'mouseout', function() {
            baidu.dom.removeClass(item, 'ad-slide-item-hover');
        });
    });
};

/**
 * 获取当前左侧移动距离
 */
ad.widget.imageplus.sticker.ImageCarousel.prototype.getCurrentLeft = function() {
    var element = baidu.g(this.getId('body'));
    var left = parseInt(ad.dom.getStyle(element, 'left'));
    if (!isNaN(left)) {
        return left;
    }
    else {
        return -this.current * this.itemWidth;
    }
};

/**
 * 获取即将移动到什么位置
 */
ad.widget.imageplus.sticker.ImageCarousel.prototype.getNextLeft = function(next) {
    var available = this.availableItemCount;
    var total = this.totalCount;
    // 只要右侧还有超过一个被遮挡，那么就是完整移动到下一个
    if (next + available < total) {
        return -next * this.itemWidth;
    }
    else { // 当只有最后一个被遮挡时，不是移动一整个的距离，而应该移动到刚好全部露出为止
        return -total * this.itemWidth + 10 + this.availableWidth;
    }
};

/**
 * 移动到指定下标元素
 * @param {number} start 开始下标
 */
ad.widget.imageplus.sticker.ImageCarousel.prototype.moveTo = function(next) {
    var currentLeft = this.getCurrentLeft();
    var nextLeft = this.getNextLeft(next);
    this.move(currentLeft, nextLeft);
};

/**
 * 移动
 */
ad.widget.imageplus.sticker.ImageCarousel.prototype.move = function(start, end) {
    var me = this;
    var duration = 300;
    var element = baidu.g(this.getId('body'));
    if (this._running) {
        this._fx.end();
    }
    var fx = ad.fx.create(element, {
        __type: 'image-carousel',
        duration: duration,
        render: function(schedule) {
            element.style.left = (start + (end - start) * schedule) + 'px';
        }
    });
    fx.addEventListener('onafterfinish', function() {
        me._running = false;
    });
    fx.launch();
    this._fx = fx;
    this._running = true;
};

/** @override */
ad.widget.imageplus.sticker.ImageCarousel.prototype.patchData = function() {
    var adlist = this.getData('adlist', []);
    for (var i = 0; i < adlist.length; i++) {
        var item = adlist[i];
        item['title'] = ad.base.subByte(item['title'], 18, '...');
        item['desc'] = ad.base.subByte(item['desc'], 54, '...');
    }
}






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
