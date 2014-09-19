/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: hengda.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/hengda.js ~ 2013/10/30 14:23:28
 * @author liyubei@baidu.com (liyubei)
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
goog.require('ad.widget.CountDown');
goog.require('ad.widget.Iframe');

goog.include('ad/impl/hengda.less');

goog.provide('ad.impl.HengDa');

ad.Debug(function(async){
    var material = new ad.Material(AD_CONFIG['id']);
    AD_CONFIG['button']['text'] = ""; 
    var button = new ad.widget.Button(AD_CONFIG['button']);
    var options = AD_CONFIG['links']['options'];
    baidu.each(options, function(item, index){
        options[index]['text'] = "&nbsp;";
    });
    var links = new ad.widget.LinkList(AD_CONFIG['links']);
    var countDown1 = new ad.widget.CountDown(AD_CONFIG['countdown1']);
    var countDown2 = new ad.widget.CountDown(AD_CONFIG['countdown2']);
    var iframe = new ad.widget.Iframe(AD_CONFIG['iframe']);
    var image = new ad.widget.Image(AD_CONFIG['image']);
    AD_CONFIG['logo']['image_url'] = "";
    var logo = new ad.widget.Image(AD_CONFIG['logo']);
    material.setWidgets(
        [logo],
        [countDown1],
        [links],
        [button],
        [countDown2]
    );
    if (async === true) {
        return material;
    }
    var buttonStatus = true;
    button.addListener(ui.events.CLICK, function() {
        if(buttonStatus){
            button.sendLog("点赞", "点赞");
            service.add(function(err, data){
                if(!err && data && data['sum']){
                    baidu.g(numId).innerHTML = data['sum'] - 4531280;
                }
            });
            buttonStatus = false;
        }
    });
    var liveRoot;
    countDown1.addListener(ui.events.TIME_OVER, function(){
        liveRoot = countDown1.getRoot();
        iframe.refresh(liveRoot);
        liveRoot = iframe.getRoot();
    });
    countDown2.addListener(ui.events.TIME_OVER, function(){
        if(liveRoot) {
            liveRoot = iframe.getRoot() || countDown1.getRoot();
        }
        image.refresh(liveRoot);
    });
    material.show();
    material.initMonitor(AD_CONFIG['main_url']);
    baidu.dom.setStyles(material.getRoot(), {"background" : "url("+ AD_CONFIG['bg'] +") no-repeat"});
    var buttonRoot = baidu.g(button.getId('button')).parentNode.parentNode;
    if(AD_CONFIG['button']['top']) {
        baidu.dom.setStyles(buttonRoot, {"top": AD_CONFIG['button']['top'] + 'px'});
    }
    if(AD_CONFIG['button']['left']) {
        baidu.dom.setStyles(buttonRoot, {"left": AD_CONFIG['button']['left'] + 'px'});
    }
    var joinNum = baidu.dom.create('div', {'class': 'ec-join-num'});
    var numId = button.getId('join-num')
    joinNum.innerHTML = '已有<span id="' + numId + '"></span>人参与';
    buttonRoot.appendChild(joinNum);
    var service = new ad.service.CodemonkeyService('12', 'd719b9f0b7ecbd26be7a20ec726ab636');
    service.get(function(err, data){
        if(!err && data && data['sum']){
            baidu.g(numId).innerHTML = data['sum'] - 4531280;
        }
    });
    links.rewriteTitle2(links.getRoot(),"活动标语", true);
    logo.rewriteTitle2(logo.getRoot(),"logo", true);
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
