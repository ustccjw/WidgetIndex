/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: recursive_render.js 11309 2012-08-24 06:45:52Z songao $
 *
 **************************************************************************/



/**
 * src/ad/render/imageplus_render.js ~ 2014/02/27 14:52:21
 * @author zhouminming01(zhouminming01@baidu.com)
 * @version $Revision: 11309 $
 * @description 图+ 专用的render
 **/
goog.require('ad.base');
goog.require('ad.render.Render');

goog.provide('ad.render.ImageplusRender');

/**
 * @constructor
 * @extends {ad.render.Render}
 */
ad.render.ImageplusRender = function() {
    ad.render.Render.call(this);
};
baidu.inherits(ad.render.ImageplusRender, ad.render.Render);

/**
 * 调用示例：
 * Ad.render(
 *   [new ad.widget.Header(a), [new ad.widget.SmallWeibo(m), new ad.widget.SearchBox(n)]],
 *   [new ad.Widget.Footer(b)],
 *   [new ad.widget.Header(a)]
 * );
 * 在图+的广告中没有横竖的概念，因为要投放在不同外部站点，所以代码要尽可能精简。也不会添加额外的div。
 * 可以生成如下的html结构：
 *      <div class="ad-widget-header" id="ad-w-sadasd"></div>
 *      <div class="ad-widget-small_weibo" id="ad-w-sadasd1"></div>
 *      <div class="ad-widget-search_box" id="ad-w-sadasd2"></div>
 *      <div class="ad-widget-footer" id="ad-w-sadasd3"></div>
 *      <div class="ad-widget-header" id="ad-w-sadasd4"></div>
 *
 * @param {Array.<ad.widget.Widget>} widgets Zero or more sets, as arrays.
 * @return {string} 最终广告的物料代码.
 */
ad.render.ImageplusRender.prototype.process = function(widgets) {
    var me = this;
    var html = [];
    ad.base.forEach(widgets, function(part, idxArr) {
        html.push(me._replaceOrAttachIdForFirstTag(part.getMainHtml(), part.getId()));
    });

    return html.join('');
};

/**
 * 替换或新增第一个开始标签的id属性
 *
 * @param {string} input 一段html字符串
 * @param {string} id 第一个开始标签的新id
 * @return {string} 修改后的html字符串
 */
ad.render.ImageplusRender.prototype._replaceOrAttachIdForFirstTag = function (input, id) {
    /*
     * input: <div class="ad-root" id="test" data-action="none"></div>
     * regexp:
     *          1. id属性前的部分：(<[a-z][^>]*?) ===> '<div class="ad-root" '
     *          2. id属性：(id=['"][_\-a-z0-9]+['"]) ==> 'id="test"'
     *          3. id属性后的部分：([^>]*?) ==> ' data-action="none"'
     *          4. 结束符号：(>) ==> '>'
     */
    var firstTag = /(<[a-z][^>]*?)(?:(id=['"][_\-a-z0-9]+['"])([^>]*?))?(>)/i;
    return input.replace(firstTag, function (r, $0, $id, $2, $3) {
        return $0 + ($id ? '' : ' ') + 'id="' + id + '"' + ($2 || '') + $3;
    });
};

/** @override */
ad.render.ImageplusRender.prototype.attachToElements = function(widgets, wrapper) {
    var index = 0;
    ad.base.forEach(widgets, function(part, idxArr){
        var root = wrapper.children[index];

        if (!root) {
            throw new Error('Invalid pre-rendered html formated.');
        }

        index++;
        // 找到了，把ID设置一下.
        part.setId(root.id);
    });
};

