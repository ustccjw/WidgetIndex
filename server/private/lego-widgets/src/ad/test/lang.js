/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: lang.js 12700 2012-10-12 07:33:09Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/test/lang.js ~ 2012/09/17 14:32:21
 * @author leeight(liyubei@baidu.com)
 * @version $Revision: 12700 $
 * @description
 *
 **/

goog.provide('ad.test.lang');

/**
 * @enum {string}
 * @const
 */
ad.test.lang.zh_CN = {
  'url' : '链接地址',
  'title' : '标题',
  'name' : '名称',
  'src' : '地址',
  'description' : '描述',
  'site' : '站点',
  'img_url' : '图片地址',
  'image_url' : '图片地址',
  'video_url' : '视频地址',
  'ipad_img' : 'iPad替代图片',
  'width' : '宽度',
  'height' : '高度',
  'font-size' : '字号',
  'font-family' : '字体',
  'color' : '颜色',
  'background-color' : '背景颜色'
};

function _(name) {
  return (ad.test.lang.zh_CN[name] || name);
}



















/* vim: set ts=4 sw=4 sts=4 tw=100: */
