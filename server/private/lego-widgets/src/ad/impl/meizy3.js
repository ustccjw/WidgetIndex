/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: meizy3.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/meizy3.js ~ 2013/07/10 14:25:38
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * meizy3相关的实现逻辑
 **/

goog.require('ad.base');
goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.Title');
goog.require('ad.widget.Image');

goog.include('ad/impl/meizy3.less');

goog.provide('ad.impl.Meizy3');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    var video = new ad.widget.Video(AD_CONFIG['video']);
    var head = new ad.widget.SmallHead(AD_CONFIG['head']);
    var weibo = new ad.widget.SmallWeibo(AD_CONFIG['weibo']);
    var title = new ad.widget.Title(AD_CONFIG['title']);
    var image = new ad.widget.Image(AD_CONFIG['image']);

    material.setWidgets(
        [
            video,
            [
                head,
                weibo
            ]
        ],
        title,
        image
    );

    if (async === true) {
        return material;
    }

    material.show();

    // 显示二维码
    var uuid = ad.base.uuid() + ad.base.uuid();
    var qrcodeUrl = RT_CONFIG.HOST('wpl.baidu.com') + '/api/gen_qrcode.php?id=' + uuid;
    var qrcodeImage = new Image();
    qrcodeImage.src = qrcodeUrl;
    qrcodeImage.className = 'ec-qrcode';
    image.getRoot().getElementsByTagName('div')[0].appendChild(qrcodeImage);

    // 给AD_CONFIG[third_party_js]用的.
    window['MZY_UUID'] = uuid;

    // 加载third_party_js
    if (AD_CONFIG['config']['third_party_js']) {
        baidu.sio.callByBrowser(AD_CONFIG['config']['third_party_js']);
    }
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
