/**
 * src/ad/base/event_center.js ~ 2014/01/22 14:29:30
 * @author shaojunjie(shaojunjie@baidu.com)
 * @version $Revision$
 * @description
 * @usage on PS: require(['ecma/ui/event_center'], function(module) {});
 **/

define(function() {

    var events = {};
    var subUid = -1;

    var publish = function(evname, args) {
        if (!events[evname]) {
            return false;
        }
        setTimeout(function() {
            var subscribers = events[evname];
            var len = subscribers ? subscribers.length : 0;
            while (len--) {
                subscribers[len].func(evname, args);
            }
        }, 0);
        return true;
    };

    var subscribe = function(evname, func) {
        if (!events[evname]) {
            events[evname] = [];
        }
        var sid = (++subUid).toString();
        events[evname].push({
            sid: sid,
            func: func
        });
        return sid;
    };

    var unsubscribe = function(sid) {
        for (var m in events) {
            if (events[m]) {
                for (var i = 0, j = events[m].length; i < j; i++) {
                    if (events[m][i].sid === sid) {
                        events[m].splice(i, 1);
                        return sid;
                    }
                }
            }
        }
        return false;
    };

    return {
        'publish': publish,
        'subscribe': subscribe,
        'unsubscribe': unsubscribe
    };

});
