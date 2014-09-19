/**************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/xuehua.js ~ 2013/07/15 14:26:07
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 11222 $
 * @description
 * xuehua相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.TabCont');
goog.require('ad.widget.NormalContainer');
goog.require('ad.widget.Section');
goog.require('ad.widget.ImageLink');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.FloatWindowContainer');

goog.include('ad/impl/xuehua.less');

goog.provide('ad.impl.Xuehua');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    material.setRender(new ad.render.RecursiveRender({
        'block_class': 'ad-block'
    }));
    var leftVideo = new ad.widget.Video(AD_CONFIG['video_left']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);

    var tabContainer, arrTabCont = [];
    arrTabCont[1] = new ad.widget.SmallWeibo(AD_CONFIG['tab2']['tab_cont']);
    AD_CONFIG['tab']['options'][1] = {
        'tab_title': AD_CONFIG['tab2']['tab_title']
    };
    arrTabCont[3] = new ad.widget.SmallWeibo(AD_CONFIG['tab4']['tab_cont']);
    AD_CONFIG['tab']['options'][3] = {
        'tab_title': AD_CONFIG['tab4']['tab_title']
    };

    var contImg, contSection, contContainer, tabTitle;
    for (var i = 0; i < AD_CONFIG['tab_other']['list'].length; i++) {
        AD_CONFIG['tab_other']['list'][i]['tab_cont']['image']['rcv_url'] = "";
        contImg = new ad.widget.ImageLink(AD_CONFIG['tab_other']['list'][i]['tab_cont']['image']);
        contSection = new ad.widget.Section(AD_CONFIG['tab_other']['list'][i]['tab_cont']['section']);
        contContainer = new ad.widget.NormalContainer({});
        contContainer.setWidgets([contImg, contSection]);
        tabTitle = AD_CONFIG['tab_other']['list'][i]['tab_title'];
        switch (i) {
            case 0:
                var img0 = contImg;
                arrTabCont[0] = contContainer;
                AD_CONFIG['tab']['options'][0] = {
                    'tab_title': tabTitle
                };
                break;
            case 1:
                arrTabCont[2] = contContainer;
                AD_CONFIG['tab']['options'][2] = {
                    'tab_title': tabTitle
                };
                break;
            default:
                arrTabCont[i + 2] = contContainer;
                AD_CONFIG['tab']['options'][i + 2] = {
                    'tab_title': tabTitle
                };
                break;
        }
    }
    tabContainer = new ad.widget.TabContainer(AD_CONFIG['tab']);
    tabContainer.setWidgets(arrTabCont);

    var fwc = [];
    var fwcRendered = [];
    for (var j = 0; j < AD_CONFIG['pop_ups']['list'].length; j++) {
        AD_CONFIG['pop_ups']['list'][j]['id'] = 'pop_' + j;
        fwc[j] = new ad.widget.FloatWindowContainer(AD_CONFIG['pop_ups']['list'][j]);
    }
    var tabPopUp = new ad.widget.FloatWindowContainer(AD_CONFIG['tab1_popup']);

    material.setWidgets(
        [leftVideo, smallHead], [tabContainer], fwc
    );

    if (async === true) {
        return material;
    }

    material.show();

    /*
    // FIXME(user) material.getCMS()
    material.getCMS().init(baidu.getAttr(baidu.dom.first(pop_0.getRoot()), 'id'));
    material.getCMS().init(baidu.getAttr(baidu.dom.first(pop_1.getRoot()), 'id'));
    material.getCMS().init(baidu.getAttr(baidu.dom.first(pop_2.getRoot()), 'id'));
    */
    img0.addListener(ui.events.CLICK, function() {
        tabPopUp.show();
    });
    smallHead.addListener(ui.events.CLICK, function(i) {
        leftVideo.pause();
        fwc[i].show();
        smallHead.sendLog('popup_' + (i + 1) + '_open', 'popup_' + (i + 1) + '_open');
        if (!fwcRendered[i]) {
            var canvas = baidu.dom.first(fwc[i].getRoot());
            if (canvas && canvas.id) {
                material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
                fwcRendered[i] = true;
            }
        }
        return false;
    });

});



// vim: set ts=4 sw=4 sts=4 tw=100 noet: