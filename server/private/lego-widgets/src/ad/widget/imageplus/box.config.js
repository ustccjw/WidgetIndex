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
        // 'delay_click': 0.2,       // icon延迟点击的时间，默认为0.2s
        // 'content_position': 1,    // 内容区的位置，0表示紧贴icon下方，1表示遮住icon
        // 'blink_time': 2000,       // 动画闪烁时间长度（不包括第一次展现时的闪烁）(毫秒)
        // 'blink_type': 'inview',   // 闪烁出现的时机，默认为inview表示在可视区域内才闪烁
                                     // 也可以设置为mousemove，表示鼠标移动时闪烁
        // 'imageplus_button': true, // 是否有图加按钮，默认为有

        // 以下属性不要在api返回值或者loader配置中全站重写
        'content_width': 270,               // 内容区宽度
        'content_height': 106               // 内容区高度
        // 'icon_width': 38,                // 图标的宽度，默认为38px
        // 'icon_height': 38,               // 图标的高度，默认为38px
        // html.app.js这个render依赖这些配置来实现完整功能
        // 'icon_clickable': true,          // icon是否可以点击
        // 'third_party_content': false,    // 链接是否在iframe里面，这种情况一般是服务器端返回html数据直接渲染
    }
};



/* vim: set ts=4 sw=4 sts=4 tw=100  */
