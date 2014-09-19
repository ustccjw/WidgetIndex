/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/mweigou/view_container.js ~ 2013/04/02 17:56:53
 * @author pengxing@baidu.com (pengxing)
 * @version $Revision: 10927 $
 * @description
 * view_container相关的实现逻辑
 **/

goog.require('ad.widget.Widget');
goog.require('ad.impl.weigou.util');
goog.require('ad.impl.weigou.dom');

goog.include('ad/widget/mweigou/view_container.less');

goog.provide('ad.widget.mweigou.ViewContainer');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.mweigou.ViewContainer = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 存放view的容器
     * @type {Zepto}
     */
    this.$_container;

    /**
     * 保存view
     * @type {Array}
     */
    this._views = [];

    /**
     * 当前的视图
     * @type {ad.widget.Widget}
     */
    this._currentView;

    /**
     * 返回按钮
     * @private
     * @type {Zepto}
     */
    this.$_backBtn;
};
baidu.inherits(ad.widget.mweigou.ViewContainer, ad.widget.Widget);

/** @override */
ad.widget.mweigou.ViewContainer.prototype.enterDocument = function() {
    var me = this;
    ad.widget.mweigou.ViewContainer.superClass.enterDocument.call();

    var root = me.getRoot();

    me.$_container = $(root).find('.ec-sg-weigou-views');

    $('<a class="ec-sg-weigou-back WA_LOG_BTN" href="javascript:;" style="display:none">返回</a>').appendTo(me.$_container);

    me.$_backBtn = $('.ec-sg-weigou-back');
};

/** @override */
ad.widget.mweigou.ViewContainer.prototype.bindEvent = function() {
    var me = this;
    ad.widget.mweigou.ViewContainer.superClass.bindEvent.call(me);

    me.$_backBtn.click(function() {
        me.delayTrigger(ad.impl.weigou.events.BACK);
    });
};


/**
 * @param {ad.widget.Widget} view 需要添加到container中的view
 * @param {Element=} opt_element 给view直接赋值一个DOM节点
 * @param {boolean=} opt_isExist 表示该element是否在$_container中已经存在
 */
ad.widget.mweigou.ViewContainer.prototype.add = function(view, opt_element, opt_isExist) {
    var me = this;

    if (!view) {
        return;
    }

    var $container = null;
    if (opt_element) {
        $container = $(opt_element);
    } else {
        $container = $('<div></div>').addClass('ec-sg-weigou-view').css('display', 'none');
    }

    if (!opt_isExist) {
        // 如果已经存在，不进行appendChild操作
        me.$_container.append($container[0]);
    }

    me._views.push(view);
    view.setRoot($container[0]);
    if(!opt_isExist) {
        view.render();
    }
    view.enterDocument();

    if(me._views.length !== 1) {
        $(me._currentView.getRoot()).hide();
        me.$_backBtn.show();
    }

    $container.show();

    me._currentView = view;

    if(view.name === 'success') {
        var root = view.getRoot();
        root.scrollIntoView();
    }
    view.bindEvent();

    // FIXME(leeight)
    view.addListener(ui.events.SEND_LOG, function(params){
        var title = params['action'];
        me.trigger(ui.events.SEND_LOG, {
            'view': view.name,
            'item': title
        });
    });
    view.addListener(ad.impl.weigou.events.BACK, function(){
        me.trigger(ad.impl.weigou.events.BACK);
    });

    if(view.name === 'success') {
        me.$_backBtn.hide();
    }
}

ad.widget.mweigou.ViewContainer.prototype._delete = function(view) {
    var me = this;
    view.dispose();
    ad.impl.weigou.dom.remove(view.getRoot());

    if(me._views.length) {
        me._currentView = me._views[me._views.length - 1];
        baidu.dom.show(me._currentView.getRoot());

        if(me._views.length === 1) {
            me.$_backBtn.hide();
        }
    }

};

/**
 * @param {string} targetName 要切换到的卡片名称.
 */
ad.widget.mweigou.ViewContainer.prototype.gotoView = function(targetName) {
    var view = this.getCurrentView();
    var currentName = view.name;

    while(view && currentName !== targetName) {
        this.remove();
        view = this.getCurrentView();
        currentName = view.name;
    }
}

ad.widget.mweigou.ViewContainer.prototype.remove = function() {
    var me = this;

    if (!me._views.length) {
        return;
    }


    var view = me._views.pop();
    me._delete(view);
};

/**
 * 自定义删除view，根据位置
 * @param {number} index
 */
ad.widget.mweigou.ViewContainer.prototype.customRemove = function(index) {
    var me = this;
    var length = me._views.length;
    if (index >= length || index < 0) {
        return;
    }

    if (index === (length - 1)) {
        me.remove();
    } else {
        if (index === 0) {
            var view = me._views.shift();
        } else {
            var view = me._views[index];
            var a1 = me._views.slice(0, index);
            var a2 = me._views.slice(index + 1, length);
            me._views = a1.concat(a2);
        }
        me._delete(view);
    }
};

/**
 * 获取当前的view
 */
ad.widget.mweigou.ViewContainer.prototype.getCurrentView = function() {
    return this._currentView;
};

ad.render.Template.setImpl(function(template, data){
    var html = ad.impl.weigou.util.tmpl(template, data);
    return /** @type {string} */ (html);
});














/* vim: set ts=4 sw=4 sts=4 tw=100: */
