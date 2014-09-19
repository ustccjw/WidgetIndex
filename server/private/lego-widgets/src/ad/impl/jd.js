/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: jd.js 11357 2012-08-28 06:40:06Z dingguoliang01 $
 *
 **************************************************************************/


/**
 * src/ad/impl/jd.js ~ 2012/06/07 22:42:02
 * @author dingguoliang01
 * @version $Revision: 11357 $
 * @description
 *
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
/*goog.require('ad.Material');*/
goog.require('ad.widget.animate.Elevator');
goog.require('ad.widget.SmallHead');

goog.include('ad/impl/jd.less');

goog.provide('ad.impl.JD');

ad.Debug(function (async) {
    var material = new ad.material.BaseMaterial();
    /* var material = new ad.Material("ooo");*/
    material.setRender(new ad.render.RecursiveRender());
    material.setWidgets(
        [
            new ad.widget.animate.Elevator(AD_CONFIG['elevator']),
            new ad.widget.SmallHead(AD_CONFIG['small_head'])
        ]
    );
    if (async === true) {
        return material;
    }
    material.show();
    /*material.initMonitor();*/
});


/* vim: set ts=4 sw=4 sts=4 tw=100: */
