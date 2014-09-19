/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.config.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/box.config.js ~ 2013/08/27 10:41:16
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * box相关的实现逻辑
 **/

var WIDGET_CONFIG = {
    'box': {
        // 'imageplus_button': true,    // 是否有图加按钮，默认为有
        // 'first_show_time': 5000,     // 第一次展现时，展现的时间。之后隐藏
        // 'show_in_view': 0,           // 在滚动进入可视区域时展现的时长，默认为0不展现
        // 'box_bg_opacity': '0.9',     // 背景透明度
        // 'always_show': false,        // 是否默认展现不隐藏，直到用户点“x”关闭
                                        // 如果同时设置了first_show_time和always_show，则默认一直展现
                                        // 但是first_show_time可以控制广告高度等特性，具体在其他widget中控制
        // 'hide_close_btn': false,     // 是否默认不展现关闭按钮，hover之后在展现

        // 'is_cut_show': false,        // 是否限定展示区域的高度
        // 'cut_height': 75,            // 在is_cut_show为true的情况下，设置限定的高度

        // 如下配置最好不要在api返回值或loader配置中全站重写
        // 'theme': 0,                      // box的主题，0为默认的黑色背景主题，1为白色背景主题
        // 'third_party_content': false     // 渲染的内容是否是第三方提供的，这种情况一般是服务器端返回html数据直接渲染
    }
};



/* vim: set ts=4 sw=4 sts=4 tw=100 */
