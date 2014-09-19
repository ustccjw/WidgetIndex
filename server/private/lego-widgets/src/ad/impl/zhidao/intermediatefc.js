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
 * 问答老直投和新直投在用的中间页的JS:
 * http://eiv.baidu.com/mapm2/wdw/zhidao/intermediatefc_v2.js
 *
 * 编译过程：
 * 第一步：ant ad.deploy -Ddir=src/ad/impl/zhidao/ -Dname=intermediatefc
 * 第二步：修改生成的JS，去除掉var AD_CONFIG = ...的那段代码
 * 第三步：上传到eiv
 * 第四步：造一个html文件并引用此JS
 *   > 这个html文件一定要包含<div id="ec-ma-8964"></div>这个容器
 *   > html文件里可以通过window['ad_path']配置检索端数据请求地址
 *
 */

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.zhidao.Intermediate');

goog.include('ad/impl/zhidao/intermediatefc.less');

goog.provide('ad.impl.zhidao.Intermediatefc');

ad.Debug(function(){
    var ideaId = baidu.url.getQueryValue(window.location.href, 'idea_id');
    //判断是不是预览环境
    var isPreview = baidu.url.getQueryValue(window.location.href, 'ispreview');
    //添加占位符
    var placeholder = baidu.dom.create('div', {'id': ideaId});
    baidu.dom.insertAfter(placeholder, baidu.g('ec-ma-8964'));

    window['jsonP'] = function(data){
        if(data['success'] === 'true'){
            AD_CONFIG['id'] = ideaId;
            AD_CONFIG['intermediate'] = data['result'];
            AD_CONFIG['intermediate']['turl'] = data['url'];
            AD_CONFIG['intermediate']['idea_id'] = ideaId;
            var material = new ad.Material(AD_CONFIG['id']);
            var widget = new ad.widget.zhidao.Intermediate(AD_CONFIG['intermediate']);

            //bindEvent
            var start;
            widget.addListener('enter', function(){
                start = new Date();
            });

            function sendLog(stay){
                var logUrl = 'http://bzclk.baidu.com/?idea_id=' + ideaId + '&stay=' + stay + '&product=intermediatefc&url=' + encodeURIComponent(data['result']['url']);
                baidu.sio.log(logUrl);
            }

            widget.addListener('leave', function(){
                var end = new Date();
                sendLog(end - start);
            });

            material.setWidgets(
                [widget]
            );
            material.show();
            material.initMonitor();
            //展现统计
            //baidu.sio.log(widget._getUrl(5,0));
        }
    };

    if (window['mockData']) {
        window['jsonP'](window['mockData']);
    }
    else {
        var adPath = isPreview ? window['ad_path_offline'] : window['ad_path'];
        baidu.sio.callByBrowser(
            adPath + ideaId + '&r=' + Math.random(),
            function(data){},
            {
                'charset':'utf-8'
            }
        );
    }
});


















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
