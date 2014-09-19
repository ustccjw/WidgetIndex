/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: suning.js 11357 2012-08-28 06:40:06Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/suning.js ~ 2012/06/07 22:42:02
 * @author loutongbing
 * @version $Revision: 11357 $
 * @description
 *
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.service.prodb.SearchService');
goog.require('ad.widget.H1');
goog.require('ad.widget.H2');
goog.require('ad.widget.H3');
goog.require('ad.widget.search_box.SearchBox');

goog.include('ad/impl/suning.less');

goog.provide('ad.impl.Suning');

ad.Debug(function(async) {
    var material = new ad.Material(AD_CONFIG['id']);
    material.setWidgets(
        [new ad.widget.H1(AD_CONFIG['h1'])],
        [new ad.widget.H2(AD_CONFIG['h2'])],
        [new ad.widget.H3(AD_CONFIG['h3'])],
        [new ad.widget.search_box.SearchBox(AD_CONFIG['search_box'])]
    );
    if (async === true) {
        return material;
    }
    material.show();
    ad.base.require('xx', 'http://osdream.com:8866/target/output/exported/plugin/rcv2.js', function(o) {
        console.log(o);
    });
    // material.getWidget(1, 0).hide();
    // material.getWidget(2, 0).hide();
    function shuffle(array) {
        // 简单点儿来
        array.sort(function() {
            return Math.round(Math.random()) - 0.5;
        });
        return array;
    }
    function formatConverter(productsTable) {
        var header = [];
        var rows = [];
        for (var i = 0; i < productsTable.length; i++) {
            header.push(productsTable[i]);
            productsTable[i]['items'] = shuffle(productsTable[i]['items']);
            for (var j = 0; j < productsTable[i]['items'].length && j<2; j++) {
                if (!rows[j]) {
                    rows[j] = { 'cols' : [] };
                }
                rows[j]['cols'][i] = productsTable[i]['items'][j];
            }
        }
        return {
            'header' : header,
            'rows' : rows
        };
    }

    material.initMonitor(AD_CONFIG['main_url']);

    function validAndModify(data){
        var result = data
        result['products_type']['services'] = baidu.string.subByte(result['products_type']['services'], 10);
        var pro_data = result['products_type']['data'];
        for(var i = 0; i < pro_data.length; i++){
            pro_data[i]['title'] = baidu.string.subByte(pro_data[i]['title'], 28);
            pro_data[i]['price_title'] = baidu.string.subByte(pro_data[i]['price_title'], 6);
        }
        var table_data = result['products_table'];
        for(i = 0; i < table_data.length; i++){
            table_data[i]['category'] = baidu.string.subByte(table_data[i]['category'], 16);
            var items = table_data[i]['items'];
            for(var j = 0;j < items.length;j++){
                items[j]['name'] = baidu.string.subByte(items[j]['name'], 16);
            }
        }
        return result;
    }
    var sign_timeout = false;
    var callback_success = false;
    ad.base.setTimeout(function(){
        sign_timeout = true;
    },1000);
    var callback_timer = ad.base.setInterval(function(){
        if(sign_timeout && !callback_success){
            baidu.addClass(material.getWidget(1, 0).getRoot().parentNode, 'ec-show');
            baidu.addClass(material.getWidget(2, 0).getRoot().parentNode, 'ec-show');
        }
    },150);
    var ss = new ad.service.prodb.SearchService();
    ss.search('ucid='+ AD_CONFIG['ucid'] +'&count_services=6&count_category=4', function(response) {
        if (!sign_timeout && response && response['success'] === 'true') {
            var h2 = material.getWidget(1, 0);
            var result = validAndModify(response['result']);
            if (h2 && result['products_type'] && result['products_type']['data'].length >= 3) {
                var data = shuffle(result['products_type']['data']);
                data.length = 3;
                baidu.array.each(data, function(item) {
                    item['image'] = item['image'];
                    item['price_title'] = item['price_title'] || AD_CONFIG['h2']["price_title"];
                });
                h2.refresh(null, result['products_type']);
                baidu.addClass(h2.getRoot().parentNode, 'ec-show');
            }else{
                baidu.addClass(h2.getRoot().parentNode, 'ec-show');
            }
            var h3 = material.getWidget(2, 0);
            if (h3 && result['products_table'].length >= 2) {
                var table_data = result['products_table'];
                h3.refresh(null, formatConverter(table_data));
                baidu.addClass(h3.getRoot().parentNode, 'ec-show');
            }else{
                baidu.addClass(h3.getRoot().parentNode, 'ec-show');
            }
            material.getCS().init(material.getId(), AD_CONFIG['main_url']);
        }else{
            baidu.addClass(material.getWidget(1, 0).getRoot().parentNode, 'ec-show');
            baidu.addClass(material.getWidget(2, 0).getRoot().parentNode, 'ec-show');
        }
        callback_success = true;
    });
});




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
