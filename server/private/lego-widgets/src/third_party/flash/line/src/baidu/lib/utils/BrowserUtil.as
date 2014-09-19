package baidu.lib.utils {
	
	import flash.external.ExternalInterface;
	import flash.net.URLRequest;
	import flash.net.navigateToURL;
	
	/**
	 *	浏览器相关工具
	 *	
	 *  @author xiaokun
	 */
	public class BrowserUtil {
		
		/**
		 *  弹出浏览器新窗口,尽量防止弹窗被拦截
		 */
		public static function openNewWindow(url:String, windowName:String = null):void {
			try {
				/*
				在IE下，如果嵌入Flash的Object标签没有给id属性赋值的话，
				Flash使用ExternalInterface.call调用含有参数的JS函数会失败，
				且浏览器报错：'null'为空或不是对象
				所以这里采用打开带javascript的url的方式
				
				后来又因为这种方式导致url中有中文的情况下弹窗乱码（IE）或者失败（FF），
				所以不得不改回原来的方式，通过判断是否有id来避免错误
				*/
				if (ExternalInterface.objectID) {
					if (windowName) {
						ExternalInterface.call("window.open", url, windowName);
					} else {
						ExternalInterface.call("window.open", url);
					}
				} else {
					throw new Error();
				}
			} catch (e:Error) {
				navigateToURL(new URLRequest(url), "_blank");
			}
		}
	}
}
