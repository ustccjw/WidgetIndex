/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/floatvideo/film.js ~ 2012/12/25 12:11:30
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 10927 $
 * @description
 * film相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/floatvideo/film.less');
goog.include('ad/widget/floatvideo/film.html');

goog.provide('ad.widget.floatvideo.Film');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.floatvideo.Film = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_floatvideo_film';

};
baidu.inherits(ad.widget.floatvideo.Film, ad.widget.Widget);

/** @override */
ad.widget.floatvideo.Film.prototype.enterDocument = function() {
    ad.widget.floatvideo.Film.superClass.enterDocument.call(this);

    this._up = baidu.g(this.getId('up'));
    this._main = baidu.g(this.getId('main'));
    this._main_ul = baidu.g(this.getId('main-ul'));
    this._down = baidu.g(this.getId('down'));
    this._items = this._main.getElementsByTagName('li');
    this._items_bg = baidu.q('ec-bg', this._main, 'div');
    this._items_text = baidu.q('ec-text', this._main, 'div');

    //this._doSelect(this._lastIndex);
};

/** @override */
ad.widget.floatvideo.Film.prototype.bindEvent = function() {
    ad.widget.floatvideo.Film.superClass.bindEvent.call(this);

    var me = this;
    if (me._itemCount >= me._maxCount) {
        baidu.on(me._up, 'click', function(e) {
            me._doUp();
            me.trigger(ui.events.FILM_UP);
        });
        baidu.on(me._down, 'click', function(e) {
            me._doDown();
            me.trigger(ui.events.FILM_DOWN);
        });
    }
    if (me._items && me._items.length) {
        baidu.array.each(me._items, function(item, i) {
            baidu.on(item, 'click', function(e) {
                me._doSelect(i);
                me.trigger(ui.events.CLICK, i);
            });
        });
    }

};

/** @override */
ad.widget.floatvideo.Film.prototype.patchData = function() {
    this._marginTop = 0;
    this._maxCount = 3;
    this._itemHeight = 85;
    this._maxHeight = 247;

    if (this._data) {
        this._data['default_index'] = this._data['default_index'] || 0;
    }
    this._lastIndex = this._data['default_index'];
    this._itemCount = this._data['options'].length;

    this._setMainHeight();
}

ad.widget.floatvideo.Film.prototype._setMainHeight = function() {
    if (this._itemCount >= this._maxCount) {
        this._data['_height'] = this._maxHeight + 'px';
    } else {
        this._data['_height'] = this._itemHeight * this._itemCount + 'px';
    }
}

ad.widget.floatvideo.Film.prototype._doUp = function() {
    if (Math.abs(this._marginTop) >= this._itemHeight) {
        this._marginTop += this._itemHeight;
        this._main_ul.style.marginTop = this._marginTop + 'px';
    }
}

ad.widget.floatvideo.Film.prototype._doDown = function() {
    if (Math.abs(this._marginTop) <= this._itemHeight * (this._itemCount - this._maxCount - 1)) {
        this._marginTop -= this._itemHeight;
        this._main_ul.style.marginTop = this._marginTop + 'px';
    }
}

ad.widget.floatvideo.Film.prototype._doSelect = function(index) {
    var me = this;
    if (me._lastIndex >= 0 && me._lastIndex <= this._itemCount - 1) {
        me._items_bg[me._lastIndex].style.display = 'none';
        me._items_text[me._lastIndex].style.display = 'none';
    }
    me._items_bg[index].style.display = 'block';
    me._items_text[index].style.display = 'block';
    me._lastIndex = index;
}

ad.widget.floatvideo.Film.prototype.reset = function() {
    this._doSelect(0);
    //定位到适当的位置
    this._main_ul.style.marginTop = '0px';
}



/* vim: set ts=4 sw=4 sts=4 tw=100: */
