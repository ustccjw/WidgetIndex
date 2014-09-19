/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/zhidao/intermediate_wise.js ~ 2014/04/02 16:14:56
 * @author songao@baidu.com (songao)
 * @version $Revision: 11222 $
 * @description
 * intermediate_wise相关的实现逻辑
 *
 * 无线问答的中间页的JS:
 * http://ecma.bdimg.com/lego-mat/intermediate/ques/wise.js
 *
 * 无线问答的中间页地址:
 * http://ecma.bdimg.com/lego-mat/intermediate/ques/wise.html
 *
 * 编译过程：
 * 第一步：ant ad.deploy -Ddir=src/ad/impl/zhidao/ -Dname=intermediate_wise
 * 第二步：上传编译出来的JS到bcs (bs://lego-mat/intermediate/ques/wise.js)
 * 第三步：可能需要修改编译出来的index.html:
 *   > html文件里可以通过window['ad_path']配置检索端数据请求地址
 * 第四步：上传修改之后的index.html到bcs (bs://lego-mat/intermediate/ques/wise.html)
 *
 */

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.zhidao_wise.DetailFqa');
goog.require('ad.widget.Iframe');
goog.require('ad.widget.zhidao_wise.DetailContainerA');
goog.require('ad.widget.zhidao_wise.DetailProvider');
goog.require('ad.plugin.ClickMonkey');

goog.include('ad/impl/zhidao/intermediate_wise.less');

goog.provide('ad.impl.zhidao.IntermediateWise');

ad.Debug(function(async){
    var ideaId = baidu.url.getQueryValue(window.location.href, 'idea_id');
    var canvasId = ideaId + '_canvas';
    // 判断是不是预览环境
    var isPreview = baidu.url.getQueryValue(window.location.href, 'ispreview');
    // 添加容器
    var canvas = baidu.dom.create('div', {'id': canvasId});
    document.body.appendChild(canvas);

    // 异步读取数据回调
    window['jsonP'] = function(data){
        if(data['success'] === 'true'){
            bootstrap(data['result']);
        }
    };
    if (window['mockData']) {
        window['jsonP'](window['mockData']);
    }
    else {
        // 异步从检索端请求数据
        var adPath = isPreview ? window['ad_path_offline'] : window['ad_path'];
        baidu.sio.callByBrowser(
            adPath + ideaId + '&r=' + Math.random(),
            function(data){},
            {
                'charset':'utf-8'
            }
        );
    }

    /**
     * 异步获取到数据之后，展现物料
     */
    function bootstrap(data) {
        RT_CONFIG = {
            'id': canvasId,
            'pluginParam': {
                'ad.plugin.ClickMonkey': {
                    'plid': ideaId
                }
            }
        };
        // 准备AD_CONFIG
        prepareData(data);

        var material = new ad.material.BaseMaterial();
        var detailContainer = new ad.widget.zhidao_wise.DetailContainerA(AD_CONFIG['detail_cont']);

        var fqa = new ad.widget.zhidao_wise.DetailFqa(AD_CONFIG['detail_fqa']);
        var iframe = new ad.widget.Iframe(AD_CONFIG['iframe']);
        var detailProvider = new ad.widget.zhidao_wise.DetailProvider(AD_CONFIG['detail_provider']);
        detailContainer.setWidgets([fqa, iframe, detailProvider]);

        material.setWidgets(
            [detailContainer]
        );

        if (async === true) {
            return material;
        }
        material.show();

        detailContainer.checkViewport();
    }

    function prepareData(data) {
        var answer = data['a']['text'].replace(/\^+/g,function(s){
            var rs = s.substr(0, 4).replace(/\^/g, '<div style="height:10px;"></div>');
            if(s.length <= 4){
                return rs;
            }
            return rs + s.substring(4, s.length);
        });
        var landingPage = data['wise_url'] || data['url'];
        landingPage = (!/https?:\/\//.test(landingPage) ? 'http://' : '') + landingPage;
        // 去除电话里的特殊字符 +86 021-8888888-3 => +8602188888883
        var phoneStripped = (data['phone'] || '').replace(/[-\s]+/g, '');
        // 构造拨打电话中间页地址: byref的意思是中间页里返回链接的href是根据referer来的
        var phoneUrl = data['phone_url'] || ('http://wpl.baidu.com/call.php?&from=byref&page_type=1&w=&nm=' + phoneStripped + '&nm_str=' + data['phone'])
        var showPhoneSiteBlackList = [
            /^https?:\/\/page\.baidu\.com/,
            /^https?:\/\/siteapp\.baidu\.com/
        ];
        function isInBlackList(url) {
            for (var i = 0; i < showPhoneSiteBlackList.length; i++) {
                var reg = showPhoneSiteBlackList[i];
                if (reg.test(url)) {
                    return true;
                }
            }
            return false;
        }

        AD_CONFIG = {
            'detail_fqa': {
                'question' : data['q']['text'],
                'answer': answer
            },
            'iframe': {
                'width': '100%',
                'height' : 500,
                'src' : landingPage
            },
            'detail_provider': {
                'provider_name': data['a']['name'],
                'provider_rcv_url': landingPage
            },
            'detail_cont': {
                'title': '推广',
                'tel': data['phone'],
                'tel_rcv_url': phoneUrl,
                'has_more_options': false,
                'hide_foot': isInBlackList(landingPage) || !data['phone']
            }
        };
    }
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
