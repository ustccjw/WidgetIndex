/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/weigou/list_view.js ~ 2013/03/04 14:04:41
 * @author pengxing@baidu.com (pengxing)
 * @version $Revision: 10927 $
 * @description
 * list_view相关的实现逻辑
 **/

goog.require('ad.widget.Widget');
goog.require('ad.impl.weigou.events');

goog.include('ad/widget/weigou/list_view.less');
goog.include('ad/widget/weigou/list_view.html');

goog.provide('ad.widget.weigou.ListView');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.weigou.ListView = function(data) {
    ad.widget.Widget.call(this, data);


    /**
     * 分页条的相关数据
     */
    this.pager = {};

    /**
     * 当前用户选中的城市
     * @type {string}
     */
    this.region = '';

    /**
     * 保存在全局，过滤器的值
     * @type {Object}
     */
    this.filters = {};

    /**
     * 保存了一些到处都要用的DOM元素，在enterDocument方法中会放到这里来
     */
    this.doms = {};

    /**
     * 最大多少页
     * @type {number}
     */
    this.MAX_PAGE = 5;

    /**
     *
     */
    this.productView = 'ecl_weigou_list';

    this.productView2 = 'ecl_weigou_list2';

    this.name = 'list';

    if(data['region']) {
        this.region = data['region'];
    }
};
baidu.inherits(ad.widget.weigou.ListView, ad.widget.Widget);

/** @override */
ad.widget.weigou.ListView.prototype.enterDocument = function() {
    var me = this;
    ad.widget.weigou.ListView.superClass.enterDocument.call(me);

    var root = me.getRoot();

    /*
    // 初始化this.filters
    var filters = baidu.q('ecl-weigou-filter', root);
    var filter;
    for(var i = 0, length = filters.length; i < length; i++) {
        filter = filters[i];
        me.filters[filter.getAttribute('data-key')] = '全部';
    }
    me.doms['filters'] = filters;
    */

    me.doms['container'] = baidu.q('ecl-weigou-product-list')[0];
    me.doms['pager'] = baidu.q('ecl-weigou-pager')[0];

    me.pager['totalCount'] = me._data['totalCount'];
    me.pager['pageNo'] = 1;
    me.pager['pageSize'] = 8;
};

/** @override */
ad.widget.weigou.ListView.prototype.bindEvent = function() {
    var me = this;
    ad.widget.weigou.ListView.superClass.bindEvent.call(me);

    var root = me.getRoot();

    /*
    // 给filters绑定事件，触发时刷新数据
    var filters = me.doms['filters'];
    var filter;
    var lis;
    var key;
    for(var i = 0, length = filters.length; i < length; i++) {
        filter = filters[i];
        key = filter.getAttribute('data-key');
        ad.impl.weigou.dom.on(filter, 'click', function(event) {
            event = event || window.event;
            var target = event.srcElement || event.target;
            if(target.nodeName === 'LI' && !baidu.dom.hasClass(target, 'selected')) {
                me.filters[key] = baidu.string.trim(target.innerHTML);
                me.change();

                // 更改当前选项的class，并且去掉其他的selected
                var selected = baidu.q('selected', target.parentNode)[0];
                baidu.dom.removeClass(selected, 'selected');
                baidu.dom.addClass(target, 'selected');
            }
        });
    }
    */
    
    var moreBtn = baidu.q('ecl-weigou-morebtn', root)[0];
    if(moreBtn) {
        ad.impl.weigou.dom.on(moreBtn, 'click', function() {
            var productListDom = baidu.q('ecl-weigou-product-list', root)[0];
            if(productListDom) {
                baidu.dom.setStyles(productListDom, {
                    'height': 'auto'
                });
            }
            /*
            var params = {
                'rn': 8,
                'pn': 4
            };

            // 把过滤器添加到参数中
            baidu.object.extend(params, me.filters);
            // 把地区添加到参数
            if(me.region) {
                params['region'] = me.region;
            }

            ad.impl.weigou.dal.search(params, function(data) {
                if(data['success'] === 'true') {
                    var dom = document.createElement('div');
                    dom.innerHTML = ad.impl.weigou.util.tmpl(
                        me.tpl(me.productView), data['page']
                    );
                    me.dynamicBind(dom);
                    var items = baidu.q('ecl-weigou-product', dom);
                    baidu.each(items, function(item) {
                        me.doms['container'].appendChild(item);
                    });

                    me.pager['totalCount'] = data['page']['totalCount'];
                    me.pager['pageNo'] = 1;
                    me.pager['pageSize'] = 8;
                    me.refreshPager();
                }
            });
            */
            me.refreshPager();
            baidu.dom.hide(moreBtn);
        });
    }

    // 监听地址变化的事件
    me.addListener(ad.impl.weigou.events.REGION_CHANGED, function(region) {
        if(region === me.region) {
            return;
        }
        
        me.region = region;
        me.change();
    });


    if(me.doms['pager']) {
        // 绑定pager的事件
        ad.impl.weigou.dom.on(me.doms['pager'], 'click', function(event) {
            event = event || window.event;
            var target = event.srcElement || event.target;
            if(target.nodeName === 'A' 
                && !baidu.dom.hasClass(target, 'selected')) {
                var page = parseInt(baidu.string.trim(target.innerHTML), 10);
                me.change(page);

                var selected = baidu.q('selected', me.doms['pager'])[0];
                baidu.dom.removeClass(selected, 'selected');
                baidu.dom.addClass(target, 'selected');
            }
            baidu.event.preventDefault(event);
        });
    }


    // 绑定items的鼠标移进移出和点击事件
    me.dynamicBind();
};

/**
 * 绑定事件
 * @param {Element=} opt_root
 */
ad.widget.weigou.ListView.prototype.dynamicBind = function(opt_root) {
    var me = this;
    var root = opt_root || me.getRoot();

    var items = baidu.q('ecl-weigou-product', root);
    var classes = [
        'ecl-weigou-product-name',
        'ecl-weigou-product-detail-text',
        'ecl-weigou-font-songti',
        'ecl-weigou-product-image'
    ];
    baidu.each(items, function(item, index) {
        // 处理名称 
        var a = item.getElementsByTagName('a')[0];
        if(!a.innerHTML) {
            var str = a.getAttribute('title');
            var length = 30;

            // 如果是一行两列的情况，title截断为44个字节
            if(me.pager['totalCount'] <= 2) {
                length = 36;
            }
            str = ad.impl.weigou.util.subByte(str, length);
            a.innerHTML = baidu.string.encodeHTML(str);
        }

        // 现在offers不展现了，此处无需再进行截断
        /*
        var offers = baidu.q('ecl-weigou-product-offers', item)[0];
        if(offers && !offers.innerHTML) {
            var title = offers.getAttribute('title');
            title = ad.impl.weigou.util.subByte(title, 8);
            offers.innerHTML = baidu.string.encodeHTML(title);
        }
        */

        var overEvent = 'mouseenter';
        var outEvent = 'mouseleave';
        if(baidu.browser.isWebkit) {
            overEvent = 'mouseover';
            outEvent = 'mouseout';
        }
        ad.impl.weigou.dom.on(item, overEvent, function() {
            baidu.dom.addClass(this, 'mouseover');
        });
        ad.impl.weigou.dom.on(item, outEvent, function() {
            baidu.dom.removeClass(this, 'mouseover');
        });
        ad.impl.weigou.dom.on(item, 'click', function(event) {
            event = event || window.event;
            var target = event.srcElement || event.target;
            var it = this;
            me.trigger(ad.impl.weigou.events.DETAIL_VIEW, it.getAttribute('data-id'));
            /*
            baidu.each(classes, function(cl) {
                if(baidu.dom.hasClass(target, cl)) {
                    me.trigger(
                        ad.impl.weigou.events.DETAIL_VIEW, 
                        it.getAttribute('data-id')
                    );
                }
            });
            */

            //TODO for QA
            /*
            if(baidu.dom.hasClass(target, 'ecl-weigou-send-close')) {
                if(confirm('确定把搜索词 ' + window['bdQuery'] + ' 下的商品：' + baidu.string.decodeHTML(target.getAttribute('data-name')) + ' 加入小黑屋？')) {
                    var url = 'http://db-testing-ecom6206.db01.baidu.com:8888/block/?query=' + encodeURIComponent(window['bdQuery']) + '&goods=' + target.getAttribute('data-id');
                    app.log.send(url);
                }
            }
            */
            baidu.event.preventDefault(event);
        });
    });
};

/**
 * @param {number=} opt_pageNo
 */
ad.widget.weigou.ListView.prototype.change = function(opt_pageNo) {
    var me = this;

    var params = {};

    // 把过滤器添加到参数中
    baidu.object.extend(params, me.filters);

    // 把地区添加到参数
    if(me.region) {
        params['region'] = me.region;
    }
    // 分页数据
    var page = opt_pageNo ? opt_pageNo : 1;
    params['pn'] = (page - 1) * me.pager['pageSize'];
    params['rn'] = me.pager['pageSize'];

    ad.impl.weigou.dal.search(params, function(data) {
        if(data['success'] === 'true') {
            if(data['page'] && data['page']['result'].length !== 0) {
                var html = '';
                if(data['page']['result'].length <= 2 && data['page']['totalCount'] <= 2) {
                    html = ad.impl.weigou.util.tmpl(
                        me.tpl(me.productView2),
                        data['page']
                    );
                    baidu.dom.addClass(me.doms['container'], 'ecl-weigou-product-list2');
                } else {
                    html = ad.impl.weigou.util.tmpl(
                        me.tpl(me.productView),
                        data['page']
                    );
                    baidu.dom.removeClass(me.doms['container'], 'ecl-weigou-product-list2');
                }
                baidu.dom.setStyles(me.doms['container'], {
                    'height': 'auto'
                });
                me.doms['container'].innerHTML = html;
                
            } else {
                me.doms['container'].innerHTML = [
                    '<div class="ecl-weigou-list-noresult">',
                        '抱歉，该商品在您选择的区域已售空。',
                    '</div>'
                ].join('');
            }
            me.pager['totalCount'] = data['page']['totalCount'];
            me.pager['pageNo'] = data['page']['pageNo'];
            me.pager['pageSize'] = 8;
            me.refreshPager();
            me.dynamicBind();
            // 隐藏查看更多按钮
            var root = me.getRoot();
            var moreBtn = baidu.q('ecl-weigou-morebtn', root)[0];
            if(moreBtn) {
                moreBtn.style.display = 'none';
            }
        }
    });
};

/**
 * 刷新pager
 */
ad.widget.weigou.ListView.prototype.refreshPager = function() {
    var me = this;
    if(!me.doms['pager']) {
        return;
    }
    var pager = me.doms['pager'];
    if(me.pager['totalCount'] > me.pager['pageSize']) {
        pager.style.display = 'block';
    } else {
        pager.style.display = 'none';
    }
    var page = Math.ceil(me.pager['totalCount'] / me.pager['pageSize']);
    if(page > me.MAX_PAGE) {
        page = me.MAX_PAGE;
    }

    var html = [];
    for(var i = 1; i <= page; i++) {
        html.push('<a href="javascript:;" data-click="{fm:\'behz\'}" class="OP_LOG_BTN ecl-weigou-pager-item');
        if(i === me.pager['pageNo']) {
            html.push(' selected');
        }
        html.push('">' + i + '</a>');
    }
    pager.innerHTML = html.join('');
};





















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
