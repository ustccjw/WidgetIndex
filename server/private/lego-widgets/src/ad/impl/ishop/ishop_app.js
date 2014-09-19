/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/ishop/ishop_app.js ~ 2012/11/13 18:28:48
 * @author pengxing@baidu.com (pengxing)
 * @version $Revision: 11222 $
 * @description
 * ishop_app相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');

goog.require('ad.impl.ishop.dal');
goog.require('ad.impl.ishop.events');
goog.require('ad.impl.ishop.constants');
goog.require('ad.impl.ishop.Log');

goog.require('ad.widget.ishop.Header');
goog.require('ad.widget.ishop.ViewContainer');
goog.require('ad.widget.ishop.ListView');
goog.require('ad.widget.ishop.DetailView');
goog.require('ad.widget.ishop.PurchaseView');
goog.require('ad.widget.ishop.SuccessView');


goog.include('ad/impl/ishop/ishop_app.less');

goog.provide('ad.impl.ishop.IshopApp');

ad.Debug(function(){
    try {
        document.execCommand("BackgroundImageCache", false, true);
    } catch(err) {}
    var ishop = window['ishop'] = {},
        dal = ad.impl.ishop.dal;
    ishop['dal'] = dal;

    var href = location.href,
        sParam = href.substring(href.indexOf('?')),
        params = baidu.url.queryToJson(sParam);

    // Have to do this thing, because queryToJson didn't decode for us.
    for(var p in params){
        params[p] = decodeURIComponent(params[p]);
    }


    var query = params['keyword'];
    if(!query){
        query = '巧克力';
    } else {
        // 当在app平台页的时候keyword被转义了两次，需要做两次decode
        var position = params['canvas_pos'];
        if(position && position.indexOf('platform') !== -1){
            query = decodeURIComponent(query);
        }
    }

    var material = new ad.Material(AD_CONFIG['id']);

    var header = new ad.widget.ishop.Header({
        'query' : encodeURIComponent(query)
    });

    var viewContainer = new ad.widget.ishop.ViewContainer({
        'query' : query
    });
    ishop['viewContainer']= viewContainer;

    material.setWidgets(
        [ header ],
        [ viewContainer ]
    );
    material.show();

    var log = new ad.impl.ishop.Log(query, viewContainer);

    /**
     * 打开购买成功页
     */
    var gotoSuccess = function(data){
        var successView = new ad.widget.ishop.SuccessView(data);
        viewContainer.add(successView);

        window['_hmt'].push(['_trackEvent', 'success-page', query, data['id']]);
        log.sendLog({
            'item': 'success-page'
        });

        /*
        * 购买成功后，返回按钮直接返回到商品列表页，所以这里要把中间的两个scene删掉
        */
        if(viewContainer.getViewCount() === 4){
            viewContainer.customRemove(1);
            viewContainer.customRemove(1);
        }
    };

    /**
     * 打开购买页，用户可以填写表单信息
     * @param {Object} data 用户需要购买的商品信息
     */
    var gotoPurchase = function(data){
        var purchaseView = new ad.widget.ishop.PurchaseView(data, ishop['region']);
        viewContainer.add(purchaseView);
        purchaseView.addListener(ad.impl.ishop.events.SUCCESS_VIEW, gotoSuccess);
        log.sendLog({
            'item': 'purchase-page'
        });
    };

    /**
     * 打开商品详情页
     * @param {string} id 商品id
     * @param {Array}  data 商品列表
     */
    var gotoDetail = function(id, data){
        var index, d;
        for(var i = 0, l = data.length; i < l; i++){
            d = data[i];
            if(d['id'] === id){
                index = i;
                break;
            }
        }

        var items = baidu.object.clone(data);
        if(data.length > 5){
            if(index >= 5){
                var current = items[index];
                // PM的策略是取前4个
                items = items.splice(0, 4);
                items.push(current);
            } else {
                items = items.splice(0, 5);
            }
        }

        var params = {
            'id' : id,
            'data' : items
        };
        var detailView = new ad.widget.ishop.DetailView(params, query);
        detailView.addListener(ad.impl.ishop.events.PURCHASE_VIEW, gotoPurchase);
        viewContainer.add(detailView);
        log.sendLog({
            'item': 'detail-page'
        });

    };

    /**
     * Load region data to parse
     */ 
    var loadRegionData = function(){
        dal.region(function(data){
            var item;
            var code;
            for(code in data){
                item = data[code];
                if(item[1] === '1'){
                    item[2] = {};
                } else {
                    if(!data[item[1]][2]){
                        data[item[1]][2] = {};
                    }
                    data[item[1]][2][code] = item;
                }
            }

            var list = {};
            // Pick province data out
            for(code in data){
                item = data[code];
                if(item[1] === '1'){
                    list[code] = item;
                }
            }

            ishop['region'] = list;
        });
    };

    // Load data to detect if this query is general or accurate, and then show different view
    dal.search(query, function(data){
        var view = new ad.widget.ishop.ListView(data);
        // Listene to the DETAIL_VIEW event, and create ad.widget.ishop.DetailView
        view.addListener(ad.impl.ishop.events.DETAIL_VIEW, gotoDetail);
        viewContainer.add(view);

        loadRegionData();

        var date = new Date();
        window['_hmt'].push(['_trackEvent', 'loadtime', query, date - window['_startTime']]);
        log.sendLog({
            'item': 'list-page'
        });
    });


    viewContainer.autoHeight();
});



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
