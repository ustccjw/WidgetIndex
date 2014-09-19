/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/olay.js ~ 2014/08/11 15:09:31
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * olay相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Title');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.NormalContainer');
goog.require('ad.widget.ButtonGroup');
// goog.require('ad.widget.Slider');
goog.require('ad.widget.standard.ImageSlideShow');
goog.require('ad.widget.Image');
goog.require('ad.widget.Colorlist');
goog.require('ad.widget.ButtonListFluid');

goog.include('ad/impl/new_custom/olay.less');

goog.provide('ad.impl.new_custom.Olay');

ad.Debug(function(async) {

    var tabConts = [];
    var tabContOptions = AD_CONFIG['tab_container']['options'];
    var option;
    var normalCont;
    for (var i = 0; i < tabContOptions.length; ++i) {
        option = tabContOptions[i];
        normalCont = new ad.widget.NormalContainer({});
        normalCont.setWidgets(
            new ad.widget.Image(option['image']),
            new ad.widget.Colorlist(option['color_list'])
        );
        tabConts.push(normalCont);
    }

    var tabContainer = new ad.widget.TabContainer(AD_CONFIG['tab_container']);
    tabContainer.setWidgets(tabConts);

    var material = new ad.material.BaseMaterial();
    material.setWidgets(
        [ new ad.widget.Title(AD_CONFIG['title']) ],
        [
            // [ new ad.widget.Slider(AD_CONFIG['slider']) ],
            [ new ad.widget.standard.ImageSlideShow(AD_CONFIG['image_slide_show']) ],
            [
                new ad.widget.SmallHead(AD_CONFIG['small_head']),
                new ad.widget.ButtonListFluid(AD_CONFIG['right_buttons'])
            ]
        ],
        [ tabContainer ],
        [ new ad.widget.ButtonGroup(AD_CONFIG['bottom_buttons']) ]
    );

    if (async === true) {
        return material;
    }

    material.show();

});


















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
