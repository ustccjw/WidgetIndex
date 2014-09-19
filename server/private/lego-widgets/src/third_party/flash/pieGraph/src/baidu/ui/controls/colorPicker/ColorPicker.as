package  baidu.ui.controls.colorPicker {
	import baidu.ui.controls.Button;
	import baidu.ui.core.BUI;
	import baidu.ui.core.Invalidation;
	import baidu.ui.events.ColorPickerEvent;

	import flash.display.DisplayObject;
	import flash.display.Graphics;
	import flash.display.MovieClip;
	import flash.display.Shape;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	import flash.events.MouseEvent;
	import flash.geom.ColorTransform;
	import flash.geom.Point;
	import flash.text.TextField;
	import flash.text.TextFieldAutoSize;
	import flash.text.TextFieldType;
	import flash.text.TextFormat;
	
	/**
	 * 颜色改变时派发
	 */
	[Event(name="change", type="baidu.ui.events.ColorPickerEvent")]

	/**
	 * 调色板打开时派发
	 */
	[Event(name="open", type="baidu.ui.events.ColorPickerEvent")]

	/**
	 * 调色板关闭时派发
	 */
	[Event(name="close", type="baidu.ui.events.ColorPickerEvent")]

	/**
	 * 鼠标经过某一个色块时派发
	 */
	[Event(name="itemRollOver", type="baidu.ui.events.ColorPickerEvent")]
	
	/**
	 * 鼠标离开某一色块时派发
	 */
	[Event(name = "itemRollOut", type = "baidu.ui.events.ColorPickerEvent")]
	
	/**
	 * 皮肤
	 */	
	[Style(name = "skin", type = "Class")]
	
	/**
	 * 输入框字体
	 */
	[Style(name = "textFieldFont", type = "String")]
	
	/**
	 * 输入框字体大小
	 */
	[Style(name = "textFieldFontSize", type = "uint")]
	
	/**
	 * 输入框字体颜色
	 */
	[Style(name = "textFieldFontColor", type = "uint")]
	
	/**
	 * 输入框边框颜色
	 */
	[Style(name = "textFieldBorderColor", type = "uint")]
	
	/**
	 * 结果区边框颜色
	 */
	[Style(name = "shapeBoxBorderColor", type = "uint")]
	
	/**
	 * 结果区边框颜色
	 */
	[Style(name = "shapeBoxBorderAlpha", type = "Number")]
	
	/**
	 * 结果区宽度
	 */
	[Style(name = "shapeBoxWidth", type = "Number")]
	
	/**
	 * ColorPicker是一个颜色选择控件。
	 * 提供颜色池的选择方式。
	 * @version Sep 13, 2010
	 * @author  zhanzhihu@baidu.com chengzhixing@baidu.com
	 */
	public class ColorPicker extends BUI
	{
		public static var defaultStyles:Object = { skin:"ColorPicker_Skin", itemSkin:"ColorPickerItem_Skin", textFieldFont:"Verdana", textFieldFontSize:12, textFieldFontColor:0x000000, textFieldBorderColor:0x00CCFF,
			shapeBoxBorderColor:0x666666, shapeBoxBorderAlpha:0.5, shapeBoxWidth:50};
		/**
		 * 颜色池中默认颜色
		 */
		protected var colorsDefault:Array;
		
		/**
		 * @private
		 * 颜色池中，颜色的列数，默认为18
		 */
		protected var _colCount : uint = 18;
		
		/**
		 * @private
		 * 表示颜色池中的所有颜色，如果用户不定义，其值为colorsDefault
		 */
		protected var _colors : Array = null;
		
		/**
		 * @private
		 * 表示选择颜色的面板是否打开，默认未打开
		 */
		protected var _paletteOpen : Boolean = false;
		
		/**
		 * @private
		 * 表示选择颜色的面板的横坐标
		 */
		protected var _paletteX : int = 0;
		/**
		 * @private
		 * 表示选择颜色的面板的纵坐标
		 */
		protected var _paletteY : int = 0; 
		
		/**
		 * @private
		 * 表示显示颜色十六进制值的文本框是否可编辑，默认为可编辑
		 */
		protected var _editable : Boolean = true;
		
		/**
		 * @private
		 * 表示显示颜色十六进制值的文本框是否可见，默认为可见
		 */
		protected var _textVisible : Boolean = true;
		
		/**
		 * @private
		 * 表示颜色的十六进制值，其值即为_selectedColor的值，不过是字符串的格式
		 */
		protected var _hexValue : String = "FF0000";
		
		/**
		 * @private
		 * 选择的颜色值，其值即为的值，不过用16进制来表示
		 */
		protected var _selectedColor : uint = 0xFF0000;
		
		/**
		 * @private
		 * 当前选择的颜色值，默认为黑色
		 */
		protected var currRGB:RGB = new RGB(255, 0, 0);
		
		/**
		 * @private
		 * 主选择器按钮的引用
		 */
		protected var swatch:Sprite;
		
		/**
		 * @private
		 * 主选择器按钮的边框的引用
		 */
		protected var swatchBtn:Button;
		
		/**
		 * @private
		 * 调色板的背景
		 */
		protected var background:MovieClip;
		
		/**
		 * @private
		 * colorpicker颜色文本输入区域
		 */
		private var _textField:TextField;
		
		/**
		 * @private
		 * tBorder颜色文本输入区域的边框
		 */
		private var tBorder:Shape;
		
		/**
		 * @private
		 * 当前浏览color的样例，即表示颜色十六进制值的文本框的左侧的颜色狂
		 */
		protected var shapeDisplay:Sprite;
		
		/**
		 * @private
		 * COLOR池调板的引用
		 */
		protected var colorPool:Sprite;
		
		/**
		 * @private 
		 * 用于标识哪个颜色块被选中　
		 */
		protected var shapeBox : Shape;
		
		/**
		 * @private
		 * 调色板的引用
		 */
		protected var palette : Sprite;
		
		/**
		 * @private
		 * 是否实时改变ColorPicker的选择值
		 */
		protected var _liveChange:Boolean = false;
		
		// shapeBox的样式
		/**
		 * @private
		 * 结果区的边框颜色
		 */
		private var shapeBoxBorderColor:uint;
		/**
		 * @private
		 * 结果区的边框颜色的透明度
		 */
		private var shapeBoxBorderAlpha:Number;
		/**
		 * @private
		 * 结果区的宽度
		 */
		private var shapeBoxWidth:Number;
		/**
		 * @private
		 * 结果区的高度
		 */
		private var shapeBoxHeight:Number;
		
		// textfield的样式
		/**
		 * @private
		 * 文本区的字体
		 */
		private var textFieldFont:String;
		/**
		 * @private
		 * 文本区的字号
		 */
		private var textFieldFontSize:uint;
		/**
		 * @private
		 * 文本区的文字颜色
		 */
		private var textFieldFontColor:uint;
		/**
		 * @private
		 * 文本区的边框颜色
		 */
		private var textFieldBorderColor:uint;
		
		/**
		 * 获取颜色池的列数
		 * 列数只有在第一次打开COLOR池调色板之前设置有效。
		 * 
		 * @return	colCount	[uint]返回当前ColorPicker颜色选择池中每一行有多少可选颜色
		 */
		public function get colCount() : uint {
			return _colCount;
		}
		
		/**
		 * 设置颜色池的列数
		 * 
		 * @param colCount	[uint]设置ColorPicker颜色选择池中每一行有多少可选颜色
		 */
		public function set colCount(value : uint) : void {
			//只在color池创建前设置有效
			if(!colorPool) {
				_colCount = value;
			}
		}
		
		/**
		 * 获取颜色池所有的颜色值
		 * 
		 * @return	colors	[Array]返回当前ColorPicker颜色选择池中所有颜色组成的数组
		 */
		public function get colors() : Array {
			return  _colors;
		}
		
		/**
		 * 设置颜色池所有的颜色值
		 * 
		 * @param	colors	[Array]设置ColorPicker颜色选择池中的颜色数组
		 */
		public function set colors(value : Array) : void {
			//只在color池创建前设置有效
			if(!colorPool) {
				_colors = value;
			}
		}
		
		/**
		 * 获取当前选中颜色值的十六进制字符串
		 * 
		 * @return	hexValue	[String]当前选中颜色的十六进行字符串
		 */
		public function get hexValue() : String {
			var rgb_ : RGB = new RGB();
			rgb_.fromDec(selectedColor);
			_hexValue = rgb_.toHex();
			return _hexValue;
		}
		
		/**
		 * 获得是否打开调色板
		 * 
		 * @return	paletteOpen	[Boolean]是否已打开调色板
		 */
		private function get paletteOpen() : Boolean {
			return _paletteOpen;
		}

		/**
		 * 是否打开调色板
		 * 
		 * @param	paletteOpen	[Boolean]是否要打开调色板
		 */
		private function set paletteOpen(value : Boolean) : void {
			if(_paletteOpen == value) {
				return;
			}
			if(value) {
				open();
				dispatchEvent(new ColorPickerEvent(ColorPickerEvent.OPEN, selectedColor));
			}else {
				close();
				dispatchEvent(new ColorPickerEvent(ColorPickerEvent.CLOSE, selectedColor)); 
			}
		}
		
		/**
		 * 获得文本区域是否可被编辑
		 * 
		 * @return	editable	[Boolean]得到文本区是否可以被编辑
		 */
		public function get editable() : Boolean {
			return _editable;
		}
		
		/**
		 * 设置文本区域是否可被编辑
		 * 
		 * @param	editable	[Boolean]设置文本区是否可以被编辑
		 */
		public function set editable(value : Boolean) : void {
			if(_editable == value) {
				return;
			}			
			_editable = value;
			if(textField) {
				textField.type = (value) ? TextFieldType.INPUT : TextFieldType.DYNAMIC;
			}
		}
		
		/**
		 * 获得是否显示文本区域
		 * 
		 * @return	textVisible	[Boolean]得到文本区是否可见
		 */
		public function get textVisible() : Boolean {
			return _textVisible
		}
		
		/**
		 * 设置是否显示文本区域
		 * 
		 * @param	textVisible	[Boolean]设置文本区是否可见
		 */
		public function set textVisible(value : Boolean) : void {
			if(_textVisible == value) {
				return;
			}
			_textVisible = value;
			if(textField && palette) {
				if (value && !palette.contains(textField)) {
					palette.addChild(tBorder);
					palette.addChild(textField);
				} else if (!value && palette.contains(textField)) {
					palette.removeChild(tBorder);
					palette.removeChild(textField);
				}
			}
		}
		
		/**
		 * 获得当前选中颜色值
		 * 
		 * @param	selectedColor	[uint]获得当前选择颜色的颜色值
		 */
		public function get selectedColor() : uint {
			return _selectedColor;
		}
		
		/**
		 * 设置当前选中颜色值
		 * 
		 * @return	selectedColor	[uint]设置当前选择颜色的颜色值
		 */
		public function set selectedColor(value : uint) : void {
			_selectedColor = value;
			// 选择按钮、结果区域、文字输入框立即显示所设置的颜色值
			refreshSwatchColor();
			refreshShapeDisplay();
			_textField.text = "#" + RGB.DecToHex(_selectedColor);
		}
		
		/**
		 * 获得文字输入框的引用，以使进行用户自定义设置
		 * 
		 * @return	textField	[TextField]获得当前文本输入框的引用
		 */
		public function get textField():TextField {
			return _textField;
		}
		
		/**
		 * 得到当前ColorPicker实时改变的状态，即得到ColorPicker所选的颜色值是否实时改变
		 * 
		 * @return	liveChange	[Boolean]得到当前ColorPicker的颜色值是否实时改变
		 */
		public function get liveChange():Boolean {
			return _liveChange;
		}
		
		/**
		 * 设置当前ColorPicker实时改变的状态，即设置ColorPicker所选的颜色值是否实时改变
		 * 
		 * @param	liveChange	[Boolean]设置当前ColorPicker的颜色值是否实时改变
		 */
		public function set liveChange(value:Boolean):void {
			_liveChange = value;
		}
		
		/**
		 * 构造函数
		 */
		public function ColorPicker() 
		{
			super();
		}
		
		/**
		 * 打开颜色选择面板。
		 * 供外部调用。
		 */
		public function open():void {
			if (!paletteOpen) {
				openPalette();
			}
		}
		
		/**
		 * 关闭颜色选择面板。
		 */
		public function close():void {
			if (stage) {
				if(paletteOpen && palette && stage.contains(palette)) {
					stage.removeChild(palette);
					_paletteOpen = colorPool.visible = false;
				}
			} else {
				throw new Error("ColorPicker未添加到舞台!");
			}
		}
		
		/**
		 * 打开特定类型的调板
		 */
		private function openPalette():void {
			if (!palette) {
				createPalette();
			}
			colorPool.visible = _paletteOpen = true;
			setPalettePosition(_paletteX, _paletteY);
			if (stage) {
				stage.addChild(palette);
			} else {
				throw new Error("ColorPicker未添加到舞台");
			}
			addEventListener(Event.ENTER_FRAME, addCloseListener, false, 0, true);
		}
		
		/**
		 * 创建调板
		 */
		private function createPalette() {
			palette = new Sprite();
			var skin : * = getSkinInstance(getStyleValue("skin"));
			background = skin["background"] as MovieClip;
			background.x = background.y = 0;
			palette.addChild(background);
			
			palette.tabChildren = false;
			palette.cacheAsBitmap = true;
			
			// 初始化shapeDisplay textField 
			createCommonChildren();
			palette.addChild(shapeDisplay);
			if (textVisible) {
				palette.addChild(tBorder);
				palette.addChild(textField);
			}
			
			// 初始化颜色选择池
			createColorPool();
			palette.addChild(colorPool);
			// tmpx 表示tBorder的right的坐标
			var tmpx:Number = tBorder.x + tBorder.width;
			// tmpy1 tmpy2分别表示shapeDisplay和tBorder的bottom的坐标
			var tmpy1:Number = shapeDisplay.y + shapeDisplay.height;
			var tmpy2:Number = (tBorder.y + tBorder.height);
			tmpy1 = (tmpy1 > tmpy2)?tmpy1:tmpy2;
			colorPool.x = 8;
			colorPool.y = tmpy1 + 3;	//	+3表示空出一个间隙
			background.width = ((colorPool.x + colorPool.width) > tmpx) ? (colorPool.x + colorPool.width) : tmpx;
			// 189 是最左边额外颜色的高度
			background.height = ((colorPool.y + colorPool.height) < 189)? 191 : colorPool.y + colorPool.height + 2;	//	+2 是留个空白的边
		}
		
		/**
		 * 创建颜色选择面板的公用部门
		 * 包括结果区、文本区
		 */
		private function createCommonChildren():void {
			// 获得shapeDisplay的样式
			shapeBoxBorderColor = getStyleValue("shapeBoxBorderColor");
			shapeBoxBorderAlpha = getStyleValue("shapeBoxBorderAlpha");
			shapeBoxWidth = getStyleValue("shapeBoxWidth");
			// 获得textfield的样式
			textFieldFont = getStyleValue("textFieldFont");
			textFieldFontSize = getStyleValue("textFieldFontSize");
			textFieldFontColor = getStyleValue("textFieldFontColor");
			textFieldBorderColor = getStyleValue("textFieldBorderColor");
			
			// 初始化textField
			_textField = new TextField();
			textField.autoSize = TextFieldAutoSize.LEFT;
			textField.restrict = "A-Fa-f0-9#";
			textField.maxChars = 7;
			textField.tabEnabled = true;
			textField.defaultTextFormat = new TextFormat(textFieldFont, textFieldFontSize,textFieldFontColor);
			textField.text = "#FF0000";
			textField.addEventListener(Event.CHANGE, txtChangeHandler);
			var tmpHeight:Number = Math.round(textField.height);
			tBorder = new Shape();
			var border_g:Graphics = tBorder.graphics;
			border_g.lineStyle(2, textFieldBorderColor, 0.6);
			border_g.moveTo(0, 0);
			border_g.lineTo(textField.width + 12, 0);
			border_g.lineTo(textField.width + 12, 5 + tmpHeight);// (7-5)*2 + 1 = 5
			border_g.lineTo(0, 5 + tmpHeight);
			border_g.lineTo(0, 0);
			setTextEditable();
			tBorder.x = 10 + shapeBoxWidth;
			tBorder.y = 5;
			textField.x = 12 + shapeBoxWidth;
			textField.y = 7;
			
			// 初始化shapeDisplay
			shapeDisplay = new Sprite();
			var g:Graphics = shapeDisplay.graphics;
			g.clear();
			g.lineStyle(1, shapeBoxBorderColor, shapeBoxBorderAlpha);
			g.moveTo(0,0);
			g.lineTo(0, 5 + tmpHeight);
			g.lineTo(shapeBoxWidth, 5 + tmpHeight);
			g.lineTo(shapeBoxWidth, 0);
			g.lineTo(0, 0);
			g.beginFill(selectedColor);
			g.drawRect(1, 1, shapeBoxWidth-1, 4 + tmpHeight);
			g.endFill();
			shapeDisplay.x = 5;
			shapeDisplay.y = 5;
			shapeDisplay.buttonMode = true;
			shapeBoxHeight = tmpHeight + 5;
			shapeDisplay.addEventListener(MouseEvent.CLICK, onClickShapeDisplay);
		} 
		
		/**
		 * 点击结果区，此时选择颜色，并关闭颜色选择面板
		 * 如果liveChange为true，每触发一次该事件，设置ColorPicker的selectedColor
		 * 
		 * @param	evt	[MouseEvent]点击结果去区触发的鼠标事件
		 */
		private function onClickShapeDisplay(evt:MouseEvent):void {
			closeAndSet();
		}
		
		/**
		 * 在文本区修改文字，改变当前选择的颜色，并修改结果区
		 * 
		 * @param	evt	[Event]在文本区输入文字触发的事件
		 */
		private function txtChangeHandler(evt:Event):void {
			var colorVal:String = textField.text;
			if (colorVal.indexOf("#") > -1) {
				colorVal = colorVal.replace(/^\s+|\s+$/g, "");
				colorVal = colorVal.replace(/#/g, "");
			} 
			var newColor:uint = parseInt(colorVal, 16);
			currRGB.fromDec(newColor);
			if (liveChange) {
				_selectedColor = newColor;
				dispatchEvent(new ColorPickerEvent(ColorPickerEvent.CHANGE, selectedColor));
				refreshSwatchColor(); 
			}
			refreshShapeDisplay();
		}
		
		/**
		 * 设置文本区文本框类型
		 */
		private function setTextEditable():void {
			if (!textVisible) {
				return;
			}
			textField.type = editable ? TextFieldType.INPUT : TextFieldType.DYNAMIC;
			textField.selectable = editable;
			if (editable) {
				textField.addEventListener(KeyboardEvent.KEY_DOWN, keyDownHandler);
			}
		}
		
		/**
		 * 在文本区输入文字时，根据输入的内容进行响应
		 * 包括修改文本区可输入文字长度和关闭颜色选择颜色选择面板
		 * 
		 * @param	evt	[KeyboardEvent]在输入时出发的键盘事件
		 */
		private function keyDownHandler(evt:KeyboardEvent):void {
			if (shapeBox && colorPool.contains(shapeBox)) {
				colorPool.removeChild(shapeBox);
			}
			
			textField.maxChars = (evt.keyCode == "#".charCodeAt(0) || textField.text.indexOf("#") == 0) ? 7 : 6;
			
			if (stage) {
				if (stage.focus == textField && evt.keyCode == 13) {
					closeAndSet();
				}
			} else {
				throw new Error("ColorPicker未添加到舞台!");
			}
		}
		
		/**
		 * 初始化颜色池选择面板
		 */
		private function createColorPool():void {
			colorPool = new Sprite();
			
			if (!colors) {
				if (!colorsDefault) {
					colorsDefault = new Array();
					for(var i : int = 0 ;i < 216;i++) {
						colorsDefault.push(((i / 6 % 3 << 0) + ((i / 108) << 0) * 3) * 0x33 << 16 | i % 6 * 0x33 << 8 | (i / 18 << 0) % 6 * 0x33);
					}
				}
				_colors = colorsDefault;
			}
			
			// 根据颜色绘制颜色池的内容
			var g:Graphics = colorPool.graphics;
			g.clear();
			g.lineStyle(2, 0x000000, 1, false, "normal");
			var colorItem:Button;
			var ct:ColorTransform
			for (i = 0; i < colors.length; i++ ) {
				colorItem = new Button();
				colorItem.setStyle("skin", getStyleValue("itemSkin"));
				ct = new ColorTransform();
				ct.color = colors[i];
				colorItem.transform.colorTransform = ct;
				colorItem.setSize(11, 11);
				var xpos:int = 13 * (i % colCount) + 13;
				var ypos:int = 13 * Math.floor(i / colCount);
				colorItem.setPosition(xpos, ypos);
				colorPool.addChild(colorItem);
				colorItem.addEventListener(MouseEvent.MOUSE_OVER, onOverColorItem);
				colorItem.addEventListener(MouseEvent.MOUSE_OUT, onOutColorItem);
				colorItem.addEventListener(MouseEvent.CLICK, onClickColorItem);
				g.moveTo(xpos, ypos);
				g.lineTo(xpos, ypos + 12);
				g.lineTo(xpos + 12, ypos + 12);
				g.lineTo(xpos + 12, ypos);
				g.lineTo(xpos, ypos);
			}
			// 添加额外的12种颜色，它们的颜色值分别是0x000000, 0x333333, 0x666666, 0x999999, 0xCCCCCC, 0xFFFFFF, 0xFF0000, 0x00FF00, 0x0000FF, 0xFFFF00, 0x00FFFF, 0xFF00FF
			xpos = -3;
			ypos = 0;
			var extraColors:Array = [0x000000, 0x333333, 0x666666, 0x999999, 0xCCCCCC, 0xFFFFFF, 0xFF0000, 0x00FF00, 0x0000FF, 0xFFFF00, 0x00FFFF, 0xFF00FF];
			for (i = 0; i < extraColors.length; i++ ) {
				colorItem = new Button();
				colorItem.setStyle("skin", getStyleValue("itemSkin"));
				ct = new ColorTransform();
				ct.color = extraColors[i];
				colorItem.transform.colorTransform = ct;
				colorItem.setSize(11, 11);
				colorItem.setPosition(xpos, ypos);
				colorPool.addChild(colorItem);
				colorItem.addEventListener(MouseEvent.MOUSE_OVER, onOverColorItem);
				colorItem.addEventListener(MouseEvent.MOUSE_OUT, onOutColorItem);
				colorItem.addEventListener(MouseEvent.CLICK, onClickColorItem);
				g.moveTo(xpos, ypos);
				g.lineTo(xpos, ypos + 12);
				g.lineTo(xpos + 12, ypos + 12);
				g.lineTo(xpos + 12, ypos);
				g.lineTo(xpos, ypos);
				ypos += 13;
			}
		} 
		
		/**
		 * 当鼠标滑过颜色池选择面板中备选色块时，高亮选择的色块
		 * 如果liveChange为true，每触发一次该事件，设置ColorPicker的selectedColor
		 * 
		 * @param	evt	[MouseEvent]当鼠标滑过颜色池选择面板中备选色块时触发鼠标事件
		 */
		private function onOverColorItem(evt:MouseEvent):void {
			var item:Button = evt.target as Button;
			if (!shapeBox) {
				shapeBox = new Shape();
				var g:Graphics = shapeBox.graphics;
				g.lineStyle(1, 0xffffff);
				g.moveTo( -1, -1);
				g.lineTo(12, -1);
				g.lineTo(12, 12);
				g.lineTo( -1, 12);
				g.lineTo(-1, -1);
			}
			if (!colorPool.contains(shapeBox)) {
				colorPool.addChild(shapeBox);
			}
			shapeBox.x = item.x;
			shapeBox.y = item.y;
			var rgb_ : RGB = new RGB();
			rgb_.fromDec(item.transform.colorTransform.color) ;
			setCurrRgb(rgb_.r, rgb_.g, rgb_.b);
			
			if (liveChange) {//此时派发的是选中颜色
				selectedColor = rgb_.toDec();
				dispatchEvent(new ColorPickerEvent(ColorPickerEvent.CHANGE, selectedColor));
				refreshSwatchColor();
			} else {//此时派发的并不是选中颜色，而是划过的颜色
				dispatchEvent(new ColorPickerEvent(ColorPickerEvent.ITEM_ROLL_OVER, currRGB.toDec()));
			}
		}
		
		/**
		 * 当鼠标滑出颜色池选择面板中备选色块时，取消对该色块的高亮
		 * 
		 * @param	evt	[MouseEvent]当鼠标滑过颜色池选择面板中备选色块时触发鼠标事件
		 */
		private function onOutColorItem(evt:MouseEvent):void {
			if(shapeBox && colorPool.contains(shapeBox)) {
				var item : Button = evt.target as Button;
				var rgb_ : RGB = new RGB();
				rgb_.fromDec(item.transform.colorTransform.color);
				//这里派发不是选中color，而是从哪个块滑出，派发的就是哪个块的color
				dispatchEvent(new ColorPickerEvent(ColorPickerEvent.ITEM_ROLL_OUT, rgb_.toDec()));
			}
		}
		
		/**
		 * 点击颜色池选择面板中备选色块时，选中该颜色并关闭颜色池选择面板
		 * 
		 * @param	evt	[MouseEvent]点击颜色池选择面板中备选色块时触发鼠标事件
		 */
		private function onClickColorItem(evt:MouseEvent):void {
			closeAndSet();
		}
		
		/**
		 * 设置调色板的位置
		 * 相对于POPUP BUTTON右上角的位置
		 * 该函数是保留函数,用于控制弹出的颜色选择面板在x、y方向上与ColorPick的距离
		 * 默认情况下Palette紧贴ColorPicker，出现在ColorPicker按钮的右侧
		 * 当ColorPicker出现在舞台靠右、靠下的时候，
		 * 若不改变Palette的位置，则会出现Palette看不到的情况
		 * 
		 * @param	x	[int]x方向上距离
		 * @param	y	[int]y方向上距离
		 */
		private function setPalettePosition(x:int = 0, y:int = 0):void {
			_paletteX = x;
			_paletteY = y;
			if (palette) {
				//当调色板打开的时候，调节调色板的位置
				var point:Point = swatch.localToGlobal(new Point(0, 0));
				palette.x = point.x + swatch.width + _paletteX;
				palette.y = point.y + _paletteY;	// 在计算y时，没有加上swatch.height的值，因为Palette默认和swatch的top相同
				
				//根据在舞台上的位置来判断，要对colorpicker的坐标做一个转化
				var p:Point;
				if(this.parent){
					p = new Point(this.x, this.y);
					p = this.parent.localToGlobal(p);
				} else {
					throw new Error("未添加到舞台");
				}
				//处理ColorPicker靠舞台边界的情况
				//默认情况下Palette出现在ColorPicker按钮的右下角，但是当ColorPicker出现在舞台靠右、靠下的时候，
				//若不改变Palette的位置，则会出现Palette看不到的情况
				if (stage) {
					if ((stage.stageHeight - p.y - swatch.height) < palette.height) {
						palette.y = p.y + swatch.height - palette.height + _paletteY;	//此时，Palette的bottom和swatch的bottom相同
					}
				
					if ((stage.stageWidth - p.x - swatch.width) < palette.width) {
						palette.x = p.x - palette.width + _paletteX;
					}
				} else {
					throw new Error("ColorPicker未添加到舞台");
				}
			}
		}
		
		
		/**
		 * 添加关闭事件监听
		 * 
		 * @param	evt	[Event]	
		 */
		private function addCloseListener(evt:Event) : void {
			removeEventListener(Event.ENTER_FRAME, addCloseListener);
			if (!paletteOpen) { 
				return; 
			}
			if(stage){
				stage.addEventListener(MouseEvent.MOUSE_DOWN, onStageClick, false, 0, true);
			} else {
				throw new Error("ColorPicker未添加到舞台");
			}
		}
		
		/**
		 * 处理舞台点击事件
		 * 当舞台被点击时关闭调色板
		 * 
		 * @param	evt	[Event]在舞台上其他位置单击鼠标时触发的鼠标事件
		 */
		private function  onStageClick(event : MouseEvent) : void {
			if (!paletteOpen) { 
				return; 
			}
			if (!contains(event.target as DisplayObject) && !palette.contains(event.target as DisplayObject)) {
				if(stage){
					stage.removeEventListener(MouseEvent.MOUSE_DOWN, onStageClick);
				} else {
					throw new Error("ColorPicker未添加到舞台");
				}
				close();
				dispatchEvent(new ColorPickerEvent(ColorPickerEvent.CLOSE, selectedColor)); 
			}
		}
		
		/**
		 * 为ColorPicker添加事件监听
		 */
		private function attachSwatchEvent():void {
			swatch.addEventListener(MouseEvent.CLICK, onClickSwatch);
			swatch.addEventListener(MouseEvent.MOUSE_DOWN, onDownSwatch);
			swatch.addEventListener(MouseEvent.MOUSE_OVER, onOverSwatch);
			swatch.addEventListener(MouseEvent.MOUSE_UP, onUpSwatch);
			swatch.addEventListener(MouseEvent.MOUSE_OUT, onUpSwatch);
		}
		
		/**
		 * 为ColorPicker取消事件监听
		 */
		private function detachSwatchEvent():void {
			swatch.removeEventListener(MouseEvent.CLICK, onClickSwatch);
			swatch.removeEventListener(MouseEvent.MOUSE_DOWN, onDownSwatch);
			swatch.removeEventListener(MouseEvent.MOUSE_OVER, onOverSwatch);
			swatch.removeEventListener(MouseEvent.MOUSE_UP, onUpSwatch);
			swatch.removeEventListener(MouseEvent.MOUSE_OUT, onUpSwatch);
		}
		
		/**
		 * Swatch在鼠标按下时触发
		 * @param	evt	[MouseEvent]
		 */
		private function onDownSwatch(evt:MouseEvent):void {
			//设置btnSwatch在Click状态下的样式
			var swatchBtnBg:MovieClip = getSkinInstance(swatchBtn.getStyle("skin")) as MovieClip;
			swatchBtnBg.gotoAndStop("down");
		}
		
		/**
		 * Swatch在鼠标滑过时触发
		 * @param	evt	[MouseEvent]
		 */
		private function onOverSwatch(evt:MouseEvent):void {
			//设置btnSwatch在MouseOver状态下的样式
			var swatchBtnBg:MovieClip = getSkinInstance(swatchBtn.getStyle("skin")) as MovieClip;
			swatchBtnBg.gotoAndStop("over");
		}
		
		/**
		 * Swatch在鼠标弹起时触发
		 * @param	evt	[MouseEvent]
		 */
		private function onUpSwatch(evt:MouseEvent):void {
			//设置btnSwatch在MouseOver状态下的样式
			var swatchBtnBg:MovieClip = getSkinInstance(swatchBtn.getStyle("skin")) as MovieClip;
			swatchBtnBg.gotoAndStop("up");
		}
		
		/**
		 * 重绘ColorPicker的颜色
		 */ 
		private function refreshSwatchColor() : void {
			var graphics_ : Graphics = swatch.graphics;
			graphics_.clear();
			graphics_.beginFill(selectedColor);
			graphics_.drawRect(0, 0, width, height);
			graphics_.endFill();
		}
		
		/**
		 * 点击SWATCH，打开palette，如果已经打开了的话，不用再打开了
		 * 
		 * @param	evt	[MouseEvent] 单击Swatch时触发
		 */
		private function onClickSwatch(evt:MouseEvent):void {
			if (_paletteOpen) { 
				close();
				dispatchEvent(new ColorPickerEvent(ColorPickerEvent.CLOSE, selectedColor)); 
			} else {
				open();
				dispatchEvent(new ColorPickerEvent(ColorPickerEvent.OPEN, selectedColor));
			}
		}
		
		/**
		 * 关闭颜色选择面板，并选择当前颜色
		 */
		private function closeAndSet() : void {
			close();
			dispatchEvent(new ColorPickerEvent(ColorPickerEvent.CLOSE, selectedColor)); 
			_selectedColor = currRGB.toDec();
			dispatchEvent(new ColorPickerEvent(ColorPickerEvent.CHANGE, selectedColor));
			refreshSwatchColor(); 
		}
		
		/**
		 * 设置当前颜色的RGB值
		 * 
		 * @param	r	[Number]RGB中的red值
		 * @param	g	[Number]RGB中的green值
		 * @param	b	[Number]RGB中的blue值
		 */
		private function setCurrRgb(r:Number, g:Number, b:Number):void {
			currRGB.r = r;
			currRGB.g = g;
			currRGB.b = b;
			textField.text = "#"+currRGB.toHex();
			refreshShapeDisplay();
		}
		
		/**
		 * 重绘结果区
		 */
		private function refreshShapeDisplay() : void {
			var g:Graphics = shapeDisplay.graphics;
			g.clear();
			g.lineStyle(1, shapeBoxBorderColor, shapeBoxBorderAlpha);
			g.moveTo(0, 0);
			g.lineTo(0, shapeBoxHeight);
			g.lineTo(shapeBoxWidth, shapeBoxHeight);
			g.lineTo(shapeBoxWidth, 0);
			g.lineTo(0, 0);
			g.beginFill(currRGB.toDec());
			g.drawRect(1, 1, shapeBoxWidth-1, shapeBoxHeight-1);
			g.endFill();
			shapeDisplay.x = 5;
			shapeDisplay.y = 5;
		}
		
		/**
		 * 初始化
		 */
		override protected function initUI() : void {
			super.initUI();
			setSize(30, 30);
			// init swatch
			swatch = new Sprite();
			swatch.buttonMode = true;
			addChild(swatch);
			refreshSwatchColor();
			// init swatchBtn
			swatchBtn = new Button();
			swatchBtn.useHandCursor = true;
			swatchBtn.autoRepeat = false;
			swatch.addChild(swatchBtn);
			// init swatchEvent
			attachSwatchEvent();
		}
		
		/**
		 * 绘制界面
		 */ 
		override protected function draw() : void {
			if(isInvalid(Invalidation.SIZE)){
				swatchBtn.setSize(width, height);
				refreshSwatchColor();
			}
			if (isInvalid(Invalidation.STYLES)) {
				var skin : * = getSkinInstance(getStyleValue("skin"));
				swatchBtn.setStyle("skin", skin["btnSwatch"]);
			}
			swatchBtn.drawNow();
			if (isInvalid(Invalidation.STATE)) {
				var swatchBtnBg:MovieClip = getSkinInstance(swatchBtn.getStyle("skin")) as MovieClip;
				if (enabled) {
					attachSwatchEvent();
					swatchBtnBg.gotoAndStop("up");
				} else {
					if (paletteOpen) {
						close();
						dispatchEvent(new ColorPickerEvent(ColorPickerEvent.CLOSE, selectedColor)); 
					}
					detachSwatchEvent();
					swatchBtnBg.gotoAndStop("disabled");
				}
			}
			super.draw();
		}
		
		/**
		 * 设置ColorPicker是否可用
		 * 
		 * @param	value	[Boolean]
		 */
		override public function set enabled(value : Boolean) : void {
			if (super.enabled == value) {
				return;
			}
			super.enabled = value;
			if (value) {
				swatchBtn.useHandCursor = true;
			} else {
				swatchBtn.useHandCursor = false;
			}
		}
		
		/**
		 * 得到ColorPicker是否可用
		 * 
		 * @param	value	[Boolean]
		 */
		override public function get classStyles() : Object {
			return mergeStyles(BUI.defaultStyles, defaultStyles);
		}
	}

}