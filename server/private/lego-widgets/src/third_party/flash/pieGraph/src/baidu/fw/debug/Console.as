package baidu.fw.debug {
    import flash.events.StatusEvent;
    import flash.net.LocalConnection;    	

    /**
     * Flash 控制台日志输出类。
     * <ul>
     * <li>等效于C#中的Console类和Java中的System类。具有向控制台输出调试信息的能力。</li>
     * <li>此类为静态类。您只需要调用Console.log方法，它就会向外发送日志。</li>
     * <li>要显示Console.log输出的日志，需要一个日志显示器，如：
     * http://as4game.com/console 或者
     * http://fe.baidu.com/~yaowei/console2/
     * 这个页面就是一个日志输出器</li>
     * </ul>
     * 示例：
     * <p>
     * <code>Console.log("this a msg!");</code><br/>
     * <code>Console.log("this a msg!","info");</code><br/>
     * <code>Console.log("this a msg!","warn");</code><br/>
     * <code>Console.log("this a msg!","error");</code><br/>
     * </p>
     * @author as4game@gmail.com
     */
    public class Console {
        public static const CONNECT_NAME_LOGGEROUT:String = "_loggerOut";
        public static const CONNECT_NAME_LOGGERIN:String = "_loggerIn";
        
        //日志的最大数目：能存放多少句话。
        public static var MAX_LOG_COUNT:int = 500;

        //实例。本类为单例模式。
        private static var _instance:Console;

        //本地连接对象。
        private var _lc:LocalConnection;
        //存储调试信息
        private var _msgs:Array;
        
        /**
         * 发出日志。
         * @param content 日志内容。
         * @param type 日志类型。可选。可以为"info","warn","error"3种。默认为"info"类型。
         * @param source 日志来源。可选。
         */
        public static function log(content:*, type:String = "info" ,source:String = null):void {
            var ins:Console = getInstance();
            var msg:Object = {content:content, type:type, source:source};
            ins._lc.send(CONNECT_NAME_LOGGEROUT, "log", msg);
            
            //记录消息。
            ins._msgs.push(msg);
            //记录的消息个数有上限。
            if (ins._msgs.length > MAX_LOG_COUNT) {
                ins._msgs.shift();
            }
        }

        /**
         * 构造函数。
         */
        public function Console() {
            _msgs = new Array();
            _lc = new LocalConnection();
            _lc.client = this;
            _lc.addEventListener(StatusEvent.STATUS, onStatus);
            _lc.allowDomain("*");
            try {
                _lc.connect(CONNECT_NAME_LOGGERIN);
            }catch(e:ArgumentError) {
                trace(e);
            }
        }
        
        private function onStatus(event:StatusEvent):void {
            switch (event.level) {
                case "status":
                    trace("LocalConnection.send() succeeded");
                    break;
                case "error":
                    trace("LocalConnection.send() failed");
                    break;
            }
        }

        private static function getInstance():Console {
            if(!_instance) {
                _instance = new Console();
            }
            return _instance;
        }

        /**
         * private
         * 此函数提供给 控制台显示器使用。
         * 提供给外部的回调。用于一次性获取所有的日志信息。日志显示器通常在开始会掉用此函数，
         * 因为日志显示程序有可能在程序执行之后才打开，这样可以先调用一次getLogs()来获取已经
         * 打印的日志信息。
         */
        public function getLogs():void {
            var ins:Console = getInstance();
            ins._lc.send(CONNECT_NAME_LOGGEROUT, "log", msgs);
        }

        /**
         * 获取日志信息。
         */
        private static function get msgs():Array {
            var ins:Console = getInstance();
            return (ins._msgs);
        }
    }
}
