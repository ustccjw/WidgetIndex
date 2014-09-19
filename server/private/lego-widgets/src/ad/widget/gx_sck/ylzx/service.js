/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/gx_sck/ylzx/service.js ~ 2013/10/21 14:44:41
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 10927 $
 * @description
 * service相关的实现逻辑
 **/

goog.require('ad.env');
goog.require('ad.base');
goog.require('ad.widget.Widget');

goog.include('ad/widget/gx_sck/ylzx/service.less');
goog.include('ad/widget/gx_sck/ylzx/service.html');

goog.provide('ad.widget.gx_sck.ylzx.Service');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.gx_sck.ylzx.Service = function(data) {
    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_gx_sck_ylzx_service';

    /**
     * 百度地图服务API地址.
     * @type {string}
     */
    this._BMapAPI = RT_CONFIG.HOST('api.map.baidu.com') + '/';

    /**
     * 默认是到这里去.
     * @type {string}
     */
    this._mode = 'to';

    ad.widget.Widget.call(this, data);
};
baidu.inherits(ad.widget.gx_sck.ylzx.Service, ad.widget.Widget);

/** @override */
ad.widget.gx_sck.ylzx.Service.prototype.patchData = function() {
    if (this._data) {
        this._data['is_ipad'] = ad.env.isIpad;
        this._data['addr_encode'] = encodeURIComponent(this._data['addr']);
        this._data['api_url'] = this._BMapAPI;
        this._data['src_pic'] = this._getBMapPicSrc();
    }
};

/** @override */
ad.widget.gx_sck.ylzx.Service.prototype.enterDocument = function() {
    ad.widget.gx_sck.ylzx.Service.superClass.enterDocument.call(this);

    this._tabTo = baidu.g(this.getId('li-to'));
    this._tabFrom = baidu.g(this.getId('li-from'));
    this._txtAddr = baidu.g(this.getId('route-input'));
    this._btnBus = baidu.g(this.getId('route-bus'));
    this._btnCar = baidu.g(this.getId('route-car'));
    this._isPlaceholderSupported = 'placeholder' in document.createElement('input'); //检测是否支持placeholder
    if(!this._isPlaceholderSupported){
        this._txtAddr.value = baidu.getAttr(this._txtAddr, 'placeholder') || '输入起点';
    }
};

/** @override */
ad.widget.gx_sck.ylzx.Service.prototype.bindEvent = function() {
    ad.widget.gx_sck.ylzx.Service.superClass.bindEvent.call(this);

    var me = this;

    baidu.on(me._tabTo, 'click', function(){
        me._selMode('to');
    });
    baidu.on(me._tabFrom, 'click', function(){
        me._selMode('from');
    });
    
    //如果浏览器不支持placeholder属性，则模拟
    if(!me._isPlaceholderSupported){
        baidu.on(me._txtAddr, 'focus', function(){
            var input = this.value;
            if(input === '输入起点' || input === '输入终点'){
                var  r  = this.createTextRange();  
                r.moveStart('character',0);  
                r.collapse(true);  
                r.select();  
            }
        });

        baidu.on(me._txtAddr, 'keydown', function(){
            var input = this.value;
            if(input === '输入起点' || input === '输入终点'){
                this.value = '';
            }
        });
    }

    
    baidu.on(me._btnBus, 'click', function(){
        me._jump('bus');
    });
    baidu.on(me._btnCar, 'click', function(){
        me._jump('car');
    });

};

/**
 * 选择从这里出发或者到这里去
 * @param {string} mode 'to' | 'from'
 */
ad.widget.gx_sck.ylzx.Service.prototype._selMode = function(mode) {
    this._mode = mode;
    var input = this._txtAddr.value;

    if(this._mode === 'to'){
        if(this._isPlaceholderSupported){
            baidu.setAttrs(this._txtAddr, {'placeholder': '输入起点'});
        }
        this._tabTo.className = 'ec-gx-tabs-nav-li ec-gx-tabs-nav-selected';
        this._tabFrom.className = 'ec-gx-tabs-nav-li';
        if(!this._isPlaceholderSupported && input === '输入终点'){
            this._txtAddr.value = '输入起点';
        }
    }
    else {
        if(this._isPlaceholderSupported){
            baidu.setAttrs(this._txtAddr, {'placeholder': '输入终点'});
        }
        this._tabFrom.className = 'ec-gx-tabs-nav-li ec-gx-tabs-nav-selected';
        this._tabTo.className = 'ec-gx-tabs-nav-li';
        if(!this._isPlaceholderSupported && input === '输入起点'){
            this._txtAddr.value = '输入终点';
        }
    }
    this._txtAddr.focus();
};

/**
 * 跳转到百度地图
 * @param {string} method 'bus' | 'car'
 */
ad.widget.gx_sck.ylzx.Service.prototype._jump = function(method) {
    var mode;
    switch(method){
        case 'bus':
            mode = 'transit';
            break;
        case 'car':
            mode = 'driving';
            break;
    }
    var url = [this._BMapAPI + 'direction?' + 'mode=' + mode];
    var origin, destination;
    if (this._mode === 'to') {
        origin = this.getData('addr');
        destination = this._txtAddr.value;
    }
    else {
        origin = this._txtAddr.value;
        destination = this.getData('addr');
    }
    url.push('origin=' + encodeURIComponent(origin));
    url.push('destination=' + encodeURIComponent(destination));
    url.push('region=' + encodeURIComponent(this.getData('city')));
    url.push('output=html');

    window.open(url.join('&'));
};

/**
 * 获取百度静态地图src
 * @return {string} 百度静态地图src
 */
ad.widget.gx_sck.ylzx.Service.prototype._getBMapPicSrc = function() {
    var url = [this._BMapAPI + 'staticimage?' + 'width=351'];
    var addr = this.getData('addr_encode');
    url.push('height=197');
    url.push('center=' + addr);
    url.push('zoom=16');
    url.push('markers=' + addr);
    url.push('markerStyles=-1,http://ecma.bdimg.com/adtest/03065dd3e2fd58c9c2c5d0cb8441b54b.png');

    return url.join('&');
};

















/* vim: set ts=4 sw=4 sts=4 tw=100: */
