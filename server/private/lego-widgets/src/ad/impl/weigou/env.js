/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/



/**
 * src/ad/impl/weigou/env.js ~ 2013/05/03 12:00:21
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$
 * @description
 *
 **/
goog.require('ad.impl.weigou.dist');

goog.provide('ad.impl.weigou.env');

/**
 * @return {string}
 */
ad.impl.weigou.env.getDevice = function() {
    if (ad.impl.weigou.dist.MOBILE_1) {
        return 'mobile_1';
    } else if (ad.impl.weigou.dist.MOBILE) {
        return 'mobile';
    } else if (ad.impl.weigou.dist.IPAD) {
        return 'ipad';
    } else if (ad.impl.weigou.dist.PC_1) {
        return 'pc_1';
    } else {
        return 'pc';
    }
};

/**
 * 获取Query和Qid
 * @return {{query:string, qid:string, tpl:string, region: string}}
 */
ad.impl.weigou.env.getSearchInfo = function() {
    var query = '';
    var qid = '';
    var tpl = '';
    var region = '';

    if (ad.impl.weigou.dist.IPAD) {
        // http://www.baidu.com/s?wd=iphone5&dsp=ipad
        try {
            var comm = window['bds']['comm'];
            query = comm['query'];
            qid = comm['qid'];
            tpl = 'ecl_ec_weigou_ipad';

            var data = window['bds']['ecom']['data']['zhixin'];
            region = data['region'];
        } catch (e) {}
    } else if (ad.impl.weigou.dist.MOBILE) {
        // http://m.baidu.com/s?word=iphone&tn=iphone
        try {
            var params = ad.impl.weigou.util.getUrlParams();
            query = params['word'] || '';

            var data = window['A']['ec']['weigou'];
            qid = data['qid'];
            region = data['region'];

            tpl = 'ec_weigou';
        } catch (e) {}
    } else {
        // http://www.baidu.com/s?wd=iphone5
        query = window['bdQuery'];
        qid = window['bdQid'];
        tpl = 'ecl_ec_weigou';

        try {
            var data = window['bds']['ecom']['data']['zhixin'];
            region = data['region'];
        } catch(e){}
    }

    return {query: query, qid: qid, tpl: tpl, region: region};
};




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
