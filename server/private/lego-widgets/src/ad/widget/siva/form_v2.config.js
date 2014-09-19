/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.config.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/siva/form_v2.config.js ~ 2013/11/20 11:54:55
 * @author taoxutian@baidu.com (taoxutian)
 * @version $Revision: 150523 $
 * @description
 * form_v2相关的实现逻辑
 **/

var WIDGET_CONFIG = {
  'button_text' : '立即报名',
  'info_text'   : '报名成功！',
  'input_list'  : [
    {
      "type":"text",
      "name" :"姓名"
    },
    {
      "type":"email",
      "name":"邮箱"
    },
    {
      "type": "tel",
      "name":"手机号码"
    }
  ],
  "success_rcv_url" : "http://www.baidu.com"
};



/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
