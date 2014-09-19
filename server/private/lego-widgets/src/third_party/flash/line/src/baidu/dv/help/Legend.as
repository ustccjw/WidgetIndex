package baidu.dv.help {
	
	import flash.display.Graphics;
	import flash.display.Sprite;
	import flash.events.MouseEvent;
	import flash.text.TextField;
	import flash.text.TextFormat;
	
	import baidu.dv.events.ItemEvent;
	import baidu.dv.core.DVBase;
	
	/**
	 * Legend中的单元item响应鼠标over事件
	 */
	[Event(name = "item_over", type = "baidu.dv.events.ItemEvent")]
	
	/**
	 * Legend中的单元item响应鼠标out事件
	 */
	[Event(name = "item_out", type = "baidu.dv.events.ItemEvent")]
	
	/**
	 * Legend中的单元item响应鼠标click事件
	 */
	[Event(name = "item_click", type = "baidu.dv.events.ItemEvent")]
	
	/**
	 * 边框，设置是否有边框
	 */
	[Style(name = "border", type = "Boolean")]
	
	/**
	 * 边框颜色，设置边框颜色
	 */
	[Style(name = "borderColor", type = "int")]
	
	/**
	 * 背景，设置是否有背景色
	 */
	[Style(name = "background", type = "Boolean")]
	
	/**
	 * 背景颜色，设置背景颜色
	 */
	[Style(name = "backgroundColor", type = "int")]
	
	/**
	 * 标签文字样式
	 */
	[Style(name = "labelTextFormat", type = "flash.text.TextFormat")]
	
	/**
	 * Legend排列方向
	 */
	[Style(name = "direction", type = "String")]
	
	/**
	 * Legend各个item之间的水平间隔
	 */
	[Style(name = "itemHorizontalGap", type = "Number")]
	
	/**
	 * Legend各个item之间的竖直间隔
	 */
	[Style(name = "itemVerticalGap", type = "Number")]
	
	/**
	 * Legend的左右距离，即第一个item与左边框 / 最后一个item与右边框的距离
	 */
	[Style(name = "xPadding", type = "Number")]
	
	/**
	 * Legend的上下距离，即item与上下边框的距离
	 */
	[Style(name = "yPadding", type = "Number")]
	
	/**
	 * Legend/图标符号/图例
	 * <li>属于图表库的辅助类help，表示图表中的各个部分分别表示什么指标</li>
	 * <li>支持鼠标over/out/click等事件，dispatch出来的事件主要包含当前item的index</li>
	 * @version	2009.05.08	
	 * @TODO	ToolTips：当限制了宽度的时候，如果标签文字过多，这个版本没有进行裁剪，下个版本中进行裁剪，引入Tips显示完整标签文字
	 * @TODO	icon可以用renderer来扩展
	 * @author	yang_dong
	 */
	public class Legend extends DVBase {
		
		/**
		 * Legend背景引用
		 */
		protected var _bg:Sprite;
		
		/**
		 * Legend中的各个item的引用数组
		 */
		protected var _items:Array;
		
		/**
		 * 使用者是否定义了width，不同于isvalidate(size)
		 */
		protected var _hasSetWidth:Boolean = false;
		
		/**
		 * 使用者是否定义了height，不同于isvalidate(size)
		 */
		protected var _hasSetHeight:Boolean = false;
		
		/**
		 * @private
		 * Legend样式
		 */
		private const DEFAULT_STYLES: Object = { border:false,
												 borderColor:0xD7DDEA,
												 background:false,
												 backgroundColor:0xF4F5F7,
												 labelTextFormat:null,
												 direction:LegendDirection.HORIZONTAL,
												 itemHorizontalGap:10, 
												 itemVerticalGap:0,	
												 xPadding:5,
												 yPadding:0
											   };
		
		/**
		 * 构造函数。
		 */
		public function Legend() {
			super();
		}
		
		/**
		 * @private
		 * 覆写了这个方法，获取宽高值的时候，强制更新数据
		 */
		override public function get width():Number {
			validateAll();
			return _width;
		}
		
		/**
		 * @private
		 * 覆写了这个方法，更新_hasSetWidth
		 */
		override public function set width(value:Number):void {
			this._hasSetWidth = true;
			super.width = value;
		}
		
		/**
		 * 覆写了这个方法，获取宽高值的时候，强制更新数据
		 */
		override public function get height():Number {
			validateAll();
			return _height;
		}
		
		/**
		 * 覆写了这个方法，更新_hasSetHeight
		 */
		override public function set height(value:Number):void {
			this._hasSetHeight = true;
			super.height = value;
		}
		
		/**
		 * 设置数据，覆写这个方法主要是为了注释数据data的格式
		 * 可以设置形如[{}, {}, {}, {}]的数据，这个数据能绘制出Legend但是意义不大<br>
		 * <li>icon图标，可以是 LegendIconType.LINE(细线) LegendIconType.BLOCK(色块) LegendIconType.NONE(空) ，也可以是一个自定义的Sprite对象</li>
		 * <li>label标签文字</li>
		 * <li>color标签文字颜色,以及非自定义的图标颜色</li>
		 * <br>如果出现错误没有设置，或者是写错了索引值(如 label写成了lbl)，会采用默认值<br>
		 * <li>icon默认为LegendIconType.BLOCK(色块)</li>
		 * <li>label默认为Legend0，Legend1，Legend2...</li>
		 * <li>color默认为0x000000</li>
		 * @param	value	<Array>数据为一个数组，每个数组元素是一个对象，对象属性包括 { icon:s, label:"标签文字2", color:0xFF0000 };
		 */
		override public function set data(value:*):void {
			if (!(value is Array)) {
				return;
			}
			super.data = value;
		}
		
		/**
		 * 获取Legend中的item数量
		 */
		public function get numItems():uint {
			validateAll();
			return this._items ? (this._items.length) : 0;
		}
		
		/**
		 * 提供对外的用于获取item的索引，交由用户自己设置各个item的buttonMode等属性
		 */
		public function getItemAt(i:uint):Sprite {
			validateAll();
			if (_items) {
				return _items[i];
			} else {
				return null;
			}
		}
		
		/**
		 * @private
		 * 初始化样式，覆写此方法来制定各自默认的样式
		 */
		override protected function initStyle():void {
			this._styles = this.DEFAULT_STYLES;
		}
		
		/**
		 * @private
		 * 应用改变，覆写此方法来让属性更改真正生效
		 */
		override protected function applyChanges():void {
			if (this._data == null) {
				return;																			//没有设置数据的时候，操作样式和大小没有什么意义，只是保存设置，在设置数据之后统一重绘
			}
			
			if (isInvalidOnly(INVALID_TYPE_SIZE)) {
				applySizeChange();																//可能需要将item重排
			} else {
				initInterface();																//大小 样式 数据变化组合，不再依次判断列举，直接重绘了
			}
		}
		
		/**
		 * 应用尺寸大小变化，将item重排，水平排列的时候用户设置的width有效height无效，竖直排列的时候用户设置的height有效width无效
		 */
		protected function applySizeChange():void {
			//获取设置好的样式
			var direction:String = this._styles["direction"];
			var itemHorGap:int = this._styles["itemHorizontalGap"];
			var itemVerGap:int = this._styles["itemVerticalGap"];
			var xPadding:Number = this._styles["xPadding"];
			var yPadding:Number = this._styles["yPadding"];
			var size:Object = { w:0, h:0 };
			
			if (!this._hasSetHeight) {
				this._height = -1;																//如果没有设置高度，在往下排的时候，需要获取到最高的item高度
			}
			if (!this._hasSetWidth) {
				this._width = -1;																//如果没有设置宽度，在往右排的时候，需要获取到最宽的item宽度
			}
			
			//第一个item
			var firstItem:Sprite = this._items[0];
			firstItem.x = xPadding;
			firstItem.y = yPadding;
			
			for (var i:int = 1, len:int = this._items.length; i < len; i++) {
				var curItem:Sprite = this._items[i];
				var lastItem:Sprite = this._items[i - 1];
				
				size["w"] = Math.max(size["w"], lastItem.x + lastItem.width);
				size["h"] = Math.max(size["h"], lastItem.y + lastItem.height);
				
				if (direction == LegendDirection.VERTICAL) {
					curItem.y = lastItem.y + lastItem.height + itemVerGap;
					curItem.x = lastItem.x;
					if (this._hasSetHeight) {													//竖排，如果设置了高度，高度优先，超过高度则自动往右排
						if (curItem.y + curItem.height > this._height) {
							curItem.y = yPadding;
							curItem.x = size["w"] + itemHorGap;
						}
                        this._width = curItem.x + curItem.width + xPadding;
					} else {																	//否则，直接竖排
						this._width = Math.max(this._width, curItem.width, lastItem.width) + 2 * xPadding;
						this._height = curItem.y + curItem.height + yPadding;
					}
				} else {
					curItem.x = lastItem.x + lastItem.width + itemHorGap;
					curItem.y = lastItem.y;
					if (this._hasSetWidth) {													//横排，如果设置了宽度，宽度优先，超过宽度则自动往下排
						if (curItem.x + curItem.width > this._width) {
							curItem.x = xPadding;
							curItem.y = size["h"] + itemVerGap;
						}
                        this._height = curItem.y + curItem.height + yPadding;
					} else {																	//否则，直接横排
						this._width = curItem.x + curItem.width + xPadding;
						this._height = Math.max(this._height, curItem.height, lastItem.height) + 2 * yPadding;
					}
				}
			}
			
			//设置背景大小
			if (this._bg) {
				this._bg.width = this._width;
				this._bg.height = this._height;
			}
		}
		
		/**
		 * 初始化界面，绘制界面元素
		 */
		protected function initInterface():void {
			//清除背景
			if (this._bg) {
				this.removeChild(this._bg);
			}
			
			//清除items
			if (this._items) {
				for (var k:int = 0, itemLen:int = _items.length; k < itemLen; k++) {
					this.removeChild(_items[k]);
				}
			}
			
			//初始化_items
			this._items = [];
			
			//获取样式
			var direction:String = this._styles["direction"];
			var itemHorGap:int = this._styles["itemHorizontalGap"];
			var itemVerGap:int = this._styles["itemVerticalGap"];
			
			var xPadding:Number = this._styles["xPadding"];
			var yPadding:Number = this._styles["yPadding"];
			
			//绘制添加items
			for (var i:int = 0, len:int = this._data.length; i < len; i++ ) {
				var dataObj:Object = this._data[i];
				var icon:* = dataObj.icon || LegendIconType.BLOCK;								//图标类型，如果用户没有设置，默认用block色块
				var label:String = dataObj.label || ("Legend" + i);								//标签文字，如果用户没有设置，默认Legend0....
				var color:int = dataObj.color || 0x000000;										//图标以及标签文字颜色，如果用户没有设置，默认0x000000
				
				var item:Sprite = drawItem(icon, label, color);
				this._items.push(item);
				this.addChild(item);
				
				item.addEventListener(MouseEvent.ROLL_OVER, doItemEvent);
				item.addEventListener(MouseEvent.ROLL_OUT, doItemEvent);
				item.addEventListener(MouseEvent.CLICK, doItemEvent);
			}
			
			//绘制整个Legend的背景
			var border:Boolean = this._styles["border"];
			var background:Boolean = this._styles["background"];
			if (border || background) {
				this._bg = new Sprite();
				this.addChildAt(this._bg, 0);
				
				var gp:Graphics = this._bg.graphics;
				if (border) {
					gp.lineStyle(0, this._styles["borderColor"]);
				}
				if (background) {
					gp.beginFill(this._styles["backgroundColor"]);
				}
				gp.drawRect(0, 0, this._width, this._height);
				gp.endFill();
			}
			
			//initInterface里面不对items进行排列，也不再判断有没有设置宽高，不管有没有设置宽高，都在applySizeChange中进行排列
			applySizeChange();
		}
		
		/**
		 * 每个item的事件监听
		 */
		protected function doItemEvent(evt:MouseEvent):void {
			var itm:Sprite = evt.currentTarget as Sprite;
			var index:int = itm.parent.getChildIndex(itm);
			if (this._bg) {
				index -= 1;																		//如果设置了背景的话，getChildAt(0)因该是legend的背景
			}
			
			var e:ItemEvent;
			switch(evt.type) {
				case MouseEvent.ROLL_OVER:
					e = new ItemEvent(ItemEvent.ITEM_OVER);
					break;
				case MouseEvent.ROLL_OUT:
					e = new ItemEvent(ItemEvent.ITEM_OUT);
					break;
				default :
					e = new ItemEvent(ItemEvent.ITEM_CLICK);
					break;
			}
			e.index = index;
			dispatchEvent(e);
		}
		
		/**
		 * @private
		 * 绘制Legend的每一个item<br>
		 * 这个方法改成了protected，需要的话可以重写这个方法，重新定义item
		 */
		protected function drawItem(icn:*, label: String, color: int):Sprite {
			var item:Sprite = new Sprite();
			
			//标签
			var lb:TextField = new TextField();
			lb.textColor = color;
			lb.autoSize = "left";
			lb.selectable = false;
			lb.text = label;
			item.addChild(lb);
			lb.mouseEnabled = false;
			//设置标签文字的样式
			var labelTextFormat:TextFormat = this._styles["labelTextFormat"];
			if (labelTextFormat) {
				lb.setTextFormat(labelTextFormat);
			}
			
			//图标
			var icon:Sprite;
			var gp:Graphics;
			if (icn is Sprite) {
				icon = icn;
			} else if (icn == LegendIconType.LINE) {
				icon = new Sprite();
				gp = icon.graphics;
				gp.lineStyle(2, color, 1.0, false, "normal", "none");
				gp.moveTo(0, 1);
				gp.lineTo(25, 1);
			} else if (icn == LegendIconType.BLOCK) {
				icon = new Sprite();
				gp = icon.graphics;
				gp.lineStyle(0, 0xD7DDEA);
				var iw:Number = lb.textHeight - 5;
				var ih:Number = lb.textHeight - 5;
				gp.beginFill(color);
				gp.drawRect( 0, 0, iw, ih);
				gp.endFill();
			} else {
				//icon = new Sprite();															//存在LegendIconType.NONE，不需要创建sprite对象
			}
			if (icon) {
				item.addChild(icon);
				icon.mouseEnabled = false;
			}
			
			//确定图标 / 标签 / 背景的竖直居中位置
			var h:Number = (icon) ? (Math.max(lb.height, icon.height)) : (lb.height);
			if (icn == LegendIconType.BLOCK) {
				icon.scaleX = icon.scaleY = 0.6 * h / icon.height;								//如果是用户传进来的icon，不应该修改大小，如果是绘制的block才需要修改大小，以便与文字统一，保持前面的icon高度是文字高度的60%
			}
			if (icon) {
				icon.y = (h - icon.height) / 2;
				lb.x = icon.width + 3;																//lb与icon之间间隔3
			}
			lb.y = (h - lb.height) / 2;
			
			//添加了一个透明的背景，响应鼠标的over/out/click事件
			var bggp:Graphics = item.graphics;
			bggp.clear();
			bggp.beginFill(color, 0);
			bggp.drawRect(0, 0, lb.x + lb.width, h);											//整个item的背景保留前后均有一点距离5
			bggp.endFill();
			
			return item;
		}
		
	}
}