/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/wireless/f/smart.js ~ 2013/12/24 18:11:11
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * smart相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.wireless.OldHead');
goog.require('ad.widget.Colorlist');
goog.require('ad.widget.ButtonList');
goog.require('ad.widget.wireless.WideTelButton');

goog.include('ad/impl/wireless/smart/old_head.less');
goog.include('ad/impl/wireless/smart/colorlist.less');
goog.include('ad/impl/wireless/smart/button_list.less');
goog.include('ad/impl/wireless/f/smart.less');

goog.provide('ad.impl.wireless.f.Smart');

ad.Debug(function(async) {
    var videoSrc = AD_CONFIG['head']['video_src'];
    if(AD_CONFIG['head'] && AD_CONFIG['head']['video_image']) {
        AD_CONFIG['head']['logo'] = AD_CONFIG['head']['video_image'];
        AD_CONFIG['head']['title_logo'] = AD_CONFIG['head']['video_title_logo'];
        if(videoSrc) {
            AD_CONFIG['head']['logo_rcv_url'] = 'http://ecmc.bdimg.com/adtest/e789340c61752e6cfe6cb7504ec05910.html?video=' + encodeURIComponent(AD_CONFIG['head']['video_src']);
        }
    }

    var material = new ad.material.BaseMaterial();
    var head = new ad.widget.wireless.OldHead(AD_CONFIG['head']);
    var colorList = new ad.widget.Colorlist(AD_CONFIG['links']);
    var buttonList = new ad.widget.ButtonList(AD_CONFIG['buttons']);

    var widgetArr = [head, colorList, buttonList];

    if (AD_CONFIG['tel_button'] && AD_CONFIG['tel_button']['button'] && AD_CONFIG['tel_button']['button'].length) {
        var telBtn = new ad.widget.wireless.WideTelButton(AD_CONFIG['tel_button']['button'][0]);
        widgetArr.push(telBtn);
    }

    material.setWidgets.apply(material, widgetArr);

    if (async === true) {
        return material;
    }
    material.show();

    var videoLink = head.getRoot().querySelector('.ec-logo-link');
    if (videoSrc && videoLink) {
        var videoArrow = baidu.dom.create('img', {
            src: 'http://bs.baidu.com/adtest/b5c09fc10b25071807c17741c74fb253.png',
            width: 28,
            height: 28,
            className: 'ec-logo-arrow'
        });
        var videoDesc = baidu.dom.create('span');
        videoDesc.innerText = AD_CONFIG['head']['video_desc'];
        videoLink.appendChild(videoArrow);
        videoLink.appendChild(videoDesc);
    }

    if(videoSrc) {
        baidu.event.on(videoLink, ui.events.CLICK, function(event) {
            baidu.sio.log(AD_CONFIG['head']['video_rcv_url']);
            setTimeout(function() {
                window['location']['href'] = AD_CONFIG['head']['logo_rcv_url'];
            }, 300);
            baidu.event.stop(event);
        });
    }
});



/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */