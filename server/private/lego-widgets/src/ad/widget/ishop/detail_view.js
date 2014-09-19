/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/ishop/detail_view.js ~ 2012/11/19 22:12:21
 * @author pengxing@baidu.com (pengxing)
 * @version $Revision: 10927 $
 * @description
 * detail_view相关的实现逻辑
 **/

goog.require('ad.widget.Widget');
goog.require('ad.impl.ishop.util');
goog.require('ad.impl.ishop.events');

goog.include('ad/widget/ishop/detail_view.less');
goog.include('ad/widget/ishop/detail_view.html');

goog.provide('ad.widget.ishop.DetailView');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @param {string} query 用户的检索词
 * @extends {ad.widget.Widget}
 */
ad.widget.ishop.DetailView = function(data, query) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_ishop_detail_view';

    this._query = query;

    this.name = 'detail';
};
baidu.inherits(ad.widget.ishop.DetailView, ad.widget.Widget);

/** @override */
ad.widget.ishop.DetailView.prototype.enterDocument = function() {
    var me = this;
    ad.widget.ishop.DetailView.superClass.enterDocument.call(me);

    var root = baidu.g(me.getId());


    me.dataMap = {};
    for(var i =0, l = me._data['data'].length, d; i < l; i++){
        d = me._data['data'][i];
        d['_index'] = i;
        me.dataMap[d['id']] = d;
    }
    me.itemArr = baidu.q('ishop-detail-item', root);

    var nameDoms = baidu.q('ishop-detail-item-name', root),
        name;
    for(var nameDom in nameDoms){
        nameDom = nameDoms[nameDom];
        name = nameDom.getAttribute('data-name');
        nameDom.innerHTML = baidu.string.encodeHTML(
            ad.impl.ishop.util.ellipsis(name, 28)
        );
    }

    // 找到当前需要打开的商品详情
    var data = me.dataMap[me._data['id']],
        index = data['_index'],
        itemDom = me.itemArr[index],
        itemDomPrev = me.itemArr[index - 1];

    if(itemDomPrev){
        baidu.dom.addClass(itemDomPrev, 'selected-prev');
    }
    baidu.dom.addClass(itemDom, 'selected');
    var _s = ad.base.setTimeout(function(){
        me.switchProduct(data, true);
    }, 100);

};

/** @override */
ad.widget.ishop.DetailView.prototype.bindEvent = function() {
    var me = this;
    ad.widget.ishop.DetailView.superClass.bindEvent.call(me);
    var root = baidu.g(me.getId());

    // 点击下面的列表，切换产品
    var items = baidu.q('ishop-detail-item', root);
    for(var item in items){
        item = items[item];
        baidu.on(item, 'click', function(event){
            var target = this,
                id = target.getAttribute('data-id'),
                selected = baidu.q('selected', root)[0],
                selectedPrev = baidu.q('selected-prev', root)[0];
            if(selected){
                baidu.dom.removeClass(selected, 'selected');
            }
            if(selectedPrev){
                baidu.dom.removeClass(selectedPrev, 'selected-prev');
            }

            var index = me.dataMap[id]['_index'],
                prev = me.itemArr[index - 1];

            if(prev){
                baidu.dom.addClass(prev, 'selected-prev')
            }
            baidu.dom.addClass(target, 'selected');

            me.switchProduct(me.dataMap[id]);

            baidu.event.preventDefault(event);
        });
    }


    // Bind event for purchase button
    var purchaseBtn = baidu.q('ishop-detail-btn-purchase', root)[0];
    baidu.on(purchaseBtn, 'click', function(event){
        me.trigger(ad.impl.ishop.events.PURCHASE_VIEW, me['currentProduct']);
        baidu.event.preventDefault(event);
    });

    // Bind event for showing description.
    //
    var descBtn = baidu.q('ishop-detail-btn-desc', root)[0],
        descContainer = baidu.q('ishop-detail-desc', root)[0];
    baidu.on(descBtn, 'click', function(){
        if(baidu.dom.hasClass(descBtn, 'ishop-detail-btn-desc-showing')){
            baidu.dom.removeClass(descBtn, 'ishop-detail-btn-desc-showing');
            descContainer.style.display = 'none';
        } else {
            baidu.dom.addClass(descBtn, 'ishop-detail-btn-desc-showing');
            descContainer.style.display = 'block';
        }
    });
};

/**
 * 根据传入的数据显示对应的产品
 * @param {Object} data
 * @param {boolean=} opt_hasLog 表示是否需要发送日志，默认是发送
 */
ad.widget.ishop.DetailView.prototype.switchProduct = function(data, opt_hasLog){
    var me  = this,
        root = baidu.g(me.getId());

    me['currentProduct'] = data;

    // 商品名
    var productName = baidu.g('ishop-detail-name-link');
    productName.innerHTML = baidu.string.encodeHTML(
        ad.impl.ishop.util.ellipsis(data['name'], 90)
    );
    productName.href = data['product_url']
        + ad.impl.ishop.constants.YIHAODIAN_SUFFIX;
    productName.setAttribute('title', baidu.string.encodeHTML(data['name']));

    var productNameWrapper = baidu.g('ishop-detail-name-wrapper');
    if(productName.offsetHeight > 54){
        productNameWrapper.style.height = '54px';
    } else {
        productNameWrapper.style.height = 'auto';
    }


    // 价格行
    var priceContainer = baidu.q('ishop-detail-prices', root)[0];
    var currentPrice = priceContainer.getElementsByTagName('strong')[0];
    currentPrice.innerHTML = baidu.string.encodeHTML(data['price']);

    var originalPrice = baidu.g('ishop-original-price');
    var saving = priceContainer.getElementsByTagName('em')[0];
    if(data['original_price']){
        originalPrice.innerHTML = baidu.string.encodeHTML(
            data['original_price']
        );
        baidu.dom.show(originalPrice);
        saving.innerHTML = baidu.string.encodeHTML(
            '节省' + (parseFloat(
                data['original_price']) - parseFloat(data['price'])
            ).toFixed(2)
        );
        baidu.dom.show(saving);
    } else {
        baidu.dom.hide(originalPrice);
    }


    // 来源
    var vendorIcon = baidu.q('ishop-detail-vendor-icon', root)[0],
        vendorText = baidu.q('ishop-detail-vendor', root)[0];

    vendorText.innerHTML = baidu.string.encodeHTML(data['vendor']);

    // Attributes
    var attrHtml = [],
        attrItem,
        attrContainer = baidu.q('ishop-detail-attrs')[0];
    for(var i = 0, l = data['attributes'].length; i < l && i < 4; i++){
        attrItem = data['attributes'][i];
        attrHtml.push(
            '<span class="ishop-detail-attrs-item" title="'
            + baidu.string.encodeHTML(attrItem['key']
            + '：'
            + attrItem['value'])
            + '">'
            + baidu.string.encodeHTML(attrItem['key']
            + '：'
            + attrItem['value'])
            +  '</span>'
        );
    }
    attrHtml.push('<div class="clear"></div>');
    attrContainer.innerHTML = attrHtml.join('');

    // 描述信息
    var descContainer = baidu.q('ishop-detail-desc-text')[0],
        descHtml = [];
    if(data['attributes'].length > 4){
        descHtml.push([
            '<div class="ishop-detail-desc-item">',
                '<div class="ishop-detail-desc-h">商品属性</div>'
        ].join(''));
        var leftHtml = ['<div class="ishop-detail-desc-attrs">'],
            rightHtml = ['<div class="ishop-detail-desc-attrs">'],
            html;
        for(var i = 4, l = data['attributes'].length; i < l; i++){
            attrItem = data['attributes'][i];
            html = '<div class="ishop-detail-desc-attr">'
                + attrItem['key'] + '：' + attrItem['value'] + '</div>';
            if(i % 2){
                rightHtml.push(html);
            } else {
                leftHtml.push(html);
            }
        }
        leftHtml.push('</div>');
        rightHtml.push('</div>');
        descHtml.push(leftHtml.join(''));
        descHtml.push(rightHtml.join(''));
        descHtml.push('</div>');
    }
    descHtml.push([
        '<div class="ishop-detail-desc-item">',
            '<div class="ishop-detail-desc-h">商品特点</div>',
            '<div class="ishop-detail-desc-t">',
                baidu.string.encodeHTML(data['desc']),
            '</div>',
        '</div>'
    ].join(''));
    descContainer.innerHTML = descHtml.join('');

    // 显示大图
    var imageContainer = baidu.q('ishop-detail-left')[0];
    imageContainer.innerHTML = [
        '<a class="ishop-detail-image-link" href="',
            data['product_url'],
            ad.impl.ishop.constants.YIHAODIAN_SUFFIX,
            '" target="_blank">',
            '<img src="' + data['gallery'][0] + '" />',
        '</a>'
    ].join('');

    // 根据是否存在fare_free_offset字段来决定是否显示
    // 为负数表示不免运费，0表示免运费，整数表示满多少免运费
    var fareFreeOffset = parseFloat(data['fare_free_offset']);
    /*
    if(fareFreeOffset === 0){
        // 免运费
    }
    */
    if(fareFreeOffset > 0){
        var fareFreeOffsetDom = baidu.g('ishop-detail-tag-fare');
        fareFreeOffsetDom.style.display = 'inline';
        var fareDom = baidu.g('ishop-detail-tag-fare-offset');
        fareDom.innerHTML = fareFreeOffset;
    }

    if(!opt_hasLog) {
        window['_hmt'].push([
            '_trackPageview',
            '/app/' + me.name + '?query=' + encodeURIComponent(me._query)
        ]);
    }
};























/* vim: set ts=4 sw=4 sts=4 tw=100 : */
