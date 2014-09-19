/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/plugin/api/image_ald.js ~ 2013/07/03 17:13:18
 * @author liyubei@baidu.com (liyubei)
 * @version $Revision: 10927 $
 * @description
 * image_ald相关的实现逻辑
 **/
goog.require('ad.base');

goog.provide('ad.plugin.api.ImageAld');

ad.plugin.api.ImageAld = {
    /** 物料 */
    _m: false,

    /** 是否加载精算代码 */
    _isInitJS: false,

    /**
     * 获取占位符id
     * @return {?string}
     */
    getId: function() {
        var material = ad.lego.getMaterial();
        if (material) {
            return material.getId() + '-ctner';
        }
        return null;
    },

    /**
     * 图片或者视频页面的中的代码调用这个接口来显示阿拉丁
     */
    show: function() {
        var id = ad.plugin.api.ImageAld.getId();
        var element = baidu.g(id);
        if (element) {
            // 将物料移到目标元素，并显示物料
            var material = ad.lego.getMaterial();
            if (material) {
                // 移除原有DOM
                // XXX: 不能调material.dispose，因为图片频道在resize的时候会删除掉物料容器，而
                // dispose会调用getRoot，里面有个document.write会造成图片页面被刷掉...
                var widget = /** @type {ad.widget.bzt.ImageAld} */ (material.getWidget(0));
                var midId = widget.getMidDomId();
                var canvasId = material.getId();
                baidu.each([midId, canvasId], function(id) {
                    if (baidu.g(id)) {
                        baidu.dom.remove(id);
                    }
                });

                // 重新创建物料容器
                element.innerHTML = '<div id="' + canvasId + '"></div>';
                material.show();
                // XXX: keep this line, 插件里会隐藏root...
                baidu.show(canvasId);

                // FIXME(leeight)
                // var widget = /** @type {ad.widget.bzt.ImageAld} */ (material.getWidget(0));
                // material.runAllPlugins(widget.getMidDomId());

                // FIXME(leeight)
                ad.plugin.api.ImageAld._isInitJS = true;
            }
        }
    },

    /**
     * 返回物料宽高
     * @return {{width:number,height:number}}
     */
    getArea: function() {
        var material = ad.lego.getMaterial();
        if (!material) {
            return {'width': 0, 'height': 0};
        }

        var widget = /** @type {ad.widget.bzt.ImageAld} */ (material.getWidget(0));
        var config = widget.getData();
        var width = 0;
        var height = 0;
        if(config && config['ads'] && config['ads'].length){
            for(var i = 0; i < config['ads'].length; i ++){
                width += 10 + parseInt(config['ads'][i]['small_width'], 10);
                if(height < parseInt(config['ads'][i]['small_height'], 10)){
                    height = parseInt(config['ads'][i]['small_height'], 10);
                }
            }
        }
        return {'width':width,'height':height};
    }
};
ad.base.exportPath('ecom.ma.image.ald', ad.plugin.api.ImageAld);






















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
