/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/mweigou/list_view.js ~ 2013/04/02 17:56:58
 * @author pengxing@baidu.com (pengxing)
 * @version $Revision: 10927 $
 * @description
 * list_view相关的实现逻辑
 **/

goog.require('ad.widget.Widget');
goog.require('ad.impl.weigou.dal');

goog.include('ad/widget/mweigou/list_view.less');
goog.include('ad/widget/mweigou/list_view.html');

goog.provide('ad.widget.mweigou.ListView');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.mweigou.ListView = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 给商品列表使用的tpl name
     * @type {string}
     */
    this._productView = 'ec_sg_weigou_list_product';

    /**
     * 当前view的名字，用于识别和统计
     * @type {string}
     */
    this.name = 'list';

    /**
     * 配置项，包括分页每页的数量
     * @type {Object}
     */
    this._conf = {
        'pageSize': 3,
        'pageNo': 1
    };

    /**
     * 商品的DOM容器
     * @type {Zepto}
     */
    this.$_container = null;

    /**
     * list view的根节点
     * @type {Zepto}
     */
    this.$_root = null;
};
baidu.inherits(ad.widget.mweigou.ListView, ad.widget.Widget);

/** @override */
ad.widget.mweigou.ListView.prototype.enterDocument = function() {
    var me = this;
    ad.widget.mweigou.ListView.superClass.enterDocument.call(me);

    me.$_root = $(me.getRoot());
    me.$_container = me.$_root.find('.ec-sg-weigou-list');

};

/** @override */
ad.widget.mweigou.ListView.prototype.bindEvent = function() {
    var me = this;
    ad.widget.mweigou.ListView.superClass.bindEvent.call(me);

    // 给加载更多按钮绑定事件
    me.$_root.find('.ec-sg-weigou-list-morebtn').click(function() {
        me.load();
    });

    // 给select绑定onchange事件
    me.$_root.find('select').change(function() {
        var select = this;
        ad.impl.weigou.user.setRegion(select.value);

        // 把pageNo还原回0
        me._conf['pageNo'] = 0;
        me.load(true);
        me.sendLog('region-picker');
    });

    me.dynamicBind($('.ec-sg-weigou-list-item'));
};

/**
 * 给list绑定事件
 * @param {!Zepto} nodes
 */
ad.widget.mweigou.ListView.prototype.dynamicBind = function(nodes) {
    var me = this;
    nodes.filter('.ec-sg-weigou-list-item').click(function() {
        var item = $(this);
        me.delayTrigger(ad.impl.weigou.events.DETAIL_VIEW, item.data('id'));
    });
    /*
     *nodes.find('.ec-sg-weigou-item-name').each(function(index, nameDom){
     *    nameDom = $(nameDom);
     *    var title = nameDom.attr('title');
     *    title = ad.impl.weigou.util.ellipsis(title, 58);
     *    nameDom.html(title);
     *});
     */
};

/**
 * @param {boolean=} opt_refresh 如果为true，则先清空list里面的商品
 */
ad.widget.mweigou.ListView.prototype.load = function(opt_refresh) {
    var me = this;

    var loading = $('<div class="ec-sg-weigou-list-loading">加载中...</div>');

    if(opt_refresh) {
        // 直接替换list中的内容
        loading.appendTo(me.$_container.empty());
    } else {
        loading.appendTo(me.$_container);
    }

    var params = {};
    params['region'] = ad.impl.weigou.user.getRegion();
    // pn表示从哪个下标开始，0为最开始，检索端pn必须能被rn整除！！
    params['pn'] = (me._conf['pageNo']) * me._conf['pageSize'];
    // rn表示每页多少个商品
    params['rn'] = me._conf['pageSize'];
    ad.impl.weigou.dal.search(params, function(data) {
        if(data['success'] === 'true') {
            if(data['page']['result'].length === 0) {
                me.$_container.html([
                    '<div class="ec-sg-weigou-list-noresult">',
                        '抱歉，该商品在您选择的区域已售空。',
                    '</div>'
                ].join(''));
                me.$_root.find('.ec-sg-weigou-list-morebtn').hide();
                return;
            }
            var html = ad.render.Template(
                me.tpl(me._productView), data['page']
            );

            var nodes = $(html);

            // 绑定点击事件
            me.dynamicBind(nodes.filter('.ec-sg-weigou-list-item'))

            if(opt_refresh) {
                me.$_container.empty().append(nodes);
            } else {
                // 删除loading节点
                loading.remove();
                me.$_container.append(nodes);
            }

            me._conf['pageNo'] = data['page']['pageNo'];
            // 如果已经在末尾页了，就隐藏查看更多按钮
            if(me._conf['pageNo'] * me._conf['pageSize'] >= data['page']['totalCount']) {
                me.$_root.find('.ec-sg-weigou-list-morebtn').hide();
            } else {
                me.$_root.find('.ec-sg-weigou-list-morebtn').show();
            }

        } else {
            // TODO 处理加载商品失败的情况，需要和UE确认处理失败情况的样式
            // 加载失败也要删除loading
            loading.remove();
        }
    });
};




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
