/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: shdz.js  2012-08-15 10:25:19Z wangdawei $
 *
 **************************************************************************/



/**
 * src/ad/impl/shdz.js ~ 2012/08/15 11:47:13
 * @author wangdawei
 * @version $Revision: $
 * @description
 *
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.service.ClickMonkeyService');
goog.require('ad.service.ClickService');
goog.require('ad.service.StatisticsService');
goog.require('ad.widget.Slider');
goog.require('ad.widget.H1');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.Tab');
goog.require('ad.widget.ButtonGroup');
goog.include('ad/impl/shdz.less');

goog.provide('ad.impl.Shdz');

/**
 * @constructor
 * @extends {ad.render.DefaultRender}
 */
ad.render.LvRender = function() {
    ad.render.DefaultRender.call(this);
};
baidu.inherits(ad.render.LvRender, ad.render.DefaultRender);

/** @override */
ad.render.LvRender.prototype.genLayout = function(layouts) {
    var layout = ['<div class="layout">'];
    for (var i = 0, rows = layouts; i < rows.length; i++) {
        if (i === 0) {
            layout.push('<div class="ad-layout-wrapper">');   // start wrapper
        }
        layout.push('<div class="ad-layout-row ad-layout-row-' + i + '">');
        for (var j = 0, cols = layouts[i]; j < cols.length; j++) {
            layout.push('<div class="ad-layout-col ad-layout-col-' + j + '" id="{{r' + i + 'c' + j + '-id}}">{{{r' + i + 'c' + j + '}}}</div>');
        }
        layout.push('</div>');
        if (i === 1) {
          layout.push('</div>');    // end wrapper
        }
    }
    layout.push('</div>');

    return layout.join('\n');
};

ad.Debug(function() {
    var material = new ad.Material(AD_CONFIG['id']);
    material.setRender(new ad.render.LvRender());
    material.setWidgets(
        [new ad.widget.Slider(AD_CONFIG['slider'])],
        [new ad.widget.H1(AD_CONFIG['h1']), new ad.widget.SmallWeibo(AD_CONFIG['small_weibo'])],
        [new ad.widget.Tab(AD_CONFIG['tabs'])],
        [new ad.widget.ButtonGroup(AD_CONFIG['button_group'])]
    );
    var cms = new ad.service.ClickMonkeyService();
    var cs = new ad.service.ClickService();
    var ss = new ad.service.StatisticsService();
    
    material.show();
    cms.init(material.getId());
    cs.init(material.getId(), AD_CONFIG['main_url']);
    ss.init(material.getId());
    
    function sendLog(title, xp) {
        cms.sendLog({
            'r' : new Date().valueOf(),
            'q' : (window['bdQuery'] || ''),
            'xp' : xp,
            'plid' : material.getId().replace(/ec-ma-/g, ''),
            'title' : title
        });
    }
});

/* vim: set ts=4 sw=4 sts=4 tw=100: */
