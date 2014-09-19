/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: wangyi_qtz.js 9564 2012-06-06 04:43:29Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/wangyi_qtz.js ~ 2012/06/06 11:47:13
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision: 9564 $
 * @description
 *
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.render.DefaultRender');
goog.require('ad.widget.Skyscraper');
goog.require('ad.service.data.DataService');
goog.require('ui.events');

goog.include('ad/impl/wangyi_qtz.less');

goog.provide('ad.impl.Wangyi_qtz');


ad.Debug(function(async) {
    var material = new ad.Material(AD_CONFIG['id']);
    material.setWidgets(
        [new ad.widget.Skyscraper(AD_CONFIG['skyscraper'])]
    );
    if (async === true) {
        return material;
    }

    material.show();

    var cms = material.getCMS();
    cms.init(material.getId());

    function sendLog(title, xp) {
        cms.sendLog({
            'r' : new Date().valueOf(),
            'q' : (window['bdQuery'] || ''),
            'xp' : xp,
            'plid' : material.getId().replace(/ec-ma-/g, ''),
            'title' : title
        });
    }

    var sign_timeout = false;
    ad.base.setTimeout(function(){
        sign_timeout = true;
    },1500);

    var url = RT_CONFIG.HOST("wbapi.baidu.com") + "/service/wangyi/query";
    var ss = new ad.service.data.DataService(url);
    ss.callData('type=0', function(response) {
        if(!sign_timeout && response && response["success"] == "true"){
            var result = response['result'];
            var skyscraper = material.getWidget(0, 0);
            var skyscraper_data = AD_CONFIG['skyscraper'];
            if(result["skyscraper"]){
                skyscraper_data = baidu.object.extend(skyscraper_data,result["skyscraper"]);
                skyscraper_data["list"] = {};
                skyscraper_data["list"]["options"] = result["skyscraper"]["list"];
            }
            skyscraper.setData(skyscraper_data);
            skyscraper._patchIndex();
            skyscraper.render();
            skyscraper.show();

        }
    });
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
