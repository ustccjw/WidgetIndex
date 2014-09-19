/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.config.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/grand_media/double_screen3.config.js ~ 2014/07/11 14:25:08
 * @author dingguoliang01@baidu.com (Tingkl)
 * @version $Revision: 150523 $
 * @description
 * double_screen3的配置数据
 **/

var AD_CONFIG = {
    'config': {
        'mobile_url': 'http://ecma.bdimg.com/adtest/tingkl/middlePage.html'
    },
    'fwc': {
        'width': 830,
        'height': 400,
        'float_bg': {
            'src': 'http://dummyimage.com/830x400',
            'rcv_url': 'http://www.baidu.com'
        },
        'content': {
            'video': {
                'player_ver': 7,
                rcv_url: 'http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAO0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars.flash.html',
                img_url: 'http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp1.jpg',
                video_url: '//bs.baidu.com/adtest/dfa4e34237dac53296931da8d610347f.flv',
                ipad_img: 'http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp1.jpg',
                width: 830,
                height: 400,
                is_play: true
            },
            'image': {
               'image_url' : '//bs.baidu.com/adtest/12810c75677ac5f77fed180e165c280d.jpg',
                'image_rcv_url': '//bs.baidu.com/lego-mat/qingpai.html'
            }
        }
    },
    'banner': {
        'flash': {
            'interactive': {
                //'none': {}
                'cover': true
            },
            'hidden': {//嵌入型
                'blink': true,//是否闪啊闪
                'tip': '扫描二维码有惊喜',
                'hover_tip': {
                    'title': '扫一扫',
                    'description1': '试驾车，赢奖品，端午保养大礼包',
                    'description2': '试驾车，赢奖品，端午保养大礼包'
                }
            },
            'name' : 'hello <b>ad.widget.Flash</b>.',
            'width': 960,
             'height': 90,
            'wmode': 'transparent',
            'is_flashvars': true,
            'link_rcv_url' : 'http://www.baidu.com/',
            'src':'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/float2.swf'
        },
        'image': {
            'image_size': '1',//底图尺寸 1:960*90, 2:728*90, 3:160*600, 4:200*200, 5:360*300, 6:250*250, 7:580*90
            'image_url' : '//bs.baidu.com/adtest/12810c75677ac5f77fed180e165c280d.jpg',
            'image_rcv_url': '//bs.baidu.com/lego-mat/qingpai.html',
            'interactive': {
                /*'none': {},*/
                'cover': true
            },
            'type': {
                /*'embed': {//隐藏型
                 'left': 725,
                 'top': 2
                 },*/
                'hidden': {//嵌入型
                    'blink': true,//是否闪啊闪
                    'tip_pos': 'right',//二维码在底图上的位置'left':左侧, 'right':右侧
                    'tip': {
                        'text': '扫描二维码有惊喜'
                    },
                    'hover_tip': {
                        'title': '扫一扫',
                        'description': '试驾车，赢奖品，端午保养大礼包'
                    }
                }
            }
        }
    }
};




/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
