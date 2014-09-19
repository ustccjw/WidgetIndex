/***************************************************************************
 *
 * Copyright (c) 2011 Baidu.com, Inc. All Rights Reserved
 * $Id: test_is_sample.js 9415 2012-05-28 06:53:00Z liyubei $
 *
 **************************************************************************/



/**
 * src/pdc/test_is_sample.js ~ 2011/11/16 12:10:51
 * @author leeight(liyubei@baidu.com)
 * @version $Revision: 9415 $
 * @description
 *
 **/
var _is_sample = function(sample, has_performance, baidu_id) {
    var e = false,
        d = sample,
        b = 0;
    if (has_performance) {
        d = d * 5;
    }
    var c = new Date().getHours();
    if (c > 1 && c < 8) {
        d = d * 5;
    }
    d = d > 0.9 ? 0.9 : d;
    d = d < 0.0001 ? 0.0001 : d;
    if (baidu_id) {
        b = parseInt(baidu_id.slice(-4), 16);
        b = isNaN(b) ? 0 : b;
    }
    if (d <= 0.5) {
        e = (b % (parseInt(1 / d)) == 1);
    } else {
        e = (b % (parseInt(1 / (1 - d))) != 1);
    }
    return e;
};
console.log(_is_sample(1, true, '410831390DBD1667D465D772094EEC63'));
console.log(_is_sample(1, false, '410831390DBD1667D465D772094EEC63'));
console.log(_is_sample(1, true, '410831390DBD1667D465D772094EEC61'));
console.log(_is_sample(1, false, '410831390DBD1667D465D772094EEC62'));





















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
