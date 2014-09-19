/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: all_widgets.js 11655 2012-09-10 09:04:23Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/test/all_widgets.js ~ 2012/09/10 16:49:50
 * @author leeight(liyubei@baidu.com)
 * @version $Revision: 11655 $
 * @description
 * 加载所有的ad.widget.***
 **/
goog.provide('ad.test.AllWidgets');

(function() {
    if (typeof ER_AD_WIDGET_LIST == 'undefined') {
        return false;
    }

    for (var i = 0, result = ER_AD_WIDGET_LIST['page']['result'];
        i < result.length; i++) {
        var item = result[i];
        if (item['ns']) {
            goog['require'](item['ns']);
        }
    }
})();




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
