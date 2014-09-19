/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/dianjing/benz.js ~ 2013/08/08 11:40:22
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 10927 $
 * @description
 * benz相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/dianjing/benz.less');
goog.include('ad/widget/dianjing/benz.html');

goog.provide('ad.widget.dianjing.Benz');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.dianjing.Benz = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_dianjing_benz';
};
baidu.inherits(ad.widget.dianjing.Benz, ad.widget.Widget);

/** @override */
ad.widget.dianjing.Benz.prototype.enterDocument = function() {
    ad.widget.dianjing.Benz.superClass.enterDocument.call(this);

    // CODE HERE
    var head = baidu.g(this.getId('dianjing-pl-panel-head'));
    var body = baidu.g(this.getId('dianjing-pl-panel-body'));
    this._tabs = head.getElementsByTagName('a');
    this._cons = baidu.dom.children(body);

    this._selectTab(0);


};

/** @override */
ad.widget.dianjing.Benz.prototype.bindEvent = function() {
    ad.widget.dianjing.Benz.superClass.bindEvent.call(this);

    // CODE HERE
    var me = this;
    baidu.each(me._tabs, function(item, i){
        baidu.on(item, 'mouseenter', function(e){
            me._selectTab(i);
        });
    });
    //return;
    var biaozhu = baidu.g(me.getId('dianjing-pl-biaozhu'));
    var panel = baidu.g(me.getId('dianjing-pl-panel'));
    var timeoutID;
    baidu.on(biaozhu, 'mouseenter', function(e){
        me._selectTab(0);
        panel.style.display = 'block';
        me.sendLog('浮层展现');
    });
    baidu.on(biaozhu, 'mouseleave', function(e){
        timeoutID = ad.base.setTimeout(function(){
            panel.style.display = 'none';
        }, 200);
    });
    baidu.on(panel, 'mouseenter', function(e){
        //console.log('panel mouseenter');
        panel.style.display = 'block';
        if(timeoutID){
            ad.base.clearTimeout(timeoutID);
        }
    });
    baidu.on(panel, 'mouseleave', function(e){
        //console.log('panel mouseout');
        panel.style.display = 'none';
    });

    //取消冒泡
    baidu.on(panel, 'onmouseup', function(e){
        var eventObj = e || window.event;
        var ele = baidu.event.getTarget(eventObj);
        if(ele.nodeType == '1' && ele.nodeName.toLowerCase() == 'img'){
            baidu.event.stop(eventObj);
        }

    });
};

/**
 * 选中对应索引的tab
 * @param {number} index 索引
 */
ad.widget.dianjing.Benz.prototype._selectTab = function(index) {
    if(this._lastIndex == index && index != 0){
        return;
    }
    if(this._tabs[this._lastIndex]){
        this._tabs[this._lastIndex].className = '';
        this._cons[this._lastIndex].style.display = 'none';
    }
    if(this._tabs[index]){
        this._tabs[index].className = 'ec-hover';
        this._cons[index].style.display = 'block';
        this._lastIndex = index;
    }
    this.sendLog('tab-' + (index + 1));
};












/* vim: set ts=4 sw=4 sts=4 tw=100: */
