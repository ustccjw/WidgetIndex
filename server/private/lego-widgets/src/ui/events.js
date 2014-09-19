/***************************************************************************
 *
 * Copyright (c) 2011 Baidu.com, Inc. All Rights Reserved
 * $Id: events.js 3142 2011-03-11 03:39:12Z liyubei $
 *
 **************************************************************************/



/**
 * src/ui/events.js ~ 2011/03/02 21:06:08
 * @author leeight(liyubei@baidu.com)
 * @version $Revision: 3142 $
 * @description
 * 事件类型的定义
 **/

goog.provide('ui.events');


/**
 * @enum {string}
 */
ui.events = {
  // 浏览器事件
  LOAD: 'load',
  CLICK: 'click',
  DBCLICK: 'dbclick',
  MOUSE_OVER: 'mouseover',
  MOUSE_OUT: 'mouseout',
  MOUSE_MOVE: 'mousemove',
  ENTER: 'enter',
  OPEN: 'open',
  CHANGE: 'change',
  FOCUS: 'focus',
  BLUR: 'blur',
  RESIZE: 'resize',

  // 自定义的事件
  VIEWAREA_CHANGE: 'viewareachange',
  BEFORE_CHANGE: 'beforechange',
  AFTER_CHANGE: 'afterchange',
  BEFORE_QUEUE: 'beforequeue',
  BEFORE_SUBMIT: 'beforesubmit',
  AFTER_QUEUE: 'afterqueue',
  BEFORE_UPLOAD: 'beforeupload',
  AFTER_UPLOAD: 'afterupload',
  UPLOAD_SUCCESS: 'uploadsuccess',
  UPLOAD_FAILURE: 'uploadfailure',
  AFTER_DELETE: 'afterdelete',
  AFTER_RENDER: 'afterrender',
  AFTER_COLUMN_RESIZE: 'aftercolumnresize',
  AFTER_SELECT: 'afterselect',
  AFTER_SHOW: 'aftershow',
  AFTER_HIDE: 'afterhide',
  AFTER_SORT: 'aftersort',
  CANVAS_CHANGE: 'canvaschange',
  FORM_CHANGE: 'formchange',
  FORM_FOCUS: 'formfocus',
  HEIGHT_CHANGE: 'heightchange',
  CANVAS_HEIGHT_CHANGE: 'canvasheightchange',
  PREFS_HEIGHT_CHANGE: 'prefsheightchange',
  BEFORE_VALIDATE: 'beforevalidate',
  AFTER_VALIDATE: 'aftervalidate',
  FILES_CHANGED: 'fileschanged',
  BEFORE_REDIRECT: 'beforeredirect',
  CLOSE: 'onclose',
  SHOW_TIP: 'showtip',
  HIDE_TIP: 'hidetip',
  VIDEO_START: 'videostart',
  VIDEO_FINISH: 'videofinish',
  VIDEO_CLICK: 'videoclick',
  VIDEO_PAUSE: 'videopause',
  VIDEO_CONTINUE: 'videocontinue',
  VIDEO_AUTO: 'videoauto',
  TAB_CHANGE: 'tabchange',
  TAB_CLICK: 'tabclick',
  TAB_HOVER: 'tabhover',
  WEIBO_FOLLOW: 'weibofollow',
  WEIBO_TRANSFORMATION: 'weibotransformation',
  WEIBO_STORE: 'weibostore',
  WEIBO_NAME: 'weiboname',
  WEIBO_CRIT: 'weibocrit',
  TIME_LINE_LOADED: 'timelineloaded',
  ARROW_RIGHT: 'arrowright',
  ARROW_LEFT: 'arrowleft',
  CARD_CLICK: 'cardclick',
  SHARE: 'share',
  SEND_LOG: 'sendlog',
  PASSPORT_REG_SUCCESS: 'passportregsuccess',
  PASSPORT_LOGIN_SUCCESS: 'passportloginsuccess',
  AUTH_TYPE_CHANGE: 'authtypechange',
  DRAG_START: 'dragstart',
  DRAG_END: 'dragend',
  DRAG: 'drag',

  MAP_ALL_CLICK: 'mapallclick',
  MAP_CLICK: 'mapclick',
  NEW_EVENT_ADDED: 'neweventadded',
  SUBMIT_SUCCESS: 'submitsuccess',
  FILM_UP: 'filmup',
  FILM_DOWN: 'filmdown',
  SHOWED_IMAGE_CHANGE: 'showedimagechange',

  DISPOSE: 'dispose',

  // 广告物料展示之前
  BEFORE_MATERIAL_SHOW: 'beforematerialshow',
  // 广告物料展示之后
  AFTER_MATERIAL_SHOW: 'aftermaterialshow',

  // material里面新增了广告容器，例如(Float Window)等等.
  // 用来通知需要的plugin对新增的容器绑定监控的事件
  // 这个事件应该只触发一次，不要多次触发.
  NEW_AD_CANVAS: 'newadcanvas',

  // image_cartoon动态创建元素的时候，触发这个事件, 在impl里面可以
  // 进一步处理.
  NEW_ELEMENT: 'newelement',

  //图片右侧flash2样式（含关闭和重播）
  IMAGE_FLASH2_CLOSE: 'imageflash2close',
  IMAGE_FLASH2_REPLAY: 'imageflash2replay',
  IMAGE_FLASH2_HOVER: 'imageflash2hover',
  IMAGE_FLASH2_OUT: 'imageflash2out',

  //贴吧
  TIEBA_LIST_GAME_PLAY: 'tiebaListGamePlay',

  //图话
  COMMENT_UPDATED: 'commentupdated',
  UNREAD_MAIL_COUNT_UPDATED: 'unreadmailcountupdated',
  RETURN: 'return',

  //图+
  RELEASE: 'release',
  HIDE: 'hide', // 广告隐藏
  SHOW: 'show', // 广告显示（与隐藏对应，不包含第一次展现）
  SHOW_THEN_HIDE: 'showthenhide',
  TIME_OVER: 'timeover',
  TIP_MOUSE_OVER: 'tipmouseover',
  TIP_MOUSE_OUT: 'tipmouseout',
  TIP_CLICK: 'tipclick',
  IN_VIEW: 'inview',    // 在可视区域内
  INTO_VIEW: 'intoview',// 进入可视区域
  OUT_VIEW: 'outview',  // 离开可视区域
  RENDER_LOADED: 'renderloaded', // render加载完成
  BOX_HIDE: 'boxhide',
  BOX_SHOW: 'boxshow',
  BOX_CLOSE: 'boxclose',
  BOX_REOPEN: 'boxreopen',
  BOX_MINIMIZE: 'boxminimize',    // 最小化
  BOX_MAXIMIZE: 'boxmaximize',    // 最大化
  BOX_MOUSE_OVER: 'boxmouseover',
  BOX_MOUSE_MOVE: 'boxmousemove',
  BOX_MOUSE_OUT: 'boxmouseout',
  BOX_RESIZE: 'boxresize',
  BOX_FIXED_HEIGHT_UPDATED: 'boxfixedheightupdated'
};




















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
