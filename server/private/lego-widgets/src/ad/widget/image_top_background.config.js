/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.config.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/image_top_background.config.js ~ 2013/06/19 13:22:13
 * @author songao@baidu.com (songao)
 * @version $Revision: 10927 $
 * @description
 * image_top_background相关的实现逻辑
 **/

var WIDGET_CONFIG = {
    // 主图片
    primary: {
        url: "http://eiv.baidu.com/mapm2/liutong/dfrc_130513/bj1.jpg",
        repeat: "no-repeat",
        position: "top center",
        color: "#8b965c",
        height: 600
    },
    // 重复的辅助背景图片（主要用于过度）（如果不需要则不用设置）
    secondary: {
        url: "http://eiv.baidu.com/mapm2/liutong/dfrc_130513/bj2.jpg",
        repeat: "repeat-x",
        position: "center 600px",
        height: 1020
    }
};



/* vim: set ts=4 sw=4 sts=4 tw=100 : */
