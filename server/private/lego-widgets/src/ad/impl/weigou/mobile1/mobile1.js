/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/weigou/mobile/mobile.js ~ 2013/05/07 11:44:00
 * @author pengxing@baidu.com (pengxing)
 * @version $Revision: 11222 $
 * @description
 * Mobile Weigou Application
 **/

goog.require('ad.Debug');
goog.require('ad.impl.weigou.Log');
goog.require('ad.impl.weigou.dal');
goog.require('ad.impl.weigou.events');
goog.require('ad.impl.weigou.user');
goog.require('ad.widget.mweigou.DetailView');
goog.require('ad.widget.mweigou.ListView');
goog.require('ad.widget.mweigou.LoginView');
goog.require('ad.widget.mweigou.PurchaseView2');
goog.require('ad.widget.mweigou.SuccessView');
goog.require('ad.widget.mweigou.ViewContainer');

goog.include('ad/impl/weigou/mobile1/mobile1.less');

goog.provide('ad.impl.weigou.mobile1.Weigou');

ad.Debug(function() {
    // 具体data的格式请查看模板
    var data = window['A']['ec']['weigou'];

    var viewContainer = new ad.widget.mweigou.ViewContainer(data['data']);
    viewContainer.setRoot($('#ec-sg-weigou-placeholder')[0]);
    viewContainer.enterDocument();
    viewContainer.bindEvent();

    var searchInfo = ad.impl.weigou.env.getSearchInfo();
    ad.impl.weigou.user.setRegion(searchInfo.region);

    var log = new ad.impl.weigou.Log(searchInfo.query, viewContainer,
        searchInfo.tpl, searchInfo.qid);
    viewContainer.addListener(ui.events.SEND_LOG, function(info){
        log.sendLog(info);
    });
    viewContainer.addListener(ad.impl.weigou.events.BACK, function(){
        var currentName = viewContainer.getCurrentView().name;
        var targetNameMap = {
            'purchase': 'detail',
            'success': data['isDetail'] ? 'detail' : 'list'
        };
        var targetName = targetNameMap[currentName];
        if (targetName) {
            viewContainer.gotoView(targetName);
        } else {
            viewContainer.remove();
        }
    });

    function gotoDetail(id) {
        var region = ad.impl.weigou.user.getRegion();
        ad.impl.weigou.dal.detail(id, region, function(data) {
            if (data['success'] === 'true') {
                var detailView = new ad.widget.mweigou.DetailView(data['result'], true);
                detailView.addListener(ad.impl.weigou.events.PURCHASE_VIEW, gotoLogin);
                viewContainer.add(detailView);
            } else {
                // TODO 错误处理
            }
        });
    };

    function gotoLogin(result) {
        var loginView = new ad.widget.mweigou.LoginView(result);
        loginView.addListener(ad.impl.weigou.events.PURCHASE_VIEW, gotoPurchase);
        viewContainer.add(loginView);
    }

    function gotoPurchase(result) {
        var purchaseView = new ad.widget.mweigou.PurchaseView2(result);
        purchaseView.addListener(ad.impl.weigou.events.SUCCESS_VIEW, gotoSuccess);
        viewContainer.add(purchaseView);
    }

    function gotoSuccess(data) {
        var successView = new ad.widget.mweigou.SuccessView(data);
        viewContainer.add(successView);
    }

    var view;
    if (data['isDetail']) {
        view = new ad.widget.mweigou.DetailView(data['data']);
        view.addListener(ad.impl.weigou.events.PURCHASE_VIEW, gotoPurchase);
    } else {
        view = new ad.widget.mweigou.ListView(data);
        view.addListener(ad.impl.weigou.events.DETAIL_VIEW, gotoDetail);
    }

    viewContainer.add(view, $('#ec-sg-weigou-list-placeholder')[0], true);

    if (!COMPILED) {
        window.viewContainer = viewContainer;
    }
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
