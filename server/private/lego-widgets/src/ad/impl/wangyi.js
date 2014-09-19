/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: wangyi.js 9564 2012-06-06 04:43:29Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/wangyi.js ~ 2012/06/06 11:47:13
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision: 9564 $
 * @description
 *
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.render.DefaultRender');
goog.require('ad.widget.Header');
goog.require('ad.widget.Email');
goog.require('ad.widget.Tab');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.service.data.DataService');
goog.require('ui.events');

goog.include('ad/impl/wangyi.less');

goog.provide('ad.impl.Wangyi');


ad.Debug(function(async) {
    var material = new ad.Material(AD_CONFIG['id']);
    AD_CONFIG['tabs']['inside'] = {"width":538};
    AD_CONFIG['buttons']['inside'] = {'isauto':false};
    material.setWidgets(
        [new ad.widget.Header(AD_CONFIG['head'])],
        [new ad.widget.Email(AD_CONFIG['mail'])],
        [new ad.widget.Tab(AD_CONFIG['tabs'])],
        [new ad.widget.ButtonGroup(AD_CONFIG['buttons'])]
    );
    if (async === true) {
        return material;
    }

    material.show();
    material.initMonitor(AD_CONFIG['main_url']);

    var sign_timeout = false;
    ad.base.setTimeout(function(){
        sign_timeout = true;
    },1500);

    var url = RT_CONFIG.HOST("wbapi.baidu.com") + "/service/wangyi/query";
    var ss = new ad.service.data.DataService(url);
    ss.callData('type=1', function(response) {
        if(!sign_timeout && response && response["success"] == "true"){
            var result = response['result'];
            var head = material.getWidget(0, 0);
            var head_data = AD_CONFIG['head'];
            if(result["head"]){
                head_data = baidu.object.extend(head_data,result["head"]);
                head_data["list"] = {};
                head_data["list"]["options"] = result["head"]["list"];
            }
            head.setData(head_data);
            head._patchData();
            head.render();
            head.show();

            var tabs = material.getWidget(2, 0);
            var tabs_data = AD_CONFIG['tabs'];
            if(result["tabs"]){
                tabs_data["options"] = baidu.object.extend(tabs_data["options"],result["tabs"]);
                tabs_data["options"][0]["tab_title"] = "新闻";
            }
            tabs.setData(tabs_data);
            tabs.render();
            tabs.show();
            tabs.enterDocument();
            tabs.bindEvent();
            material.getCS().init(material.getId(), AD_CONFIG['main_url']);
        }
    });
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
