/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * build/test_bouncer.js ~ 2013/09/18 14:26:56
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 *  
 **/
var Bouncer = require('./bouncer').Bouncer;
var z = Bouncer.Tokenizer.tokenize('.ad-widget-lv-list .ec-addr, .ad-widget-lv-list .ec-tel, .ad-widget-lv-list .ec-opening');
console.log(z);
console.log('-------------');
var z = Bouncer.Tokenizer.tokenize('.ad-widget-tab-container           .tab-head .current-tab a, .ad-widget-tab-container .tab-head .current-tab a:visited');
console.log(z);
console.log('-------------');
var z = Bouncer.Tokenizer.tokenize('.ad-widget-tieba-site-header .ec-site-profile::before, .ad-widget-tieba-site-header .ec-site-profile::after');
console.log(z);





















/* vim: set ts=4 sw=4 sts=4 tw=100: */
