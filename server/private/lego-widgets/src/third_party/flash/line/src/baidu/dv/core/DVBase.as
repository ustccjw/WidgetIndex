package baidu.dv.core {

	import flash.display.Sprite;
	import flash.events.Event;

	/**
	 *  DV库基础类，所有有显示的类都需继承此类。<br/>
	 *	主要封装了多次属性变更，将属性变更的真实操作做了延迟，防止多次变更导致多次重绘，从而浪费资源
	 *  @author xiaokun
	 */
	public class DVBase extends Sprite {
		
		/**
		 *	@private
		 *	宽高失效
		 */
		protected static const INVALID_TYPE_SIZE:String = "size";
		
		/**
		 *	@private
		 *	样式失效
		 */
		protected static const INVALID_TYPE_STYLE:String = "style";
		
		/**
		 *	@private
		 *	数据失效
		 */
		protected static const INVALID_TYPE_DATA:String = "data";
		
		/**
		 *	@private
		 *	宽度
		 */
		protected var _width:Number = 1;
		
		/**
		 *	@private
		 *	高度
		 */
		protected var _height:Number = 1;
		
		/**
		 *	@private
		 *	当前数据
		 */
		protected var _data:*;
		
		/**
		 *	@private
		 *	当前样式，子类可随意扩展
		 */
		protected var _styles:Object = {};
		
		/**
		 *	@private
		 *	标记当前属性是否失效
		 */
		protected var _invalid:Boolean = false;
		
		/**
		 *	@private
		 *	记录哪些属性失效
		 */
		protected var _invalidHash:Object = {};
		
		/**
		 *	@private
		 *	标记当前是否正在监听Render或者AddedToStage事件
		 */
		protected var _listeningForRender:Boolean = false;
		
		/**
		 *	构造函数，子类需super调用
		 */
		public function DVBase() {
			initStyle();
		}
		
		/**
		 *  @private
		 */		
		override public function get width():Number {
			return _width;
		}

		/**
		 *  @private
		 */
		override public function set width(value:Number):void {
			if (isNaN(value) || _width == value) {
				return;
			}
			
			_width = value;
			invalidate(INVALID_TYPE_SIZE);
		}

		/**
		 *  @private
		 */
		override public function get height():Number {
			return _height;
		}
		
		/**
		 *  @private
		 */
		override public function set height(value:Number):void {
			if (isNaN(value) || _height == value) {
				return;
			}
			
			_height = value;
			invalidate(INVALID_TYPE_SIZE);
		}
		
		/**
		 *	获取/设置数据
		 */
		public function get data():* {
			return _data;
		}
		
		public function set data(value:*):void {
			_data = value;
			invalidate(INVALID_TYPE_DATA);
		}
		
		/**
		 *	获取某个样式值
		 *	@param	key		<String>样式类型
		 *	@return			指定样式类型的样式值
		 */
		public function getStyle(key:String):* {
			return _styles[key];
		}
		
		/**
		 *	设置某个样式值
		 *	@param	key		<String>样式类型
		 *	@param	value	样式值			
		 */
		public function setStyle(key:String, value:*):void {
			if (_styles[key] == value) {
				return;
			}
			
			_styles[key] = value;
			invalidate(INVALID_TYPE_STYLE);
		}
		
		/**
		 * 一次性设置多个样式
		 * @param	stylesObj	<Object>样式对象，如果为null则恢复默认样式
		 */
		public function setStyles(stylesObj:Object):void {
			if (stylesObj == null) {
				initStyle();
				invalidate(INVALID_TYPE_STYLE);
			} else {
				for (var key:String in stylesObj) {
					setStyle(key, stylesObj[key]);
				}
			}
		}
		
		/**
		 *	立刻失效，应用改变
		 */
		public function validateNow():void {
			validateAll();
		}
		
		/**
		 *	@private
		 *	初始化样式，子类可覆写此方法来制定各自默认的样式
		 */
		protected function initStyle():void {
			
		}
		
		/**
		 *	@private
		 *	立刻失效，应用改变<br/>
		 *	既做侦听器，也可以直接调用
		 */
		public function validateAll(evt:Event = null):void {	
			if (_listeningForRender) {
				try {
					//9.0.159及以下版本的player有bug：任意一个针对stage RENDER事件的remove操作都会导致所有此事件的侦听器都被删除注册，所以这里注释掉此remove操作
					//stage.removeEventListener(Event.RENDER, validateAll);
				} catch (e:Error) {
					
				}
				_listeningForRender = false;
			}
			
			if (_invalid) {
				applyChanges();
				resetInvalidHash();
			}
		}
		
		/**
		 *	@private
		 *	应用改变，子类需要覆写此方法来让属性更改真正生效
		 */
		protected function applyChanges():void {
			
		}
		
		/**
		 *	@private
		 *	重置某个属性的失效状态，如果不指定属性，则让所有属性失效
		 *	@param	type		<String>失效类型
		 */
		protected function resetInvalidHash(type:String = null):void {
			if (type == null) {
				_invalid = false;

				for (var type:String in _invalidHash) {
					_invalidHash[type] = false;
				}
			} else {
				_invalidHash[type] = false;
				
				var isAllValid:Boolean = true;
				for (var key:String in _invalidHash) {
					if (_invalidHash[key] == true) {
						isAllValid = false;
						break;
					}
				}
				if (isAllValid) {
					_invalid = false;
				}
			}
		}
		
		/**
		 *	@private
		 *	判断某个属性是否失效，特殊的是width和height统一为size
		 *	@param	type		<String>失效类型
		 *	@return				<Boolean>
		 */
		protected function isInvalid(type:String):Boolean {
			if (_invalidHash[type] == true) {
				return true;
			} else {
				return false;
			}
		}
		
		/**
		 *	@private
		 *	判断是否仅仅某个属性失效
		 *	@param	type		<String>失效类型
		 *	@return				<Boolean>
		 */
		protected function isInvalidOnly(type:String):Boolean {
			if (_invalidHash[type] == true) {
				for (var key:String in _invalidHash) {
					if (key == type) {
						continue;
					}
					if (_invalidHash[key] == true) {
						return false;
					}
				}
				return true;
			} else {
				return false;
			}
		}
		
		/**
		 *	@private
		 *	让某个属性失效
		 *	@param	type		<String>失效类型
		 */
		protected function invalidate(type:String):void {
			_invalidHash[type] = true;
			_invalid = true;
			
			if (_listeningForRender) {
				return;
			}
			if (stage) {
				stage.addEventListener(Event.RENDER, validateAll);
				stage.invalidate();
			} else {
				this.addEventListener(Event.ADDED_TO_STAGE, doAddedToStage);
			}	
			_listeningForRender = true;
		}
		
		/**
		 *	添加到舞台事件的侦听函数
		 */
		private function doAddedToStage(evt:Event):void {
			this.removeEventListener(Event.ADDED_TO_STAGE, doAddedToStage);
			if (_invalid) {
				stage.addEventListener(Event.RENDER, validateAll);
				stage.invalidate();
			}
		}
		
	}

}