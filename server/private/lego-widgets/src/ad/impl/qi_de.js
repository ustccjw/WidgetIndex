/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/qi_de.js ~ 2013/07/26 17:58:50
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * qi_de相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.H1');
goog.require('ad.widget.Image');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Section');
goog.require('ad.widget.Title');
goog.require('ad.widget.TabCont');
goog.include('ad/impl/qi_de.less');

goog.provide('ad.impl.QiDe');

ad.Debug(function(async){
    var material = new ad.Material(AD_CONFIG['id']);
    var h1 = new ad.widget.H1(AD_CONFIG['h1']);
    var mainImage = new ad.widget.Image(AD_CONFIG['main_image']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var section = new ad.widget.Section(AD_CONFIG['section']);
    var title = new ad.widget.Title(AD_CONFIG['tab_conts_title']);
    var tabContArr = [];
    var numPerPage = 3;//每页显示课程数目
    var curPage = 1;//当前页
    var pageNum;//页数
    var arrowBackward;//向后翻页
    var arrowTip;//页码提示
    var arrowForward;//向前翻页
    material.setRender(new ad.render.RecursiveRender());

    var tabLen = AD_CONFIG['tab_conts'].length;
    for (var i = tabLen - 1; i >= 0; i--) {
        var tabConfig = AD_CONFIG['tab_conts'][i];
        var curTab = new ad.widget.TabCont(tabConfig);
        tabContArr.unshift(curTab);
    }

    material.setWidgets(
        [h1],
        [mainImage, smallHead],
        [section],
        [title, tabContArr]
    );

    if (async === true) {
        return material;
    }

    material.show();
    material.initMonitor(AD_CONFIG['main_url']);
    //百度精算监测
    material.initHMJSMoniter(AD_CONFIG['hmjs_id']);

    if(tabLen > numPerPage) {
        buildMultiPage();
        showPage();
    }

    //创建分页控制器
    function buildMultiPage() {
        var multiPage = baidu.dom.create('div', {'class': 'ec-page-skip'});
        multiPage.innerHTML = ['<span class="ec-page-skip-arrow ec-page-skip-backward"></span>',
            '<span class="ec-page-skip-tip"></span>',
            '<span class="ec-page-skip-arrow ec-page-skip-forward"></span>'].join('');
        baidu.dom.first(title.getRoot()).appendChild(multiPage);
        arrowBackward = baidu.dom.q('ec-page-skip-backward', multiPage)[0];
        arrowForward = baidu.dom.q('ec-page-skip-forward', multiPage)[0];
        arrowTip = baidu.dom.q('ec-page-skip-tip', multiPage)[0];
        pageNum = Math.ceil(tabLen / numPerPage);
        baidu.on(arrowBackward, 'click', function() {
            if(curPage <= 1) {
                return false;
            }
            curPage = curPage - 1;
            showPage();
        });

        baidu.on(arrowForward, 'click', function() {
            if(curPage >= pageNum) {
                return false;
            }
            curPage = curPage + 1;
            showPage();
        });
    }

    //显示第几页
    function showPage() {
        arrowTip.innerHTML = curPage + '/' + pageNum;
        for (var i = tabLen - 1; i >= 0; i--) {
            if((curPage - 1) * numPerPage <= i && (curPage) * numPerPage > i ) {
                tabContArr[i].show();
            }
            else {
                tabContArr[i].hide();
            }
        };
        if(curPage <= 1) {
            baidu.dom.addClass(arrowBackward, 'ec-page-skip-backward-disable'); 
        }
        else {
            baidu.dom.removeClass(arrowBackward, 'ec-page-skip-backward-disable'); 
        }
        if(curPage >= pageNum) {
            baidu.dom.addClass(arrowForward, 'ec-page-skip-forward-disable');
        }
        else {
            baidu.dom.removeClass(arrowForward, 'ec-page-skip-forward-disable');
        }
    }

    return material;
});
