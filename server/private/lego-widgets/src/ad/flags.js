/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * src/ad/flags.js ~ 2013/10/29 10:02:24
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 * 用来配置一些编译期的参数
 **/
goog.provide('ad.flags');

/**
 * 异步的情况下，使用ECMA_define还是define
 * @define {boolean}
 */
var FLAGS_use_amd_define = false;

/**
 * 如果已经存在了Material或者Widget的DOM结构的情况下，是直接在
 * 现有的DOM上附加后续的行为，还是把整个物料重新刷新。默认情况下
 * 是重新刷新，这样子实现起来最简单，不过对于SIVA的要求来说，希望
 * 在现有的DOM上继续附加行为。
 *
 * 使用这个FLAGS，可以在创建样式期间针对不同的产品线生成不同的代码。
 * @define {boolean}
 */
var FLAGS_auto_decorate = false;

/**
 * 测试一下数字类型，默认是10
 * @define {number}
 */
var FLAGS_test_number = 10;

/**
 * 测试一下字符串类型，默认是'hello world';
 * @define {string}
 */
var FLAGS_test_string = 'hello world';

/**
 * 是否是无线物料
 * 无线物料需要对链接的target重写，修改为本窗口打开
 *
 * @define {boolean}
 */
var FLAGS_wireless = false;

/**
 * amd编译标志
 * 不需要打包到amd模块里的东西，或者只有编译amd的时候才需要的代码等都可以使用此标志
 *
 * @define {boolean}
 */
var FLAGS_enable_amd_build = false;

/**
 * 大图右侧编译标志
 * 现在大图页是一个异步的环境，该标志强制使用同步的方式编译物料
 *
 * @define {boolean}
 */
var FLAGS_img_sync = false;

/**
 * 定义网盟模块标志
 * 使用网盟的BAIDU_DUP_define来定义模块
 *
 * @define {boolean}
 */
var FLAGS_as_dup_module = false;



















/* vim: set ts=4 sw=4 sts=4 tw=100: */
