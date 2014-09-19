package baidu.ui.controls.colorPicker 
{
	/**
	 * ...
	 * @author zhanzhihu@baidu.com chengzhixing@baidu.com
	 */
	public class RGB
	{
		/**
		 * @private
		 * 表示RGB中R的颜色值
		 */
		private var _r : uint;
		
		/**
		 * @private
		 * 表示RGB中G的颜色值
		 */
		private var _g : uint;
		
		/**
		 * @private
		 * 表示RGB中B的颜色值
		 */
		private var _b : uint;
		
		/**
		 * 构造函数
		 * 通过r,g,b三个值来初始化一个RGB对象
		 * 
		 * @param	r	[uint]红色的颜色值
		 * @param	g	[uint]绿色的颜色值
		 * @param	b	[uint]蓝色的颜色值
		 */
		public function RGB(r:uint = 0, g:uint = 0, b:uint = 0) 
		{
			this.r = r;
			this.g = g;
			this.b = b;
		}
		
		/**
		 * 返回rgb对象的红色颜色值
		 * 
		 * @return	r	[uint]
		 */
		public function get r() : uint {
			return _r;
		}

		/**
		 * 设置rgb对象的红色颜色值
		 * 
		 * @param	value	[uint]
		 */
		public function set r(value : uint) : void {
			_r = value;
		}

		/**
		 * 返回该rgb对象的绿色颜色值
		 * 
		 * @return	g	[uint]
		 */
		public function get g() : uint {
			return _g;
		}

		/**
		 * 设置rgb对象的绿色颜色值
		 * 
		 * @param	value	[uint]
		 */
		public function set g(value : uint) : void {
			_g = value;
		}

		/**
		 * 返回该rgb对象的蓝色颜色值
		 * 
		 * @return	b	[uint]
		 */
		public function get b() : uint {
			return _b;
		}

		/**
		 * 设置rgb对象的蓝色颜色值
		 * 
		 * @param	value	[uint]
		 */
		public function set b(value : uint) : void {
			_b = value;
		}
		
		/**
		 * 以 "RGB R:XXX G:XXX B:XXX" 的格式返回该rgb对象信息
		 * 
		 * @return String
		 */
		public function toString() : String {
			return "RGB" + " R:" + r + " G:" + g + " B:" + b;
		}
		
		/**
		 * 返回rgb对象的颜色值
		 * 
		 * @return toDec [uint]
		 */
		public function toDec() : uint {
			return r << 16 | g << 8 | b;
		}

		/**
		 * 根据颜色值得到RGB对象
		 * 
		 * @param	value	[uint]
		 */
		public function fromDec(value : uint) : void {
			r = value >> 16;
			g = value >> 8 & 0xff;
			b = value & 0xff;
		}
		
		/**
		 * 返回RGB对象的十六进制代码
		 * 
		 * @return	toHex	[String]
		 */
		public function toHex() : String {
			var n : uint = b;
			n += g << 8;
			n += r << 16;
			return DecToHex(n);
		}
		
		/**
		 * 从一个表示颜色十六进制代码的字符串转换得到RGB对象
		 * 
		 * @param	hex	[String]
		 */
		public function FromHex(hex : String) : void {
			hex = hex.toUpperCase();
			if(hex.charAt(0) == "#") {
				hex = hex.substring(1, hex.length);
			}
			r = parseInt(hex.substring(0, 2), 16);
			g = parseInt(hex.substring(2, 4), 16);
			b = parseInt(hex.substring(4, 6), 16);
			if(isNaN(r)) {
				r = 0;
			}
			if(isNaN(g)) {
				g = 0;
			}
			if(isNaN(b)) {
				b = 0;
			}
		}
		
		/**
		 * 从一个颜色值得到该颜色的十六进制代码
		 * 
		 * @param	dec	[uint]	颜色值
		 * @return	DecToHex	[String]	颜色的十六进制代码
		 */
		public static function DecToHex(dec:uint):String {
			var i : int = 0;
			var j : int = 20;
			var str:String = "";
			while ( j >= 0) {
				i = (dec >> j) % 16;
				if (i >= 10) {
					switch(i) {
						case 10:
							str += 'A';
							break;
						case 11:
							str += 'B';
							break;
						case 12:
							str += 'C';
							break;
						case 13:
							str += 'D';
							break;
						case 14:
							str += 'E';
							break;
						case 15:
							str += 'F';
							break;
						default:
							break;
					}
				} else {
					str += i;
				}
				j -= 4;
			}
			return str;
		}
		
		//public static function MIN(...arg) : Number {
			//var min:Number = 255;
			//var len:uint = arg.length;
			//for(var i:int = 0; i < len; i++) {
				//if(arg[i] < min) {
					//min = arg[i];
				//}
			//}
			//return min;
		//}
//
		//public static function MAX(...arg) : Number {
			//var max:Number = 0;
			//var len:uint = arg.length;
			//for(var i:int = 0; i < len; i++) {
				//if(arg[i] > max) {
					//max = arg[i];
				//}
			//}
			//return max;
		//}
	}

}