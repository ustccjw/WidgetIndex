/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: Log.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/weigou/Log.js ~ 2013/03/04 13:59:08
 * @author pengxing@baidu.com (pengxing)
 * @version $Revision: 11222 $
 * @description
 * weigou的统计请求处理逻辑
 **/
goog.require('ad.impl.weigou.dal');
goog.require('ad.impl.weigou.urls');
goog.require('ad.impl.weigou.dom');
goog.require('app.log.send');

goog.provide('ad.impl.weigou.Log');

/**
 * @constructor
 * @param {string} query 检索词.
 * @param {?} viewManager The view manager.
 * @param {string} tpl The template name.
 * @param {string=} opt_qid Query Id.
 */
ad.impl.weigou.Log = function(query, viewManager, tpl, opt_qid) {
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
        'query': (query ? query : ''),
        // pc: 'ecl_ec_weigou'
        // pc1: 'ecl_ec_weigou_a'
        // mobile: 'ec_weigou'
        // ipad: ?
        'tpl': tpl,
        'qid': opt_qid || window['bdQid'] || ''
    };

    /**
     * class名与统计数据的map
     * @type {Object}
     */
    this._logClass;

    /**
     * @type {Object}
     */
    this._logData = {};

    this._viewManager = viewManager;

    this.initLogClass();

    this.bindMouseDownEvent();
};


/**
 * 初始化需要监控的元素列表.
 */
ad.impl.weigou.Log.prototype.initLogClass = function() {
    if (ad.impl.weigou.dist.MOBILE_1) {
        this._logClass = this._initMobile1LogClass();
    } else if (ad.impl.weigou.dist.MOBILE) {
        this._logClass = this._initMobileLogClass();
    } else {
        this._logClass = this._initDefaultLogClass();
    }
};

/**
 * PC Weigou需要监控的元素列表
 * @return {Object}
 */
ad.impl.weigou.Log.prototype._initDefaultLogClass = function() {
    var logClass = {
        '#ecl-weigou-header-logo-link': {
            'item': 'logo'
        },
        '#ecl-weigou-header-order-list': {
            'item': 'list-link'
        },
        '#ecl-weigou-back-btn': {
            'item': 'return-btn'
        },

        'ecl-weigou-address-selector': {
            'item': 'region-picker'
        },
        'ecl-region': {
            'item': 'region-item',
            'title': function(target) {
                return {'title': target.innerHTML};
            }
        },
        'ecl-weigou-product': {
            'item': 'product-item'
        },
        /*
        'ecl-weigou-product-image': {
            'item': 'product-item-image'
        },
        'ecl-weigou-product-name': {
            'item': 'product-item-name'
        },
        'ecl-weigou-product-detail-text': {
            'item': 'product-item-text'
        },
        */
        'ecl-weigou-pager-item': {
            'item': 'pager',
            'title': function(target) {
                return {'title': target.innerHTML};
            }
        },
        'ecl-weigou-morebtn': {
            'item': 'more-btn'
        },

        '#ecl-weigou-detail-attr-link': {
            'item': 'attrs'
        },
        'ecl-weigou-detail-plus': {
            'item': 'plus'
        },
        'ecl-weigou-detail-minus': {
            'item': 'minus'
        },
        'ecl-weigou-detail-submit': {
            'item': 'large-submit-btn'
        },
        'ecl-weigou-rcmd-gallery-left': {
            'item': 'left-btn'
        },
        'ecl-weigou-rcmd-gallery-right': {
            'item': 'right-btn'
        },
        'ecl-weigou-rcmd-item-bottom': {
            'item': 'rcmd-checkbox'
        },
        'ecl-weigou-rcmd-buy': {
            'item': 'submit-btn'
        },
        'ecl-weigou-rcmd-item-top-true': {
            'item': 'rcmd-image'
        },
        'ecl-weigou-rcmd-item-name-true': {
            'item': 'rcmd-name'
        },

        'ecl-weigou-minus': {
            'item': 'minus'
        },
        'ecl-weigou-plus': {
            'item': 'plus'
        },
        'ecl-weigou-pur-delete': {
            'item': 'delete'
        },
        '#ecl-weigou-get-mobile-code': {
            'item': 'get-vcode-btn'
        },
        '#ecl-weigou-pur-selector': {
            'item': 'address-selector'
        },
        '#ecl-weigou-pur-address-wrapper': {
            'item': 'address-selector-item'
        },
        'ecl-weigou-pur-pick-address': {
            'item': 'address-picker'
        },
        'ecl-weigou-pur-agmt-wrapper': {
            'item': 'agmt-link'
        },
        '#ecl-weigou-pur-submit': {
            'item': 'submit-btn'
        },

        '#ecl-weigou-success-detail': {
            'item': 'list-link'
        },
        '#ecl-weigou-success-pw': {
            'item': 'change-pw-link'
        },
        '#ecl-weigou-success-btn': {
            'item': 'go-on-shopping'
        },

        '#ecl-weigou-pur-return-btn': {
            'item': 'return-btn'
        },
        '#ecl-weigou-detail-return-btn': {
            'item': 'return-btn'
        },
        '#ecl-weigou-pur-check': {
            'item': 'check-btn'
        },
        '#ecl-weigou-change-phone': {
            'item': 'change-mobile-link'
        }
    };

    return logClass;
};

/**
 * Mobile Weigou需要监控的元素列表
 * @return {Object}
 */
ad.impl.weigou.Log.prototype._initMobileLogClass = function() {
    var logClass = {
        // TODO pengxing && wangyang
        //
        'ec-sg-weigou-list-item': {
            'item': 'list-item'
        },
        'ec-sg-weigou-list-morebtn': {
            'item': 'more-item'
        },

        'ec-sg-weigou-detail-buy': {
            'item': 'buy'
        },
        'ec-sg-weigou-top': {
            'item': 'top'
        },
        'ec-sg-weigou-back': {
            'item': 'back'
        },
        'ec-sg-weigou-detail-more': {
            'item': 'more-attr'
        },
        'ec-sg-weigou-purchase-vcode-getter': {
            'item': 'get-vcode'
        },
        'ec-sg-weigou-purchase-vcode-checker': {
            'item': 'check-vcode'
        },
        'ec-sg-weigou-purchase-submit': {
            'item': function(target){
                if (target && target.innerHTML === '确定，查看运费') {
                    return {'item': 'check-btn'}
                }
                return {'item': 'submit'}
            }
        },
        'ec-sg-weigou-purchase-agreement-link': {
            'item': 'agmt-link'
        },
        'ec-sg-weigou-success-continue': {
            'item': 'continue'
        },
        'ec-sg-weigou-success-goto-order-list': {
            'item': 'order-link'
        },
        'ec-sg-weigou-order-link': {
            'item': 'my-order-link'
        },
        'ec-sg-weigou-list-my-orders': {
            'item': 'my-order-link'
        },
        'ec-sg-weigou-purchase-change-mobile': {
            'item': 'change-mobile-link'
        }
    };

    return logClass;
};

/**
 * Mobile1 Weigou需要监控的元素列表
 * @return {Object}
 */
ad.impl.weigou.Log.prototype._initMobile1LogClass = function() {
    var logClass = {
        // TODO (pengxing) 完善logClass
           
        // Common
        'ec-sg-weigou-top': {
            'item': 'top'
        },
        'ec-sg-weigou-back': {
            'item': 'back'
        },


        // List View
        'ec-sg-weigou-list-item': {
            'item': 'list-item'
        },
        'ec-sg-weigou-list-morebtn': {
            'item': 'more-item'
        },

        // Detail View
        'ec-sg-weigou-detail-buy': {
            'item': 'buy'
        },
        'ec-sg-weigou-detail-more': {
            'item': 'more-attr'
        },

        // Login View
        'vcode-getter': {
            'item': 'get-vcode'
        },
        'submit': {
            'item': 'check-vcode'
        },

        // Purchase View
        'ec-sg-weigou-purchase-submit': {
            'item': 'submit'
        },
        'ec-sg-weigou-purchase-check': {
            'item': 'check-btn'
        },
        'ec-sg-weigou-purchase-agreement-link': {
            'item': 'agmt-link'
        },
        'ec-sg-weigou-purchase-select': {
            'item': 'history-addr'
        },
        'ec-sg-weigou-purchase-newaddr-header': {
            'item': 'use-newaddr',
            'close': function(target) {
                target = $(target);
                var actived = false;
                if(target.parents('.ec-sg-weigou-purchase-newaddr').hasClass('ec-sg-weigou-purchase-newaddr-actived')) {
                    actived = true;
                }
                return {'closed': actived ? '1': '0'};
            }
        },
        'ec-sg-weigou-purchase-newaddr-ok': {
            'item': 'newaddr-ok'
        },
        'ec-sg-weigou-purchase-newaddr-cancel': {
            'item': 'newaddr-cancel'
        },
        'ec-sg-weigou-purchase-address-item': {
            'item': 'address-item'
        },

        // Success View
        'ec-sg-weigou-success-continue': {
            'item': 'continue'
        },
        'ec-sg-weigou-success-goto-order-list': {
            'item': 'order-link'
        },


        'ec-sg-weigou-order-link': {
            'item': 'my-order-link'
        },
        'ec-sg-weigou-list-my-orders': {
            'item': 'my-order-link'
        }
    };
    return logClass;
};

/**
 * Get the weigou app root element.
 * @return {!Element}
 */
ad.impl.weigou.Log.prototype.getRoot = function() {
    if (ad.impl.weigou.dist.MOBILE) {
        var wrapper = $('#ec-sg-weigou');
        return wrapper[0];
    } else {
        var wrapper = baidu.g('ecl-weigou-view-container');
        return wrapper;
    }
};

/**
 * @param {Event} event The browser event object.
 */
ad.impl.weigou.Log.prototype._eventHandler = function(event) {
    var me = this;
    var appRoot = this.getRoot();
    var target = event.srcElement || event.target;
    me._target = /** @type {Node} */ (target);
    var view = me._viewManager.getCurrentView();

    me.collectData();
    if (me.checkData()) {
        // 附加自动添加的字段

        // 记录当前所在页面
        me.addLogData({
            'view': view.name
        });

        // 检测当前点击是否需要data-id;
        var loops = 8;
        var id;
        while (loops > 0) {
            if (id = target.getAttribute('data-id')) {
                break;
            }
            target = target.parentNode;
            if (!target || target === appRoot) {
                break;
            }
            loops--;
        }

        if (!id) {
            if (ad.impl.weigou.dist.MOBILE) {
                // 如果当前view不是list的，则加上id参数
                if (view.name !== 'list') {
                    id = view._data['id'];
                }
            } else {
                // 查看当前是什么view
                if (view.name === 'detail') {
                    id = view._data['id'];
                } else if (view.name === 'purchase') {
                    id = '';
                    var root = view.getRoot();
                    var trs = baidu.q('ecl-weigou-pur-item', root);
                    baidu.each(trs, function(tr) {
                        id = id + ';' + tr.getAttribute('data-id');
                    });
                    id = id.substr(1);
                }
            }
        }
        if (id) {
            me.addLogData({
                'id' : id
            });
        }

        me.sendLog(me._logData);
    }
};

/**
 * PC Weigou需要处理的是mousedown事件.
 */
ad.impl.weigou.Log.prototype._bindDefaultEvent = function() {
    var me = this;
    var wrapper = baidu.g('ecl-weigou-view-container');
    ad.impl.weigou.dom.on(wrapper, 'mousedown', function(opt_evt) {
        me._eventHandler(opt_evt || window.event);
    });
};

/**
 * Mobile Weigou需要处理的是tap事件.
 */
ad.impl.weigou.Log.prototype._bindMobileEvent = function() {
    var me = this;
    var wrapper = $('#ec-sg-weigou');
    wrapper.on('touchend', function(opt_evt) {
        me._eventHandler(opt_evt || window.event);
    });
};

/**
 * 绑定鼠标点击事件
 */
ad.impl.weigou.Log.prototype.bindMouseDownEvent = function() {
    if (ad.impl.weigou.dist.MOBILE) {
        this._bindMobileEvent();
    } else {
        this._bindDefaultEvent();
    }
};

/**
 * 收集数据
 */
ad.impl.weigou.Log.prototype.collectData = function() {
    var me = this;

    me.clearLogData();

    var target = me._target;
    var view = me._viewManager.getCurrentView();

    function addData(data) {
        var key, value, result;
        for (key in data) {
            value = data[key];
            if (typeof(value) === 'function') {
                // 配置项中是函数
                result = value.call(view, target);
                me.addLogData(result);
            } else if ('string number'.indexOf(typeof(value)) !== -1) {
                result = {};
                result[key] = value;
                me.addLogData(result);
            }
        }
    };

    while (target && target != document.body) {
        var classes = [];
        if (target.className) {
            classes = target.className.split(/\s+/);
        }
        var cls;
        var key;
        var value;
        var result;
        if (me._logClass['#' + target.id]) {
            addData(me._logClass['#' + target.id]);
        }
        for (var i = 0, l = classes.length; i < l; i++) {
            cls = classes[i];
            if (cls in me._logClass) {
                addData(me._logClass[cls]);
            }
        }
        target = target.parentNode;
    }

};

/**
 * 分析数据的准确性
 */
ad.impl.weigou.Log.prototype.checkData = function() {
    var me = this;
    var items = ['item'];
    var isOk = true;
    for (var value in items) {
        value = items[value];
        if (!(value in me._logData)) {
            isOk = false;
            break;
        }
    }

    return isOk;
};

/**
 * 清除上次统计的数据
 */
ad.impl.weigou.Log.prototype.clearLogData = function() {
    var me = this;
    me._logData = {};
};


/**
 * @param {Object} data 需要统计的键值对.
 */
ad.impl.weigou.Log.prototype.addLogData = function(data) {
    var me = this;
    if (!data) {
        return;
    }

    for (var key in data) {
        me._logData[key] = data[key];
    }
};

/**
 * 发送统计
 */
ad.impl.weigou.Log.prototype.sendLog = function(data) {
    var me = this;
    for (var key in me._defaultData) {
        data[key] = me._defaultData[key];
    }

    var dal = ad.impl.weigou.dal;
    data['sid'] = ++dal.sid;

    // 拼装url
    var query = [];
    for (var key in data) {
        query.push(key + '=' + encodeURIComponent(data[key]));
    }
    query = ad.impl.weigou.urls.LOG_URL + '?' + query.join('&');
    app.log.send(query);
};
