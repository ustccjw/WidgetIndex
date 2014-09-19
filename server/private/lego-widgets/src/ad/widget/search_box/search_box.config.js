/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: search_box.config.js 15360 2012-12-06 13:46:58Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/jn/demo/search_box.config.js ~ 2012/08/08 21:41:35
 * @author leeight@gmail.com (leeight)
 * @version $Revision: 15360 $
 * @description
 * search_box相关的实现逻辑
 **/

var WIDGET_CONFIG = {
    'rcv_url' : 'http://www.suning.com',
    'form' : {
        'action' : 'http://cn.strawberrynet.com/product-search',
        'method' : 'get',
        'charset' : 'gb2312',
        'params' : [
            {'key' : 'trackid', 'value' : 1411300030 },
            {'key' : 'utm_source', 'value' : 'Baidu+Brandzone' },
            {'key' : 'utm_term', 'value' : 'Baidu+Brandzone_search+results' },
            {'key' : 'utm_campaign', 'value' : 'Brandzone' },
            {'key' : 'utm_content', 'value' : 'Adtext' },
            {'key' : 'searchLineId', 'value' : '' },
            {'key' : 'utm_medium', 'value' : 'cpc' }
        ],
        'query_name' : 'searchField',
        'label_query_name' : ''
    },
    'placeholder' : '暑期热卖排行',
    'button_text' : '草莓网搜索'
};



/* vim: set ts=4 sw=4 sts=4 tw=100: */
