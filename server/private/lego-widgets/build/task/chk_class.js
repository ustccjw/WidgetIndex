/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/



/**
 * build/chk_class.js ~ 2013/08/11 21:56:50
 * @author liyubei(liyubei@baidu.com)
 * @version $Revision$
 * @description
 *
 **/
var colors = require('colors');
var base = require('../base');

var pool = base.get_task_pool();
pool = base.ignore(pool, 'build/ignore/app_test.cfg');
pool = base.ignore(pool, 'build/ignore/chk_class.cfg');

var def = base.task_runner(pool, base.run_chk_class, function(output){
    if (!output){
        return true;
    }
    var isPass = true;

    var invalidClassList = [];
    if (output.invalidClassList.length) {
        isPass = false;
        invalidClassList = invalidClassList.concat(output.invalidClassList);
    }

    if (output.selectorTexts.length) {
        var Bouncer = require('../bouncer').Bouncer;
        var whiteListPattern = new RegExp('^\\.(' +
          // ad-|ec- 期望的情况
          'ad-|ec-|' +
          // app-|bd-app- 阿拉丁APP的白名单
          'app-|bd-app-|' +
          // bds_|bdshare_t|bdlikebutton|bdsharebox 百度分享的白名单
          'bds_|bdshare_t|bdlikebutton|bdsharebox|bdsharebuttonbox|' +
          //大搜下拉框控件,滚动条控件
          'c-dropdown2|opui-scroll-|' +
          // threadlist|j_ 贴吧frs页面的白名单
          'threadlist|j_|' +
          // ui-|month|year|previous|next|disabled|focused hotel_form.app.html的白名单
          'ui-|month|year|previous|next|disabled|focused|' +
          // PS页面的容器
          'container_s|container_l|content_right|c-input|c-btn|c-btn-primary|c-gap-right|' +
            // layout
          'layout|' +
          // "V"认证
          'icons|EC_PP|c-icon|icon-certify|c-icon-v|efc-cert|_ecui_tips|' +
          // PS下拉菜单
          'c-tools|c-tip-icon|c-icon|c-icon-triangle-down-g|c-trust|' +
          // 全景加边框
          'c-border' +
        ')');
        output.selectorTexts.forEach(function(selectorText){
            try {
                var tokens = Bouncer.Tokenizer.tokenize(selectorText);
                for (var i = 0; i < tokens.length; i ++) {
                    var group = tokens[i];
                    for (var j = 0; j < group.length; j ++) {
                        var item = group[j];
                        if ((item.symbol === '.') &&
                            !whiteListPattern.test(item.string)) {
                            isPass = false;
                            invalidClassList.push(selectorText);
                        }
                    }
                }
            } catch(ex){}
        });
    }

    if (isPass) {
        return true;
    }

    // INVALID
    return {invalidClassList: invalidClassList}
});
def.fail(function(failure){
    console.log(JSON.stringify(failure, null, 2));
    process.exit(1);
});
















/* vim: set ts=4 sw=4 sts=4 tw=100: */
