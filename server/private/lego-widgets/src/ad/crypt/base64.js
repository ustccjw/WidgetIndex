/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/


/**
 * src/ad/crypt/base64.js ~ 2013/11/21 11:00:00
 *
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision$
 * @description
 *
 **/

goog.provide('ad.crypt.base64');

/**
 * base64编码
 * @param {string} str 被编码的字符串
 * @return {string}
 */
ad.crypt.base64.encode = function(str){
    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var returnVal, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    returnVal = "";
    while(i < len) {
        c1 = str.charCodeAt(i++) & 255;
        if(i == len) {
            returnVal += base64EncodeChars.charAt(c1 >> 2);
            returnVal += base64EncodeChars.charAt((c1 & 3) << 4);
            returnVal += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if(i == len) {
            returnVal += base64EncodeChars.charAt(c1 >> 2);
            returnVal += base64EncodeChars.charAt(((c1 & 3) << 4) | ((c2 & 240) >> 4));
            returnVal += base64EncodeChars.charAt((c2 & 15) << 2);
            returnVal += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        returnVal += base64EncodeChars.charAt(c1 >> 2);
        returnVal += base64EncodeChars.charAt(((c1 & 3) << 4) | ((c2 & 240) >> 4));
        returnVal += base64EncodeChars.charAt(((c2 & 15) << 2) | ((c3 & 192) >>6));
        returnVal += base64EncodeChars.charAt(c3 & 63);
    }
    return returnVal;
};