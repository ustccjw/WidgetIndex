/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/weigou/view_container.js ~ 2013/03/04 14:01:18
 * @author pengxing@baidu.com (pengxing)
 * @version $Revision: 10927 $
 * @description
 * view_container相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/weigou/view_container.less');

goog.provide('ad.widget.weigou.ViewContainer');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.weigou.ViewContainer = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 存放view的容器
     * @type {Element}
     */
    this._container;

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
     * 返回按钮的Button DOM
     * @type {Element}
     */
    this._backBtn;

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_weigou_view_container';
};
baidu.inherits(ad.widget.weigou.ViewContainer, ad.widget.Widget);

/** @override */
ad.widget.weigou.ViewContainer.prototype.enterDocument = function() {
    ad.widget.weigou.ViewContainer.superClass.enterDocument.call(this);

    this._container = baidu.dom.q('ecl-weigou-view-container', this.getRoot(), 'div')[0];

    this._backBtn = baidu.g('ecl-weigou-back-btn');

    this._addressSelector = baidu.g('ecl-weigou-address');

    var link = ad.impl.weigou.constants.WEIGOU_DOMAIN
        + ad.impl.weigou.urls.ORDER_LINK;
    this._orderLink = baidu.g('ecl-weigou-header-order-list');
    this._orderLink.href = link;
};

/** @override */
ad.widget.weigou.ViewContainer.prototype.bindEvent = function() {
    var me = this;
    ad.widget.weigou.ViewContainer.superClass.bindEvent.call(me);

    var root = me.getRoot();

    ad.impl.weigou.dom.on(me._backBtn, 'click', function() {
        if(me._views.length > 1) {
            me.remove();
        }
    });

    var selector = baidu.q('ecl-weigou-address-selector', root)[0];
    var addressDom = baidu.q('ecl-weigou-address-content', root)[0];
    if(selector) {
        var picker = baidu.g('ecl-weigou-address-picker');
        var isPickerShow = false;
        var firstShow = false;
        var hideSelector = function() {
            picker.style.display = 'none';
            isPickerShow = false;
        };
        ad.impl.weigou.dom.on(document.body, 'click', function(event) {
            if(!isPickerShow || firstShow) {
                firstShow = false;
                return;
            }
            event = event || window.event;
            var target = event.srcElement || event.target;

            var on = false;
            while(target !== document.body){
                if(target === picker) {
                    on = true;
                    break;
                }
                target = target.parentNode;
            }
            if(!on) {
                hideSelector();
            }
        });
        ad.impl.weigou.dom.on(selector, 'click', function(event) {
            if(picker.style.display === 'block') {
                hideSelector();
            } else {
                picker.style.display = 'block';
                isPickerShow = true;
                firstShow = true;
            }
        });
        var closeBtn = picker.getElementsByTagName('b')[0];
        if(closeBtn) {
            ad.impl.weigou.dom.on(closeBtn, 'click', function() {
                hideSelector();
            });
        }
        ad.impl.weigou.dom.on(picker, 'click', function(event) {
            event = event || window.event;
            var target = event.srcElement || event.target;
            if(target.nodeName === 'A') {
                me.trigger(
                    ad.impl.weigou.events.REGION_CHANGED,
                    baidu.string.trim(target.innerHTML)
                );
                addressDom.innerHTML = target.innerHTML;
                hideSelector();
            }
        });

    }

};

/**
 * @param {ad.widget.Widget} view 需要添加到container中的view
 * @param {Element=} opt_element 给view直接赋值一个DOM节点
 * @param {boolean=} opt_isExist 表示该element是否在_container中已经存在
 */
ad.widget.weigou.ViewContainer.prototype.add = function(view, opt_element, opt_isExist) {
    var me = this;

    if (!view) {
        return;
    }

    if (opt_element) {
        var container = opt_element;
    } else {
        var container = document.createElement('div');
        container.className = "ecl-weigou-view";
        baidu.dom.setStyles(container, {
            'display': 'none'
        });
    }

    if (!opt_isExist) {
        // 如果已经存在，不进行appendChild操作
        me._container.appendChild(container);
    }

    me._views.push(view);
    view.setRoot(container);
    if(!opt_isExist) {
        view.render();
    }
    view.enterDocument();

    if(me._views.length !== 1) {
        var prevDom = me._currentView.getRoot();
        baidu.dom.hide(prevDom);
        // 暂时隐藏掉这个返回按钮
        if (ad.impl.weigou.dist.IPAD) {
            me._backBtn.style.display = 'block';
        }

        // 隐藏我的订单链接
        baidu.dom.hide(this._orderLink);
    }

    baidu.dom.show(container);

    me._currentView = view;

    if(view.name === 'list') {
        me._addressSelector.style.display = 'block';
    } else {
        baidu.dom.hide(me._addressSelector);
    }

    if(view.name === 'success') {
        baidu.dom.hide(me._backBtn);
        var root = view.getRoot();
        root.scrollIntoView();
    }

    // 最后绑定事件
    view.bindEvent();
}

ad.widget.weigou.ViewContainer.prototype._delete = function(view) {
    var me = this;
    view.dispose();
    baidu.dom.remove(view.getRoot());

    if(me._views.length) {
        me._currentView = me._views[me._views.length - 1];
        baidu.dom.show(me._currentView.getRoot());
        if(me._views.length == 1) {
            me._backBtn.style.display = 'none';

            // 显示我的订单链接
            baidu.dom.show(this._orderLink);
        }
    }
    if(me._currentView.name === 'list') {
        me._addressSelector.style.display = 'block';
    } else {
        baidu.dom.hide(me._addressSelector);
    }

};

ad.widget.weigou.ViewContainer.prototype.remove = function() {
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
ad.widget.weigou.ViewContainer.prototype.customRemove = function(index) {
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
ad.widget.weigou.ViewContainer.prototype.getCurrentView = function() {
    return this._currentView;
};

ad.render.Template.setImpl(function(template, data){
    var html = ad.impl.weigou.util.tmpl(template, data);
    return /** @type {string} */ (html);
});














/* vim: set ts=4 sw=4 sts=4 tw=100: */
