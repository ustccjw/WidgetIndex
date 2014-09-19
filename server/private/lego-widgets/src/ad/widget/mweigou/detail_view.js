/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/mweigou/detail_view.js ~ 2013/04/02 17:57:02
 * @author pengxing@baidu.com (pengxing)
 * @version $Revision: 10927 $
 * @description
 * detail_view相关的实现逻辑
 **/

goog.require('ad.widget.Widget');
goog.require('ad.impl.weigou.user');
goog.require('ad.impl.weigou.dal');

goog.include('ad/widget/mweigou/detail_view.less');
goog.include('ad/widget/mweigou/detail_view.html');

goog.provide('ad.widget.mweigou.DetailView');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @param {boolean=} opt_focus 是否要自动对焦.
 * @extends {ad.widget.Widget}
 */
ad.widget.mweigou.DetailView = function(data, opt_focus) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_mweigou_detail_view';

    this.name = 'detail';

    /**
     * 商品详细数据
     * @type {Object}
     */
    this.data = data;

    /**
     * 是否自动对焦
     * @type {boolean|undefined}
     */
    this.focus = opt_focus;

    /**
     * 商品的DOM容器
     * @type {Zepto}
     */
    this.$_container = null;

    /**
     * detail view的根节点
     * @type {Zepto}
     */
    this.$_root = null;

    /**
     * 元素对象缓存，用g方法获取过的元素引用会保存在这里
     * @type {Object.<string, Zepto>}
     */
    this.elemCache = {};

    /**
     * 商品详情信息的行高
     * @type {number}
     * @const
     */
    this.ATTRIBUTES_LINE_HEIGHT = 22;

    /**
     * 商品详情信息的初始高度
     * 目前是最大6行
     * @type {number}
     * @const
     */
    this.INIT_ATTRIBUTES_HEIGHT = this.ATTRIBUTES_LINE_HEIGHT * 6;

    /**
     * 商品详情信息的最大高度
     * @type {number}
     */
    this.maxAttributesHeight = 0;
};
baidu.inherits(ad.widget.mweigou.DetailView, ad.widget.Widget);

/** @override */
ad.widget.mweigou.DetailView.prototype.enterDocument = function() {
    ad.widget.mweigou.DetailView.superClass.enterDocument.call(this);

    // CODE HERE
    var me = this;

    me.$_root = $(me.getRoot());
    me.$_container = me.$_root.find('.ec-sg-weigou-' + me.name);

    // 从列表页进入详情页时(focus==true)，
    // 如果可视区域顶部比微购顶端要低，就进行自动对焦
    // 然后如果屏幕高度小于400px，就滚动到微购顶部
    // 否则就滚动到微购顶部再向上100px，使"快速购买"按钮位于屏幕中间偏上的位置
    var weigouTop = $('#ec-sg-weigou').offset().top;
    if (me.focus && document.body.scrollTop > weigouTop) {
        var pos = $(window).height() < 400 ? weigouTop : weigouTop - 100;
        document.body.scrollTop = Math.max(0, pos);
    }
};

/** @override */
ad.widget.mweigou.DetailView.prototype.bindEvent = function() {
    ad.widget.mweigou.DetailView.superClass.bindEvent.call(this);

    // CODE HERE
    var me = this;

    // 加载"商品详情"
    me.loadAttributes();

    // 点击"快速购买"
    me.g('buy').on('click', function() {
        me.delayTrigger(ad.impl.weigou.events.PURCHASE_VIEW, me.data);
        me.goTop();
        return false;
    });

    // 点击"点击展开更多详情"
    me.g('more').on('click', function() {
        me.expandInfoHeight();
        return false;
    });

    // 回到顶部
    me.g('top').on('click', function() {
        me.goTop();
        return false;
    });

    $(window).on('scroll', function() {
        me.toggleGoTopButton();
    });
};

/**
 * 根据名字获取页面元素
 * @param {string} itemName 名字（例如className是ec-sg-weigou-viewname-x的元素的名字就是x）
 * @return {Zepto} 元素的Zepto对象
 */
ad.widget.mweigou.DetailView.prototype.g = function(itemName) {
    var me = this;

    return me.elemCache[itemName]
        || (me.elemCache[itemName] 
            = me.$_container.find('.ec-sg-weigou-' + me.name + '-' + itemName)
        );
};

/**
 * 回到应用顶部
 */
ad.widget.mweigou.DetailView.prototype.goTop = function() {
    document.body.scrollTop = $('#ec-sg-weigou').offset().top - 10;
};

ad.widget.mweigou.DetailView.prototype.loadAttributes = function() {
    var me = this;

    // 如果属性数量超过两个，就要向服务端单独请求一次全部属性
    if (me.data['attribute_count'] > 2) {
        var region = ad.impl.weigou.user.getRegion();
        ad.impl.weigou.dal.attribute(me.data['id'], region, function(data) {
            if (data['success'] == 'true' && data['result'].length > 0) {
                me.data['attributes'] = data['result'];
            }
            me.showAttributes();
        });
    }
    else {
        me.showAttributes();
    }
};

ad.widget.mweigou.DetailView.prototype.showAttributes = function() {
    var me = this;

    var attr = me.data['attributes'];
    
    // 首先从attr里面把可能出现的'商品名称'和'发货商家'两项去掉
    for (var i = 0, l = attr.length; i < l; i++) {
        if (attr[i].key === '商品名称' 
            || attr[i].key === '发货商家'
        ) {
            attr[i].key = null;
        }
    }

    // 然后把'商品名称'和'发货商家'放到attr的最前面
    attr.unshift({ 'key': '发货商家', 'value': '<span class="ec-sg-weigou-orange">' + me.data['vendor'] + '</span>' });
    attr.unshift({ 'key': '商品名称', 'value': me.data['name'] });

    // 拼接商品属性的html
    var infoHtml = '';
    for (var i = 0, l = attr.length; i < l; i++) {
        if (attr[i].key) {
            infoHtml += ''
                + '<dt class="ec-sg-weigou-detail-info-key">' + attr[i].key + '</dt>'
                + '<dt>：</dt>'
                + '<dd class="ec-sg-weigou-detail-info-value">' + attr[i].value + '</dd>';
        }
    }
    me.g('info').html(infoHtml);

    // 善后工作
    me.fixInfoValueHeight();
    me.initInfoHeight();
    me.locateGoTopButton();
};

/**
 * 如果商品详情的value超过3行，会使用-webkit-line-clamp:3做截断
 * 这可能导致高度变为62px，需要修复成66px（整数倍的line-height）
 * 在初始化详情区域高度之前，要先做这个修复
 */
ad.widget.mweigou.DetailView.prototype.fixInfoValueHeight = function() {
    var me = this;

    this.g('info-value').each(function(i, elem) {
        var h = $(elem).height();
        if (h % me.ATTRIBUTES_LINE_HEIGHT !== 0) {
            h = Math.ceil(h / me.ATTRIBUTES_LINE_HEIGHT) * me.ATTRIBUTES_LINE_HEIGHT;
            $(elem).height(h);
        }
    });
};

/**
 * 初始化详情区域高度
 * 如果内容过多就需要截断，使详情仅展现在一屏内
 */
ad.widget.mweigou.DetailView.prototype.initInfoHeight = function() {
    var me = this;

    // 详情区域的最大高度
    me.maxAttributesHeight = (/** @type {number} */ me.g('info').height()); 

    if (me.maxAttributesHeight > me.INIT_ATTRIBUTES_HEIGHT) {
        me.g('info').height(me.INIT_ATTRIBUTES_HEIGHT);
        me.g('more').show();
    }
};

/**
 * 增加详情信息区域高度
 */
ad.widget.mweigou.DetailView.prototype.expandInfoHeight = function() {
    var me = this;

    // 每次展开一屏的高度（留一行的余量）
    var heightInc = $(window).height() - me.g('more').height() - me.ATTRIBUTES_LINE_HEIGHT;
    heightInc = Math.floor(heightInc / me.ATTRIBUTES_LINE_HEIGHT) * me.ATTRIBUTES_LINE_HEIGHT;
    var infoCurrentHeight = me.g('info').height();
    var newHeight = infoCurrentHeight + heightInc;
    me.g('info').height(Math.min(me.maxAttributesHeight, newHeight));

    // 如果已经全部展现，则隐藏按钮
    if (newHeight >= me.maxAttributesHeight) {
        me.g('more').hide();
    }

    // 扩展之后要对"返回顶部"按钮做重新定位
    me.locateGoTopButton();
};

/**
 * 控制"返回顶部"按钮的显示
 */
ad.widget.mweigou.DetailView.prototype.toggleGoTopButton = function() {
    var me = this;

    if ($('#ec-sg-weigou').offset().top < document.body.scrollTop) {
        me.g('top').show();
    }
    else {
        me.g('top').hide();
    }
};

/**
 * 控制"返回顶部"按钮的位置
 */
ad.widget.mweigou.DetailView.prototype.locateGoTopButton = function() {
    var me = this;

    // 按钮高度40px，间距10px
    var p = me.$_container.height() - me.g('more').height() - 40 - 10;

    me.g('top').css('top', p);
};


















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
