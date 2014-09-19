package baidu.fw.jflash {
    import flash.events.StatusEvent;
    import flash.net.LocalConnection;    	

    /**
	 * 类名：Console<br/>
	 * 依赖：使用了系统的LocalConnection类。<br/>
	 * 版本：1.10<br/>
	 * 描述：控制台。<br/>
	 * <ul>
	 * <li>等效于 C# 中的 Console 类和 Java 中的 System。具有向控制台输出调试信息的能力。</li>
	 * <li>此类为静态类。您只需要使用此类的log方法err方法。它会向外发送日志。</li>
	 * <li>要显示这些日志，需要一个负责日志显示的程序。ConsoleUI.swf 是我做的一个与此类配套的日志显示器。</li>
	 * <li>你也可以制作自己的日志显示器。可以参考：ConsoleUI.as 和 ConsoleUI.fla</li>
	 * </ul>
	 * 示例：
	 * <code>Console.log("Hello trace, i'm your brother!");</code><br/>
	 * Email：yaowei#baidu.com
	 */
	public class Console {
		public static const CONNECT_NAME_LOGGEROUT:String = "_loggerOut";
		public static const CONNECT_NAME_LOGGERIN:String = "_loggerIn";
		//日志的最大数目：能存放多少句话。
		public static var MAX_LOG_COUNT:int = 50;
		//单个日志的最大长度：每句话最多有多长。
		public static var MAX_LOG_SIZE:int = 300;
		
		//实例。本类为单例模式。
		private static var _instance:Console;
		
		//本地连接对象。
		private var _lc:LocalConnection;
		//存储调试信息
		private var _logs:Array;
		//存储错误信息
		private var _errors:Array;
		
		/**
		 * 构造函数。原则上是私有的。单例模式的构造函数只允许自己调用，且只能调用一次。
		 */
		public function Console() {
			_logs = new Array();
			_errors = new Array();
			_lc = new LocalConnection();
			_lc.client = this;
			_lc.addEventListener(StatusEvent.STATUS, onStatus);
			_lc.allowDomain("*");
			try{
				_lc.connect(CONNECT_NAME_LOGGERIN);
			}catch(e:ArgumentError){
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
		
		private static function getInstance():Console{
			if(!_instance){
				_instance = new Console();
			}
			return _instance;
		}
		
		/**
		 * @param info 日志信息
		 * @param source 日志来源
		 */
		public static function log(info:*, source:String = null):void {
			info = obj2Str(info);
			var ins:Console = getInstance();
			ins._lc.send(CONNECT_NAME_LOGGEROUT, "log", info);
			//对于日志，有长度和个数的限制。
			if (String(info).length<MAX_LOG_SIZE) {
				ins._logs.push(((source==null) ? (info) : ((source+" :\n")+info)));
			}
			if (ins._logs.length>MAX_LOG_COUNT) {
				ins._logs.shift();
			}
		}
		
		/**
		 * @param info 错误信息
		 */
		public static function err(info:String):void {
			info = "ERROR : "+info;
			//对于错误，没有长度和个数的限制。
			var ins:Console = getInstance();
			ins._lc.send(CONNECT_NAME_LOGGEROUT, "err", info);
			ins._errors.push(info);
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
			ins._lc.send(CONNECT_NAME_LOGGEROUT, "log", logs);
		}
		
		/**
		 * private
		 * 此函数提供给 控制台显示器使用。
		 * 提供给外部的回调。用于一次性获取所有的错误信息。
		 * @see Logger.getLogs
		 */
		public function getErrors():void {
			var ins:Console = getInstance();
			ins._lc.send(CONNECT_NAME_LOGGEROUT, "err", errors);
		}
		
		/**
		 * getter 获取日志信息。
		 */
		private static function get logs():String {
			var ins:Console = getInstance();
			return (ins._logs.join("\n"));
		}
		
		/**
		 * getter 获取错误信息。
		 */
		private static function get errors():String {
			var ins:Console = getInstance();
			return (ins._errors.join("\n"));
		}
		
		public static function obj2Str(o:*, tabNum:uint = 0):String {
			var str:String = "";
			var tabPrefix:String = getTab(tabNum);
			switch(typeof(o)) {
				case "object":
					var subNum:Number = 0;
					for (var i in o) {
						str += tabPrefix + "\"" + i + "\": " + obj2Str(o[i], tabNum+1) + "\n";
						subNum++;
					}
					//special deal for some object generated like this : new String("test")
					if (subNum == 0) {
						str = String(o);
					}else {
						str = tabPrefix + "[object\n" + str;
						if(tabNum != 0){
							str = "\n" + str;
						}
						str += (tabPrefix + "]");
					}
					break;
				case "function":
					str = "[function]";
					break;
				default:
					str = String(o);
			}
			return str;
		}
		
		private static function getTab(tabNum:uint):String {
			var tab:String = "";
			for (var i:Number = 0; i < tabNum; i++) {
				tab += "    ";
			}
			return tab;
		}
	}
}
