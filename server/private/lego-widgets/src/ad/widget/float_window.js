/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: float_window.js 2012-07-24 10:25:19Z wangdawei $
 *
 **************************************************************************/



/**
 * src/ad/widget/float_window.js ~ 2012/07/24 22:07:55
 * @author wangdawei
 * @version $Revision: $
 * @description
 * 浮窗
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/float_window.html');
goog.include('ad/widget/float_window.less');

goog.provide('ad.widget.FloatWindow');
/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.FloatWindow = function(data) {
    ad.widget.Widget.call(this, data);
    this._view = 'AD_ad_widget_float_window';
};
baidu.inherits(ad.widget.FloatWindow, ad.widget.Widget);

/**
 * override
 */
ad.widget.FloatWindow.prototype.bindEvent = function(){
    var me = this;
    var a_close = baidu.g(this.getId('close'));
    if(a_close){
        baidu.on(a_close,"click",function(e){
            me.hide();
            me.trigger(ui.events.CLOSE);
        });
    }
    if(baidu.g(me.getId('share-button'))){
        baidu.on(me.getId('share-button'),"click",function(e){
            function getParamsOfShareWindow(width, height) {
                return ['toolbar=0,status=0,resizable=1,width=' + width + ',height=' + height + ',left=',
                        (screen.width-width)/2,',top=',(screen.height-height)/2].join('');
            }
            var context = encodeURIComponent(baidu.g(me.getId('share-text')).value);
            var title = encodeURIComponent('sian share');
            var url = 'http://v.t.sina.com.cn/share/share.php?url='+ 
                          encodeURIComponent(document.location.href) +'&title=' + context +'&pic=';
            var params = getParamsOfShareWindow(800, 600);
            window.open(url, 'share', params);
            me.trigger(ui.events.SHARE);
        });
    }
    var links = baidu.dom.first(me.getRoot()).getElementsByTagName("A");
    if(links.length){
        for(var i = 0; i < links.length; i++){
            baidu.on(links[i], "mousedown", function(){
                    var title2 = baidu.dom.getAttr(this, "title2");
                    if(title2){
                        me.sendLog(title2, title2);
                    }
                });
        }
    }
};

/**
 * 使浮层居中显示
 */
ad.widget.FloatWindow.prototype.center = function(){
    var me = this,
        dom = baidu.dom.first(me.getRoot()),
        //fwWidth = getComputedStyle(baidu.dom.first(dom),null)["width"],
        //fwHeight = getComputedStyle(baidu.dom.first(dom),null)["height"],
        fwWidth = dom.offsetWidth,
        fwHeight = dom.offsetHeight,
        viewWidth = baidu.page.getViewWidth(),
        viewHeight = baidu.page.getViewHeight(),
        left,
        top;
    left = (2*baidu.page.getScrollLeft()+viewWidth-parseInt(fwWidth,10))/2;
    top = (2*baidu.page.getScrollTop()+viewHeight-parseInt(fwHeight,10))/2;
    baidu.setStyle(dom, "left",(left < 0 ? 0 : left) + "px");
    baidu.setStyle(dom, "top", (top < 0 ? 0 : top) + "px");
};

/**
 * override
 */
ad.widget.FloatWindow.prototype.show = function(){
    ad.widget.Widget.prototype.show.call(this);
    baidu.dom.first(this.getRoot()).style.display = "block";
    this.center();
};







/* vim: set ts=4 sw=4 sts=4 tw=100: */
