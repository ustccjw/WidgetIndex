/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.config.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/image_grid.config.js ~ 2013/02/22 11:45:21
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * image_grid相关的实现逻辑
 **/

var WIDGET_CONFIG = {
    'column': 2,        // [可选]每行grid数，如不填则不设置容器宽度（改为由开发自己用CSS调整宽度）
    'grid_width': 220,  // [必填]单个图片宽度(px)
    'grid_height': 165, // [必填]单个图片高度(px)
    'row_gap': 5,       // [必填]每行之间的间隔
    'column_gap': 5,    // [必填]每列之间的间隔
    'grids': [
        {
            'rcv_url': 'http://baidu.com',                                      // [可选]没有链接则不填
            'img_url' : 'http://eiv.baidu.com/mapm2/bmw/120523_pl_01/sp.jpg',   // [必填]图片地址
            'info': 'Baidu.com',                                                // [可选]没有信息则不填
            'space': '1x3'                                                      // [可选]当前图片所占格数
            //注意布局仅使用默认的float排版，如有出现空格则自行调整顺序和大小
        },
        {
            'img_url' : 'http://eiv.baidu.com/mapm2/bmw/120523_pl_01/sp.jpg'
        },
        {
            'img_url' : 'http://eiv.baidu.com/mapm2/bmw/120523_pl_01/sp.jpg',
            'info': '很多很多很多很多很多很多很多很多很多很多很多文字'
        },
        {
            'rcv_url': 'http://nodejs.in',
            'img_url' : 'http://eiv.baidu.com/mapm2/bmw/120523_pl_01/sp.jpg'
        }
    ]
};



/* vim: set ts=4 sw=4 sts=4 tw=100: */
