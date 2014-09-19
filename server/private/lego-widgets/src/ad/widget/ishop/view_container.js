/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/ishop/view_container.js ~ 2012/11/19 16:32:15
 * @author pengxing@baidu.com (pengxing)
 * @version $Revision: 10927 $
 * @description
 * view_container相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/ishop/view_container.less');
goog.include('ad/widget/ishop/view_container.html');

goog.provide('ad.widget.ishop.ViewContainer');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.ishop.ViewContainer = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 存放views的container
     * @type {Node}
     */
    this._container;

    /**
     * 维持view的顺序，顺便保存view
     * @type {Array}
     */
    this._views = [];

    /**
     * 表示当前正在展现的view
     * @type {ad.widget.Widget}
     */
    this._currentView;

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_ishop_view_container';
};
baidu.inherits(ad.widget.ishop.ViewContainer, ad.widget.Widget);

/** @override */
ad.widget.ishop.ViewContainer.prototype.enterDocument = function() {
    var me = this;
    ad.widget.ishop.ViewContainer.superClass.enterDocument.call(me);

    me._container = baidu.g('ishop-view-container');
    me._backBtn = baidu.g('ishop-view-container-back');
};

/** @override */
ad.widget.ishop.ViewContainer.prototype.bindEvent = function() {
    var me = this;
    ad.widget.ishop.ViewContainer.superClass.bindEvent.call(me);

    baidu.on(me._backBtn, 'click', function(){
        if(me._views.length > 1){
            me.remove();
        }
    });
};

/**
 * 添加view，此方法会切换view
 * @param {ad.widget.Widget} view 需要添加到栈中的view
 */
ad.widget.ishop.ViewContainer.prototype.add = function(view){
    var me = this;

    if(!view){
        return;
    }

    var container = document.createElement('div');
    container.className = "ishop-view";
    baidu.dom.setStyles(container, {
        'display': 'none'
    });
    me._container.appendChild(container);
    me._views.push(view);

    if(!view._data){
        view._data = {};
    }
    view.setRoot(container);
    view.render();
    view.enterDocument();
    view.bindEvent();

    if(me._views.length != 1){
        var prevDom = me._currentView.getRoot();
        baidu.dom.hide(prevDom);
        me._backBtn.style.display = 'block';
    }
    baidu.dom.show(container);

    me._currentView = view;


    // 采用autoHeight的方式
    // me.resize();

    me.trackPageview(me._currentView);
};

ad.widget.ishop.ViewContainer.prototype._delete = function(view){
    var me = this;
    view.dispose();
    baidu.dom.remove(view.getRoot());
    
    if(me._views.length){
        me._currentView = me._views[me._views.length - 1];
        baidu.dom.show(me._currentView.getRoot());
        if(me._views.length == 1){
            me._backBtn.style.display = 'none';
        }
    }
};

/**
 * 移除栈顶的view
 */
ad.widget.ishop.ViewContainer.prototype.remove = function(){
    var me = this;
    if(!me._views.length){
        return;
    }

    var view = me._views.pop();
    me._delete(view);

    // 采用autoHeight的方式
    // me.resize();

    me.trackPageview(me._currentView);
};

/**
 * 自定义删除scene根据scene所处的index
 * @param {number} index scene所处栈的index
 */ 
ad.widget.ishop.ViewContainer.prototype.customRemove = function(index){
    var me = this;

    var length = me._views.length;
    if(index >= length || index < 0){
        return;
    }
    if(index === (length - 1)){
        me.remove();
    } else {
        if(index === 0){
            me._views = me._views.slice(1, length);
        } else {
            var view = me._views[index];
            var a1 = me._views.slice(0, index);
            var a2 = me._views.slice(index + 1, length);
            me._views = a1.concat(a2);
            me._delete(view);
        }
    }
};


/**
 * 调用baidu app提供的接口对iframe进行resize
 */
ad.widget.ishop.ViewContainer.prototype.resize = function(){
    try {
        window['baidu']['app']['setHeight'](window.document.body.offsetHeight);
    } catch(e){ }
};

/**
 * 自动检测高度是否变化，如果发生变化，则resize
 */
ad.widget.ishop.ViewContainer.prototype.autoHeight = function(){
    var prevHeight = window.document.body.offsetHeight;
    var canvas = baidu.q('canvas')[0].parentNode;
    var intervalHandler = ad.base.setInterval(function(){
        var height = canvas.offsetHeight;
        if(height != prevHeight){
            try {
                window['baidu']['app']['setHeight'](canvas.offsetHeight);
            } catch(e){ }
        }
    }, 
    100);
};


/**
 * 获取当前正在展现的view
 * @return {ad.widget.Widget}
 */
ad.widget.ishop.ViewContainer.prototype.getCurrentView = function(){
    return this._currentView;
};

ad.widget.ishop.ViewContainer.prototype.getViewCount = function(){
    return this._views.length;
};

/**
 * Track Page View
 */
ad.widget.ishop.ViewContainer.prototype.trackPageview = function(view){
    var me = this;

    window['_hmt'].push(['_trackPageview', '/app/' + view.name + '?'
        + 'query=' + encodeURIComponent(me._data['query'])
    ]);
};












/* vim: set ts=4 sw=4 sts=4 tw=100 : */
