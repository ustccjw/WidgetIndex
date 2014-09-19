/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: render.js 18382 2013-03-14 14:44:55Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/render.js ~ 2012/06/04 22:02:39
 * @author leeight(liyubei@baidu.com)
 * @version $Revision: 18382 $
 * @description
 * 渲染器的基类
 **/

goog.provide('ad.render.Render');

/**
 * @constructor
 */
ad.render.Render = function() {};

/**
 * @param {?} widgets Zero or more sets, as arrays.
 * @return {string} 最终广告的物料代码.
 */
ad.render.Render.prototype.process = baidu.abstractMethod;

/**
 * 将_widgets中的元素跟DOM建立映射关系，主要是
 * 服务端渲染之后的代码结构可能是这样子的：
 * <div id="canvas">
 *   <div class="layout">
 *     <div class="ad-block ad-block-0">
 *       <div class="ad-block ad-block-0-0" id="ad-w-dkts9r">
 *         <div class="ad-widget ad-widget-button">
 *         </div>
 *       </div>
 *     </div>
 *   </div>
 * </div>
 * 而物料代码中`Widgets`的层次结构是这样子的
 * material._widgets = [
 *   [new ad.widget.Button(AD_CONFIG['button'])]
 * ];
 *
 * 因此我们可以递归的遍历_widgets，当我们遇到`Button Widget`的时候，它的索引是`0-0`，那么
 * 我们就能确定`Button Widget`对应的Root应该是`layout -> childNodes[0] -> childNodes[0]`
 *
 * @param {?} widgets Zero or more sets, as arrays.
 * @param {Element} root 已经存在的根节点.
 */
ad.render.Render.prototype.attachToElements = baidu.abstractMethod;




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
