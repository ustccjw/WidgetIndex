/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 18382 2013-03-14 14:44:55Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/material.js ~ 2012/06/04 21:53:40
 * @author leeight(liyubei@baidu.com)
 * @version $Revision: 18382 $
 * @description
 * 物料的基类
 **/
goog.require('ad.dom');
goog.require('ad.service.ClickMonkeyService');
goog.require('ad.service.ClickService');
goog.require('ad.material.BaseMaterial');
goog.require('ui.events');

goog.provide('ad.Material');

/**
 * 广告物料的展示入口, 主要角色如下:
 * <pre>
 * 1. 定位不同的Widget(可以设置自己的布局)
 * 2. 处理Widget的事件
 * </pre>
 * @param {string=} opt_canvasId 画布的Id.
 * @extends {ad.material.BaseMaterial}
 * @constructor
 */
ad.Material = function(opt_canvasId) {
    ad.material.BaseMaterial.call(this, opt_canvasId);

    /**
     * @type {ad.service.ClickMonkeyService}
     * @private
     */
    this._cms;

    /**
     * @type {ad.service.ClickService}
     * @private
     */
    this._cs;
};
baidu.inherits(ad.Material, ad.material.BaseMaterial);

/**
 * @inheritDoc
 */
ad.Material.prototype.sendLog = function(param) {
    this.getCMS().sendLog({
        'r' : new Date().valueOf(),
        'q' : (window['bdQuery'] || ''),
        'xp' : param['xp'] || '',
        'plid' : this.getId().replace(/ec-ma-/, ''),
        'title' : param['action'] || ''
    });
};

/**
 * 获取ClickMonkeyService实例
 * @return {ad.service.ClickMonkeyService}
 */
ad.Material.prototype.getCMS = function() {
    if (!this._cms) {
        this._cms = new ad.service.ClickMonkeyService(this.getId());
    }
    return this._cms;
};

/**
 * 获取ClickService实例
 * @return {ad.service.ClickService}
 */
ad.Material.prototype.getCS = function() {
    if (!this._cs) {
        this._cs = new ad.service.ClickService();
    }
    return this._cs;
};

/**
 * 增加监控
 * @param {string} mainUrl 主链接地址.
 */
ad.Material.prototype.initMonitor = function(mainUrl) {
    this.getCMS().init(this.getId());
    this.getCS().init(this.getId(), mainUrl);
};

/**
 * @param {string} id 监测id
 * 添加百度精算监测.
 */
ad.Material.prototype.initHMJSMoniter = function(id) {
    ad.dom.createHMJSMoniter(id, this.getRoot());
};

















/* vim: set ts=4 sw=4 sts=4 tw=100: */
