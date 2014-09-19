/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * build/rhino/test_env.js ~ 2013/09/14 17:57:27
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 * 测试一下test_env.js
 **/

ECMA_define(function(){
    function get() {
        return '.ad-dummy{color:red}';
    }

    function m_getId() {
        return 'ecma-8964'
    }

    function m_getMainHtml() {
        return '<div class="ad-dummy">\u77e5\u9053\u63a8\u5e7f</div>';
    }

    function start() {
        return {
            getId: m_getId,
            getMainHtml: m_getMainHtml
        }
    }

    return {
        start: start,
        get: get
    };
});




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
