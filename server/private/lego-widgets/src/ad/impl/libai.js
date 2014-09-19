/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: libai.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/libai.js ~ 2013/10/30 14:23:28
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * 恒大直播
 **/

goog.require('ad.Debug');
goog.require('ad.base');
goog.require('ad.Material');
goog.require('ad.service.CodemonkeyService');

goog.require('ad.widget.Button');
goog.require('ad.widget.Image');
goog.require('ad.widget.LinkList');
goog.require('ad.widget.Video');

goog.include('ad/impl/libai.less');

goog.provide('ad.impl.LiBai');

ad.Debug(function(async){
    var material = new ad.Material(AD_CONFIG['id']);
    var button = new ad.widget.Button(AD_CONFIG['button']);
    var links = new ad.widget.LinkList(AD_CONFIG['links']);
    var video = new ad.widget.Video(AD_CONFIG['video']);
    material.setWidgets(
        [video],
        [links],
        [button]
    );
    if (async === true) {
        return material;
    }
    material.show();
    material.initMonitor(AD_CONFIG['main_url']);
    baidu.dom.setStyles(material.getRoot(), {"background" : "url("+ AD_CONFIG['main_bg'] +") no-repeat"});
    var buttonRoot = baidu.g(button.getId('button')).parentNode.parentNode;
    var joinNum = baidu.dom.create('div', {'class': 'ec-join-num'});
    var numId = button.getId('join-num')
    joinNum.innerHTML = '已有<span id="' + numId + '"></span>人点赞';
    buttonRoot.appendChild(joinNum);
    var service = new ad.service.CodemonkeyService('12', 'd719b9f0b7ecbd26be7a20ec726ab636');
    service.get(function(err, data){
        if(!err && data && data['sum']){
            baidu.g(numId).innerHTML = data['sum'] - 4664222;
        }
    });
    button.addListener(ui.events.CLICK, function() {
        button.sendLog('点赞', '点赞');
        service.add(function(err, data){
            if(!err && data && data['sum']){
                baidu.g(numId).innerHTML = data['sum'] - 4664222;
            }
        });
        baidu.dom.setAttr(button.getId('button'), 'disabled', 'true');
    });

    var anchor = material.getRoot().appendChild(document.createElement('a'));
    anchor.className = 'ec-anchor';
    anchor.target = '_blank';
    anchor.setAttribute('title2', 'Top-Right-Link');
    anchor.href = AD_CONFIG['logo_rcv_url'];
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */