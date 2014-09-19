/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * bmap.js ~ 2013/07/16 18:16:33
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 * @externs
 **/

/**
 * @type {Object}
 */
var BMAPLIB_TAB_SEARCH = {};

/**
 * @type {Object}
 */
var BMAPLIB_TAB_TO_HERE = {};

/**
 * @type {Object}
 */
var BMAPLIB_TAB_FROM_HERE = {};
/**
 * @type {Object}
 */
var BMap = {};

/**
 * @constructor
 * @param {string} id
 */
BMap.Map = function(id){};

BMap.Map.prototype.enableScrollWheelZoom = function(){};

BMap.Map.prototype.enableKeyboard = function(){};

BMap.Map.prototype.enableInertialDragging = function(){};

BMap.Map.prototype.enableContinuousZoom = function(){};

/**
 * @param {string} event
 * @param {Function} handler
 */
BMap.Map.prototype.addEventListener = function(event, handler){};

/**
 * @param {string} event
 * @param {Function} handler
 */
BMap.Map.prototype.removeEventListener = function(event, handler){};

/**
 * @param {BMap.Point} point
 * @param {number} zoom
 */
BMap.Map.prototype.centerAndZoom = function(point,zoom){};

/**
 * @param {Object} control
 */
BMap.Map.prototype.addControl = function(control){};
/**
 * @constructor
 * @const
 */
BMap.Geocoder = function(){};

/**
 * @param {string} address1
 * @param {string} address2
 * @param {Function} callback
 */
BMap.Geocoder.prototype.getPoint = function(address1, callback, address2){};

/**
 * @constructor
 * @const
 */
BMap.LocalCity = function(){};

/**
 * @param {Function} callback
 */
BMap.LocalCity.prototype.get = function(callback){};

/**
 * @constructor
 * @param {number} lng
 * @param {number} lat
 */
BMap.Point = function(lng,lat){};

/**
 * @constructor
 * @const
 */
BMap.NavigationControl = function(){};

/**
 * @constructor
 * @const
 */
BMap.ScaleControl = function(){};

/**
 * @constructor
 * @const
 */
BMap.OverviewMapControl = function(){};

/**
 * @constructor
 * @const
 */
BMap.MapTypeControl = function(){};

/**
 * @constructor
 * @param {Object|string=} map
 * @param {Object=} options
 */
BMap.LocalSearch = function(map, options){};

/**
 * @param {string} address
 */
BMap.LocalSearch.prototype.search = function(address){};

/**
 * @type {Object}
 */
var BMapLib = {};

/**
 * @constructor
 * @param {Object} map
 * @param {string} context
 * @param {Object} options
 */
BMapLib.SearchInfoWindow = function(map, context, options){};

/**
 * @param {Object} marker
 */
BMapLib.SearchInfoWindow.prototype.open = function(marker){};

/**
 * @constructor
 * @param {Object} map
 * @param {Object} obj
 */
BMapLib.MarkerClusterer = function(map, obj){};

/**
 * @constructor
 * @param {string} url
 * @param {Object} size
 */
BMap.Icon = function(url, size){};

/**
 * @constructor
 * @param {number|string} width
 * @param {number|string} height
 */
BMap.Size = function(width, height){};

/**
 * @constructor
 * @param {Object|string} pointer
 * @param {Object=} options
 */
BMap.Marker = function(pointer, options){};

/**
 * @param {string} eve_type
 * @param {Function} fun
 */
BMap.Marker.prototype.addEventListener = function(eve_type, fun){};

/**
 * @param {Array.<Object>} markers
 */
BMapLib.MarkerClusterer.prototype.removeMarkers = function(markers){};

/**
 * @param {Array.<Object>} markers
 */
BMapLib.MarkerClusterer.prototype.addMarkers = function(markers){};


/**
 * 清楚所有markers
 */
BMapLib.MarkerClusterer.prototype.clearMarkers = function(){};






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
