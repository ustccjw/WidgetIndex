package baidu.dv.graphs {
	import baidu.dv.core.Graph;
	import baidu.dv.core.GraphItem;
	import baidu.dv.core.LineStyle;
	import baidu.dv.events.ItemEvent;
	
	import flash.display.Sprite;
	import flash.display.Graphics;
	import flash.events.MouseEvent;
	import flash.text.TextFormat;
	
	
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
	 * 饼图各个区域块颜色
	 */
	[Style(name = "colors", type = "Array")]
	
	/**
	 * 饼图，具体每个扇形是二维还是三维效果由下层的PieItem决定(更新升级)
	 * @version	2011.04.15	
	 * @author	zhaoshu
	 */
	public class PieGraph extends Graph {
		
		/**
		 * @private
		 * 扇形饼图的各个扇形区域是否显示与之标签文字相连的细线
		 */
		private var _showLabelLine:Boolean = false;
		
		/**
		 * @private
		 * 扇形饼图的各个扇形区域是否显示标签文字
		 */
		private var _showLabel:Boolean = false;
		
		/**
		 * @private
		 * 扇形饼图的半径
		 */
		private var _radius:Number = 100;
		
		/**
		 * @private
		 * 角度列表[{startAngle:, endAngle:}, {}]
		 */
		private var _angle:Array;
		
		/**
		 * @private
		 * 按照横轴纵轴划分为4象限，每个象限的最小角度，0-90为第一象限，90-180为第二象限，180-270第三象限，270-360第四象限
		 */
		private var _minAngleInEachArea:Array;
		
		/**
		 * @private
		 * 某个area中共有多少个item
		 */
		private var _numInThisArea:Array;
		
		/**
		 * @private
		 * 各个items的显示文字标签
		 */
		private var _labels:Array;
		
		/**
		 * @private
		 * 鼠标层
		 */
		private var _mouseLayer:Sprite;
		
		/**
		 * 构造函数。
		 */
		public function PieGraph() {
			super();
		}
		
		/**
		 * 设置显示文字标签
		 */
		public function set labels(value:Array):void {
			if (value && value != _labels) {
				_labels = value;
			}
			if (_items) {
				for (var i = 0, iLen = _items.length; i < iLen; i++ ) {
					(_items[i] as PieItem).label = _labels[i];
				}
			}
		}
		
		/**
		 * 获取显示文字标签
		 */
		public function get labels():Array {
			return _labels;
		}
		
		/**
		 * 设置数据，覆写这个方法主要是为了注释数据data的格式：<br>
		 * data数组中的元素是指饼图区域块原始数据，而不是计算之后的百分值<br>
		 * @param	value	<Array>数据为一个数组，每个数组元素是每个饼图区域块的原始数据，而非百分值
		 */
		override public function set data(value:*):void {
			if (!(value is Array)) {
				return;
			}
			super.data = value;
			invalidate(INVALID_TYPE_DATA);
		}
		
		/**
		 * 设置连接细线的可见性
		 */
		public function set showLabelLine(value:Boolean):void {
			if (this._showLabelLine != value) {
				this._showLabelLine = value;
				
				//重新绘制或者是删除连接细线
				//这个地方直接将item定义为了PieItem，后期改善
				if (this._items) {
					for each (var item:PieItem in this._items) {
						item.showLabelLine = value;
					}
				}
			}
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
			if (this._showLabel != value) {
				this._showLabel = value;
				
				//重新绘制或者是删除标签
				if (this._items) {
					for each (var item:PieItem in this._items) {
						item.showLabel = value;
					}
				}
			}
		}
		
		/**
		 * 获取标签的可见性
		 */
		public function get showLabel():Boolean {
			return this._showLabel;
		}
		
		/**
		 * 设置扇形饼图的半径
		 */
		public function set radius(value:Number):void {
			if (!value || value < 0 || value == this._radius) {
				return;
			}
			this._radius = value;
			
			//重新绘制或者是缩放改变半径大小
			invalidate(INVALID_TYPE_DATA);
		}
		
		/**
		 * 获取半径
		 */
		public function get radius():Number {
			return this._radius;
		}
		
		/**
		 * @private
		 * 初始化样式，覆写此方法来制定各自默认的样式
		 */
		override protected function initStyle():void {
			_styles["labelLineStyle"] = new LineStyle(0xCCCCCC, 1, 1);
			_styles["labelLineLength"] = 0.3;
			_styles["labelTextFormat"] = new TextFormat("Arial", 12, 0x000000);
			_styles["colors"] = [0x999999];
		}
		
		/**
		 * @private
		 * 应用改变，覆写此方法来让属性更改真正生效
		 */
		override protected function applyChanges():void {
			//如果数据为空，不进行任何处理，直接返回
			if (this._data == null) {
				return;
			}
			
			if (isInvalidOnly(INVALID_TYPE_STYLE)) {
				//样式变化
				for each (var item:PieItem in _items) {
					item.setStyles(this._styles);
				}
				initInterface();
			}else {
				//数据变化，其余变化组合
				initInterface();
			}
		}
		
		/**
		 * @private
		 * 将具体数据换算成对应的角度，包括起始角度和终止角度
		 */
		protected function calculateAngleList():void {
			this._angle = [];
			this._minAngleInEachArea = [];
			this._numInThisArea = null;
			
			var sumValue:Number = 0;
			for (var i:int = 0, len:int = this._data.length; i < len; i++) {
				if (_data[i] == null || _data[i] < 0) {
					//数据不完整的时候，将这个数据项补充为0
					_data[i] = 0;
				}
				sumValue += this._data[i];
			}
			
			for (i = 0; i < len; i++) {
				var angleObj:Object = { };
				var angle:Number = (this._data[i] / sumValue) * 360;
				if (i == 0) {
					angleObj = { startAngle: 0, endAngle:angle};
				}else {
					var endAngle:Number = this._angle[i - 1].endAngle;
					angleObj = { startAngle: endAngle, endAngle:endAngle + angle };
				}
				this._angle[i] = angleObj;
				
				//求每个象限的最小角度
				var tmpAngle:Number = _angle[i].endAngle - _angle[i].startAngle;
				var centerAngle:Number = (_angle[i].endAngle + _angle[i].startAngle) / 2;
				this._angle[i]["centerAngle"] = centerAngle;
				
				centerAngle = centerAngle % 360;
				if (centerAngle < 0) {
					centerAngle += 360;
				}
				//位于第几象限
				var area:int = Math.floor(centerAngle / 90);
				if (!this._minAngleInEachArea[area]) {
					this._minAngleInEachArea[area] = tmpAngle;
				}else {
					this._minAngleInEachArea[area] = Math.min(this._minAngleInEachArea[area], tmpAngle);
				}
				this._angle[i]["area"] = area;
				
				//该象限总共有多少个item
				if (!_numInThisArea) {
					_numInThisArea = [];
					_numInThisArea[area] = 1;
					
					//该item处于该area内的第几个
					this._angle[i]["indexInThisArea"] = 0;
				}else {
					if (!_numInThisArea[area]) {
						_numInThisArea[area] = 1;
						
						this._angle[i]["indexInThisArea"] = 0;
					}else {
						_numInThisArea[area] += 1;
						
						//取消了startAngle，每个都是从0开始
						this._angle[i]["indexInThisArea"] = this._angle[i - 1]["indexInThisArea"] + 1;
					}
				}
			}

			for (var x:int = 0; x < 4; x++ ) {
				if (!_minAngleInEachArea[x]) {
					_minAngleInEachArea[x] = 90;
				}
				
				if (!_numInThisArea[x]) {
					_numInThisArea[x] = 0;
				}
			}
		}
		
		/**
		 * @private 
		 * 初始化界面
		 */
		protected function initInterface():void {
			//如果存在数据或者是已经绘制图形的话，需要清除现有图形
			if (this._items) {
				for each (var item:PieItem in this._items) {
					if (this.contains(item)) {
						//删除item之前先删除监听事件
						var pieitem:Sprite = item.pieItem;
						pieitem.removeEventListener(MouseEvent.ROLL_OVER, doItemEvent);
						pieitem.removeEventListener(MouseEvent.ROLL_OUT, doItemEvent);
						pieitem.removeEventListener(MouseEvent.CLICK, doItemEvent);
						this.removeChild(item);
					}
				}
			}
			//绘制items
			genItems();
			
			//items排序
			setItemsDepth();
			
			//绘制鼠标层
			drawMouseLayer();	
		}
		
		/**
		 * @private
		 * 绘制背景(为了让鼠标移入移出效果更好)
		 */
		protected function drawMouseLayer():void {
			if(!_mouseLayer){
				_mouseLayer = new Sprite();
				addChildAt(_mouseLayer, 0);
				this.addEventListener(MouseEvent.ROLL_OUT, doOutEvent)
			}
			setChildIndex(_mouseLayer, 0);
			var gp:Graphics = _mouseLayer.graphics;
			gp.clear();
			gp.beginFill(0xff00ff, 0);
			gp.drawCircle(0, 0, _radius);
			gp.endFill();
		}
		
		/**
		 * @private
		 * 绘制items
		 */
		protected function genItems():void {
			this._items = [];
			this.calculateAngleList();
			
			if (this._itemRenderer && this._data) {
				for (var i:int = 0, len:int = this._angle.length; i < len; i++) {
					var itemData:Object = { radius:this._radius, 
											label:this._labels[i] || "饼图默认标签", 
											startAngle:this._angle[i].startAngle, 
											endAngle:this._angle[i].endAngle, 
											centerAngle:this._angle[i].centerAngle, 
											area:this._angle[i].area, 
											minAngleInThisArea:this._minAngleInEachArea[this._angle[i].area]};
			
					
					var item:PieItem = new _itemRenderer();
					item.index = i;
					
					var colors:Array = _styles["colors"];
					item.setStyles( { labelLineStyle:_styles["labelLineStyle"], 
						labelLineLength:_styles["labelLineLength"],
						labelTextFormat:_styles["labelTextFormat"], 
						color:colors[i % colors.length] || 0x999999 } );

					item.data = itemData;
					
					item.showLabel = this._showLabel;
					item.showLabelLine = this._showLabelLine;
					

					
					this.addChild(item);
					item.validateAll();
					_items[i] = item;
					
					var pieitem:Sprite = item.pieItem;
					pieitem.addEventListener(MouseEvent.ROLL_OVER, doItemEvent);
					pieitem.addEventListener(MouseEvent.ROLL_OUT, doItemEvent);
					pieitem.addEventListener(MouseEvent.CLICK, doItemEvent);
				}
				
				//检测标签是否有重叠，若有则进行二次排布
				ArrangeLabel();
				
			}
		}
		
		/**
		 * @private
		 * 如果标签有重叠，则进行二次排布
		 */
		protected function ArrangeLabel():void {
			var leftItems:Array = [];
			var rightItems:Array = [];
			for (var i:int = 0, len:int = _items.length; i < len; i++) {
				if(this._angle[i].area == 1 || this._angle[i].area == 2){
					leftItems.push(_items[i]);
				}
				if(this._angle[i].area == 3){
					rightItems.push(_items[i]);
				}
			}
			leftItems.reverse();
			
			for (i = 0, len = _items.length; i < len; i++) {
				if(this._angle[i].area == 0){
					rightItems.push(_items[i]);
				}
			}
			
			var preItemLabelY:Number = 0;
			var curItemLabelY:Number = 0;
			var pieitem:Sprite;
			for (i = 0, len = leftItems.length; i < len; i++) {
				curItemLabelY = leftItems[i].labelY;
				if(i != 0){			
					if(  curItemLabelY - preItemLabelY < leftItems[i].labelLineHeight){
						leftItems[i].labelY = preItemLabelY  + leftItems[i].labelLineHeight;
						//重绘一次
						leftItems[i].data = leftItems[i].data;
						leftItems[i].validateNow();
						curItemLabelY = leftItems[i].labelY;
						pieitem = leftItems[i].pieItem;
						pieitem.addEventListener(MouseEvent.ROLL_OVER, doItemEvent);
						pieitem.addEventListener(MouseEvent.ROLL_OUT, doItemEvent);
						pieitem.addEventListener(MouseEvent.CLICK, doItemEvent);
					}	
				}
				preItemLabelY = curItemLabelY;
			}
			
			preItemLabelY = 0;
			curItemLabelY = 0;
			for (i = 0, len = rightItems.length; i < len; i++) {
				curItemLabelY = rightItems[i].labelY;
				if(i != 0){			
					if(  curItemLabelY - preItemLabelY < rightItems[i].labelLineHeight){
						rightItems[i].labelY = preItemLabelY  + rightItems[i].labelLineHeight;
						//重绘一次
						rightItems[i].data = rightItems[i].data;
						rightItems[i].validateNow();
						curItemLabelY = rightItems[i].labelY;
						pieitem = rightItems[i].pieItem;
						pieitem.addEventListener(MouseEvent.ROLL_OVER, doItemEvent);
						pieitem.addEventListener(MouseEvent.ROLL_OUT, doItemEvent);
						pieitem.addEventListener(MouseEvent.CLICK, doItemEvent);
					}	
				}
				preItemLabelY = curItemLabelY;
			}
		}
		
		/**
		 * @private
		 * 对各个items排序，2D中作用不大，主要用于PieItem3D
		 */
		protected function setItemsDepth():void {
			var depthList:Array = [];
			for (var i:int = 0, iLen:int = _items.length; i < iLen; i++ ) {
				var item:PieItem = _items[i] as PieItem;
				var itemData:Object = item.data;
				var startAngle:Number = itemData["startAngle"] % 360;
				if (startAngle < 0) {
					startAngle += 360;
				}
				var endAngle:Number = startAngle + itemData["endAngle"] - itemData["startAngle"];
				
				switch (true) {
					case (startAngle >= 180 && endAngle >= 270):
						depthList[i] = startAngle;
						break;
					case (startAngle >= 0 && startAngle < 90 && endAngle <= 90):
						depthList[i] = 360 + startAngle;
						break;
					case (startAngle >= 90 && endAngle >= 270):
						depthList[i] = 360 - endAngle;
						break;
					default :
						depthList[i] = 100000 - startAngle;
				}
			}
			depthList = depthList.sort(Array.NUMERIC | Array.RETURNINDEXEDARRAY);
			for (i = 0, iLen = _items.length; i < iLen; i++ ) {
				setChildIndex(_items[depthList[i]], i);
			}
		}
		
		/**
		 * @private
		 * 扇形item事件处理
		 */
		protected function doItemEvent(evt:MouseEvent):void {
			var eventType:String;
			var item:GraphItem = evt.currentTarget.parent as GraphItem;
			if (item) {
				switch (evt.type) {
					case MouseEvent.ROLL_OVER :
						eventType = ItemEvent.ITEM_OVER;
						break;
					case MouseEvent.ROLL_OUT :
						eventType = ItemEvent.ITEM_OUT;
						break;
					case MouseEvent.CLICK :
						eventType = ItemEvent.ITEM_CLICK;
						break;
				}
				
				var itemEvent:ItemEvent = new ItemEvent(eventType); 
				itemEvent.index = item.index;
				this.dispatchEvent(itemEvent);
			}
		}
		
		/**
		 * @private
		 * 鼠标移除饼图事件
		 */
		protected function doOutEvent(evt:MouseEvent):void {
			this.normalizeAllItems();
		}
		
	}
}