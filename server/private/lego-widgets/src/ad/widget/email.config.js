/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: email.config.js 11047 2012-08-09 02:54:18Z liyubei $
 *
 **************************************************************************/



/**
 * src/jn/demo/email.config.js ~ 2012/08/08 21:41:35
 * @author leeight@gmail.com (leeight)
 * @version $Revision: 11047 $
 * @description
 * email相关的实现逻辑
 **/

var WIDGET_CONFIG = {
  "mail_logo" : "http://eiv.baidu.com/mapm2/img/163/mail_logo.png",
  "mail_logo_rcv_url" : "http://mail.163.com/",
  "regist_text" : "注册",
  "regist_rcv_url" : "http://reg.email.163.com/mailregAll/reg0.jsp?from=baidu", //注册地址
  "action" : "https://reg.163.com/logins.jsp",//表单提交地址
  "method" : "post",//提交数据方式
  "charset" : "utf-8",
  "text_inputs" : [
      {
          "title" : "账号： ",
          "id":"user_name",
          "type":"text",
          "mail_type" :{ 
              "options" : [ //邮箱类型
                  {
                      "type" : "163.com", //邮箱类型
                      "value" : "http://entry.mail.163.com/coremail/fcg/ntesdoor2?style=-1&lightweight=1&verifycookie=1" //与邮箱类型关联的标识
                  },{
                      "type" : "126.com", //邮箱类型
                      "value" : "http://entry.mail.126.com/cgi/ntesdoor?hid=10010102&style=-1&lightweight=1&verifycookie=1" //与邮箱类型关联的标识
                  },{
                      "type" : "yeah.net", //邮箱类型
                      "value" : "http://entry.yeah.net/cgi/ntesdoor?style=-1&lightweight=1&verifycookie=1" //与邮箱类型关联的标识
                  }
              ]
          }
      },{
          "title" : "密码： ",
          "id":"pass_word",
          "type":"password"
      }
  ],
  "hidden_inputs" : [ //其他隐藏域
      {
          "name":"username", //隐藏域字段名
          "id":"username",
          "value":"" //隐藏域值
      },{
          "name":"url", //隐藏域字段名
          "id":"url",
          "value":"" //隐藏域值
      },{
          "name":"password", //隐藏域字段名
          "id":"password",
          "value":"" //隐藏域值
      },{
          "name":"type", //隐藏域字段名
          "value":"1" //隐藏域值
      },{
          "name":"product", //隐藏域字段名
          "value":"baidu" //隐藏域值
      }
  ]
};



/* vim: set ts=4 sw=4 sts=4 tw=100: */
