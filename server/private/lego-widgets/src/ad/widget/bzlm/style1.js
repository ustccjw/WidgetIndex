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

goog.include('ad/widget/bzlm/style1.less');
goog.include('ad/widget/bzlm/style1.html');

goog.provide('ad.widget.bzlm.Style1');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.bzlm.Style1 = function(data) {

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_bzlm_style1';

    /**
     * 品牌组.
     * @type {HTMLElement}
     */
    this._groups;

    /**
     * 当前显示的品牌组索引.
     * @type {number}
     */
    this._index = 0;

    /**
     * 品牌组数.
     * @type {number}
     */
    this._groupCount;

    /**
     * 定时器ID.
     * @type {number}
     */
    this._intervalID;

    /**
     * 自动切换品牌组秒数.
     * @type {number}
     */
    this._interval = 5;

    /**
     * “换一换”按钮.
     * @type {HTMLElement}
     */
    this._changeBtn;

    ad.widget.Widget.call(this, data);
};
baidu.inherits(ad.widget.bzlm.Style1, ad.widget.Widget);

/** @override */
ad.widget.bzlm.Style1.prototype.enterDocument = function() {
    ad.widget.bzlm.Style1.superClass.enterDocument.call(this);

    this._groups = baidu.q('ec-group', this.getRoot(), 'div');
    this._groupCount = this._groups.length;
    this._changeBtn = baidu.q('ec-change', this.getRoot(), 'div')[0];

    this._startInterval();
};

/** @override */
ad.widget.bzlm.Style1.prototype.bindEvent = function() {
    ad.widget.bzlm.Style1.superClass.bindEvent.call(this);

    var me = this;
    if(me._changeBtn){
        baidu.on(me._changeBtn,'click',function(){
            me.sendLog('换一换','change');
            me._change();
            me._clearInterval();
        });
    }
};

/**
 * 开启自动切换品牌组定时器
 */
ad.widget.bzlm.Style1.prototype._startInterval = function() {
    var me = this;
    me._intervalID = ad.base.setInterval(function(){
        me._change();
    }, 1000 * me._interval);
};

/**
 * 关闭自动切换品牌组定时器
 */
ad.widget.bzlm.Style1.prototype._clearInterval = function() {
    var me = this;
    if(me._intervalID){
        ad.base.clearInterval(me._intervalID);
    }
};

/**
 * 切换品牌组处理
 */
ad.widget.bzlm.Style1.prototype._change = function() {
    this._groups[this._index].style.display = 'none';
    this._index ++;
    if(this._index == this._groupCount){
        this._index = 0;
    }
    this._groups[this._index].style.display = 'block';
};

/** @private */
ad.widget.bzlm.Style1.prototype.patchData = function() {
    var me = this;
    var group;
    if(me._data['groups'] && me._data['groups'].length){
        for (var i = 0; i < me._data['groups'].length; i ++) {
            group = me._data['groups'][i];
            group['_groupID'] = i + 1;
            if(group['items']){
                for(var j = 0; j < group['items'].length; j ++){
                    group['items'][j]['_itemID'] = j + 1;
                }
            }
        };
        me._data['groups'][this._index]['_display'] = true;
    }
};
















/* vim: set ts=4 sw=4 sts=4 tw=100: */
