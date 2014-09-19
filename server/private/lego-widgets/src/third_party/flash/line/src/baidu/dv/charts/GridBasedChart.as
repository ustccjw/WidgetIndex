package baidu.dv.charts {
	
	import baidu.dv.core.Chart;
	import baidu.dv.core.DVBase;
	import baidu.dv.core.Grid;
	import baidu.dv.core.GridPlacement;
	import baidu.dv.core.LineStyle;
	import baidu.dv.events.ItemEvent;
	import baidu.dv.graphs.BarGraph;
	import baidu.dv.graphs.BarItem;
	import baidu.dv.graphs.GridBasedGraph;
	import baidu.dv.graphs.LineGraph;
	import baidu.dv.graphs.PointItem;
	import baidu.dv.grids.CategoryGrid;
	import baidu.dv.grids.ValueGrid;
	
	import flash.display.Sprite;
	
	/**
	 *  笛卡尔坐标系图表
	 *
	 *  @author xiaokun
	 *  @author yang_dong@baidu.com
	 */
	public class GridBasedChart extends Chart {
		
		/**
		 * @private
		 * 颜色序列
		 */
		public static var COLORS:Array = [
			0xFF6600, 0x666666, 0x336699, 
			0x56C0D1, 0x2C73C6, 0xF2DE45, 0xF6A023, 0x9BC646, 0x388B2F, 0x896CB9, 0x492B94, 0xF8865C, 0xF3241C, 
			0x9ED7E8, 0x88ABE4, 0xFFF39A, 0xFFCF8B, 0xC2E28B, 0x6FA56B, 0xBFAFD8, 0x573D94, 0xFFC0A9, 0xEF7E79, 
			0x087284, 0x033671, 0xB4A000, 0x915700, 0x314900, 0x052F00, 0x6739B1, 0x240963, 0xCF5021, 0x760400
		];
		
		/**
		 * @private
		 * 默认的dataField
		 */
		public static const VALUE_FIELD:String = "data";
		
		/**
		 * @private
		 * 默认的labelField
		 */
		public static const CATEGORY_FIELD:String = "label";
		
		/**
		 * @private
		 * grid索引，也包含了下面按照位置索引的valuegrid
		 */
		protected var _gridsHash:Object = {};
		
		/**
		 * @private
		 * 按照位置索引的valuegrid，建立这个索引，由于valuegrid不显式对应某个daatField，可能是多个dataField
		 */
		protected var _gridsHashByPlacement:Object = {};
		
		/**
		 * @private
		 * 折线图索引
		 * [{datdField, categoryField, categoryGridPlacement, valueGridPlacement}]
		 */
		protected var _lineGraphsHash:Array = [];
		
		/**
		 * @private
		 * 柱图索引
		 * [{datdField, categoryField, categoryGridPlacement, valueGridPlacement, stack}]
		 */
		protected var _barGraphsHash:Array = [];
		
		public function GridBasedChart() {
			super();
		}
		
		/**
		 *  @private
		 */
		override public function set width(value:Number):void {
			super.width = value;
			
			for (var dataField:String in _gridsHash) {
				_gridsHash[dataField].width = value;
			}
		}

		/**
		 *  @private
		 */
		override public function set height(value:Number):void {
			super.height = value;
			
			for (var dataField:String in _gridsHash) {
				_gridsHash[dataField].width = value;
			}
		}

		/**
		 *	@private
		 */
		override public function set data(value:*):void {
			super.data = value;
			
			//由于valueGrid没必要设置data属性，这个地方有点问题...
			for (var dataField:String in _gridsHash) {
				_gridsHash[dataField].data = getDataOfField(dataField);
			}
		}
		
		/**
		 *	添加一个坐标网格
		 */
		public function addGrid(grid:Grid, dataField:String):void {
			_gridsHash[dataField] = grid;
			
			grid.width = _width;
			grid.height = _height;
			if(_data) {
				//grid.data = getDataOfField(dataField);
				
				//需要区分categorygrid | valuegrid
				//横轴，直接设置数据
				///纵轴，不设置任何数据
				if(grid is CategoryGrid) {
					
					//如果是横轴，只需要将label数组设置即可
					grid.data = getDataOfField(dataField);
					
				}
			}
			
			addChild(grid);
		}
		
		/**
		 *	根据数据字段获得对应坐标网格的引用
		 */
		public function getGridByDataField(dataField:String):Grid {
			return _gridsHash[dataField];
		}
		
		/**
		 *	删除一个坐标网格
		 */
		public function removeGrid(grid:Grid):void {
			for (var dataField:String in _gridsHash) {
				if (_gridsHash[dataField] == grid) {
					if (this.contains(grid)) {
						this.removeChild(grid);
					}
					delete _gridsHash[dataField];
					return;
				}
			}
		}
		
		/**
		 *	根据数据字段来删除对应的坐标网格
		 */
		public function removeGridByDataField(dataField:String):void {
			for (var field:String in _gridsHash) {
				if (field == dataField) {
					var grid:Grid = _gridsHash[field];
					if (this.contains(grid)) {
						this.removeChild(grid);
					}
					delete _gridsHash[field];
					return;
				}
			}
		}
		
		/**
		 * 设置坐标轴的单个样式
		 * @param	dataField	<String>坐标轴
		 * @param	key		<String>样式类型
		 * @param	value	样式值
		 */
		public function setGridStyle(dataField:String, key:String, value:*):void {
			var grid:Grid = getGridByDataField(dataField);
			if(grid) {
				grid.setStyle(key, value);
			}
		}
		
		/**
		 * 设置坐标轴的多个样式
		 * @param	dataField	<String>坐标轴
		 * @param	stylesObj	<Object>样式对象，如果为null则恢复默认样式
		 */
		public function setGridStyles(dataField:String, stylesObj:Object):void {
			var grid:Grid = getGridByDataField(dataField);
			if(grid) {
				grid.setStyles(stylesObj);
			}
		}
		
		/**
		 * 设置图形的单个样式
		 * @param	dataField	<String>图形
		 * @param	key		<String>样式类型
		 * @param	value	样式值
		 */
		public function setGraphStyle(dataField:String, key:String, value:*):void {
			var graph:GridBasedGraph = getGraphByDataField(dataField) as GridBasedGraph;
			if(graph) {
				graph.setStyle(key, value);
			}
		}
		
		/**
		 * 设置图形的多个样式
		 * @param	dataField	<String>坐标轴
		 * @param	stylesObj	<Object>样式对象，如果为null则恢复默认样式
		 */
		public function setGraphStyles(dataField:String, stylesObj:Object):void {
			var graph:GridBasedGraph = getGraphByDataField(dataField) as GridBasedGraph;
			if(graph) {
				graph.setStyles(stylesObj);
			}
		}
		
		/**
		 * 按照指定的位置.数据字段添加柱图
		 * @params	dataField				<String>添加的柱图对应的数据字段
		 * @params	categoryField			<String>添加的柱图对应的横轴字段
		 * @params	categoryGridPlacement	<String>柱图对应的横轴的位置，默认为底部
		 * @params	valueGridPlacement		<String>柱图对应的数值轴的位置，默认为左侧
		 */
		public function addBarGraph(dataField:String = VALUE_FIELD, categoryField:String = CATEGORY_FIELD, categoryGridPlacement:String = GridPlacement.BOTTOM, valueGridPlacement:String = GridPlacement.LEFT, stack:Boolean = false):void {
			_barGraphsHash.push([dataField, categoryField, categoryGridPlacement, valueGridPlacement, stack]);
			invalidate(DVBase.INVALID_TYPE_DATA);
		}
		
		/**
		 * 按照指定的位置.数据字段添加折线图
		 * @params	dataField				<String>添加的柱图对应的数据字段
		 * @params	categoryField			<String>添加的柱图对应的横轴字段
		 * @params	categoryGridPlacement	<String>柱图对应的横轴的位置，默认为底部
		 * @params	valueGridPlacement		<String>柱图对应的数值轴的位置，默认为左侧
		 */
		public function addLineGraph(dataField:String = VALUE_FIELD, categoryField:String = CATEGORY_FIELD, categoryGridPlacement:String = GridPlacement.BOTTOM, valueGridPlacement:String = GridPlacement.LEFT):void {
			_lineGraphsHash.push([dataField, categoryField, categoryGridPlacement, valueGridPlacement]);
			invalidate(DVBase.INVALID_TYPE_DATA);
		}
		
		/**
		 * 根据数据字段添加基于坐标网格的图形
		 * @params	gridBasedGraph			<GridBasedGraph>graph
		 * @params	dataField				<String>添加的柱图对应的数据字段
		 * @params	categoryField			<String>添加的柱图对应的横轴字段
		 * @params	categoryGridPlacement	<String>柱图对应的横轴的位置，默认为底部
		 * @params	valueGridPlacement		<String>柱图对应的数值轴的位置，默认为左侧
		 * @params	stack					<Boolean>是否堆叠，柱图堆叠会影响最大值计算
		 */
		protected function addGridBasedGraph(gridBasedGraph:GridBasedGraph, dataField:String = VALUE_FIELD, categoryField:String = CATEGORY_FIELD, categoryGridPlacement:String = GridPlacement.BOTTOM, valueGridPlacement:String = GridPlacement.LEFT, stack:Boolean = false):void {
			
			//横轴
			var cgrid:CategoryGrid = getGridByDataField(categoryField) as CategoryGrid;
			if(!cgrid) {
				cgrid = new CategoryGrid();
				addGrid(cgrid, categoryField);
				cgrid.placement = categoryGridPlacement;
			}
			cgrid.validateNow();
			
			//纵轴，不能根据valueField去查找，因为不同的dataField，对应同一个valuegrid
			//var vgrid:ValueGrid = getGridByDataField(categoryField) as ValueGrid;
			var vgrid:ValueGrid = _gridsHashByPlacement[valueGridPlacement] as ValueGrid;
			if(!vgrid) {
				vgrid = new ValueGrid();
				addGrid(vgrid, dataField);
				_gridsHashByPlacement[valueGridPlacement] = vgrid;
				vgrid.placement = valueGridPlacement;
			}
			
			//同时，如果某个轴已经存在，需要充足新计算其最大最小值
			var max:Number = vgrid.maxValue;
			var maxNew:Number = getMaxValueByDataField(dataField, stack);
			var min:Number = 0;
			if(isNaN(max)) {
				max = maxNew;
			}else {
				if(max < maxNew) {
					max = maxNew;
				}
			}
			vgrid.rawMaxValue = max;
			vgrid.rawMinValue = min;
			vgrid.validateNow();
			
			//图形
			gridBasedGraph.categoryGrid = cgrid;
			gridBasedGraph.valueGrid = vgrid;
			addGraph(gridBasedGraph, dataField);
			gridBasedGraph.validateNow();
		}
		
		/**
		*	@private
		*/
		override protected function applyChanges():void {
			
			if(isInvalidOnly(INVALID_TYPE_SHOWDATATIPS)) {
				
				//处理监听
				handleListener();
				
			}else {
				
				//清除现有图形
				clearGraph();
				
				//绘制图形
				genGraph();
				
				//处理监听
				handleListener();
			}
		}
		
		/**
		 * @private
		 * 清除现有图形
		 */
		protected function clearGraph():void {
			
		}
		
		/**
		 * @private
		 * 绘制图形
		 */
		protected function genGraph():void {
			var i:int = 0;
			var color:int = 0;
			
			//有多少个柱图
			var numBarGraphs:uint = _barGraphsHash.length;
			
			//添加柱图
			for(i = 0; i < numBarGraphs; i++) {
				var barData:Array = _barGraphsHash[i];
				var barGraph:BarGraph = new BarGraph();
				barGraph.itemRenderer = BarItem;
				
				//这个地方写死了barWidth
				barGraph.barWidth = 20;
				
				//样式
				var stack:Boolean = barData[4];
				var dLen:int = 1;
				if(_data[0][barData[0]] is Array) {
					dLen = _data[0][barData[0]].length;
				}
				for(var j:int = 0; j < dLen; j++) {
					color = COLORS.shift();
					COLORS.push(color);
					barGraph.setSeriesStyles(j, 
						{
							fillColor:color,
							fillAlpha:0.7, 
							emphasizedFillColor:changeBrightness(color, 30),
							emphasizedFillAlpha:1
						}
					);
				}
				
				//柱状图需要做偏移barWidth20 bar间隔5
				var inter:Boolean = (numBarGraphs % 2 == 0);
				var ti:int = Math.floor(numBarGraphs / 2);
				var padding:Number;
				if (inter) {
					padding = 25 * (i - ti + 0.5);
				}else {
					padding = 25 * (i - ti);
				}
				barGraph.x = 0 - padding;
				
				barGraph.stack = stack;
				addGridBasedGraph(barGraph, barData[0], barData[1], barData[2], barData[3], stack);
			}
			
			//有多少个折线图
			var numLineGraphs:uint = _lineGraphsHash.length;
			
			//添加折线图
			for(i = 0; i < numLineGraphs; i++) {
				var lineData:Array = _lineGraphsHash[i];
				var lineGraph:LineGraph = new LineGraph();
				lineGraph.itemRenderer = PointItem;
				
				//样式
				color = COLORS.shift();
				COLORS.push(color);
				lineGraph.setStyle("lineStyle", new LineStyle(color, 2, 1));
				lineGraph.setItemStyles(
					{
						fillColor:color, 
						size:4,
						fillAlpha:0.7, 
						emphasizedFillColor:changeBrightness(color, 30),
						emphasizedFillAlpha:1
					}
				);
				
				addGridBasedGraph(lineGraph, lineData[0], lineData[1], lineData[2], lineData[3], false);
			}
		}
		
		/**
		 * @private
		 * 处理监听
		 */
		protected function handleListener():void {
			//遍历所有存在的graph
			for(var dataField:String in _graphsHash) {
				var graph:GridBasedGraph = _graphsHash[dataField] as GridBasedGraph;
				
				//是添加还是删除监听
				if(_showDataTips) {
					graph.addEventListener(ItemEvent.ITEM_OVER, doChartItemEvent);
					graph.addEventListener(ItemEvent.ITEM_OUT, doChartItemEvent);
					graph.addEventListener(ItemEvent.ITEM_CLICK, doChartItemEvent);
				}else {
					graph.removeEventListener(ItemEvent.ITEM_OVER, doChartItemEvent);
					graph.removeEventListener(ItemEvent.ITEM_OUT, doChartItemEvent);
					graph.removeEventListener(ItemEvent.ITEM_CLICK, doChartItemEvent);
				}
			}
		}
		
		/**
		 * 鼠标交互行为
		 */
		protected function doChartItemEvent(evt:ItemEvent):void {
			var graph:GridBasedGraph = evt.target as GridBasedGraph;
			var index:int = evt.index;
			var type:String = evt.type;
			
			switch(type) {
				
				//over
				case ItemEvent.ITEM_OVER:
					//清除旧的tips
					if(_tips) {
						removeChild(_tips);
						_tips = null;
					}
					
					//创建新的tips
					_tips = new Sprite();
					_tips.mouseChildren = false;
					_tips.mouseEnabled = false;
					
					//默认的render
					if(!_tipsRender) {
						_tipsRender = TipsRender;
					}
					
					//tips背景
					var tipsbg:Sprite = new _tipsRender();
					tipsbg.width = 50;
					tipsbg.height = 20;
					_tips.addChild(tipsbg);
					
					//文字标签
					
					//计算位置
					var tx:Number = 0;
					var ty:Number = 0;
					var point:Point = graph.getPointByIndex(index);
					tx = graph.x + point.x - _tips.width / 2;
					ty = graph.y + point.y - 30;
					
					//添加到合适位置
					addChild(_tips);
					_tips.x = tx;
					_tips.y = ty;
					
					//高亮
					graph.emphasizeItem(index);
					break;
				
				//out
				case ItemEvent.ITEM_OUT:
					//清除旧的tips
					if(_tips) {
						removeChild(_tips);
						_tips = null;
					}
					
					//恢复高亮
					graph.normalizeItem(index);
					break;
				
				//click
				case ItemEvent.ITEM_CLICK:
					break;
				
				default:
					break;
			}
		}
		
		/**
		 * @private
		 * 根据某个字段，计算对应数据的最大值
		 * 最多支持2层[], [[], [], []]
		 */
		private function getMaxValueByDataField(dataField:String, stack:Boolean = false):Number {
			var max:Number = 0;
			
			//最多支持2层[], [[], [], []]
			var tmpDataArray:Array = getDataOfField(dataField);
			
			if(tmpDataArray && tmpDataArray.length > 0) {
				
				if(tmpDataArray[0] is Array) {
					
					//如果堆叠，需要将每一项添加起来
					if(stack) {
						for(var i:int = 0, iLen:int = tmpDataArray.length; i < iLen; i++) {
							var sum:Number = 0;
							for(var j:int = 0, jLen:int = tmpDataArray[i].length; j < jLen; j++) {
								sum += tmpDataArray[i][j];
							}
							tmpDataArray[i] = sum;
						}
					}else {
						tmpDataArray = tmpDataArray.join("$").split(",").join("$").split("$");
					}
				}
				max = Math.max.apply(Math, tmpDataArray);
			}
			
			return max;
		}
		
		/**
		* 调整某个颜色的亮度
		* rgb:以RGB模式表示的颜色值
		* brite:亮度调整幅度0不变255全白-255全黑
		*/
		private function changeBrightness(rgb:uint, brightness:Number):uint {
			var r:Number = Math.max(Math.min(((rgb >> 16) & 0xFF) + brightness, 255), 0);
			var g:Number = Math.max(Math.min(((rgb >> 8) & 0xFF) + brightness, 255), 0);
			var b:Number = Math.max(Math.min((rgb & 0xFF) + brightness, 255), 0);
			
			return (r << 16) | (g << 8) | b;
		} 

	
	}
}

