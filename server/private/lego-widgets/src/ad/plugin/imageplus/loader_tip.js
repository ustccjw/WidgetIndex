/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/

/**
 * src/ad/plugin/imageplus/loader_tip.js ~ 2013/08/09 13:20:37
 * @author zhouminming01(zhouminming01@baidu.com)
 * @version $Revision$
 * @description Api interface of Loader.
 **/

goog.require('ad.base');
goog.require('ad.dom');
goog.require('ad.event');
goog.require('ad.string');
goog.require('ad.plugin.imageplus.hash');
goog.require('ui.events');

goog.provide('ad.plugin.imageplus.LoaderTip');

/**
 * Tip icon url
 *
 * @const
 * @type {string}
 */
var ICON_URL =
    'http://ecma.bdimg.com/public03/imageplus/tip.png';

/**
 * Tip hover icon url
 *
 * @const
 * @type {string}
 */
var ICON_HOVER_URL =
    'http://ecma.bdimg.com/public03/imageplus/tip-hover.png';

/**
 * Tip background url
 *
 * @const
 * @type {string}
 */
var TIP_BACK_URL =
    'http://ecma.bdimg.com/public03/imageplus/tip-back.png';


/**
 * imageplus LoaderTip
 *
 * @constructor
 * @param {Element} imgWrapper 图片的wrapper元素.
 * @param {Function} triggerFunc 触发事件的函数
 */
ad.plugin.imageplus.LoaderTip = function (imgWrapper, triggerFunc) {

    /**
     * dom id
     *
     * @type {string}
     */
    this.domId = HASH + ad.base.uuid();

    /**
     * wrapper
     *
     * @type {Element}
     * @private
     */
    this._wrapper = this.render();

    imgWrapper.insertBefore(this._wrapper, imgWrapper.firstChild);
    this.bindEvent(triggerFunc);
};


/**
 * bind event
 *
 * @param {Function} triggerFunc 触发事件的函数
 */
ad.plugin.imageplus.LoaderTip.prototype.bindEvent = function (triggerFunc) {
    var me = this;
    var icon = ad.dom.g(me.domId + '-icon');

    ad.event.on(icon, 'mouseover', function (e) {
        ad.event.preventDefault(e);
        // show tip message
        icon.nextSibling.style.display = 'block';
        triggerFunc(ui.events.TIP_MOUSE_OVER);
    });

    ad.event.on(icon, 'mouseout', function (e) {
        ad.event.preventDefault(e);
        icon.nextSibling.style.display = 'none';
        triggerFunc(ui.events.TIP_MOUSE_OUT);
    });

    ad.event.on(icon, 'click', function (e) {
        ad.event.preventDefault(e);
        triggerFunc(ui.events.TIP_CLICK);
    });
};

/**
 * bind image event
 */
ad.plugin.imageplus.LoaderTip.prototype.render = function () {
    var cssTpl = ''
        // '#domId'
        + '#${domId} {'
        +     'position:absolute;top:0;left:0;right:auto;'
        +     'bottom:auto;margin:0;padding:0;border:0;'
        +     'width:200px;'
        +     'background:transparent;'
        + '}'
        // '#domId div'
        + '#${domId} div' + '{'
        +     'float:left;'
        +     'width:144px;'
        +     'height:17px;'
        +     'line-height:17px;'
        +     'margin:3px 0 0 -2px;'
        +     'background:url(${TIP_BACK_URL}) 0 0 no-repeat;'
        +     '_background:0;'
        +     '_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader('
        +     'enabled=\'true\',sizingMethod=\'corp\',src=\'${TIP_BACK_URL}\');'
        +     'font-family:sans-serif;'
        +     'text-align:center;'
        +     'font-size:12px;'
        +     'color:#666;'
        +     'padding:8px 10px;'
        +     'display:none;'
        + '}'
        // '#domId-icon'
        + '#${domId}-icon {'
        +     'float:left;height:38px;width:38px;cursor:default;'
        +     'background:url(${ICON_URL}) 0 0 no-repeat;'
        +     '_background:0;'
        +     '_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader('
        +     'enabled=\'true\',sizingMethod=\'corp\',src=\'${ICON_URL}\');'
        + '}'
        // '#domId-icon'
        + '#${domId}-icon:hover {'
        +     'float:left;height:38px;width:38px;'
        +     'background:url(${ICON_HOVER_URL}) 0 0 no-repeat;'
        +     '_background:0;'
        +     '_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader('
        +     'enabled=\'true\',sizingMethod=\'corp\',src=\'${ICON_HOVER_URL}\');'
        + '}';

    var wrapper = document.createElement('div');
    wrapper.id = this.domId;
    wrapper.innerHTML = ''
        + '<a href="javascript:void(0);" id="'
        +     this.domId
        + '-icon" data-action="icon"></a>'
        + '<div>查看标识获取更多信息</div>';

    var icon = wrapper.childNodes[0];
    ad.dom.createStyles(
        ad.string.format(cssTpl, {
            'domId': this.domId,
            'TIP_BACK_URL': TIP_BACK_URL,
            'ICON_URL': ICON_URL,
            'ICON_HOVER_URL': ICON_HOVER_URL
        }),
        '',
        icon
    );

    return wrapper;
};







/* vim: set ts=4 sw=4 sts=4 tw=100: */
