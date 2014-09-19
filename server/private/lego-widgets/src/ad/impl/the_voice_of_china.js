/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/the_voice_of_china.js ~ 2014/06/23 13:10:06
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * the_voice_of_china相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.H1');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.SinaWeibo');
goog.require('ad.widget.QQWeibo');

goog.include('ad/impl/the_voice_of_china.less');

goog.provide('ad.impl.TheVoiceOfChina');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();

    // 根据用户选择的微博平台
    var weibo = AD_CONFIG['weibo'] && AD_CONFIG['weibo']['type'] == 'qq'
              ? new ad.widget.QQWeibo(AD_CONFIG['weibo'])
              : new ad.widget.SinaWeibo(AD_CONFIG['weibo']);

    var buttonGroupConfig = AD_CONFIG['button_group'];
    buttonGroupConfig['options'].push(buttonGroupConfig['fixed']);

    material.setWidgets(
        [
            new ad.widget.H1(AD_CONFIG['h1']),
            weibo
        ],
        [new ad.widget.ImageNormal(AD_CONFIG['img_list'])],
        [new ad.widget.ButtonGroup(AD_CONFIG['button_group'])]
    );

    if (async === true) {
        return material;
    }

    material.show();

    // 截取长度
    weibo.addListener(ui.events.TIME_LINE_LOADED, function (ret) {
        var len = AD_CONFIG['weibo_length'] || 70;
        var text = this._stringLengthFormat(ret.text, len);
        baidu.g(this.getId('context')).innerHTML = text;
    });

});


















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
