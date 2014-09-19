/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/zhidao/intermediate.js ~ 2013/01/23 15:55:05
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 11222 $
 * @description
 *
 * 银河在用的中间页的JS:
 * http://eiv.baidu.com/mapm2/wdw/zhidao/intermediate_galaxy.js
 *
 * 编译过程：
 * 第一步：ant ad.deploy -Ddir=src/ad/impl/zhidao/ -Dname=intermediate
 * 第二步：修改生成的JS，去除掉var AD_CONFIG = ...的那段代码
 * 第三步：上传到eiv
 * 第四步：造一个html文件并引用此JS
 *   > 这个html文件一定要包含<div id="ec-ma-8964"></div>这个容器
 *   > html文件里可以通过window['ad_path']配置检索端数据请求地址
 *
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.zhidao.Intermediate');
goog.require('ad.service.RCV2Service');

goog.include('ad/impl/zhidao/intermediate.less');

goog.provide('ad.impl.zhidao.Intermediate');

ad.Debug(function(){
    var turl = decodeURIComponent(baidu.url.getQueryValue(window.location.href, 'url') || '');
    var mcid = baidu.url.getQueryValue(window.location.href, 'mcid');
    var rcv2Url = decodeURIComponent(baidu.url.getQueryValue(window.location.href, 'rcv2') || '');
    var isPreview = baidu.url.getQueryValue(window.location.href, 'ispreview');

    window['jsonP'] = function(data){
        if(data['success'] === 'true'){
            AD_CONFIG['intermediate'] = data['result'];
            AD_CONFIG['intermediate']['turl'] = turl;
            AD_CONFIG['intermediate']['mcid'] = mcid;

            //打开反馈功能
            AD_CONFIG['intermediate']['is_feedback'] = true;
            var material = new ad.Material(AD_CONFIG['id']);
            var widget = new ad.widget.zhidao.Intermediate(AD_CONFIG['intermediate']);
            material.setWidgets(
                [widget]
            );
            material.show();

            //展现统计
            baidu.sio.log(widget._getUrl());
            var rcv2Service = new ad.service.RCV2Service(material.getId(), [], {
                'LINK_IDS': [],
                'RCV2_URL': rcv2Url || turl
            });
            /* TBD:貌似可以不分链接统计这个吧
            rcv2Service.sendLog({
                'linkName': '中间页[展现]'
            });
            */
        }
    }

    if (window['mockData']) {
        window['jsonP'](window['mockData']);
    }
    else {
        var adPath = isPreview ? window['ad_path_offline'] : window['ad_path'];
        baidu.sio.callByBrowser(
            adPath + mcid + '&r=' + Math.random(),
            function(data) {},
            {
                'charset':'GBK'
            }
        );
    }

});


















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
