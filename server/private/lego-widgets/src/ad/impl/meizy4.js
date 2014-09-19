/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/meizy4.js ~ 2014/03/24 15:36:11
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * meizy4相关的实现逻辑
 **/

goog.require('ad.base');
goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.H1');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Image');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.Flash');

goog.include('ad/impl/meizy4.less');

goog.provide('ad.impl.Meizy4');

ad.Debug(function(async) {
    AD_CONFIG['fwc']['material_name'] = 'ec-meizy4';

    //生成token
    var uuid = ad.base.uuid() + ad.base.uuid();
    AD_CONFIG['flash']['flashvars_param'] = '&token=' + uuid;

    var material = new ad.material.BaseMaterial();
    var title = new ad.widget.H1(AD_CONFIG['title']);
    var video = new ad.widget.Video(AD_CONFIG['video']);
    var head = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var image = new ad.widget.Image(AD_CONFIG['image']);

    var flash = new ad.widget.Flash(AD_CONFIG['flash']);
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    fwc.setWidgets([flash]);

    material.setWidgets(
        [title],
        [video, head],
        [image],
        [fwc]
    );

    if (async === true) {
        return material;
    }

    material.show();

    fwc.show();
    var fwcDom = fwc.getRoot();
    var swfDom = baidu.dom.first(fwcDom);
    swfDom.style.left = "-10000px";


    // 显示二维码
    var qrcodeUrl = AD_CONFIG['config']['api_host'] + '?id=' + uuid;
    var qrcodeImage = new Image();
    qrcodeImage.src = qrcodeUrl;
    qrcodeImage.className = 'ec-qrcode';
    image.getRoot().getElementsByTagName('div')[0].appendChild(qrcodeImage);

    baidu.event.on(image.getRoot(), ui.events.CLICK, function() {
        fwc.sendLog("点击Banner图打开FLASH浮层");
        baidu.sio.callByBrowser(RT_CONFIG.HOST("wpl.baidu.com") + "/mzy/update_status.php?id=" + uuid + "&p=0");
    });


    flash.addListener('FLASH_MZY', function(action) {
        if("OPEN" == action) {
            if("-10000px" == swfDom.style.left) {
                fwc.sendLog("扫二维码打开FLASH浮层");
                fwc._setPosition();
            }
        }
    });

    fwc.addListener(ui.events.CLOSE, function() {
        fwcDom.style.display = "block";
        swfDom.style.left = "-10000px";
        fwc.sendLog("FLASH浮层关闭");
        baidu.sio.callByBrowser(RT_CONFIG.HOST("wpl.baidu.com") + "/mzy/update_status.php?id=" + uuid + "&p=-1");
        return false;
    });
});



/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
