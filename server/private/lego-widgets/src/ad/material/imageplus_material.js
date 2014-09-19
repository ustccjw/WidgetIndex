/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: imageplus_material.js 18382 2014-02-27 14:44:55Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/material/imageplus_material.js ~ 2014/02/27 21:53:40
 * @author zhouminming01(zhouminming01@baidu.com)
 * @version $Revision: 18382 $
 * @description 图+ 物料的基类
 **/

goog.require('ad.material.BaseMaterial');
goog.require('ad.render.ImageplusRender');

goog.provide('ad.material.ImageplusMaterial');

/**
 * 图+物料的基类
 * @param {string=} opt_canvasId 物料的容器Id.
 * @extends {ad.material.BaseMaterial}
 * @implements {ad.material.AbstractStyleMaterial}
 * @constructor
 */
ad.material.ImageplusMaterial = function(opt_canvasId) {
    ad.material.BaseMaterial.call(this, opt_canvasId);

    /**
     * @type {ad.render.ImageplusRender}
     * @private
     */
    this._render = new ad.render.ImageplusRender();
};
baidu.inherits(ad.material.ImageplusMaterial, ad.material.BaseMaterial);

/** @inheritDoc */
ad.material.ImageplusMaterial.prototype.getMainHtml = function() {
    return this._render.process(this._widgets);
};














/* vim: set ts=4 sw=4 sts=4 tw=100: */
