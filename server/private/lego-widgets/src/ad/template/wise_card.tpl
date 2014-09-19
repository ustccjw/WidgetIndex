<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
    <meta name="format-detection" content="telephone=no"/>
    <title>百度</title>
    <style type="text/css">
    * {
        margin: 0;
        padding: 0;
    }
    body {
        text-align: center;
        font: 14px Arial,Helvetica,sans-serif;
    }
    a {
        color: #00C;
        text-decoration: none;
    }
    em {
        color: #c00;
        text-decoration: none;
        font-style: normal;
    }
    #page {
        background-color: #eee;
    }
    #page_hd, #page_ft {
        background-color: #fff;
    }
    #head {
        font-weight: 700;
        font-size: 14px;
        padding-top: 37px;
    }
    #head, #head .logo, #more, .loading .ico-rotate {
        position: relative;
    }
    #head .logo {
        position: absolute;
        background: url(http://m.baidu.com/static/search/resultLogo2.png) no-repeat;
        width: 72px;
        height: 23px;
        background-size: 72px 23px;
        -webkit-background-size: 72px 23px;
        top: 10px;
        left: 6px;
    }
    #head .logo, .h_tab, .loading .ico-rotate, .arrow {
        display: block;
    }
    #h_tabs {
        position: absolute;
        margin-right: 6px;
        color: #262626;
        width: 69%;
        top: 0;
        right: 6px;
    }
    .h_tab {
        position: relative;
        float: left;
        width: 20%;
        color: #262626;
    }
    .cur {
        color: #0058d2;
        background: -webkit-gradient(linear,left top,left bottom,from(#dde9ff),to(#ecf3ff));
        border-top: 2px solid #2c73df;
    }
    .tabTx {
        position: relative;
        display: block;
        padding: 14px 5px 10px;
        border-top: 2px solid #fff;
    }
    #mo {
        padding-bottom: 2px;
    }
    .tabTx {
        position: relative;
        display: block;
        padding: 14px 5px 10px;
        border-top: 2px solid #fff;
    }
    .arrow, .pagebar .ico {
        display: inline-block;
        position: absolute;
        font-size: 0;
        height: 0;
        line-height: 0;
        width: 0;
        border-style: solid;
        border-color: #777 #fff #fff;
        border-width: 4px 4px 0;
        top: 19px;
        right: -5px;
    }
    .searchboxtop {
        border-bottom: 1px solid #d0d0d0;
        padding-bottom: 6px;
        -webkit-box-shadow: 0 1px 0 #e0e0e0;
    }
    .se-form {
        clear: both;
        margin: 6px 6px 0;
        background: #fff;
        height: 39px;
        border: 1px solid #8d8d8d;
    }
    .con-wrap {
        display: box;
        display: -webkit-box;
    }
    .se-input {
        display: block;
        -webkit-box-flex: 1;
        box-flex: 1;
        margin: 2px 0;
        padding: 6px 39px 6px 6px;
        font-size: 18px;
        line-height: 24px;
        -webkit-appearance: none;
        -webkit-box-sizing: border-box;
        -webkit-tap-highlight-color: rgba(255,255,255,0);
        background: #fff!important;
    }
    input, button {
        border: 0;
        border-radius: 0;
        -webkit-border-radius: 0;
        background-color: transparent;
        -webkit-appearance: none;
        -webkit-box-sizing: border-box;
    }
    .se-inner {
        width: 74px;
        position: relative;
        right: 0;
    }
    .cross {
        position: absolute;
        top: 0;
        left: -35px;
        width: 35px;
        height: 39px;
        bottom: 0;
        display: none;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAAAXNSR…XczH++Se2cH8QORNAOlbe4NETU4H/8WMHViaO0X6PN2vwBXtDwHrylQ1oAAAAASUVORK5CYII=) no-repeat scroll center center transparent;
        z-index: 2;
        background-size: 16px 16px;
        -webkit-background-size: 16px 16px;
    }
    .se-bn {
        color: #000;
        text-shadow: 0 1px 1px #fff;
        -webkit-text-shadow: 0 1px 1px #fff;
        background: -webkit-gradient(linear,left top,left bottom,from(#f5f4f4),to(#e8e8e8));
        text-align: center;
        white-space: nowrap;
        font-size: 0;
        width: 74px;
        height: 39px;
        line-height: 39px;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 2;
        border-left: 1px solid #8d8d8d;
        letter-spacing: -1px;
    }
    .se-bn span {
        font-weight: 700;
        font-style: normal;
        font-size: 16px;
    }
    #results {
        text-align: left;
        padding: 0 6px;
    }
    .ec_wise_ad {
        background-color: #fff;
    }
    .result, .resitem {
        padding: 5px 10px 9px;
        margin: 6px 0;
        background: #fff;
        border: 1px solid #e0e0e0;
    }
    .result_title {
        text-align: left;
        font-size: 120%;
        word-break: break-all;
        line-height: 20px;
        padding: 6px 6px 8px;
        margin: 0 -6px;
        display: block;
    }
    a.result_title:visited .result_title_abs {
      color: #242424!important;
    }
    .result_title .result_title_abs {
      color: #262626;
      word-break: break-all;
      font-size: 14px;
      line-height: 21px;
      margin: 7px 0 -10px 0;
    }
    .result .result_snippet, .result .abs {
        line-height: 20px;
        color: #262626;
        word-break: break-all;
        padding: 0 0 7px;
    }
    .site, .date, .size {
        font-size: 14px;
        color: #1f992f;
    }
    .pagenav {
        margin: 12px 6px;
        font-size: 14px;
    }
    .pagenav .pagebar, noscript a {
        position: relative;
        border: 1px solid #d0d0d0;
        background-color: #fff;
        color: #262626;
        font-size: 17px;
        height: 50px;
        line-height: 50px;
        -webkit-box-shadow: 0 1px 0 #e0e0e0;
    }
    .brand_bear:before {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAB4ElEQ…3lNpAe/NTxvq/O8Dt6CegG6rEtelQDA8Ax8C4JX7Dd/mogX6zoFJLT7tQyAAAAAElFTkSuQmCC) no-repeat;
        position: relative;
        display: inline-block;
        content: "";
        background-size: 15px 15px;
        -webkit-background-size: 15px 15px;
        width: 15px;
        height: 15px;
        top: 2px;
        margin: 0 4px 0 0;
    }
    .pagebar .ico {
        position: relative;
        left: 4px;
        top: -4px;
    }
    .arrow, .pagebar .ico {
        display: inline-block;
        position: absolute;
        font-size: 0;
        height: 0;
        line-height: 0;
        width: 0;
        border-style: solid;
        border-color: #777 #fff #fff;
        border-width: 4px 4px 0;
        top: 19px;
        right: -5px;
    }
    .pagebar .ico {
        position: relative;
        left: 4px;
        top: -4px;
    }
    #relativewords {
    text-align: left;
    border: 1px solid #e0e0e0;
    background-color: #fff;
    margin: 12px 6px;
    }
    .rw-title {
        font-size: 17px;
        height: 41px;
        line-height: 45px;
        color: #262626;
        padding: 0 10px;
        border-bottom: 1px solid #f0f0f0;
    }
    .rw-list {
        padding: 7px 10px;
        font-size: 14px;
    }
    .rw-item {
        display: inline-block;
        width: 50%;
        white-space: nowrap;
        height: 35px;
        line-height: 35px;
        overflow-x: hidden;
        text-overflow: clip;
        color: #0058d2;
    }
    .rw-item:nth-child(2n):before {
        content: "";
        border-left: 1px solid #dadada;
        margin-right: 8px;
    }
    #footer_wrap {
        padding-top: 6px;
        background: #fff;
        border-top: 1px solid #e0e0e0;
        -webkit-box-shadow: 0 1px 0 #d0d0d0 inset;
    }
    .footerlink {
        padding: 0 6px;
        background: #fff;
    }
    .footerlinkout:first-child {
        padding-top: 12px;
    }
    .footerlinkbar {
        display: block;
        text-align: left;
        font-size: 14px;
        color: #262626;
        height: 39px;
        line-height: 39px;
        border: 1px solid #e0e0e0;
        padding-left: 10px;
        background: #f9f9f9;
        overflow: hidden;
    }
    .footerlinkbar .linkico {
        position: relative;
        float: right;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAAGXRFW…H7GU2TFyEN79E0+FLFSSxYPN1JtWAlKeKwJQ1WqiQ+kpI3AAdIHbdRS7+FAAAAAElFTkSuQmCC);
        background-size: 6px 9px;
        -webkit-background-size: 6px 8px;
        width: 6px;
        height: 8px;
        margin: 15px 12px 0;
    }
    #copyright {
        padding: 12px 0;
        font-size: 13px;
        color: #aaa;
    }
    .return-link, #layout_switch, #copyright {
        background-color: #fff;
    }
    </style>
  </head>
  <body>
    <div id="page">
        <div id="page_hd">
            <div id="head">
                <a id="logo" class="logo" href="/"></a>
                <div id="h_tabs">
                    <a class="h_tab" href="javascript:void(0);">
                        <span class="tabTx cur" id="wy">网页</span>
                    </a>
                    <a class="h_tab" href="http://map.baidu.com/m?itj=45&amp;word=%E9%87%91%E7%AB%8Be6&amp;ssid=0&amp;from=0&amp;bd_page_type=1&amp;uid=0&amp;pu=usm@0,sz@1320_2001&amp;wtj=ws">
                        <span class="tabTx">地图</span>
                    </a>
                    <a class="h_tab" href="http://tieba.baidu.com/f?mo_device=1&amp;vit=www_nav&amp;kw=%E9%87%91%E7%AB%8Be6&amp;ssid=0&amp;from=0&amp;bd_page_type=1&amp;uid=0&amp;pu=usm@0,sz@1320_2001">
                        <span class="tabTx">贴吧</span>
                    </a>
                    <a class="h_tab" href="http://m.baidu.com/ios?itj=app_i#search-%E9%87%91%E7%AB%8Be6">
                        <span class="tabTx">应用</span>
                    </a>
                    <a class="h_tab" id="switchBt">
                        <span id="mo" class="tabTx more">更多<span id="arr" class="arrow top"></span></span>
                    </a>
                </div>
            </div>
            <div class="searchboxtop">
                <form data-formposition="t" class="se-form" id="se-form" action="/s" method="get">
                    <div class="con-wrap">
                        <input type="search" value="金立e6" autocomplete="off" autocorrect="off" maxlength="64" id="kw" name="word" class="se-input" />
                        <div class="se-inner"><div id="cross" class="cross"></div><button id="se_bn" class="se-bn" type="submit"><span>百度一下</span></button></div>
                    </div>
                </form>
            </div>
        </div>
        <div id="page_bd">
            <div id="page_tips"></div>
            <div id="results" class="results">
                <div class="ec_wise_ad">
                    ${material_code}
                </div>
                <div class="result">
                    <a class="result_title" href="http://www.baidu.com">【<em>金立E6</em>】报价_参数_图片_论坛_金立 金立 ELIFE E6...&nbsp;
                        <div class="result_title_abs">中关村在线(ZOL.COM.CN)提供<em>金立E6</em>手机最新报价,同时包括<em>金立E6</em>图片、<em>金立E6</em>参数、<em>金立E6</em>评测行情、<em>金立E6</em>...</div>
                    </a>
                    <div class="result_snippet"></div>
                    <span class="site">wap.zol.com.cn</span>&nbsp;
                </div>
                <div class="result">
                    <a class="result_title" href="http://www.baidu.com">【<em>金立E6</em>】报价_参数_图片_论坛_金立 金立 ELIFE E6...&nbsp;
                        <div class="result_title_abs">中关村在线(ZOL.COM.CN)提供<em>金立E6</em>手机最新报价,同时包括<em>金立E6</em>图片、<em>金立E6</em>参数、<em>金立E6</em>评测行情、<em>金立E6</em>...</div>
                    </a>
                    <div class="result_snippet"></div>
                    <span class="site">wap.zol.com.cn</span>&nbsp;
                </div>
                <div class="result">
                    <a class="result_title" href="http://www.baidu.com">【<em>金立E6</em>】报价_参数_图片_论坛_金立 金立 ELIFE E6...&nbsp;
                        <div class="result_title_abs">中关村在线(ZOL.COM.CN)提供<em>金立E6</em>手机最新报价,同时包括<em>金立E6</em>图片、<em>金立E6</em>参数、<em>金立E6</em>评测行情、<em>金立E6</em>...</div>
                    </a>
                    <div class="result_snippet"></div>
                    <span class="site">wap.zol.com.cn</span>&nbsp;
                </div>
                <div class="result">
                    <a class="result_title" href="http://www.baidu.com">【<em>金立E6</em>】报价_参数_图片_论坛_金立 金立 ELIFE E6...&nbsp;
                        <div class="result_title_abs">中关村在线(ZOL.COM.CN)提供<em>金立E6</em>手机最新报价,同时包括<em>金立E6</em>图片、<em>金立E6</em>参数、<em>金立E6</em>评测行情、<em>金立E6</em>...</div>
                    </a>
                    <div class="result_snippet"></div>
                    <span class="site">wap.zol.com.cn</span>&nbsp;
                </div>
                <div class="result">
                    <a class="result_title" href="http://www.baidu.com">【<em>金立E6</em>】报价_参数_图片_论坛_金立 金立 ELIFE E6...&nbsp;
                        <div class="result_title_abs">中关村在线(ZOL.COM.CN)提供<em>金立E6</em>手机最新报价,同时包括<em>金立E6</em>图片、<em>金立E6</em>参数、<em>金立E6</em>评测行情、<em>金立E6</em>...</div>
                    </a>
                    <div class="result_snippet"></div>
                    <span class="site">wap.zol.com.cn</span>&nbsp;
                </div>
            </div>
            <div id="page_controller">
              <div id="pagenav" class="pagenav">
                <div class="pagebar brand_bear">
                  下一页<span class="ico"></span>
                </div>
              </div>
            </div>
            <div id="page_relative"><div id="relativewords"><div class="rw-title">相关搜索</div><div class="rw-list"><a class="rw-item" href="http://dbl-wise-tt-newrd24.vm.baidu.com:8003/s?st=11106i_1&amp;word=m331&amp;rq=331&amp;sa=brs_1">m331</a><a class="rw-item" href="http://dbl-wise-tt-newrd24.vm.baidu.com:8003/s?st=11106i_2&amp;word=331%E8%B7%AF%E5%85%AC%E4%BA%A4%E8%BD%A6%E8%B7%AF%E7%BA%BF&amp;rq=331&amp;sa=brs_2">331路公交车路线</a><a class="rw-item" href="http://dbl-wise-tt-newrd24.vm.baidu.com:8003/s?st=11106i_3&amp;word=311&amp;rq=331&amp;sa=brs_3">311</a><a class="rw-item" href="http://dbl-wise-tt-newrd24.vm.baidu.com:8003/s?st=11106i_4&amp;word=332&amp;rq=331&amp;sa=brs_4">332</a><a class="rw-item" href="http://dbl-wise-tt-newrd24.vm.baidu.com:8003/s?st=11106i_5&amp;word=337&amp;rq=331&amp;sa=brs_5">337</a><a class="rw-item" href="http://dbl-wise-tt-newrd24.vm.baidu.com:8003/s?st=11106i_6&amp;word=%E6%A0%AA%E6%B4%B2331&amp;rq=331&amp;sa=brs_6">株洲331</a><a class="rw-item" href="http://dbl-wise-tt-newrd24.vm.baidu.com:8003/s?st=11106i_7&amp;word=%E8%A5%BF%E5%AE%89331&amp;rq=331&amp;sa=brs_7">西安331</a><a class="rw-item" href="http://dbl-wise-tt-newrd24.vm.baidu.com:8003/s?st=11106i_8&amp;word=362&amp;rq=331&amp;sa=brs_8">362</a></div></div></div>
        </div>
        <div id="page_ft">
          <div id="footer_wrap"><form data-formposition="b" class="se-form" id="se-form2" action="/s" method="get"><div class="con-wrap"><input type="search" value="331" autocomplete="off" autocorrect="off" maxlength="64" id="kw2" name="word" class="se-input"><div class="se-inner"><div id="cross2" class="cross"></div><button id="se_bn2" class="se-bn" type="submit"><span>百度一下</span></button></div></div><div id="se_box2" class="se_box"><div class="suggest-div" style="display: none;"><div class="suggest-direct"></div><div class="suggest-content"></div><div class="suggest-close">关闭</div><div class="suggest-title"><div class="history-clear">清除历史记录</div></div></div></div></form></div>
          <div class="footerlink">
            <div class="footerlinkout">
              <a class="footerlinkbar" href="http://m.baidu.com">
              <div class="linkico"></div>百度搜索有奖调查，答问卷，有好礼！
              </a>
            </div>
          </div>
        </div>
        <div id="copyright">Baidu&nbsp;京ICP证030173号</div>
    </div>
  </body>
</html>
