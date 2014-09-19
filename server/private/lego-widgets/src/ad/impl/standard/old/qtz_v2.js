/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/



/**
 * src/ad/impl/standard/old/qtz_v2.js ~ 2013/10/21 14:26:23
 * @author leeight(liyubei@baidu.com),fanxueliang(fanxueliang@baidu.com)
 * @version $Revision$
 * @description
 * 旧版的擎天柱样式
 *   品牌专区-右侧擎天柱
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.BaiduShareV2');
goog.require('ad.widget.Flash');
goog.require('ad.widget.ImageLink');

goog.include('ad/impl/standard/old/qtz_v2.less');

goog.provide('ad.impl.standard.old.QtzV2');

ad.Debug(function(async) {

    var widgets = [];

    var rcvUrl = AD_CONFIG['root']['click_rcv_url'];
    var fileType = AD_CONFIG['root']['file_type'];
    if (fileType['image']) {
        widgets.push(new ad.widget.ImageLink({
            'src': fileType['image']['src'],
            'rcv_url': rcvUrl
        }));
    }
    else if (fileType['flash']) {
        var config = {
            'width': 175,
            'height': 300,
            'is_flashvars': false,
            'src': fileType['flash']['src'],
            'link_rcv_url': rcvUrl
        };

        if (fileType['flash']['ipad_img_src']) {
            config['ipad_img'] = fileType['flash']['ipad_img_src'];
            config['ipad_link_rcv_url'] = rcvUrl;
        }
        else {
            // 没有设置iPad备份图片的情况，强制显示Flash，即便系统不支持.
            config['is_ipad'] = false;
        }

        widgets.push(new ad.widget.Flash(config));
    }

    var shareButton = AD_CONFIG['root']['is_show_share'];
    if ('true' in shareButton) {
        var config = shareButton['true'];
        config['display'] = true;
        widgets.push(new ad.widget.BaiduShareV2(config));
    }

    var material = new ad.material.BaseMaterial();
    material.setWidgets(widgets);

    if (async === true) {
        return material;
    }

    material.show();
    for (var i = 0; i < widgets.length; i ++) {
        widgets[i].rewriteTitle2(null, '【擎天柱】', false);
    }
});



















/* vim: set ts=4 sw=4 sts=4 tw=100: */
