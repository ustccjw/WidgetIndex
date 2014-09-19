package baidu.dv.graphs {
	
	import baidu.dv.core.GradientStyle;
	import baidu.dv.core.GraphItem;
	import baidu.dv.core.LineStyle;
	
	import flash.display.Graphics;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.geom.Point;
	import flash.text.TextField;
	import flash.text.TextFormat;
	
	/**
	 * 该饼图区域块颜色(有uint和GradientStyle两种类型，uint：纯色；GradientStyle：渐变色)
	 */
	[Style(name = "color", type = "*")]
	
	/**
	 * 扇形区域与文本标签之间相连细线的样式
	 */
	[Style(name = "labelLineStyle", type = "baidu.dv.core.LineStyle")]
	
	/**
	 * 扇形区域与文本标签之间相连细线的长度(半径的百分比)
	 */
	[Style(name = "labelLineLength", type = "Number")]
	
	/**
	 * 标签文字样式
	 */
	[Style(name = "labelTextFormat", type = "flash.text.TextFormat")]
	
	/**
	 * 二维平面饼图更新升级
	 * @version	2011.04.15	
	 * @author	zhaoshu
	 */
	public class PieItem extends GraphItem {
		
		/**
		 * @private
		 * 在将doEmphasize的时候，移动的距离，半径的百分比
		 */
		protected var _emphasizeDistance:Number = 0.1;
		
		/**
		 * @private
		 * 饼图半径
		 */
		protected var _radius:Number;
		
		/**
		 * @private
		 * 起始角度
		 */
		protected var _startAngle:Number;
		
		/**
		 * @private
		 * 结束角度
		 */
		protected var _endAngle:Number;
		
		/**
		 * @private
		 * 中间角度
		 */
		protected var _centerAngle:Number;
		
		/**
		 * @private
		 * 这个PieItem所在象限的最小角度
		 */
		protected var _minAngleInThisArea:Number;
		
		/**
		 * @private
		 * 标签行高
		 */
		protected var _labelLineHeight:Number;
		
		/**
		 * @private
		 * 这个PieItem所在象限
		 */
		protected var _area:int;
		
		/**
		 * @private
		 * 连接线的末端
		 */
		protected var _labelPoint:Object;
		
		/**
		 * @private
		 * 正常状态下标签实际位置点
		 */
		protected var _labelTextFieldPoint:Object;
		
		/**
		 * @private
		 * 强调高亮后的位置点
		 */
		protected var _emphasizePoint:Object;
		
		/**
		 * @private
		 * 扇形饼图的各个扇形区域是否显示与之标签文字相连的细线
		 */
		protected var _showLabelLine:Boolean = false;
		
		/**
		 * @private
		 * 扇形饼图的各个扇形区域是否显示标签文字
		 */
		protected var _showLabel:Boolean = false;
		
		/**
		 * @private
		 * 扇形饼图对象
		 */
		protected var _pieItem:Sprite;
		
		/**
		 * @private
		 * 连接线
		 */
		protected var _labelLine:Sprite;
		
		/**
		 * @private
		 * 标签文本
		 */
		protected var _labelTextField:TextField;
		
		/**
		 * @private
		 * 标签文字内容
		 */
		protected var _label:String;
		
		/**
		 * @private
		 * 缓动横向最大距离
		 */
		protected var _distanceX:Number;
		
		/**
		 * @private
		 * 缓动纵向最大距离
		 */
		protected var _distanceY:Number;
		
		/**
		 * @private
		 * 缓动横向斜率
		 */
		protected var _lX:Number;
		
		/**
		 * @private
		 * 缓动纵向斜率
		 */
		protected var _lY:Number;
		
		/**
		 * @private
		 * 缓动速度
		 */
		protected var _v:Number;
		
		/**
		 * 构造函数
		 */
		public function PieItem() {
			super();
		}
		
		/**
		 * 设置标签文字
		 */
		public function set label(value:String):void {
			if (value && value != _label) {
				_label = value;
				
				showLabel = !(value == "" || value == null);
			}
		}
		
		/**
		 * 获取标签文字
		 */
		public function get label():String {
			return _label;
		}
		
		/**
		 * 获取标签连接线
		 */
		public function get labelLine():Sprite {
			return _labelLine;
		}
		
		/**
		 * 获取饼图区域块
		 */
		public function get pieItem():Sprite {
			return _pieItem;
		}
		
		/**
		 * 设置连接细线的可见性
		 */
		public function set showLabelLine(value:Boolean):void {
			this._showLabelLine = value;
			
			drawLabelLine();
		}
		
		/**
		 * 获取连接细线的可见性
		 */
		public function get showLabelLine():Boolean {
			return this._showLabelLine;
		}
		
		/**
		 * 设置标签的可见性
		 */
		public function set showLabel(value:Boolean):void {
			this._showLabel = value;
			
			drawLabelTextField();
		}
		
		/**
		 * 获取标签的可见性
		 */
		public function get showLabel():Boolean {
			return this._showLabel;
		}
		
		/**
		 * @private
		 * 初始化默认样式
		 */
		override protected function initStyle():void {
			_styles["color"] = 0x999999;
			_styles["labelLineStyle"] = new LineStyle(0xCCCCCC, 1, 1);
			_styles["labelLineLength"] = 0.3;
			_styles["labelTextFormat"] = new TextFormat("Arial", 12, 0x000000);
		}
		
		/**
		 * @private
		 * 应用改变
		 */
		override protected function applyChanges():void {
			if (this._data == null) {
				return;
			}
			initInterface();
		}
		
		/**
		 * @private
		 * 初始化界面，开始绘制饼图区域块、标签、标签线等元素
		 */
		protected function initInterface():void {
			initVars();
			drawPieItem();
			drawLabelLine();
			drawLabelTextField();
		}
		
		/**
		 * @private
		 * 初始化变量
		 */
		protected function initVars():void {
			this._startAngle = this._data["startAngle"];
			this._endAngle = this._data["endAngle"];
			this._radius = this._data["radius"];
			this._label = this._data["label"];
			
			var ca:Number = this._data["centerAngle"] % 360;
			if (ca < 0) {
				ca += 360;
			}
			this._centerAngle = ca;
			
			this._area = this._data["area"];
			
			var tmpLabel:TextField = new TextField();
			tmpLabel.defaultTextFormat = _styles["labelTextFormat"] as TextFormat;
			tmpLabel.autoSize = "left";
			tmpLabel.text = _data["label"];
				
			//这个代表每一行文字的高度，控制疏密程度
			_labelLineHeight = tmpLabel.textHeight * 1.2;
			
            _v = 1 * _radius * 0.01;
			_lX = Math.cos(Math.PI * _centerAngle / 180);
			_lY = Math.sin(Math.PI * _centerAngle / 180);
			_distanceX = _lX * _emphasizeDistance * this._radius;
			_distanceY = _lY * _emphasizeDistance * this._radius;	
		}
		
		/**
		 * @private
		 * 按理论计算连接线以及标签的位置点(之后_labelPoint的纵轴可能会根据疏密做调整)
		 */
		protected function calculateLabelPoint():void {
			_labelPoint = { x:0, y:0 };
			
			var r:Number = _radius * (1 + _styles["labelLineLength"]);
			
			var tx:Number = r * Math.cos(Math.PI * _centerAngle / 180);
			var ty:Number = r * Math.sin(Math.PI * _centerAngle / 180);
		
			_labelPoint.x = tx;
			_labelPoint.y = ty;
		}
		
		/**
		 * @private 
		 * 绘制items
		 */
		protected function drawPieItem():void {
			//清空现有元素
			if (this._pieItem) {
				this.removeChild(_pieItem);
				this._pieItem = null;
			}
			
			//添加对象
			this._pieItem = new Sprite();
			this.addChild(this._pieItem);
			
			//开始绘制
			var gp:Graphics = this._pieItem.graphics;
			gp.lineStyle();
			var color:* = this._styles["color"];
			if(color is uint){
				gp.beginFill(color);
			}else if(color is GradientStyle){
				var gradientStyle:GradientStyle = GradientStyle(color);
				gp.beginGradientFill(gradientStyle.type, gradientStyle.colors, gradientStyle.alphas, 
					gradientStyle.ratios, gradientStyle.matrix, gradientStyle.spreadMethod, 
					gradientStyle.interpolationMethod, gradientStyle.focalPointRatio);
			}
			
			gp.moveTo(0, 0);
			gp.lineTo(this._radius * Math.cos(Math.PI * this._startAngle / 180), 
					  this._radius * Math.sin(Math.PI * this._startAngle / 180));
			for (var step:Number = this._startAngle; step < this._endAngle; step += 0.1) {
				var px:Number = this._radius * Math.cos(Math.PI * step / 180);
				var py:Number = this._radius * Math.sin(Math.PI * step / 180);
				gp.lineTo(px, py);
			}
			gp.lineTo(0, 0);
			gp.endFill();
		}
		
		/**
		 * @private
		 * 绘制标签
		 */
		protected function drawLabelTextField():void {
			//重新绘制或者是删除标签
			if (this._showLabel) {
				//计算变量值
				if (!_startAngle && _startAngle != 0) {
					initVars();
				}
				
				if (!_labelTextField) {
					_labelTextField = new TextField();
					this.addChild(_labelTextField);
				}
				_labelTextField.defaultTextFormat = _styles["labelTextFormat"];
				_labelTextField.autoSize = "left";
				_labelTextField.htmlText = _label;
				_labelTextField.mouseEnabled = false;
				
				//计算标签的位置
				_labelTextFieldPoint = {x: 0, y: 0};
				var px:Number;
				var py:Number;				
				if (!_labelPoint) {
					calculateLabelPoint();
				}
				py = _labelPoint.y - _labelTextField.height / 2;
				switch(_area) {
					case 0:
					case 3:
						px = _labelPoint.x + 10;
						break;
					case 1:
					case 2:
						px = _labelPoint.x - _labelTextField.width - 10;
						break;
				}
				
				_labelTextField.x = _labelTextFieldPoint.x = px;
				_labelTextField.y = _labelTextFieldPoint.y = py;
			}else {
				if (_labelTextField) {
					if (this.contains(_labelTextField)) {
						this.removeChild(_labelTextField);
					}
					_labelTextField = null;
				}
			}
		}
		
		/**
		 * @private
		 * 绘制标签与饼图区域块之间的连接线
		 */
		protected function drawLabelLine(emphasized:Boolean = false):void {
			//重新绘制或者是删除连接细线
			if (this._showLabelLine) {
				//计算变量值
				if (!_startAngle) {
					initVars();
					
				}
				if (!_labelPoint) {
					calculateLabelPoint();
				}
				if (!_labelLine) {
					_labelLine = new Sprite();
				}
				var lgp:Graphics = _labelLine.graphics;
				lgp.clear();
				var lstyle:LineStyle = _styles["labelLineStyle"] as LineStyle;
				lgp.lineStyle(lstyle.thickness, lstyle.color, lstyle.alpha);
				
				var r:Number = this._data["radius"];     
				
				var tx:Number = r * Math.cos(Math.PI * _centerAngle / 180);
				var ty:Number = r * Math.sin(Math.PI * _centerAngle / 180);
				lgp.moveTo(tx, ty);
				
				//标签线末端位置
				tx = _labelPoint.x;
				ty = _labelPoint.y;
				lgp.lineTo(tx, ty);
				
				//再加10像素横线
				if (_area == 0 || _area == 3) {
					tx += 10;
				}else {
					tx -= 10;
				}
				lgp.lineTo(tx, ty);
		
				//添加标签线
				this.addChildAt(_labelLine, 0);
				_labelLine.mouseEnabled = false;
			}else {
				if (_labelLine) {
					_labelLine = null;
					if (this.contains(_labelLine)) {
						this.removeChild(_labelLine);
					}
				}
			}
		}

		/**
		 * @private
		 * 强调某个item
		 */
		override protected function doEmphasize():void {
            _v = Math.abs(_v);
			addEventListener(Event.ENTER_FRAME, moving);	
			
			//如果用TweenLite，也可以继承此类重写
//			TweenLite.to(_pieItem, 0.5, {x: _distanceX, y: _distanceY});
//			if(_showLabel){
//				TweenLite.to(_labelTextField, 0.5, {x: _labelTextFieldPoint.x + _distanceX, y: _labelTextFieldPoint.y + _distanceY});	
//			}
//			if(_showLabelLine){
//				TweenLite.to(_labelLine, 0.5, {x: _distanceX, y: _distanceY});
//			}
		}
		
		/**
		 * @private
		 * 将某个强调后的item复原
		 */
		override protected function doNormalize():void {
			_v = - Math.abs(_v);
			addEventListener(Event.ENTER_FRAME, moving);
//			
			//如果用TweenLite，也可以继承此类重写
//			TweenLite.to(_pieItem, 0.5, {x: 0, y: 0});	
//			if(_showLabel){
//				TweenLite.to(_labelTextField, 0.5, {x: _labelTextFieldPoint.x, y: _labelTextFieldPoint.y});	
//			}
//			if(_showLabelLine){
//				TweenLite.to(_labelLine, 0.5, {x: 0, y: 0});
//			}
		}
		
		/**
		 *  缓动事件 
		 * @param evt
		 */
		protected function moving(evt:Event):void {
			//缓动
			_pieItem.x += _v * _lX;
			_pieItem.y += _v * _lY;	
			if(_showLabel){
				_labelTextField.x += _v * _lX;
				_labelTextField.y += _v * _lY;
			}
			if(_showLabelLine){
				_labelLine.x += _v * _lX;
				_labelLine.y += _v * _lY;
			}
			
			//判断临界
			if(_pieItem.x /_distanceX < 0 || _pieItem.y / _distanceY< 0){
				calibrateNormalize();
				removeEventListener(Event.ENTER_FRAME, moving);
			}
			if(Math.abs(_pieItem.x) >= Math.abs(_distanceX) || Math.abs(_pieItem.y) >= Math.abs(_distanceY)){
				calibrateEmphasize();
				removeEventListener(Event.ENTER_FRAME, moving);
			}
		}
		/**
		 * @private
		 * 校正复原位置
		 */
		protected function calibrateNormalize():void {
			_pieItem.x = 0;
			_pieItem.y = 0;
			if(_showLabel){
				_labelTextField.x = _labelTextFieldPoint.x;
				_labelTextField.y = _labelTextFieldPoint.y;
			}
			if(_showLabelLine){
				_labelLine.x = 0;
				_labelLine.y = 0;	
			}
		}
		
		/**
		 * @private
		 * 校正强调位置
		 */
		protected function calibrateEmphasize():void {
			_pieItem.x = _distanceX;
			_pieItem.y = _distanceY;
			if(_showLabel){
				_labelTextField.x =  _labelTextFieldPoint.x + _distanceX;
				_labelTextField.y =  _labelTextFieldPoint.y + _distanceY;
			}
			if(_showLabelLine){
				_labelLine.x = _distanceX;
				_labelLine.y = _distanceY;
			}
		}
		
		/**
		 * @public
		 * 获得/设置便签线末端的纵轴位置
		 */
		public function get labelY():Number {
			if(!_labelPoint) return 0;
			return _labelPoint.y;
		}
		
		public function set labelY(value:Number):void {
			if(!_labelPoint) return;
			_labelPoint.y = value;
		}
		
		/**
		 * @public
		 * 获得标签行高
		 */
		public function get labelLineHeight():Number {
			return _labelLineHeight;
		}
	}
}