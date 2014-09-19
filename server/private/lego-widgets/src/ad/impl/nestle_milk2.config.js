/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.config.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/nestle_milk2.config.js ~ 2014/04/28 11:18:23
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * nestle_milk2的配置数据
 **/

var AD_CONFIG = {
    'title' : {
        'title' : '<em>雀巢</em>母婴营养官网，百年<em>雀巢</em>，全球领先的婴幼儿营养专家',
        'rcv_url' : 'http://www.baidu.com'
    },
    'small_head' : {
        'description_rcv_html' : '雀巢婴儿营养始于1867年，经过 145年的发展，已经成为全球值得信赖的婴幼儿营养品公司，提供多种高品质婴幼儿营养品：雀巢妈妈奶粉，雀巢超级能恩幼儿配方，雀巢能恩幼儿配方<span></span>，雀巢力多精幼儿配方及雀巢婴儿米粉。',
        'query' : [
            {
                'key_word' : '雀巢妈妈奶粉',
                'rcv_url' : 'http://www.buick.com.cn'
            },{
                'key_word' : '雀巢超级能恩',
                'rcv_url' : 'http://www.buick.com.cn'
            },{
                'key_word' : '幼儿配方<span></span>',
                'rcv_url' : 'http://www.buick.com.cn'
            }
        ],
        'image_group_head' : {
            'options':[
                {
                    'imgsrc':'http://eiv.baidu.com/mapm2/encore//h1_img1.jpg',
                    'img_rcv_url': 'http://www.baidu.com'
                },{
                    'imgsrc':'http://eiv.baidu.com/mapm2/encore//h1_img1.jpg',
                    'img_rcv_url': 'http://www.baidu.com'
                },{
                    'imgsrc':'http://eiv.baidu.com/mapm2/encore//h1_img1.jpg',
                    'img_rcv_url': 'http://www.baidu.com'
                }
            ]
        },
        'site' : 'www.nestlebaby.com.cn'
    },
    //左侧视频
    'video' : {
        'rcv_url' : 'http://www.baidu.com',
        'img_url' : 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.jpg',
        'video_url' : 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.flv',
        'csttit' : 'zhidao.baidu.com',
        'ipad_img': 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.jpg', //在ipad下点击视频替代图片
        'width':220,
        'height':190
    },
    'iframe' : {
        'width' : 514,
        'height' : 90,
        'src' : 'http://eiv.baidu.com/mapm2/nestle/130313/index.html'
    },
    //底部3个按钮
    'button_group' : {
        'options' : [
            {'text' : '超级能恩',
              'rcv_url' : 'http://www.baidu.com'
            },{
                'text' : '能恩',
                'rcv_url' : 'http://www.baidu.com'
            },{
                'text' : '防敏攻略',
                'rcv_url' : 'http://www.baidu.com'
            },{
                'text' : '巢妈团',
                'rcv_url' : 'http://www.baidu.com'
            },{
                'text' : '淘宝旗舰店',
                'rcv_url' : 'http://www.baidu.com'
            }
        ]
    }
};




/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
