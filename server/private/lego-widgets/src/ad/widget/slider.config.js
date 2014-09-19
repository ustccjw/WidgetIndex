/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.config.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/slider.config.js ~ 2012/08/13 14:46:20
 * @author wangdawei04@baidu.com (wangdawei)
 * @version $Revision: 10927 $
 * @description
 * slider相关的实现逻辑
 **/

var WIDGET_CONFIG = {
    'width':490, //图片宽度
    'height':225, //图片高度
    'delay':200, //切换选择时的延时响应时间
    'interval_time':2000, //自动切换时间间隔 =0表示不自动切换
    'mode':'vertical', //'mode':'vertical'|'horizontal'|'normal' 图片展示模式：垂直滚动、水平滚动、无动画效果
    'first_show_index':0, //首次载入的图片索引
    'options':[
        {
            'img_url':'http://eiv.baidu.com/mapm2/zhouminming01/1.jpg',
            'rcv_url':'www.baidu1.com',
            'extra': {
                'img_url': 'http://eiv.baidu.com/mapm2/zhouminming01/56x56.gif',
                'info': '聚划算两周年<a href="">链接地址</a>'
            }
        },
        {
            'img_url':'http://eiv.baidu.com/mapm2/zhouminming01/2.jpg',
            'rcv_url':'www.baidu2.com',
            'extra': {
                'img_url': 'http://eiv.baidu.com/mapm2/zhouminming01/56x56.gif',
                'info': '小清新、淑女风<a href="">链接地址</a>'
            }
        },
        {
            'img_url':'http://eiv.baidu.com/mapm2/zhouminming01/3.jpg',
            'rcv_url':'www.baidu3.com',
            'extra': {
                'img_url': 'http://eiv.baidu.com/mapm2/zhouminming01/56x56.gif',
                'info': '奥运会第一枪<a href="">链接地址</a>'
            }
        },
        {
            'img_url':'http://eiv.baidu.com/mapm2/zhouminming01/4.jpg',
            'rcv_url':'www.baidu4.com',
            'extra': {
                'img_url': 'http://eiv.baidu.com/mapm2/zhouminming01/56x56.gif',
                'info': '百变胖美眉<a href="">链接地址</a>'
            }
        },
        {
            'img_url':'http://eiv.baidu.com/mapm2/zhouminming01/5.jpg',
            'rcv_url':'www.baidu5.com',
            'extra': {
                'img_url': 'http://eiv.baidu.com/mapm2/zhouminming01/56x56.gif',
                'info': '清凉出游畅享阳光<a href="">链接地址</a>'
            }
        }
    ]
};



/* vim: set ts=4 sw=4 sts=4 tw=100: */
