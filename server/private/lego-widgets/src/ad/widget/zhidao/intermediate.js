/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/zhidao/intermediate.js ~ 2013/01/22 16:12:45
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 10927 $
 * @description
 * intermediate相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/zhidao/intermediate.less');
goog.include('ad/widget/zhidao/intermediate.html');

goog.provide('ad.widget.zhidao.Intermediate');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.zhidao.Intermediate = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_zhidao_intermediate';


    /**
     * @private
     * @type {Element}
     */
    this._ifr;


    /**
     * @private
     * @type {Element}
     */
    this._linkBG;
};
baidu.inherits(ad.widget.zhidao.Intermediate, ad.widget.Widget);

/** @override */
ad.widget.zhidao.Intermediate.prototype.enterDocument = function() {
    this._haha = 'haha';
    ad.widget.zhidao.Intermediate.superClass.enterDocument.call(this);

    this._ifr = baidu.g(this.getId('ifr'));
    this._linkBG = baidu.g(this.getId('a-bg'));

    var width = baidu.page.getViewWidth();
    var height = baidu.page.getViewHeight();

    baidu.dom.setStyles(this._ifr, {'width': width + 'px', 'height': height + 'px'});
    baidu.dom.setStyles(this._linkBG, {'width': width + 'px', 'height': height + 'px'});

    this.center(baidu.g(this.getId('dlg-bg')),760, 430);
    this.center(baidu.g(this.getId('dlg-ifr-bg')),760, 430);
    this.center(baidu.g(this.getId('fg')),730, 400);

    this.trigger('enter');
};

/** @override */
ad.widget.zhidao.Intermediate.prototype.bindEvent = function() {
    var me = this;
    var root = me.getRoot();
    //var links = Array.prototype.slice.call(root.getElementsByTagName('a'));
    var links = root.getElementsByTagName('a');
    baidu.array.each(links, function(item, i){
        baidu.on(item, 'click', function(e){
            if(me.trigger('leave') === false){
                baidu.event.stop(e || window.event);
            }
        });
    });
    //反馈
    if(this.getData('is_feedback')){
        ad.dom.on(baidu.g(me.getId('feedback')), 'click', function(){
            var fbAPI = ad.base.getObjectByName('bds.qa.ShortCut.initRightBar');
            if(typeof fbAPI === 'function'){
                fbAPI();
            }
            else {
                baidu.sio.callByBrowser('http://f3.baidu.com/index.php/feedback/zx/loadfeedback?pid=7&nc=10', function(){
                    var fbAPI = ad.base.getObjectByName('bds.qa.ShortCut.initRightBar');
                    if(typeof fbAPI === 'function'){
                        fbAPI();
                    }
                });
            }
        });
    }
}

/** @override */
ad.widget.zhidao.Intermediate.prototype.patchData = function() {
    if (this._data) {
        this._data['turl_5'] = this._getUrl();
        this._data['turl_6'] = this._getUrl();
        this._data['turl_7'] = this._getUrl();
        this._data['turl_8'] = this._getUrl();
        this._data['turl_9'] = this._getUrl();

        this._data['q']['logo'] = this._data['q']['logo'] || 'http://ecma.bdimg.com/adtest/e86b5adbbfd7e6200741f160df6a19a8.png';

        //'^'->行间距
        this._data['a']['text'] = this.getData('a.text').replace(/\^+/g,function(s){
            var rs = s.substr(0, 4).replace(/\^/g, '<div style="height:10px;"></div>');
            if(s.length <= 4){
                return rs;
            }
            return rs + s.substring(4, s.length);
        });

        if (!this._data['a']['logo'] || this._data['a']['logo'] == '-1' || this._data['a']['logo'] == -1) {
            this._data['a']['logo'] = 'http://bs.baidu.com/kmarketingadslogo/20131010120000_default_account_logo.jpg';
        }

        //点击查看回答详情
        if(this._data['a']['more_link']){
            var moreLinkHtml = '<div class="ec-more-link">&gt;&gt;<a title2="点击查看回答详情" target="_blank" href="' + this._data['a']['more_link'] + '" />点击查看回答详情</a></div>'
            this._data['a']['text'] += '<div style="height:15px;"></div>' + moreLinkHtml;
        }
    }
};

/**
 * 使浮层居中显示
 * @param {HTMLElement} dom 要居中的浮层
 * @param {number} fwWidth 浮层宽度
 * @param {number} fwHeight 浮层高度
 */
ad.widget.zhidao.Intermediate.prototype.center = function(dom, fwWidth, fwHeight) {
    if (!dom) {
        return;
    }

    var viewWidth = baidu.page.getViewWidth(),
        viewHeight = baidu.page.getViewHeight(),
        left,
        top;

    left = (2 * baidu.page.getScrollLeft() + viewWidth - parseInt(fwWidth, 10)) / 2;
    top = (2 * baidu.page.getScrollTop() + viewHeight - parseInt(fwHeight, 10)) / 2;
    baidu.setStyle(dom, 'left', (left < 0 ? 0 : left) + 'px');
    baidu.setStyle(dom, 'top', (top < 0 ? 0 : top) + 'px');
};

/**
 * 拼接加密url
 */
ad.widget.zhidao.Intermediate.prototype._getUrl = function() {
    return this._data['turl']? this._data['turl']:this._data['url'];
};



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
