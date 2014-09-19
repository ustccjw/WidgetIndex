/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/weigou/weigou.js ~ 2013/03/04 13:59:08
 * @author pengxing@baidu.com (pengxing)
 * @version $Revision: 11222 $
 * @description
 * weigou相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.impl.weigou.Log');
goog.require('ad.impl.weigou.dal');
goog.require('ad.impl.weigou.json');
goog.require('ad.widget.ticket.DetailView');
goog.require('ad.widget.ticket.ListView');
goog.require('ad.widget.weigou.PurchaseView');
goog.require('ad.widget.weigou.SuccessView');
goog.require('ad.widget.weigou.ViewContainer');

goog.include('ad/impl/weigou/ticket/weigou.less');

goog.provide('ad.impl.weigou.ticket.Weigou');

ad.Debug(function() {

    var weigou = {};
    var dal = ad.impl.weigou.dal;

    var data;
    try {
        data = window['bds']['ecom']['data']['zhixin'];
    } catch (e) {
        // the data for zhixin is wrong, exit directly.
        return;
    }

    // init view container
    var viewContainer = new ad.widget.weigou.ViewContainer(data['data']);
    viewContainer.setRoot(baidu.g('ecl-weigou-view-container-placeholder'));
    viewContainer.enterDocument();
    viewContainer.bindEvent();

    var processRegionData = function(data) {
        var item;
        var code;
        for (code in data) {
            item = data[code];
            if (item[1] === '0') {
                item[2] = {};
            } else {
                if (!data[item[1]][2]) {
                    data[item[1]][2] = {};
                }
                data[item[1]][2][code] = item;
            }
        }

        var list = {};
        // Pick province data out
        for (code in data) {
            item = data[code];
            if (item[1] === '0') {
                list[code] = item;
            }
        }

        return list;
    };
    /**
     * Load region data to parse
     */
    function loadRegionData() {
        dal.region({}, function(data) {
            // 国标的地址
            weigou['region'] = processRegionData(data);
        });
    };

    function loadJDRegionData() {
        dal.region_jd({}, function(data) {
            weigou['region_jd'] = processRegionData(data);
        });
    }

    function gotoSuccess(data) {
        var view = new ad.widget.weigou.SuccessView(data);
        viewContainer.add(view);
        view.addListener(ad.impl.weigou.events.GO_ON_SHOPPING, function() {
            while (viewContainer._views.length > 1) {
                viewContainer.customRemove(1);
            }
        });
    };

    function gotoPurchase(data) {
        function openPurchase(d, region) {
            var view = new ad.widget.weigou.PurchaseView(d, region);
            viewContainer.add(view);
            view.addListener(ad.impl.weigou.events.SUCCESS_VIEW, gotoSuccess);
            view.addListener(ad.impl.weigou.events.BACK, function() {
                viewContainer.remove();
            });
        };
        if (data['vendor'] === '京东商城') {
            if (!weigou['region_jd']) {
                dal.region_jd({}, function(regionData) {
                    weigou['region_jd'] = processRegionData(regionData);
                    openPurchase(data, weigou['region_jd']);
                });
            } else {
                openPurchase(data, weigou['region_jd']);
            }
        } else {
            if (!weigou['region']) {
                dal.region({}, function(regionData) {
                    weigou['region'] = processRegionData(regionData);
                    openPurchase(data, weigou['region']);
                });
            } else {
                openPurchase(data, weigou['region']);
            }
        }
    };

    var detailOpening = false;
    // 打开购买页
    function gotoDetail(id) {
        if (detailOpening) {
            return;
        }
        detailOpening = true;

        var reg = '';
        var listView = viewContainer._views[0];
        if (listView.name === 'list') {
            reg = listView.region;
        }

        ad.impl.weigou.dal.detailTicket(id, reg, function(data) {
            if (data['success'] === 'false') {
                detailOpening = false;
                return;
            }
            var detailView = new ad.widget.ticket.DetailView(data['result']);
            viewContainer.add(detailView);
            detailView.addListener(ad.impl.weigou.events.PURCHASE_VIEW, gotoPurchase);
            detailView.addListener(ad.impl.weigou.events.BACK, function() {
                viewContainer.remove();
            });
            detailOpening = false;
        });
    };


    var view;
    if (data['isDetail']) {
        view = new ad.widget.ticket.DetailView(data['data']);
        view.addListener(ad.impl.weigou.events.PURCHASE_VIEW, gotoPurchase);
    } else {
        view = new ad.widget.ticket.ListView(data);
        view.addListener(ad.impl.weigou.events.DETAIL_VIEW, gotoDetail);

        viewContainer.addListener(ad.impl.weigou.events.REGION_CHANGED, function(region) {
            view.trigger(ad.impl.weigou.events.REGION_CHANGED, region);
        });
    }

    // add the first view to view container
    viewContainer.add(view, baidu.g('ecl-weigou-view-placeholder'), true);

    // init log
    var searchInfo = ad.impl.weigou.env.getSearchInfo();
    if(COMPILED) {
        var log = new ad.impl.weigou.Log(searchInfo.query, viewContainer, searchInfo.tpl, searchInfo.qid);
    }

    loadRegionData();
    loadJDRegionData();
    // 为了线下测试而使用
    if (!COMPILED) {
        window['weigou'] = weigou;
    }
    weigou.viewContainer = viewContainer;

    gotoDetail('131');
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
