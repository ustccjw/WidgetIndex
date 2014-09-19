/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/slider.js ~ 2012/08/13 14:46:20
 * @author wangdawei04@baidu.com (wangdawei)
 * @version $Revision: 10927 $
 * @description
 * slider相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/slider.less');
goog.include('ad/widget/slider.html');

goog.provide('ad.widget.Slider');

baidu.event._eventFilter.mouseenter;
baidu.event._eventFilter.mouseleave;

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.Slider = function (data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_slider';
    
    /**
     * 上次选中的btn索引：从1开始.
     * @type {number}
     */
    this._lastCurBtnIndex;
    
    /**
     * 显示模式.
     * @type {string}
     */
    this._mode;
    
    /**
     * 定时器ID.
     * @type {number}
     */
    this._intervalID;
    
    /**
     * 延时执行TimeoutID.
     * @type {number}
     */
    this._timeoutID;
    
    /**
     * 自动切换时间间隔.
     * @type {number}
     */
    this._interval;
    
    /**
     * 图片个数.
     * @type {number}
     */
    this._imgCount;
    
    /**
     * 延时执行切换时间.
     * @type {number}
     */
    this._delay;

    /**
     * 选择按钮dom对象数组.
     * @type {Array.<Element>}
     */
    this._btns;

    /**
     * 轮播图片对象数组.
     * @type {Array.<Element>}
     */
    this._imgs;

    /**
     * 首次载入时显示的图片索引.
     * @type {number}
     */
    this._firstShowIndex;

    /**
     * 是否随机显示图片.
     * @type {boolean}
     */
    this._isShowRandom;

    /**
     * 宽度.
     * @type {number}
     */
    this._width;

    /**
     * 高度.
     * @type {number}
     */
    this._height;

};
baidu.inherits(ad.widget.Slider, ad.widget.Widget);

/** @override */
ad.widget.Slider.prototype.enterDocument = function () {
    var me = this;
    ad.widget.Slider.superClass.enterDocument.call(this);

    var btn = baidu.g(this.getId('btn'));
    var ol = baidu.g(this.getId('img'));
    if (btn) {
        this._btns = baidu.dom.children(btn);
    }
    if (ol) {
        this._imgs = baidu.dom.children(ol);
    }

    if (this._imgCount) {
        //首次显示
        if (me._mode == 'vertical') {
            baidu.each(this._imgs, function (item, i) {
                baidu.setStyle(item,'top', '-' + me._height + 'px');
            });
            baidu.setStyle(this._imgs[this._firstShowIndex], 'top', '0px');
        }
        else {
            baidu.each(this._imgs, function (item, i) {
                baidu.setStyle(item, 'left', '-' + me._width + 'px');
            });
            baidu.setStyle(this._imgs[this._firstShowIndex], 'left', '0px');
        }
        this._lastCurBtnIndex = this._firstShowIndex + 1;
        //开始自动切换
        if (this._interval && this._imgCount > 1) {
            this._startInterval();
        }
    }

    if (this._imgCount <= 1) {
        btn && baidu.hide(btn);
    }
};

/** @override */
ad.widget.Slider.prototype.bindEvent = function () {
    ad.widget.Slider.superClass.bindEvent.call(this);
    var me = this;
    var index = 0;
    if (this._btns && this._btns.length) {
        baidu.array.each(this._btns, function (item, i) {
            baidu.on(item,'mouseenter', function (e) {
                if (me._timeoutID) {
                    ad.base.clearTimeout(me._timeoutID);
                }
                me._timeoutID = ad.base.setTimeout(function () {
                    me._stopInterval();
                    index = parseInt(baidu.getAttr(item, 'data-index'), 10);
                    if (index != me._lastCurBtnIndex) {
                        me._changeBtn(index);
                        me._changeImg(index);
                    }
                }, me._delay);
            });
        });
    }
    //悬停时取消自动切换
    var widgetDiv = baidu.g(this.getId('slider'));
    baidu.on(widgetDiv,'mouseenter', function (e) {
        me._stopInterval();
    });
    //鼠标离开区域重启自动切换
    baidu.on(widgetDiv,'mouseleave', function (e) {
        if (me._interval > 0 && me._imgCount > 1) {
            me._startInterval();
        }
    });
};

/** @override */
ad.widget.Slider.prototype.patchData = function () {
    var me = this;
    if (this._data) {
        var options = this._data['options'];
        this._imgCount = options.length;
        this._mode = this._data['mode'];
        this._delay = this._data['delay'];
        this._interval = this._data['interval_time'];
        this._isShowRandom = this._data['is_show_random'] || false;
        if (this._isShowRandom) {
            this._firstShowIndex = this._getfirstShowIndex();
        }
        else {
            this._firstShowIndex = this._data['first_show_index'] || 0;
        }
        baidu.array.forEach(options, function(item, i) {
            if (me._firstShowIndex === i) {
                item['_is_current'] = true;
            }
        });
        this._width = parseInt(this._data['width'], 10);
        this._height = parseInt(this._data['height'], 10);
    }
};

/**
 * 改变按钮样式
 * @private
 *
 * @param {number} curbtnIndex 当前悬停的按钮索引.
 */
ad.widget.Slider.prototype._changeBtn = function (curbtnIndex) {
    baidu.each(this._btns, function (item,i) {
        baidu.dom.removeClass(item, 'ad-widget-slider-cur');
    });
    if (curbtnIndex) {
        var curbtn = this._btns[curbtnIndex - 1];
        if (curbtn) {
            baidu.dom.addClass(curbtn, 'ad-widget-slider-cur');
        }
    }
};

/**
 * 改变图片
 * @private
 *
 * @param {number} curbtnIndex 当前悬停的按钮索引.
 */
ad.widget.Slider.prototype._changeImg = function (curbtnIndex) {
    var me = this;
    if (curbtnIndex) {
        me._setBeforeShowImgCSS(curbtnIndex);
        switch(me._mode) {
            case 'normal':
            case 'horizontal':
                var start_left;
                if (curbtnIndex > me._lastCurBtnIndex
                    || me._isEdge(curbtnIndex)) {
                    start_left = this._width;
                }
                else {
                    start_left = - this._width;
                }
                me._animation(curbtnIndex, start_left, 0, function (val) {
                    baidu.setStyle(
                        me._imgs[curbtnIndex - 1],
                        'left',
                        val + 'px'
                    );
                    if (curbtnIndex > me._lastCurBtnIndex
                        || me._isEdge(curbtnIndex)) {
                        baidu.setStyle(
                            me._imgs[me._lastCurBtnIndex - 1],
                            'left',
                            (val - me._width) + 'px'
                        );
                    }
                    else {
                        baidu.setStyle(
                            me._imgs[me._lastCurBtnIndex - 1],
                            'left',
                            (val + me._width) + 'px'
                        );
                    }
                });
                break;
            case 'vertical':
                var start_top;
                if (curbtnIndex > me._lastCurBtnIndex
                    || me._isEdge(curbtnIndex)) {
                    start_top = this._height;
                }
                else {
                    start_top = - this._height;
                }
                me._animation(curbtnIndex, start_top, 0, function (val) {
                    baidu.setStyle(
                        me._imgs[curbtnIndex - 1],
                        'top',
                        val + 'px'
                    );
                    if (curbtnIndex > me._lastCurBtnIndex
                        || me._isEdge(curbtnIndex)) {
                        baidu.setStyle(
                            me._imgs[me._lastCurBtnIndex - 1],
                            'top',
                            (val - me._height) + 'px'
                        );
                    }
                    else {
                        baidu.setStyle(
                            me._imgs[me._lastCurBtnIndex - 1],
                            'top',
                            (val + me._height) + 'px'
                        );
                    }
                });
                break;
        }
    }
};

/**
 * 动画效果
 * @private
 *
 * @param {number} curbtnIndex 当前的索引值.
 * @param {number} startVal 初始值.
 * @param {number} endVal 最终值.
 * @param {Function} callback 回调.
 */
ad.widget.Slider.prototype._animation =
    function (curbtnIndex, startVal, endVal, callback) {
    var me = this;
    var totalInvokeCount = this._mode == 'normal' ? 1 : 5; //刷新次数
    var i = 1;
    var diff = endVal - startVal;
    var setIntervalID = ad.base.setInterval(function () {
        if (i <= totalInvokeCount) {
            callback(startVal + (diff / totalInvokeCount) * i);
            i ++;
        }
        else {
            me._setAfterShowImgCSS();
            me._lastCurBtnIndex = curbtnIndex;
            ad.base.clearInterval(setIntervalID);
        }
    }, 40);
};

/**
 * 自动切换定时器开始
 * @private
 */
ad.widget.Slider.prototype._startInterval = function () {
    var me = this;
    me._stopInterval();
    this._intervalID = ad.base.setInterval(function () {
        var index = me._getNextBtnIndex();
        if (index) {
            me._changeBtn(index);
            me._changeImg(index);
        }
    }, this._interval);
};

/**
 * 自动切换定时器取消
 * @private
 */
ad.widget.Slider.prototype._stopInterval = function () {
    if (this._intervalID) {
        ad.base.clearInterval(this._intervalID);
    }
};

/**
 * 取得下一个btn索引：从1开始
 * @private
 *
 * @return {number} btnIndex.
 */
ad.widget.Slider.prototype._getNextBtnIndex = function () {
    var btnIndex = 0;
    if (this._btns.length) {
        btnIndex = parseInt(this._lastCurBtnIndex, 10) % this._btns.length;
    }
    return btnIndex + 1;
};

/**
 * 随机取得显示图片索引
 * @private
 *
 * @return {number} btn.
 */
ad.widget.Slider.prototype._getfirstShowIndex = function () {
    var config = this._data;
    if (this._imgCount) {
        return Math.floor(Math.random() * this._imgCount);
    }
    else {
        return 0;
    }
};

/**
 * 设置即将显示的轮播图片样式
 * @private
 *
 * @param {number} imgIndex 即将显示的轮播图片索引.
 */
ad.widget.Slider.prototype._setBeforeShowImgCSS = function (imgIndex) {
    if (this._imgs && this._imgs.length) {
        var li = this._imgs[imgIndex - 1];
        if (li) {
            if (this._mode == 'vertical') {
                if (imgIndex > this._lastCurBtnIndex
                    || this._isEdge(imgIndex)) {
                    baidu.setStyle(li, 'top', this._height + 'px');
                }
                else {
                    baidu.setStyle(li, 'top', '-' + this._height + 'px');
                }
            }
            else {
                if (imgIndex > this._lastCurBtnIndex
                    || this._isEdge(imgIndex)) {
                    baidu.setStyle(li, 'left', this._width + 'px');
                }
                else {
                    baidu.setStyle(li, 'left', '-' + this._width + 'px');
                }
            }
        }
    }
};

/**
 * 设置显示结束后的轮播图片样式
 * @private
 */
ad.widget.Slider.prototype._setAfterShowImgCSS = function () {
    if (this._imgs && this._imgs.length) {
        var lastShowLI = this._imgs[this._lastCurBtnIndex - 1];
        if (lastShowLI) {
            if (this._mode == 'vertical') {
                baidu.setStyle(lastShowLI, 'top', '-' + this._height + 'px');
            }
            else {
                baidu.setStyle(lastShowLI, 'left', '-' + this._width + 'px');
            }
        }
    }
};

/**
 * 是否是临界条件（从最后一个自动切换到第一个）
 * @private
 *
 * @param {boolean}  是否是临界条件.
 */
ad.widget.Slider.prototype._isEdge = function (imgIndex) {
    return imgIndex == 1 && this._lastCurBtnIndex == this._imgCount;
};

/**
 * @override
 */
ad.widget.Slider.prototype.dispose = function () {
    if (this._timeoutID) {
        ad.base.clearTimeout(this._timeoutID);
        this._timeoutID = null;
    }
    this._stopInterval();
    ad.widget.Slider.superClass.dispose.call(this);
}





/* vim: set ts=4 sw=4 sts=4 tw=100: */
