/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: dnc.js  2012/08/09 10:25:19Z wangdawei $
 *
 **************************************************************************/



/**
 * src/ad/impl/dnc.js ~ 2012/08/09 11:47:13
 * @author wangdawei
 * @version $Revision: $
 * @description
 *
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.render.DefaultRender');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Section');
goog.require('ad.widget.Tab');
goog.require('ad.widget.ButtonGroup');
goog.include('ad/impl/dnc.less');

goog.provide('ad.impl.Dnc');

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
    var layout = [];
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

    return layout.join('\n');
};

ad.Debug(function(async) {
    var material = new ad.Material(AD_CONFIG['id']);
    material.setRender(new ad.render.LvRender());
    material.setWidgets(
        [new ad.widget.Video(AD_CONFIG['video'])],
        [new ad.widget.SmallHead(AD_CONFIG['smallhead']),new ad.widget.Section(AD_CONFIG['section'])],
        [new ad.widget.Tab(AD_CONFIG['tabs'])],
        [new ad.widget.ButtonGroup(AD_CONFIG['button_group'])]
    );

    if (async === true) {
        return material;
    }

    material.show();
    material.initMonitor(AD_CONFIG['main_url']);
    var video = material.getWidget(0,0);
    video.addListener(ui.events.SEND_LOG, function(params) {
        var title = params['action'];
        sendLog(title+"1","");
        return false;
    });
    function sendLog(title, xp) {
        material.getCMS().sendLog({
            'r' : new Date().valueOf(),
            'q' : (window['bdQuery'] || ''),
            'xp' : xp,
            'plid' : material.getId().replace(/ec-ma-/g, ''),
            'title' : title
        });
    }
});

/* vim: set ts=4 sw=4 sts=4 tw=100: */
