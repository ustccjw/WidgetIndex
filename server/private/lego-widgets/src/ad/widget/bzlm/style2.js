/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/bzlm/style3.js ~ 2012/12/12 14:03:47
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 10927 $
 * @description
 * style3相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/bzlm/style2.less');
goog.include('ad/widget/bzlm/style2.html');

goog.provide('ad.widget.bzlm.Style2');

baidu.event._eventFilter.mouseenter;
baidu.event._eventFilter.mouseleave;

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.bzlm.Style2 = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_bzlm_style2';
};
baidu.inherits(ad.widget.bzlm.Style2, ad.widget.Widget);

/** @override */
ad.widget.bzlm.Style2.prototype.bindEvent = function() {
    ad.widget.bzlm.Style2.superClass.bindEvent.call(this);
    // CODE HERE
    var me = this;
    var lastPos = '';
    var arrHoverLogo = {};
    var bg = baidu.q('ec-main-bg', me.getRoot(), 'div')[0];
    baidu.array.each(baidu.q('ec-logo-hover', me.getRoot(), 'div'),function(item, i){
        arrHoverLogo[baidu.getAttr(item, 'data-pos')] = item;
    });
    var timeoutID;
    var isOverHover = false; //当前鼠标是否停留在Hover上

    var funShowHover = function(pos){
        if(pos == '2-2'){
            return;
        }
        bg.style.display = 'block';
        if(arrHoverLogo[lastPos]){
            arrHoverLogo[lastPos].style.display = 'none';
        }
        arrHoverLogo[pos].style.display = 'block';
        lastPos = pos;
    }

    baidu.array.each(me.getRoot().getElementsByTagName('TD'), function(item, i){
        var pos = baidu.getAttr(item, 'data-pos');
        baidu.on(item, 'mouseenter', function(){
            isOverHover = true;
            if(timeoutID){
                ad.base.clearTimeout(timeoutID);
            }
            timeoutID = ad.base.setTimeout(function(){
                funShowHover(pos);
            },200);
        });
    });

    var funClearHover = function(e){
        isOverHover = false;
        if(timeoutID){
            ad.base.clearTimeout(timeoutID);
        }
        ad.base.setTimeout(function(){
            if(!isOverHover){
                bg.style.display = 'none';
                if(arrHoverLogo[lastPos]){
                    arrHoverLogo[lastPos].style.display = 'none';
                }
                lastPos = '';
            }
        },200);

    }
    baidu.object.each(arrHoverLogo, function(item, key){
        baidu.on(item, 'mouseleave', funClearHover);
    });

    var main = baidu.q('ec-main', me.getRoot(), 'div')[0];
    baidu.on(main, 'mouseleave', funClearHover);


};
























/* vim: set ts=4 sw=4 sts=4 tw=100: */
