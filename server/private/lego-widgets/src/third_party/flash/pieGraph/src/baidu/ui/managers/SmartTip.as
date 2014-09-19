package baidu.ui.managers
{
	import flash.display.DisplayObject;
	import flash.display.DisplayObjectContainer;
	import flash.display.Graphics;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.events.TimerEvent;
	import flash.geom.Point;
	import flash.geom.Rectangle;
	import flash.text.TextField;
	import flash.text.TextFieldAutoSize;
	import flash.utils.ByteArray;
	import flash.utils.Timer;
	
	/**
	 * 定义提示箭头高度
	 */		
	[Style(name="arrowHeight", type="Number")]
	
	/**
	 * 定义提示箭头宽度
	 */		
	[Style(name="arrowWidth", type="Number")]
	
	/**
	 * 定义提示箭头偏移量
	 */		
	[Style(name="arrowIndentPercent", type="int")]
	
	/**
	 * 定义提示框边框和内容的间隔
	 */		
	[Style(name="backgroundGap", type="Number")]
	
	/**
	 * 定义提示框圆角弧度
	 */		
	[Style(name="backgroundCornerRadius", type="Number")]
	
	/**
	 * 定义提示框边框背景颜色
	 */		
	[Style(name="backgroundColor", type="uint", format="Color")]
	
	/**
	 * 定义提示框边框背景透明度
	 */		
	[Style(name="backgroundAlpha", type="Number")]
	
	/**
	 * 定义提示框边框背景偏移
	 */		
	[Style(name="backgroundIndentPercent", type="int")]
	
	
	/**
	 * 针对特定可视原件显示相关信息
	 * 
	 * <p>
	 * 使用方法<code>SmartTip.createTip()</code>
	 * 创建信息提示窗口
	 * </p>
	 *  
	 * @author laan
	 * @createTime 2008.10
	 * 
	 * @update 2010.08
	 * @update 2010.11
	 */	
	public final class SmartTip extends Sprite
	{
		/**
		 * 设置tip在目标对象底部显示 
		 */		
		public static var BOTTOM:String = "bottom";
		
		/**
		 * 设置tip在目标对象顶部显示 
		 */		
		public static var TOP:String = "top";
		
		/**
		 * 设置tip在目标对象右侧显示 
		 */		
		public static var RIGHT:String = "right";
		
		/**
		 * 设置tip在目标对象左侧显示
		 */		
		public static var LEFT:String = "left";
		
		/**
		 * 自动放置tip 
		 */		
		public static var AUTO:String = "auto";
		
		/**
		 * 默认样式
		 */		
		private static var _defaultStyle:Object = {arrowHeight:10,				//箭头高度
												   arrowWidth:10,				//箭头宽度
												   arrowIndentPercent:0,		//箭头偏移量
												   backgroundGap:4,				//边框间隔
												   backgroundCornerRadius:4,	//圆角
												   backgroundIndentPercent:0,	//背景偏移量
												   backgroundColor:0xffffff,	//背景颜色
												   backgroundAlpha:1			//背景透明度
												   };
		
		
		
		/**
		 *  tip默认样式
		 */		
		private static var _tipDefaultStyle:Object;
		
		/**
		 * 设置tip默认样式
		 * 
		 * <p>
		 * <li>arrowHeight:				Number	箭头高度</li>
		 * <li>arrowWidth:				Number	箭头宽度</li>
		 * <li>arrowIndentPercent:		int		箭头偏移量（－100～100），默认为0</li>
		 * <li>backgroundCornerRadius:	int		圆角，默认为4</li>
		 * <li>backgroundGap:			int		边框间隔，默认为4</li>
		 * <li>backgroundIndentPercent:	int		背景偏移量（－100～100），默认为0，居中</li>
		 * <li>backgroundColor:			uint	背景颜色</li>
		 * <li>backgroundAlpha:			Number	背景透明度</li>
		 * </p>
		 *  
		 * @param value
		 * 
		 */		
		public static function set tipDefaultStyle(value:Object):void {
			_tipDefaultStyle = value;
		}
		
		/**
		 * 获取tip样式
		 *  
		 * @return 
		 * 
		 */		
		public static function get tipDefaultStyle():Object {
			return _tipDefaultStyle;
		}
		
		
		/**
		 * 获取默认的样式
		 *  
		 * @return 
		 * 
		 */		
		public static function get defaultStyle():Object {
			var bytes:ByteArray = new ByteArray();
			bytes.writeObject(_defaultStyle);
			bytes.position = 0;
			
			return bytes.readObject();
		}
		
		/**
		 *  
		 */		
		private static var _root:DisplayObjectContainer;
		
		/**
		 * 设置tip放置的root对象
		 *  
		 * @param value
		 * 
		 */		
		public static function set root(value:DisplayObjectContainer):void {
			if (_root == value) return;
			if (_root) throw new Error("You had set the root!"); 
			
			_root = value;
		}
		
		/**
		 * 
		 * @param target			目标对象
		 * @param content			DisplayObject对象或String内容
		 * @param location			tip位置
		 * @param style				样式
		 * 
		 * @return 
		 * 
		 */
		public static function createTip(target:DisplayObject, 
										 content:*, 
										 location:String = "auto",
										 style:Object = null):SmartTip {
			
			if (!_root) root = target.stage;
			if (!_root) {
				throw new Error("The tip root object is NULL!");
			}
			
			//如果content是文本内容，新建一个textfield
			if (content is String) {
				var text:TextField = new TextField();
				text.autoSize = TextFieldAutoSize.LEFT;
				text.text = content as String;
				content = text;
			}
			
			//如果内容不是display object
			if (!(content is DisplayObject)) {
				throw new Error("The conten should be Display object or String!");
			}
			
			var smartTip:SmartTip = getTipByContent(content);
			if (!smartTip) {
				smartTip = new SmartTip(_defaultStyle);
				_root.addChild(smartTip);
			}
			
			//复制样式
			for (var styleName:String in style) {
				if (smartTip._style.hasOwnProperty(styleName)) {
					smartTip._style[styleName] = style[styleName];
				}
			}
			
			
			smartTip._content = content;
			smartTip.addChild(content);
			
			smartTip._target = target;
			smartTip._location = location || SmartTip.AUTO;
			
			//刷新显示
			smartTip.refresh();
			
			return smartTip;
		}
		
		/**
		 * 根据信息内容关闭信息面板
		 * 
		 * @param content
		 * 
		 */		
		public static function closeTipByContent(content:DisplayObject):void {
			var smartTip:SmartTip = getTipByContent(content);
			if (smartTip) smartTip.close();
		}
		
		/**
		 * 关闭目标对象的所有tip
		 * 
		 * @param target
		 * 
		 */		
		public static function closeTipsByTarget(target:DisplayObject):void {
			var tips:Array = getTipsByTarget(target);
			
			for (var i:uint = 0, len:uint = tips.length; i < len; i++) {
				(tips[i] as SmartTip).close();
			}
		}
		
		
		/**
		 * 根据内容获取tip
		 *  
		 * @param content
		 * 
		 */		
		public static function getTipByContent(content:DisplayObject):SmartTip {
			if (_root) {
				for (var i:uint = 0, len:uint = _root.numChildren; i < len; i++) {
					var obj:Object = _root.getChildAt(i);
					if (obj is SmartTip && (obj as SmartTip).content == content) {
						return obj as SmartTip;
					}
				}
			}
			
			return null;
		}
		
		/**
		 * 根据目标获取tip
		 *  
		 * @param target
		 * @return 
		 * 
		 */		
		public static function getTipsByTarget(target:DisplayObject):Array {
			var arr:Array = [];
			
			if (_root) {
				for (var i:uint = 0, len:uint = _root.numChildren; i < len; i++) {
					var obj:Object = _root.getChildAt(i);
					if (obj is SmartTip && (obj as SmartTip).target == target) {
						arr.push(obj);
					}
				}
			}
			
			return arr;
		}
		
		
		
		
	
		//==================================================================================================================
		//自动关闭控制
		//==================================================================================================================
		
		/**
		 * 关闭按钮 
		 */		
		private var closeMC:Sprite;
		
		
		/**
		 *  
		 * @param privateObj
		 * 
		 */		
		public function SmartTip(privateObj:Object) {
			super();
			
			//不容许外部直接新建SmartTip实例
			if (privateObj != _defaultStyle) throw new Error("You can not instance SmartTip!");
			
			//设置默认样式
			_style = SmartTip.defaultStyle;
			
			//关闭按钮
			closeMC = new Sprite();
			closeMC.buttonMode = true;
			closeMC.rotation = 45;
			closeMC.visible = false;
			
			var g:Graphics = closeMC.graphics;
			g.beginFill(0xff0000, 0);
			g.drawCircle(0, 0, 4);
			g.beginFill(0x333333, 1);
			g.drawRect(-1, -3, 2, 6);
			g.beginFill(0x333333, 1);
			g.drawRect(-3, -1, 6, 2);
			
			closeMC.addEventListener(MouseEvent.CLICK, closeMCClickHandler);
			addChild(closeMC);
			
			//关闭控制
			addEventListener(MouseEvent.ROLL_OUT, mouseEventsHandler);
			addEventListener(MouseEvent.ROLL_OVER, mouseEventsHandler);
			
			_root.addEventListener(MouseEvent.MOUSE_DOWN, mouseDownHandler, false, 0, true);
		}
		
		/**
		 * 自动关闭计时器 
		 */		
		private var autoCloseTimer:Timer;
		
		/**
		 * 设置自动关闭时间
		 *  
		 * @param time		-1为关闭tip的自动关闭功能
		 * 
		 */		
		public function setAutoClose(delay:int):void {
			if (autoCloseTimer) {
				autoCloseTimer.removeEventListener(TimerEvent.TIMER, autoCloseHandler);
				autoCloseTimer.stop();
			}
			
			if (delay > 0) {
				autoCloseTimer = new Timer(delay, 1);
				autoCloseTimer.addEventListener(TimerEvent.TIMER, autoCloseHandler);
				autoCloseTimer.start();
			}
		}
		
		/**
		 *  
		 * @param event
		 * 
		 */		
		private function autoCloseHandler(event:TimerEvent):void {
			close();
		}
		
		/**
		 * 鼠标事件控制
		 *  
		 * @param event
		 * 
		 */		
		private function mouseEventsHandler(event:MouseEvent):void {
			switch (event.type) {
				case MouseEvent.ROLL_OUT:
					//如果已启用自动关闭，重新开始计时
					if (autoCloseTimer) {
						autoCloseTimer.reset();
						autoCloseTimer.start();
					}
					
					break;
				case MouseEvent.ROLL_OVER:
					//如果已启用自动关闭，停止计时
					if (autoCloseTimer) {
						autoCloseTimer.stop();
					}
					break;
			}
		}
		
		
		/**
		 * 关闭面板 
		 * 
		 */		
		public function close():void {
			//移除事件
			_root.removeEventListener(MouseEvent.MOUSE_DOWN, mouseDownHandler, false);
			
			
			//停止自动关闭计时
			if (autoCloseTimer) {
				autoCloseTimer.stop();
				autoCloseTimer.removeEventListener(TimerEvent.TIMER, autoCloseHandler);
			}
			
			
			//移除显示对象
			if (contains(_content))removeChild(_content);
			if (_root.contains(this)) _root.removeChild(this);
			
			dispatchEvent(new Event(Event.CLOSE));
		}
		
		/**
		 * 关闭按钮点击事件控制
		 *  
		 * @param event
		 * 
		 */		
		private function closeMCClickHandler(event:MouseEvent):void {
			close();
		}
		
		/**
		 * 接收鼠标点击控制
		 */
		private function mouseDownHandler(event:MouseEvent):void {
			if (_closeOnClickOutside && !hitTestPoint(event.stageX, event.stageY, true)) {
				//如果是在tip外点击且已设定点击tip外关闭面板参数
				close();
			}
		}
		
		/**
		 *  
		 */		
		private var _style:Object;
		
		/**
		 * 设置样式
		 *  
		 * @param styleName		样式名称
		 * @param value			样式值
		 * 
		 */
		public function setStyle(styleName:String, value:*):void {
			if (_style.hasOwnProperty(styleName)) {
				if (_style[styleName] != value) {
					_style[styleName] = value;
					
					//重新布局tip
					adjustLayout();
				}
			}
		}
		
		/**
		 * 获取样式
		 *  
		 * @return 
		 * 
		 */		
		public function getStyle(styleName:String):* {
			return _style[styleName];
		}
		
		/**
		 * tip的位置
		 * 
		 */		
		private var _location:String;
		
		/**
		 * tip提示位置。
		 * 
		 * @param value。 取值<code>SmartTip.BOTTOM</code>,<code>SmartTip.TOP</code>,<code>SmartTip.RIGHT</code>,<code>SmartTip.LEFT</code>
		 * 
		 */		
		public function set location(value:String):void {
			if (_location == value) return;
			
			_location = value.toLowerCase();
			
			adjustLayout();
		}
		
		/**
		 * tip提示位置
		 * 
		 * @return 
		 * 
		 */		
		public function get location():String {
			return _location;
		}
		
		/**
		 * tip提示目标对象 
		 */		
		private var _target:DisplayObject;
		
		/**
		 * tip提示目标对象
		 *  
		 * @param value
		 * 
		 */		
		public function set target(value:DisplayObject):void {
			if (_target == value) return;
			
			_target = value;
			
			adjustLayout();
		}
		
		
		public function get target():DisplayObject {
			return _target;
		}
		
		
		/**
		 * tip显示内容 
		 */		
		private var _content:DisplayObject;
		
		/**
		 * 设置tip内容
		 *  
		 * @param value
		 * 
		 */		
		public function set content(value:DisplayObject):void {
			if (_content && contains(_content)) {
				removeChild(_content);
			}
			
			_content = value;
			
			//添加内容到SmartTip
			if (!contains(_content)) {
				addChildAt(_content, 0);
			}
			
			adjustLayout();
		}
		
		/**
		 * 获取tip内容
		 * 
		 * @return 
		 * 
		 */		
		public function get content():DisplayObject {
			return _content;
		}
		
		/**
		 * 重新绘制tip 
		 * 
		 */		
		public function refresh():void {
			adjustLayout();
		}
		
		/**
		 * 设置是否显示关闭按钮
		 *  
		 * @param value
		 * 
		 */		
		public function set showCloseButton(value:Boolean):void {
			closeMC.visible = value;
		}
		
		
		/**
		 *  
		 * @return 
		 * 
		 */		
		public function get showCloseButton():Boolean {
			return closeMC.visible;
		}
		
		
		/**
		 * 点击tip外是否关闭tip 
		 */		
		private var _closeOnClickOutside:Boolean;
		
		/**
		 * 设置点击tip外是否关闭tip
		 * 
		 * @param value
		 * 
		 */		
		public function set closeOnClickOutside(value:Boolean):void {
			_closeOnClickOutside = value;
		}
		
		
		public function get closeOnClickOutside():Boolean {
			return _closeOnClickOutside;
		}
		
		
		/**
		 * 调整信息面板 
		 * 
		 */		
		private function adjustLayout():void {
			if (!_content) {
				throw new Error("The SmartTip's content should not be null!");
			}
			
			var realLocation:String = _location.toLowerCase();
			
			if (realLocation == AUTO) {
				//顺序：top, bottom, right, left
				var locationValues:Array = [TOP, BOTTOM, RIGHT, LEFT];
				
				for (var i:uint = 0; i < locationValues.length; i++) {
					realLocation = locationValues[i];
					drawTip(realLocation);
					
					var tipRect:Rectangle = this.getRect(stage);
					if (tipRect.top < 1 || tipRect.left < 1 || tipRect.right > stage.stageWidth || tipRect.bottom > stage.stageHeight) {
						
					} else {
						break;
					}
				}
			} else {
				//绘制tip
				drawTip(realLocation);
			}
			
			//将关闭按钮放在右上角
			var bgGap:Number = getStyle("backgroundGap");//边界间隔
			var contentRect:Rectangle = _content.getRect(_content.parent);
			closeMC.x = contentRect.right + bgGap- 4;
			closeMC.y = contentRect.top - bgGap + 4;
		}
		
		/**
		 * 绘制tip
		 *  
		 * @param location
		 * 
		 */			
		private function drawTip(location:String):void {
			//边界间隔
			var bgGap:Number = getStyle("backgroundGap");
			//背景颜色
			var bgCornerRadius:Number = getStyle("backgroundCornerRadius");
			//背景颜色
			var bgColor:uint = getStyle("backgroundColor");
			//背景透明度
			var bgAlpha:Number = getStyle("backgroundAlpha");
			//背景偏移量（－100～100）
			var bgIndentPercent:int = getStyle("backgroundIndentPercent");
			bgIndentPercent = Math.max(-100, Math.min(100, bgIndentPercent));
			
			//箭头高度
			var arrowHeight:Number = getStyle("arrowHeight");
			//箭头宽度
			var arrowWidth:Number = getStyle("arrowWidth");
			//箭头偏移量（－100～100）
			var arrowIndentPercent:int = getStyle("arrowIndentPercent");
			arrowIndentPercent = Math.max(-100, Math.min(100, arrowIndentPercent));
			
			//将偏移量换算为实际像素偏移
			var bgIndent:Number = 0;
			var arrowIndent:Number = 0;
			
			if (location == TOP || location == BOTTOM) {
				bgIndent = (_content.width / 2 + bgGap - bgCornerRadius/2 - arrowWidth/2) * bgIndentPercent / 100;
				arrowIndent = (bgIndent * (arrowIndentPercent > 0 ? 1 : -1) + _content.width / 2 + bgGap - bgCornerRadius/2 - arrowWidth/2) * arrowIndentPercent / 100;
			} else {
				bgIndent = (_content.height / 2 + bgGap - bgCornerRadius / 2 - arrowWidth/2) * bgIndentPercent / 100;
				arrowIndent = (bgIndent * (arrowIndentPercent > 0 ? 1 : -1) + _content.height / 2 + bgGap - bgCornerRadius/2 - arrowWidth/2) * arrowIndentPercent / 100;
			}
		
			//tip绘制点
			var points:Array = [new Point(0, 0)];
			
			var tipRect:Rectangle = _content.getRect(_content);
			switch (location) {
				case TOP:
					_content.x = -tipRect.x - tipRect.width / 2 - bgIndent;
					_content.y = -tipRect.y - tipRect.height - arrowHeight - bgGap;
					
					points.push(new Point(-arrowWidth / 2 - arrowIndent, -arrowHeight));
					points.push(new Point(arrowWidth / 2 - arrowIndent, -arrowHeight));
					points.push(new Point(0, 0));
					break;
				case BOTTOM:
					_content.x = -tipRect.x - tipRect.width / 2 - bgIndent;
					_content.y = -tipRect.y + arrowHeight + bgGap;
					
					points.push(new Point(-arrowWidth / 2 - arrowIndent, arrowHeight));
					points.push(new Point(arrowWidth / 2 - arrowIndent, arrowHeight));
					points.push(new Point(0, 0));
					break;
				case LEFT:
					_content.x = -tipRect.x - tipRect.width - arrowHeight - bgGap;
					_content.y = -tipRect.y - tipRect.height / 2 - bgIndent;
					
					points.push(new Point(-arrowHeight, -arrowWidth / 2 - arrowIndent));
					points.push(new Point(-arrowHeight, arrowWidth / 2 - arrowIndent));
					points.push(new Point(0, 0));
					break;
				case RIGHT:
					_content.x = -tipRect.x + arrowHeight + bgGap;
					_content.y = -tipRect.y - tipRect.height / 2 - bgIndent;
					
					points.push(new Point(arrowHeight, -arrowWidth / 2 - arrowIndent));
					points.push(new Point(arrowHeight, arrowWidth / 2 - arrowIndent));
					points.push(new Point(0, 0));
					break;
			}
			
			tipRect = _content.getRect(_content.parent);
			tipRect.left -= bgGap;
			tipRect.right += bgGap;
			tipRect.top -= bgGap;
			tipRect.bottom += bgGap;
			
			graphics.clear();
			graphics.beginFill(bgColor, bgAlpha);
			graphics.drawRoundRect(tipRect.x, tipRect.y, tipRect.width, tipRect.height, bgCornerRadius, bgCornerRadius);
			
			for (var i:uint = 0; i < points.length; i++) {
				var point:Point = points[i];
				if (i == 0) graphics.moveTo(point.x, point.y);
				else graphics.lineTo(point.x, point.y);
			}
			
			graphics.endFill();
			
			//定位tip
			var targetRect:Rectangle = _target.getRect(_root);
			switch (location) {
				case TOP:
					x = targetRect.x + targetRect.width / 2;
					y = targetRect.y;
					break;
				case BOTTOM:
					x = targetRect.x + targetRect.width / 2;
					y = targetRect.y + targetRect.height;
					break;
				case RIGHT:
					x = targetRect.x + targetRect.width;
					y = targetRect.y + targetRect.height / 2;
					break;
				case LEFT:
					x = targetRect.x;
					y = targetRect.y + targetRect.height / 2;
					break;
			}
		}
	}
}
