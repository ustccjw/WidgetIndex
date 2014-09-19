goog.require('app.log.send');

goog.require('ad.impl.ishop.urls');
goog.provide('ad.impl.ishop.Log');

/**
 * @constructor
 */
ad.impl.ishop.Log = function(query, viewManager){
    var me = this;

    /**
     * 当前被点击的目标
     * @type {Node}
     */
    this._target;
    /**
     * 统计均需要包含的数据
     * @type {Object}
     */
    this._defaultData = {
        'query': (query ? query : '')
    };

    /**
     * class名与统计数据的map
     */
    this._logClass = {
        'ishop-view-container-back': {
            'item': 'back-btn'
        },

        // header
        'ishop-header-more-link': {
            'item': 'more-link'
        },

        // list 
        'ishop-item-logo': {
            'item': 'icon-goto-detail',
            'position': function(target){
                return me._logUtils['position'].call(this, target, 'ishop-item-logo')
            }
        },
        'ishop-item-name': {
            'item': 'name-goto-detail',
            'position': function(target){
                return me._logUtils['position'].call(this, target, 'ishop-item-name')
            }
        },

        // detail
        'ishop-detail-image-link': {
            'item': 'image-link',
            'tongji': function(){
                var id = viewManager.getCurrentView()['currentProduct']['id'];
                window['_hmt'].push(['_trackEvent', 'landing-page', query, id])
                return {};
            }
        },
        'ishop-detail-name': {
            'item': 'name-link',
            'tongji': function(){
                var id = viewManager.getCurrentView()['currentProduct']['id'];
                window['_hmt'].push(['_trackEvent', 'landing-page', query, id])
                return {};
            }
        },
        'ishop-detail-btn-purchase': {
            'item': 'buy-btn'
        },
        'ishop-detail-item': {
            'item': 'switch-btn',
            'position': function(target){
                return me._logUtils['position'].call(this, target, 'ishop-detail-item')
            }
        },

        // purchase
        'ishop-purchase-count-minus': {
            'item': 'minus-btn'
        },
        'ishop-purchase-count-plus': {
            'item': 'plus-btn'
        },
        'ishop-purchase-delivery-range': {
            'item': 'delivery-range-link'
        },
        'vcode-refresh': {
            'item': 'change-vcode'
        },
        'ishop-purchase-get-mobile-code': {
            'item': 'get-mobile-vcode-btn'
        },
        'ishop-purchase-submit-btn': {
            'item': 'submit-order-btn'
        },
        'restore-btn': {
            'item': 'restore-addr-btn'
        },

        // success
        'ishop-success-link': {
            'item': 'midpage-link'
        }
    };

    this._logData = {};

    this._viewManager = viewManager;

    this.bindMouseDownEvent();
};


/**
 * 绑定鼠标点击事件
 */
ad.impl.ishop.Log.prototype.bindMouseDownEvent = function(){
    var me = this;
    baidu.on(document.body, 'mousedown', function(event){
        event = event || window.event;
        var target = event.srcElement || event.target;
        me._target = target;
        var view = me._viewManager.getCurrentView();

        me.collectData();
        if(me.checkData()){
            // 附加自动添加的字段

            // 记录当前所在页面
            me.addLogData({
                'view': view.name
            });

            // 检测当前点击是否需要data-id;
            var loops = 8;
            var id;
            while(loops > 0){
                if(id = target.getAttribute('data-id')){
                    break;
                }
                target = target.parentNode;
                if(!target){
                    return;
                }
                loops--;
            }

            if(!id){
                // 查看当前是什么view
                if(view.name === 'detail'){
                    id = view['currentProduct']['id'];
                } else if(view.name === 'purchase'){
                    id = view._data['id'];
                } else if(view.name === 'success'){
                    id = view._data['id'];
                }
            }
            if(id){
                me.addLogData({
                    'id' : id
                });
            }

            me.sendLog(me._logData);
        }
    });
};

/**
 * 收集数据
 */
ad.impl.ishop.Log.prototype.collectData = function(){
    var me = this;

    me.clearLogData();

    var target = me._target;
    var view = me._viewManager.getCurrentView();

    while(target != document.body){
        var classes = target.className.split(/\s+/);
        var cls;
        var key;
        var value;
        var result;
        for(var i = 0, l = classes.length; i < l; i++){
            cls = classes[i];
            if(cls in me._logClass){
                for(key in me._logClass[cls]){
                    value = me._logClass[cls][key];
                    if(typeof(value) === 'function'){
                        // 配置项中是函数
                        result = value.call(view, target);
                        me.addLogData(result);
                    } else if('string number'.indexOf(typeof(value)) !== -1) {
                        result = {};
                        result[key] = value;
                        me.addLogData(result);
                    }
                }
            }
        }
        target = target.parentNode;
    }

};

/**
 * 分析数据的准确性
 */
ad.impl.ishop.Log.prototype.checkData = function(){
    var me = this;
    var items = ['item'];
    var isOk = true;
    for(var value in items){
        value = items[value];
        if(!(value in me._logData)){
            isOk = false;
            break;
        }
    }

    return isOk;
};

/**
 * 清除上次统计的数据
 */
ad.impl.ishop.Log.prototype.clearLogData = function(){
    var me = this;
    me._logData = {};
};


/**
 * @param {Object} data 需要统计的键值对
 */
ad.impl.ishop.Log.prototype.addLogData = function(data){
    var me = this;
    if(!data){
        return;
    }

    for(var key in data){
        me._logData[key] = data[key];
    }
};

/**
 * 发送统计
 */
ad.impl.ishop.Log.prototype.sendLog = function(data){
    var me = this;
    for(var key in me._defaultData){
        data[key] = me._defaultData[key];
    }

    // 拼装url
    var query = [];
    for(var key in data){
        query.push(key + '=' + encodeURIComponent(data[key]));
    }
    query = ad.impl.ishop.urls.LOG_URL + '?' + query.join('&');
    app.log.send(query);
};


ad.impl.ishop.Log.prototype._logUtils = {

    'position': function(target, className){
        var view = this;
        var root = view.getRoot();
        var items = baidu.q(className, root);
        var position;
        for(var i = 0, l = items.length; i < l; i++){
            if(items[i] == target){
                position = i + 1;
                break;
            }
        }
        return ({
            'position': position
        });
    }
};
