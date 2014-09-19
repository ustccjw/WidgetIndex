/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/ishop/list_view.js ~ 2012/11/13 18:23:02
 * @author pengxing@baidu.com (pengxing)
 * @version $Revision: 10927 $
 * @description
 * list_view相关的实现逻辑
 **/

goog.require('ad.widget.Widget');
goog.require('ad.impl.ishop.util');

goog.include('ad/widget/ishop/list_view.less');
goog.include('ad/widget/ishop/list_view.html');

goog.provide('ad.widget.ishop.ListView');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.ishop.ListView = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_ishop_list_view';

    this.name = 'list';
};
baidu.inherits(ad.widget.ishop.ListView, ad.widget.Widget);

/** @override */
ad.widget.ishop.ListView.prototype.enterDocument = function() {
    var me = this;
    ad.widget.ishop.ListView.superClass.enterDocument.call(me);

    var root = baidu.g(me.getId());

    var nameDoms = baidu.q('ishop-item-name', root),
        name;
    for(var nameDom in nameDoms){
        nameDom = nameDoms[nameDom];
        name = nameDom.getAttribute('data-name');
        nameDom.innerHTML = baidu.string.encodeHTML(
            ad.impl.ishop.util.ellipsis(name, 36)
        );
    }

    // 加上热热新荐
    var items = baidu.q('ishop-item', root);
    if (items[0]) {
        var tag = baidu.q('ishop-item-tag', items[0])[0];
        baidu.dom.addClass(tag, 'hot');
    }
    if (items[1]) {
        var tag = baidu.q('ishop-item-tag', items[1])[0];
        baidu.dom.addClass(tag, 'hot');
    }
    if (items[2]) {
        var tag = baidu.q('ishop-item-tag', items[2])[0];
        baidu.dom.addClass(tag, 'new');
    }
    if (items[3]) {
        var tag = baidu.q('ishop-item-tag', items[3])[0];
        baidu.dom.addClass(tag, 'recommand');
    }

};

/** @override */
ad.widget.ishop.ListView.prototype.bindEvent = function() {
    var me = this;
    ad.widget.ishop.ListView.superClass.bindEvent.call(me);

    var root = baidu.g(me.getId());

    var items = baidu.q('ishop-item', root);
    for(var item in items){
        item = items[item];
        baidu.on(item, 'mouseenter', function(){
            var target = this;
            var title = baidu.q('ishop-item-vendor', target.parentNode)[0];
            baidu.dom.addClass(target.parentNode, 'ishop-item-hover');
            baidu.dom.setStyle(title, 'display', 'block');
        });
        baidu.on(item, 'mouseleave', function(){
            var target = this;
            baidu.dom.removeClass(target.parentNode, 'ishop-item-hover');
            var title = baidu.q('ishop-item-vendor', target.parentNode)[0];
            baidu.dom.setStyle(title, 'display', 'none');
        });
    }


    var classes = ['ishop-item-logo', 'ishop-item-name'];
    baidu.on(root, 'click', function(event){
        event = event || window.event;
        var target = event.srcElement || event.target;

        for(var c in classes){
            c = classes[c];
            if(baidu.dom.hasClass(target, c)){
                // 在这里处理一下vendor的显示，要不然点返回回来后会出现问题
                var titles = baidu.q('ishop-item-vendor', root);
                for(var title in titles){
                    baidu.dom.setStyle(titles[title], 'display', 'none');
                }
                me.gotoDetail(target);
                baidu.event.preventDefault(event);
                return;
            }
        }
    });
};

/**
 * 打开到产品详情页
 */
ad.widget.ishop.ListView.prototype.gotoDetail = function(dom){
    var me = this;
    var node = dom,
        id;
    while(node){
        if(baidu.dom.hasClass(node, 'ishop-item')){
            id = node.getAttribute('data-id');
            break;
        }
        node = node.parentNode;
        if(!node || baidu.dom.hasClass(node, 'ishop-item-list')){
            return;
        }
    }

    me.trigger(ad.impl.ishop.events.DETAIL_VIEW, id, me._data['result']);
};



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
