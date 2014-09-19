
goog.require('ad.dom');
goog.require('ad.event');
goog.require('ui.events');
goog.require('ad.plugin.imageplus.LoaderTip');
goog.require('ad.plugin.imageplus.ILoaderApi');

goog.provide('ad.plugin.imageplus.mockup');

/**
 * mockup class
 * @constructor
 * @param {Element} img
 */
ad.plugin.imageplus.Mockup = function (img) {
    /**
     * @type {Element}
     */
    this.img = img;

    /**
     * @type {Element}
     */
    this.imgWrapper = null;

    /**
     * @type {Object}
     */
    this.imgRect = null;

    /**
     * @type {Element}
     */
    this.controlBoard = null;

    /**
     * @type {ad.plugin.imageplus.MockupApi}
     */
    this.api = null;

    this.init();
};

ad.plugin.imageplus.Mockup.prototype.init = function () {
    var me = this;
    if (!me.img) {
        // jshint ignore:start
        document.write(
            '<img width="600" src="http://ecma.bdimg.com/adtest/6969cd90b097696b31f9e44b35e6b18c.jpg" id="test" />'
        );
        // jshint ignore:end
        me.img = ad.dom.g('test');
    }
    me.img.style.cssText = 'margin:100px auto;display:block;';

    me.initControlBoard();
    me.wrapImg();
    me.preapreCanvas();
    me._onImgLoad(me.img, function () {
        me.update();
        ad.event.on(window, ui.events.RESIZE, function () {
            me.update();
        });
    });
};

/**
 * 包裹图片
 */
ad.plugin.imageplus.Mockup.prototype.wrapImg = function () {
    this.imgRect = ad.dom.getRect(this.img);
    this.imgWrapper = document.createElement('div');
    this.updateWrap();
    document.body.appendChild(this.imgWrapper);
    var me = this;
    var mouseover = function (event) {
        var relatedTarget = event.relatedTarget || event.fromElement;
        if (!me.isTargetInAd(relatedTarget)) {
            me.api.trigger(ui.events.MOUSE_OVER);
        }
    };
    var mouseout = function (event) {
        var relatedTarget = event.relatedTarget || event.toElement;
        if (!me.isTargetInAd(relatedTarget)) {
            me.api.trigger(ui.events.MOUSE_OUT);
        }
    };
    var mousemove = function (event) {
        me.api.trigger(ui.events.MOUSE_MOVE);
    };
    ad.event.on(me.img, ui.events.MOUSE_OVER, mouseover);
    ad.event.on(me.img, ui.events.MOUSE_OUT, mouseout);
    ad.event.on(me.img, ui.events.MOUSE_MOVE, mousemove);
    ad.event.on(me.imgWrapper, ui.events.MOUSE_OVER, mouseover);
    ad.event.on(me.imgWrapper, ui.events.MOUSE_OUT, mouseout);
    ad.event.on(me.imgWrapper, ui.events.MOUSE_MOVE, mousemove);
};

/**
 * 是否在广告相关元素内
 */
ad.plugin.imageplus.Mockup.prototype.isTargetInAd = function (target) {
    return target === this.img || ad.dom.contains(this.imgWrapper, target);
};

/**
 * 更新wrap位置
 */
ad.plugin.imageplus.Mockup.prototype.updateWrap = function () {
    this.imgWrapper.style.cssText = 'position:absolute;'
        + 'width:' + this.imgRect['width'] + 'px;'
        + 'top:' + this.imgRect['top'] + 'px;'
        + 'left:' + this.imgRect['left'] + 'px;'
        + 'overflow: visible;';
};

/**
 * 准备canvas
 */
ad.plugin.imageplus.Mockup.prototype.preapreCanvas = function () {
    var canvas = document.createElement('div');
    canvas.id = 'canvas';
    this.imgWrapper.appendChild(canvas);

    this.api = new ad.plugin.imageplus.MockupApi(this.img, this.imgWrapper, canvas);
    AD_CONFIG['api'] = this.api;
};

/**
 * 初始化控制面板
 */
ad.plugin.imageplus.Mockup.prototype.initControlBoard = function () {
    var me = this;
    this.controlBoard = document.createElement('div');
    this.controlBoard.style.cssText = ''
        + 'position: absolute;'
        + 'left: 10px;'
        + 'top: 10px;'
        + 'height: 200px;'
        + 'line-height: 35px;'
        + 'font-size: 18px;';
    document.body.appendChild(this.controlBoard);
    ad.dom.createStyles(''
        + 'input {margin:0 10px 0 0;padding:0px 10px;height:30px;line-height:30px;}',
        '',
        this.controlBoard
    );
    this._createInput('修改图片宽度', 'button', function () {
        var v = resizeTxt.value;
        v = v.match(/(\d+)(?:[xX ](\d+))?/);
        if (v) {
            me.resize(v[1], v[2]);
        }
    });
    var resizeTxt = this._createInput('300x200', 'text');
    this._createInput('恢复图片大小', 'button', function () {
        me.img.style.width = 'auto';
        me.img.style.height = 'auto';
        me.update();
    });
    this._createBr();
    this._createInput('显示/隐藏图片', 'button', function () {
        me.toggle();
    });
    this._createBr();
    this._createInput('触发into_view事件', 'button', function () {
        me.api.trigger(ui.events.INTO_VIEW);
    });
    this._createBr();
    this._createInput('触发in_view事件', 'button', function () {
        me.api.trigger(ui.events.IN_VIEW);
    });
    this._createBr();
    this._createInput('触发out_view事件', 'button', function () {
        me.api.trigger(ui.events.OUT_VIEW);
    });
};

/**
 * 创建input
 * @param {string} value
 * @param {string} type
 * @param {Function=} opt_callback click callback
 */
ad.plugin.imageplus.Mockup.prototype._createInput = function (value, type, opt_callback) {
    var input = document.createElement('input');
    input.value = value;
    input.type = type;
    if (opt_callback) {
        ad.event.on(input, 'click', opt_callback);
    }
    this.controlBoard.appendChild(input);
    return input;
};

/**
 * 创建br
 */
ad.plugin.imageplus.Mockup.prototype._createBr = function () {
    this.controlBoard.appendChild(document.createElement('br'));
};

/**
 * 检测图片加载完成
 * @param {Element} img
 * @param {Function} callback
 */
ad.plugin.imageplus.Mockup.prototype._onImgLoad = function (img, callback) {
    if (img.complete) {
        // 命中缓存
        callback(true);
        return;
    }

    var success = function () {
        callback(true);
        ad.event.un(img, 'load', success);
    };
    ad.event.on(img, 'load', success);

    var error = function () {
        callback(false);
        ad.event.un(img, 'abort', error);
        ad.event.un(img, 'error', error);
    };
    ad.event.on(img, 'abort', error);
    ad.event.on(img, 'error', error);
};

/**
 * 更新图片的位置高宽
 */
ad.plugin.imageplus.Mockup.prototype.update = function () {
    var me = this;
    var newRect = ad.dom.getRect(me.img);
    if (newRect['width'] !== me.imgRect['width']
        || newRect['height'] !== me.imgRect['height']
        || newRect['top'] !== me.imgRect['top']
        || newRect['left'] !== me.imgRect['left']) {
        me.imgRect = newRect;
        me.updateWrap();
        me.api.trigger(ui.events.RESIZE, me.imgRect);
    }
};

/**
 * 修改图片高宽，并触发resize事件
 * @param {number} width
 * @param {number=} opt_height
 */
ad.plugin.imageplus.Mockup.prototype.resize = function (width, opt_height) {
    this.img.style.width = width + 'px';
    if (opt_height) {
        this.img.style.height = opt_height + 'px';
    }
    this.update();
};

/**
 * 切换图片的隐藏或显示，并相应发送事件
 */
ad.plugin.imageplus.Mockup.prototype.toggle = function () {
    if (this.img.style.display === 'block') {
        this.img.style.display = 'none';
        this.imgWrapper.style.display = 'none';
        this.api.trigger(ui.events.HIDE);
    }
    else {
        this.img.style.display = 'block';
        this.imgWrapper.style.display = 'block';
        this.api.trigger(ui.events.SHOW);
        this.update();
    }
};

/**
 * mockup 的loaderApi
 *
 * @constructor
 * @param {Element} img .
 */
ad.plugin.imageplus.MockupApi = function (img, imgWrapper, canvas) {
    /**
     * @type {Element}
     * @private
     */
    this._canvas = canvas;

    /**
     * @type {Element}
     * @private
     */
    this._imgWrapper = imgWrapper;

    /**
     * @type {Element}
     * @private
     */
    this._img = img;
    /**
     * @type {number}
     * @private
     */
    this._imgIndex = 1;

    /**
     * @type {string}
     * @private
     */
    this._canvasId = 'canvas';

    /**
     * @type {string}
     * @private
     */
    this._renderUrl = 'test';

    /**
     * @type {string}
     * @private
     */
    this._renderId = '0';

    /**
     * api的版本，用于让render判断是否支持某些api
     *
     * @expose
     * @type {string}
     */
    this.version = '1.0.1';

    /**
     * 事件相关信息，存储回调函数
     * @type {Array.<Object>}
     * @private
     */
    this._events = [];

    /**
     * @type {Object}
     * @private
     */
    this._gData = {};

    /**
     * @type {Object}
     * @private
     */
    this._data = {};

    /**
     * @type {ad.plugin.imageplus.LoaderTip}
     * @private
     */
    this._tip = null;
};


/**
 * 通知loader：render绘制完成，并且是否需要显示右上角tip.
 *
 * @expose
 * @param {boolean=} opt_showTip show tip or not.
 */
ad.plugin.imageplus.MockupApi.prototype.rendDone = function (opt_showTip) {
    if (opt_showTip) {
        this._tip = new ad.plugin.imageplus.LoaderTip(this._imgWrapper, function () {});
    }
};

/**
 * 绑定事件
 *
 * @expose
 * @param {string} event .
 * @param {Function} callback
 *                  第一个参数指向eventObj，例如：
 *                  {
 *                      'id': 'eventId',
 *                      'type': 'eventType[resize]',
 *                      'imgIndex': '1235'
 *                  }.
 */
ad.plugin.imageplus.MockupApi.prototype.addListener = function (event, callback) {
    var me = this;
    var events = me._events[me._imgIndex];
    if (!events) {
        events = me._events[me._imgIndex] = {};
    }
    if (!events[event]) {
        events[event] = [];
    }
    events[event].push(callback);
};

/**
 * 触发事件
 * @param {string|Object} eventType 事件类型（字符串）
 *                                  或者是事件对象
 *                                  {
 *                                      id： ‘aaxd’,
 *                                      type: 'resize'
 *                                  }.
 * @param {...*} var_args .
 */
ad.plugin.imageplus.MockupApi.prototype.trigger =
    function (eventType, var_args) {
        var me = this;

        var events = me._events[me._imgIndex];
        if (!events) {
            return;
        }

        var eventObj;
        if (typeof eventType !== 'string') {
            eventObj = eventType;
            eventType = eventType['type'];
        }

        // Get callbacks
        var callbacks = events[eventType];
        if (!callbacks || (callbacks.length === 0)) {
            return;
        }

        // trigger callback
        var callback;
        var args = Array.prototype.slice.call(arguments, 1);

        // create eventObj
        if (eventObj) {
            eventObj['imgIndex'] = me._imgIndex;
        }
        else {
            eventObj = {
                'imgIndex': me._imgIndex,
                'id': ad.base.uuid(),
                'type': eventType
            };
        }
        // TODO eventObj 对于多个回调是同一个，有冲突风险
        // 每次生成不同的eventObj则效率太低
        // `Object.freeze` 支持率太低，不然可以使用
        args.unshift(eventObj);

        // call
        for (var i = 0, l = callbacks.length; i < l; i++) {
            callback = callbacks[i];
            callback.apply(null, args);
        }
    };

/**
 * 获取img dom
 *
 * @expose
 * @return {Element} img.
 */
ad.plugin.imageplus.MockupApi.prototype.getImg = function () {
    return this._img;
};

/**
 * 获取wrapper
 *
 * @expose
 * @return {Element} img.
 */
ad.plugin.imageplus.MockupApi.prototype.getImgWrapper = function () {
    return this._imgWrapper;
};

/**
 * 获取canvas
 *
 * @expose
 * @return {Element} canvas.
 */
ad.plugin.imageplus.MockupApi.prototype.getCanvas = function () {
    return this._canvas;
};

/**
 * 获取imgIndex
 *
 * @expose
 * @return {number} .
 */
ad.plugin.imageplus.MockupApi.prototype.getImgIndex = function () {
    return this._imgIndex;
};

/**
 * 设置canvas id，此方法不会暴露给render，
 * 只是loader用于设置api对象对应的canvas id
 *
 * @param {string} canvasId .
 */
ad.plugin.imageplus.MockupApi.prototype.setCanvasId = function (canvasId) {
    this._canvasId = canvasId;
};

/**
 * 获取图片的位置和高宽
 *  {
 *      top: 100,
 *      left: 100,
 *      width: 600,
 *      heght: 400
 *  }
 *
 * @expose
 * @return {Object} .
 */
ad.plugin.imageplus.MockupApi.prototype.getImgRect = function () {
    return ad.dom.getRect(this._img);
};

/**
 * 设置共享数据，默认针对每个图片的共享数据，
 * 也可以设置全局共享数据
 *
 * @expose
 * @param {string} key .
 * @param {*} value .
 * @param {boolean=} opt_global 是否是全局.
 */
ad.plugin.imageplus.MockupApi.prototype.setShareData =
    function (key, value, opt_global) {
        if (opt_global) {
            this._gData[key] = value;
        }
        else {
            this._data[key] = value;
        }
    };

/**
 * 获取共享数据
 *
 * @expose
 * @param {string} key .
 * @param {boolean=} opt_global 是否是全局.
 * @return {*} value .
 */
ad.plugin.imageplus.MockupApi.prototype.getShareData =
    function (key, opt_global) {
        if (opt_global) {
            return this._gData[key];
        }
        else {
            return this._data[key];
        }
    };

/**
 * 记录时间，发送到后端
 * 1.0.0本版新增
 * 1.0.1版本修改第二个参数为支持字符串，参数名opt_time改成opt_key
 *     不得不承认recordTime这个名字就不合适了，
 *     但是要更改名字就需要修改所有ender...就暂时共存吧
 *
 * @expose
 * @param {string|Object} type 时间点的名字，或是包含时间的对象.
 * @param {number|string=} opt_key 时间.
 */
ad.plugin.imageplus.MockupApi.prototype.recordTime =
ad.plugin.imageplus.MockupApi.prototype.recordKey =
    function (type, opt_key) {};

/**
 * 记录时间，发送到后端
 * 1.0.0本版新增
 *
 * @expose
 * @return {Array} 记录的时间点
 */
ad.plugin.imageplus.MockupApi.prototype.getRecordedTime = function () {
    return null;
};

/**
 * 设置render的地址
 *
 * @param {string} renderUrl render的地址.
 */
ad.plugin.imageplus.MockupApi.prototype.setRenderUrl = function (renderUrl) {
    this._renderUrl = renderUrl;
};

/**
 * 获取render的地址
 * 1.0.0本版新增
 *
 * @expose
 * @return {string} renderUrl render的地址.
 */
ad.plugin.imageplus.MockupApi.prototype.getRenderUrl = function () {
    return this._renderUrl;
};

/**
 * 设置render的id
 * 1.0.1本版新增
 *
 * @param {string} renderId render的id.
 */
ad.plugin.imageplus.MockupApi.prototype.setRenderId = function (renderId) {
    this._renderId = renderId;
};

/**
 * 获取render的id
 * 1.0.1本版新增
 *
 * @expose
 * @return {string} renderId render的id.
 */
ad.plugin.imageplus.MockupApi.prototype.getRenderId = function () {
    return this._renderId;
};

/**
 * 获取loader的配置，用于拿到unionId之类的配置
 * 1.0.0本版新增
 *
 * @expose
 * @param {string} key .
 * @param {*=} opt_default 默认值.
 * @return {*} value.
 */
ad.plugin.imageplus.MockupApi.prototype.getLoaderConfig =
    function (key, opt_default) {
        return opt_default || null;
    };


if (!COMPILED) {
    window['mockup'] = new ad.plugin.imageplus.Mockup(ad.dom.g('test'));
}
