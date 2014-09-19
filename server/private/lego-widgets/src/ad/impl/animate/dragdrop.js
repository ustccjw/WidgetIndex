/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z dingguoliang01 $
 *
 **************************************************************************/


/**
 * src/ad/impl/animate/dragdrop.js ~ 2013/09/13 15:59:32
 * @author dingguoliang01@baidu.com (dingguoliang01)
 * @version $Revision: 10927 $
 * @description
 * dragdrop相关的实现逻辑
 * 样式参考：animate.baidu.com/view/9636759.htm
 **/
goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.animate.Dragdrop');
goog.include('ad/impl/animate/dragdrop.less');
goog.provide('ad.impl.animate.Dragdrop');

ad.Debug(function (async) {
    var material = new ad.material.BaseMaterial();
    material.setRender(new ad.render.RecursiveRender());
    var dragdrop = new ad.widget.animate.Dragdrop(AD_CONFIG['dragdrop']);
    material.setWidgets(
        [dragdrop]
    );
    if (async === true) {
        return material;
    }
    ad.base.jqueryReady(function() {
        material.show();
        dragdrop.addListener(ui.events.DROP, function (temp, target) {
            var unit = this.getData('unit');
            var length = unit.length;
            var html1 = temp.find('span').html().substr(length);
            var html2 = target.find('span').html().substr(length);
            var $1 = parseInt(html1, 10) || 0;
            var $2 = parseInt(html2, 10) || 0;
            target.find('span')[0].innerHTML = (unit + ($1 + $2));
        })
    });
});
