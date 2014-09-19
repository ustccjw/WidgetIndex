/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * src/ad/render/template.js ~ 2013/04/30 23:35:31
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 *  
 **/
goog.provide('ad.render.Template');

/**
 * @param {string} template The template string.
 * @param {Object} data The template data.
 */
ad.render.Template = function(template, data) {
  return ad.render.Template._impl(template, data);
}

/**
 * @type {function(string, Object):string}
 */
ad.render.Template._impl;

/**
 * @param {function(string, Object):string} impl The template implementation.
 */
ad.render.Template.setImpl = function(impl) {
  ad.render.Template._impl = impl;
}




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
