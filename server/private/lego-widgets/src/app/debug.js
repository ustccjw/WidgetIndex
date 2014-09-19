/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: debug.js 10555 2012-07-24 05:20:29Z songao $
 *
 **************************************************************************/



/**
 * ../../../app/debug.js ~ 2012/02/11 13:16:57
 * @author leeight(liyubei@baidu.com)
 * @version $Revision: 10555 $
 * @description
 *
 **/

goog.require('app.Launch');
goog.require('base.ParallelWorkerManager');
goog.require('er.controller');
goog.require('er.locator');
goog.require('er.template');


goog.include('css/base.css');
goog.include('css/coup.css');
goog.include('css/coup-detail.css');
goog.include('css/coup-edit.css');
goog.include('css/coup-list.css');
goog.include('css/coup-report.css');
goog.include('css/coup-layout.css');
goog.include('css/coup-order.css');
goog.include('css/coup-client.css');
goog.include('css/coup-common.css');
goog.include('css/skin-white-mcal.css');
goog.include('css/coup-people-homePage.css');
goog.include('css/coup-account.css');

goog.require('jn.mockup'); // 系统常量和登陆信息
goog.require('jn.gold.mockup.agentadmin');
goog.require('jn.gold.mockup.message');
goog.require('jn.gold.mockup.order');
goog.require('jn.gold.mockup.owneradmin');
goog.require('jn.gold.mockup.people');
goog.require('jn.gold.mockup.product');
goog.require('jn.gold.mockup.promotion');
goog.require('jn.gold.mockup.system');
goog.require('jn.gold.mockup.adresource');

goog.require('jn.lang');
goog.require('jn.initConst');
goog.require('jn.net.RequestWorker');

goog.provide('app.debug');

/**
 * @param {string} path action对应的路径.
 */
app.debug = function(path) {
    baidu.on(window, 'load', function() {
        // app.Launch用来保证所有的模板和样式都加载完了
        // FIXME 解决IE6下面的样式overflow的问题？
        app.Launch(function() {
            er.template.setObjectGetter(function(type, varName) {
                var coupObj = baidu.getObjectByName('coup.' + type + '.' + varName),
                    jnObj = baidu.getObjectByName('jn.' + type + '.' + varName);
                return coupObj != null ? coupObj : jnObj;
            });

            function constCallback(data) {
                jn.initConst(data.result);
            }

            function sessionCallback(data) {
                var visitor = data.result.visitor,
                    adOwner = data.result.adOwner;
                er.context.set('visitor', visitor);
                //如果登陆用户是广告主，直接保存广告主信息；如果不是，则先置null，在登入某个广告主时再设置。
                if (visitor.roleName == 'ADVERTISER') {//广告主
                    er.context.set('adOwner', visitor);
                }else {
                    if (adOwner) {//非广告主登陆了广告主账号
                        er.context.set('adOwner', adOwner);
                    }else {//非广告主使用自己账号
                        er.context.set('adOwner', null);
                    }
                }
            }

            var pwm = new base.ParallelWorkerManager();
            pwm.addWorker(new jn.net.RequestWorker('/system_const/read', constCallback));
            pwm.addWorker(new jn.net.RequestWorker('/account/session', sessionCallback));
            pwm.addDoneListener(function() {
                er.controller.init();
                er.controller.permit = function(){ return true; };

                var loc = er.locator.getLocation();
                if (!loc || loc == '/') {
                    er.locator.redirect(path);
                }
                document.title = '[APP.DEBUG]' + path.replace(/\//g, ' ');
            });
            pwm.start();
        });
    });
};




















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
