/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: search_box.js 15577 2012-12-14 05:53:35Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/widget/search_box.js ~ 2012/06/15 13:01:14
 * @author loutongbing
 * @version $Revision: 15577 $
 * @description
 * 搜索框的组件
 **/
goog.require('ad.widget.Widget');
goog.require('ui.events');

goog.include('ad/widget/search_box/search_box.html');
goog.include('ad/widget/search_box/search_box.less');

goog.provide('ad.widget.search_box.SearchBox');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.search_box.SearchBox = function(data) {
    ad.widget.Widget.call(this, data);

    this._view = 'AD_ad_widget_search_box';
};
baidu.inherits(ad.widget.search_box.SearchBox, ad.widget.Widget);

/** @override */
ad.widget.search_box.SearchBox.prototype.enterDocument = function() {
    ad.widget.search_box.SearchBox.superClass.enterDocument.call(this);

    var placeholder = this._data['placeholder'];
    if (placeholder) {
        baidu.g(this.getId('text')).value = placeholder;
        baidu.addClass(this.getId('text'), 'ec-placeholder');
    }
};

/** @override */
ad.widget.search_box.SearchBox.prototype.bindEvent = function() {
    ad.widget.search_box.SearchBox.superClass.bindEvent.call(this);

    var placeholder = this._data['placeholder'];
    if (placeholder) {
        baidu.on(this.getId('text'), 'focus', function() {
            if(this.value == placeholder){
                this.value = '';
            }
            baidu.removeClass(this, 'placeholder');
        });
        baidu.on(this.getId('text'), 'blur', function() {
            if (this.value == placeholder ||
                !this.value) {
                this.value = placeholder;
                baidu.addClass(this, 'ec-placeholder');
            }
        });
    }

    var me = this;
    var charset = this._data['form']['charset'];
    baidu.on(this.getId('submit-button'), 'click', function() {
        me.sendLog('searchbutton', 'searchproduct');
        me.trigger(ui.events.BEFORE_SUBMIT);
        var temp;
        if (baidu.browser.ie && charset != '' && document.charset != charset) {
            temp = document.charset;
            document.charset = charset;
            charset = temp;
        }
        baidu.g(me.getId('form')).submit();
        if (baidu.browser.ie && charset != '' && document.charset != charset) {
            temp = document.charset;
            document.charset = charset;
            charset = temp;
        }
    });
    if(this._data['rcv_url']) {
        baidu.on(baidu.g(this.getId('submit-button')).parentNode, 'click', function(e) {
            var ev = baidu.event.getEvent(e);
            baidu.event.preventDefault(ev);
        });
    }
};

















/* vim: set ts=4 sw=4 sts=4 tw=100: */
