package baidu.fw.jflash {
    import flash.events.Event;    
    import flash.events.EventDispatcher;    
    import flash.events.TimerEvent;    
    import flash.utils.Timer;    
    import flash.utils.Dictionary;
    import flash.external.ExternalInterface;

    /**
     * 当js准备好的时候，会派发此事件。
     */
    [Event(name="jsReady", type="flash.events.Event")]

    /**
     * JFlash.as是JFlash（JSAS2.0）框架的重要组成部分。
     * 新版本说明：
     * 目前，JFlash已经不再继承自 Sprite，主类也不再需要继承 JFlash。
     * JFlash是一个静态类。
     * @author yaowei
     */
    public class JFlash extends EventDispatcher {
    	
    	public static const JS_READY:String = "jsReady";
        private static var instance:JFlash;
        
        private var id2Object:Object = {};
        private var object2Id:Dictionary = new Dictionary(true);
        private var timer:Timer = new Timer(500, 0);

        /**
         * 获取 JFlash 的单例。
         */
        public static function getInstance():JFlash {
            if (instance == null) {
                instance = new JFlash();
            }
            return instance;
        }
        
        /**
         * 构造函数。
         */
        public function JFlash() {
            timer.start();
            timer.addEventListener(TimerEvent.TIMER, handleTimer);
        }

        private function handleTimer(event:TimerEvent):void {
            if (ExternalInterface.call("eval", "typeof(SWFObject.instances." + ExternalInterface.objectID + ".onLoadInit)") == "function") {
                var e:Event = new Event(JS_READY);
                dispatchEvent(e);
                timer.stop();
                timer.removeEventListener(TimerEvent.TIMER, handleTimer);
                timer = null;
            }
        }

        //有了以下4个函数，js能做的事情就非常多啦。
        /**
         * 构造一个类的对象。
         * 不管产生什么类的实例，我们只能返回一个Object给外面，Sprite是不可能返回到js里面的。
         * @param json 
         *  例如：{ className："flash.display.Sprite" }
         */
        private final function createASObjectInstance(json:Object):Object {
            //暂时不提供
            return null;
        }

        /**
         * 获取属性。
         * asoId
         * property 属性名称
         */
        private final function getASObjectProperty(json:Object):Object {
            var asoId:String = json.asoId;
            var instance:* = getASObject(asoId);
            var property:String = json.property;
            return instance[property];
        }

        /**
         * 设置属性。
         * asoId
         * property 属性名称
         * value 属性值
         */
        private final function setASObjectProperty(json:Object):void {
            var asoId:String = json.asoId;
            var instance:* = getASObject(asoId);
            var property:String = json.property;
            var value:* = json.value;
            instance[property] = value;
        }

        /**
         * 调用方法。
         * asoId
         * method
         * parameters
         */
        private final function callASObjectMethod(json:Object):Object {
            var asoId:String = json.asoId;
            var instance:* = getASObject(asoId);
            var method:String = json.method;
            var parameters:Array = json.parameters;
            return instance[method].apply(instance, parameters);
        }

        /**
         * 获取asObject。
         */
        private final function getASObject(asoId:String):* {
            return id2Object[asoId];
        }

        /**
         * 告诉js，我准备好了。
         * 本方法必须被调用1次。
         */
        public final function imReady():void {
            ExternalInterface.addCallback("createASObjectInstance", createASObjectInstance);
            ExternalInterface.addCallback("getASObjectProperty", getASObjectProperty);
            ExternalInterface.addCallback("setASObjectProperty", setASObjectProperty);
            ExternalInterface.addCallback("callASObjectMethod", callASObjectMethod);
            
            dispatchASObjectEvent(null, "loadInit", {});
        }

        /**
         * 向js注册1个asObject。
         */
        public final function registerASObject(asObject:*,asoId:String):void {
            if (object2Id[asObject] == null && id2Object[asoId] == null) {
                object2Id[asObject] = asoId;
                id2Object[asoId] = asObject;
                var swfId:String = ExternalInterface.objectID;
                callJSMethod("SWFObject.registerASObject", [{swfId:swfId, asoId:asoId}]);
            }
        }

        /**
         * 向js派发1个事件。
         * asObject 对象
         * type 事件名称
         * data 数据
         */
        public final function dispatchASObjectEvent(asObject:*,type:String,data:Object):void {
            var asoId:String = asObject==null?null:object2Id[asObject];
            var swfId:String = ExternalInterface.objectID;
            callJSMethod("SWFObject.dispatchASObjectEvent", [{swfId:swfId, asoId:asoId, type:type, data:data}]);
        }

        /**
         * 调用js的一个方法。
         * 当用事件与外面通信不够的时候，可以使用此方法。
         */
        public final function callJSMethod(method:String,parameters:Array):void {
        	var list:Array = [method].concat(parameters);
            ExternalInterface.call.apply(null,list);
        }
    }
}
