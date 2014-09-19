package
{
	import flash.events.Event;
	import flash.events.EventDispatcher;
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	
	public class XmlLoader extends EventDispatcher
	{
		private var _xml:XML;
		private var _url:String;

		/**
		 * Constructor
		 */
		public function XmlLoader(url:String):void
		{
			this._url = url;
			init();
		}
		public function init():void
		{
			var req:URLRequest = new URLRequest(_url);
			var loader:URLLoader = new URLLoader();
			try
			{
				loader.load(req);
			}catch(e:Error)
			{
				throw new Error("Error：加载xml失败");
			}
			
			loader.addEventListener(Event.COMPLETE,xmlLoadCompleteHandler);
		}
		private function xmlLoadCompleteHandler(evt:Event):void
		{
			_xml =XML(evt.target.data);
			this.dispatchEvent(new Event("XML_LOAD_COMPLETE"));
		}
		public function get xml():XML
		{
			return this._xml;
		}
	}
}
