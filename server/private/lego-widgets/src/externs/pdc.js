/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * pdc.js ~ 2013/07/16 18:13:20
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 * @externs
 **/

/**
 * @type {Object}
 */
var PDC = {};

PDC.render_start_again = function() {};

/**
 * @param {string} stage 需要标记的阶段.
 */
PDC.mark = function(stage) {
};

PDC.tti = function() {};

PDC.page_ready = function() {};

PDC.send = function() {};

/**
 * @typedef {{env:Object,common_resources:Array.<string>,
 * special_resources:Array.<string>,render_start:number,
 * timing:Array.<string>}}
 */
PDC.MetaType;

/**
 * @return {PDC.MetaType}
 */
PDC.metadata = function() {};

/* vim: set ts=4 sw=4 sts=4 tw=100: */
