package {
	import flash.display.Shape;
	import flash.display.Sprite;
	import flash.display.Graphics;
	import flash.text.TextFormat;
	import flash.text.TextField;
	import flash.text.TextFieldAutoSize;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.external.ExternalInterface;
	
	import flash.system.System;
	import baidu.dv.core.GridPlacement;
	import baidu.dv.core.LineStyle;
	import baidu.dv.grids.ValueGrid;
	import baidu.dv.grids.CategoryGrid;
	import baidu.dv.graphs.LineGraph;
	import baidu.dv.graphs.PointItem;
	import baidu.dv.events.ItemEvent;
	import baidu.ui.controls.CheckBox;	
	
    import baidu.ui.controls.CheckBoxGroup;
    import baidu.ui.controls.LabelButton;   
	 import baidu.ui.controls.RadioButton;	
	import XmlLoader;
	import CommodityData;
	import ToolTips;
	import flash.events.KeyboardEvent;

	/**
	 *  LineGraph测试用例
	 *  @author xiaokun
	 */
	public class main extends Sprite {
		
		private var xl:XmlLoader;
        private var ComData:CommodityData;
		private var ComDataArr:Array;            //原始cdata文件加载下来的数组
		private var ComArr:Array;                //ComDataArr按在做标注上显示的前两个数据排在数组前面而重新排序后的数组。
		private var n:int = 1;                   //要选中数据类别id
		private var feny:int = 4;                //Y轴分的份数
		private var maxY = Number;
		private var average:Number;              //报表数据平均值
		private var arrX:Array = new Array();    //X轴上的数据。
		private var arrY:Array = new Array();    //Y轴上的数据。
		private var arrXX:Array = new Array();   //X轴上的没有年的数据。
		private var yarr:Array = new Array();    //Y轴坐标轴上的值
		private var g:Sprite = new Sprite();     //虚线代表平均数
		
		private var rb_label:TextField;             //Y轴类别名称；
		private var average_labelnum:TextField;     //平均数的数值文本
		private var average_labelstr:TextField;     //平均数显示平均文本
		private var bg_ave:bg_average=new bg_average();
		
		private var _cGrid:CategoryGrid;         //X轴
		private var _vGrid:ValueGrid;            //Y轴
		private var _lineGraph:LineGraph;
		private var _mouseLayer:Sprite;
		private var xml:String = "";
		private var Stage_Width:Number;
		private var SW:Number = 0;
		
	/*	private var rb_expenditure:RadioButton ;    //消费 的选择按钮
		private var rb_clicks:RadioButton ;         //点击 的选择按钮
		private var rb_clickratio:RadioButton ;     //点击率 的选择按钮
		private var rb_opens:RadioButton ;          //展现量 的选择按钮   */
		
		private var cb_average:CheckBox ;           //平均数 的选择按钮
		private var _tool:ToolTips;
		private var v_expenditure:Number = -1;     
		
		public function main() {
			
		    stage.showDefaultContextMenu = false;
			stage.scaleMode = "noScale";
			stage.align = "TL";
			System.useCodePage = true;
			this.addEventListener(Event.ENTER_FRAME, selfLoad);
		}
		
		/**
		 * 确保自身加载
		 * @param	evt
		 */
		private function selfLoad(evt:Event):void {
			if (stage.stageWidth > 0 && stage.stageHeight > 0) {
				this.removeEventListener(Event.ENTER_FRAME, selfLoad);
			    try {
					var id:String = this.loaderInfo.parameters["id"];
					var str:String = this.loaderInfo.parameters["js"]+'onLoad';
					ExternalInterface.addCallback("getXmlData", parseXmlData);
					if (id != " ") {
						ExternalInterface.call(str,id);
					}
					
			    }catch (e:Error) { }
               //---------测试的数据-----------------
               //init('<?xml version="1.0" encoding="utf-8" ?> <rootd  type="opens"><cell time="2010-01-01" clicks="0" clickratio="0.0055" opens="0" expenditure="-1" /> <cell time="2010-01-02" clicks="0" clickratio="0.0655" opens="0" expenditure="0" /> <cell time="2010-01-03" clicks="0" clickratio="0.0675" opens="0" expenditure="66800" /> <cell time="2010-01-04" clicks="0" clickratio="0.0875" opens="0" expenditure="76800" /> <cell time="2010-01-05" clicks="0" clickratio="0.0645" opens="0" expenditure="86800" /> <cell time="2010-01-06" clicks="0" clickratio="0.0955" opens="0" expenditure="96800" /> <cell time="2010-01-07" clicks="0" clickratio="0.0995" opens="0" expenditure="57800" /> </rootd>');
			   //init('<?xml version="1.0" encoding="utf-8" ?><rootd type="expenditure"><cell time="04-12~04-14(2011)" clicks="25947" clickratio="0.12" opens="22542433" expenditure="223.24" /><cell time="04-15~04-17" clicks="285" clickratio="0.05" opens="543712" expenditure="112.12" /><cell time="04-18~04-20" clicks="0" clickratio="0" opens="0" expenditure="0" /><cell time="04-21~04-23" clicks="5728" clickratio="0.04" opens="12757797" expenditure="0" /><cell time="04-24~04-26" clicks="0" clickratio="0" opens="0" expenditure="0" /><cell time="04-27~04-29" clicks="0" clickratio="0" opens="0" expenditure="0" /><cell time="04-30~05-02" clicks="0" clickratio="0" opens="0" expenditure="0" /><cell time="05-03" clicks="2765" clickratio="0.07" opens="3947534" expenditure="112.12" /><cell time="05-03" clicks="2765" clickratio="0.07" opens="3947534" expenditure="112.12" /><cell time="05-03" clicks="2765" clickratio="0.07" opens="3947534" expenditure="112.12" /><cell time="05-03" clicks="2765" clickratio="0.07" opens="3947534" expenditure="112.12" /><cell time="05-03" clicks="2765" clickratio="0.07" opens="3947534" expenditure="112.12" /><cell time="05-03" clicks="2765" clickratio="0.07" opens="3947534" expenditure="112.12" /><cell time="05-03" clicks="2765" clickratio="0.07" opens="3947534" expenditure="112.12" /><cell time="05-03" clicks="2765" clickratio="0.07" opens="3947534" expenditure="112.12" /></rootd>');
			   //init('<?xml version="1.0" encoding="utf-8" ?><rootd type="expenditure"></rootd>');
			}
		}
		//=====================================
		
		private function parseXmlData(_xml:String):void {
			//xl = new XmlLoader(url);
		    //xl.addEventListener("XML_LOAD_COMPLETE", init);
			xml = _xml;
			init(xml);
		}
		private function init(x_xml:String):void {
			clearInterface();
			
			xml = x_xml;
			Stage_Width = stage.stageWidth;
			SW = Stage_Width - 180;
			var chaZ:Number = 800 - Stage_Width;
			//trace(Stage_Width+"800+++++++++++++++++++++++++++++++++++++++++++++++++++");
			//stage.hasEventListener(Event.RESIZE)
				//xl = new XmlLoader("../doc/cdata.xml");
		    //xl.addEventListener("XML_LOAD_COMPLETE", init);
			//try{
               //ExternalInterface.addCallback("getXmlData", parseXmlData);
			//}catch(e:Error){}
			
           /* rb_expenditure = new RadioButton();
            addChild(rb_expenditure);
            rb_expenditure.setPosition(0, 5);
            rb_expenditure.setSize(200, 20);
            rb_expenditure.value = "xiaofei";
			rb_expenditure.label = "消费";
            rb_expenditure.groupName = "nick";
			rb_expenditure.selected = true;
		
            rb_clicks = new RadioButton();
            addChild(rb_clicks);
            rb_clicks.setPosition(100, 5);
            rb_clicks.setSize(200, 20);
            rb_clicks.value = "dianji";
			rb_clicks.label = "点击";
            rb_clicks.groupName = "nick";
			
            rb_clickratio = new RadioButton();
            addChild(rb_clickratio);
            rb_clickratio.setPosition(200, 5);
            rb_clickratio.setSize(200, 20);
            rb_clickratio.value = "dianjilv";
			rb_clickratio.label = "点击率";
            rb_clickratio.groupName = "nick";
			
		    rb_opens= new RadioButton();
            addChild(rb_opens);
            rb_opens.setPosition(300, 5);
            rb_opens.setSize(200, 20);
            rb_opens.value = "zhanxianliang";
			rb_opens.label = "展现量";
            rb_opens.groupName = "nick";   */
			
			cb_average = new CheckBox();
			addChild(cb_average);
			cb_average.setPosition(40, 250);
			cb_average.label = "显示平均值";
			
			rb_label = new TextField();
			rb_label.autoSize = TextFieldAutoSize.LEFT;
            rb_label.background = true;
            //label.border = true;

           /* var format:TextFormat = new TextFormat();
            format.font = "宋体";
            format.color = 0x000000;
            format.size = 12;
            //format.underline = true;

            rb_label.defaultTextFormat = format;
            addChild(rb_label);
			rb_label.text = "消费";
			rb_label.x = 60;
			rb_label.y = 35;  */
			//---------------------------------------------
			
			average_labelnum = new TextField();
			average_labelnum.autoSize = TextFieldAutoSize.RIGHT;
            average_labelnum.background = true;
			average_labelnum.x = 75;
            //label.border = true;
            //--------平均线的样式---------
            var format1:TextFormat = new TextFormat();
            format1.font = "宋体";
            format1.color = 0xFF9900;
            format1.size = 12;
            average_labelnum.defaultTextFormat = format1;
            
			//---------------------------------------------
			average_labelstr = new TextField();
			average_labelstr.autoSize = TextFieldAutoSize.RIGHT;
            average_labelstr.background = true;
            //rb_label.border = true;
            average_labelstr.defaultTextFormat = format1;
            addChild(average_labelstr);
			average_labelstr.x = 730-chaZ;
			average_labelstr.text = "平均";
			average_labelstr.visible = false;
			
			
			//-------平均线图片-----
			var ap:average_picture = new average_picture();
			this.addChild(ap);
			ap.x = 580-chaZ;
			ap.y = 250;
			
			//==============================初始化js传过来的数据==========================================================
			var _xml:XML = new XML(xml);
			ComData    = new CommodityData();
			ComDataArr = [];
			ComDataArr = ComData.parseXMLcd(_xml);  
			if (ComDataArr.length == 0) {
			    var	noData:NoData = new NoData();
				addChild(noData);
				noData.x = 230;
				noData.y = 150;
			}
			trace("==="+ComDataArr.length+"------"+ComDataArr);
			v_expenditure= ComDataArr[0][4]
			//trace(ComDataArr[5][5]+"----------===")
			/**
			 * X轴线和分割线
			 */
			_cGrid = new CategoryGrid();
			addChild(_cGrid);
			_cGrid.width = SW;          //初始是620
			_cGrid.height = 200;
			_cGrid.x = 80;
			_cGrid.y = 30;
			//_cGrid.placement = "top";
			_cGrid.showSplitLine = true; 
			_cGrid.showLastSplitLine= true;
			//_cGrid.data = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
			
            /**
			 * Y轴线和分割线
			 */
			_vGrid = new ValueGrid();
			addChild(_vGrid);
			_vGrid.rawMinValue = 0.01;
			_vGrid.assignedMinValue = 0;
			_vGrid.width = SW;
			_vGrid.height = 200;
			_vGrid.x = 80;
			_vGrid.y = 30;
			_vGrid.splitNumber = feny;       //Y轴分的份数
			_vGrid.showLastSplitLine= true;
			_vGrid.showFirstAxisLabel = true;

			_mouseLayer = new Sprite();
			addChild(_mouseLayer);
			_mouseLayer.x = 80;
			_mouseLayer.y = 30;
			var gp:Graphics = _mouseLayer.graphics;
			gp.beginFill(0, 0);
			gp.drawRect(0, 0, SW, 200);
			gp.endFill();
			_mouseLayer.addEventListener(MouseEvent.ROLL_OVER, doGraphMouseOver);
			_mouseLayer.addEventListener(MouseEvent.ROLL_OUT, doGraphMouseOut);

			_lineGraph = new LineGraph();
				
			_mouseLayer.addChild(_lineGraph);		//将_lineGraph放在_mouseLayer里是为了更准确的操作Over和Out鼠标事件
			_lineGraph.categoryGrid = _cGrid;
			_lineGraph.valueGrid = _vGrid;
			
			_lineGraph.width = SW;
			_lineGraph.height = 200;
			_lineGraph.setStyle("lineStyle", new LineStyle(0x336699, 2, 1));
			//_lineGraph.setItemStyle("color", 0xFF6600);
			_lineGraph.setItemStyles(
				{
					fillColor:0x336699, 
					fillAlpha:0.9,
					size:4,
					emphasizedFillColor:0xFFFFFF,
					emphasizedFillAlpha:1,
					emphasizedBorderStyle:new LineStyle(0x336699, 3, 1),
					emphasizedSize:4
				}
			);
			trace("HELLO WORLD--------------------------------");
			/**
			 * ToolTips为鼠标移到折线点上时显示的该点信息对象
			 */
		    _tool = new ToolTips();
            _tool.visible = false;
			this.addChild(_tool);

			_lineGraph.addEventListener(ItemEvent.ITEM_OVER, doLineGraphItemOver);
			_lineGraph.addEventListener(ItemEvent.ITEM_OUT, doLineGraphItemOut);
			_lineGraph.addEventListener(ItemEvent.ITEM_CLICK, doLineGraphItemClick);
			_lineGraph.itemRenderer = PointItem;
			
            //rb_expenditure.addEventListener(Event.CHANGE, setchange);
			cb_average.addEventListener(Event.CHANGE, setchange);
			changeData();
			
			if (!stage.hasEventListener(Event.RESIZE)) {
				stage.addEventListener(Event.RESIZE, stageResize);
			}
			//bg_ave = new bg_average();
			bg_ave.visible = false;
			addChild(bg_ave);
			addChild(average_labelnum);
			this.addChild(g);  //平均值的虚线
		}
		/**
		 * 宽度自适应
		 */
		private function stageResize(evt:Event = null):void {
			//trace(Stage_Width+"--------");
			if(stage.stageWidth != Stage_Width){
				init(xml);
			}
		}
		/**
		 * 清除界面
		 */
		private function clearInterface():void {
			while (this.numChildren) {
				this.removeChildAt(0);
			}
		}
		private function setchange(evt:Event):void {
				changeData();
		}
		/**
		 * 不同类数据转换时对数据的更新；
		 */
		private function changeData():void {//-------------------------------------------------------------------
			// trace("你选择了" + group.selectedData.length + "个：" + group.selectedData);
			if (cb_average.selected) {
				g.visible = true;
				average_labelstr.visible = true;
				average_labelnum.visible = true;
			}
			else {
					g.visible = false;
				    average_labelstr.visible = false;
				    average_labelnum.visible = false;
				}
			 var str:String = String(ComDataArr[0][5]) ;
            if(v_expenditure!=-1)
			{  
				switch(str)
			    {
					 case "clicks": 
					 //rb_label.text = "点击";
					 n = 1; 
					 break;
					 case "clickratio": 
					 //rb_label.text = "点击率";
					 n = 2; 
					 break;
					 case "opens":
					// rb_label.text = "展现量";
					 n = 3;  
					 break;
					 case "expenditure":
					// rb_label.text = "消费";
					 n = 4;  
					 break;
			    }	
	    	}else 
			{
				switch(str)
			    {
					 case "clicks": 
					 //rb_label.text = "点击";
					 n = 1; 
					 break;
					 case "clickratio": 
					 //rb_label.text = "点击率";
					 n = 2; 
					 break;
					 case "opens":
					// rb_label.text = "展现量";
					 n = 3;  
					 break;
					 case "expenditure":
					// rb_label.text = "消费";
					 n = 1;  
					 break;
			    }
			}
			ComArr     = ComData.cellData(ComDataArr, n);
			maxY       = ComData._maxY(ComArr);
			
			// 重置相关数组
			arrX = new Array();
			arrY = new Array();
			arrXX = new Array();
			yarr = new Array();
			
			for (var i:int = 0; i < ComArr.length; i++ )
			{
				arrY[i]  = ComArr[i][1];
				arrX[i]  = ComArr[i][0];
				//arrXX[i] = arrX[i].substr(5);
				arrXX[i] = arrX[i]
			}
			//=========================
		 	_cGrid.data = arrXX;                  //X轴上显示的数据 
			//_vGrid.rawMaxValue = maxY;          //y轴原始数据最大值
			if (maxY == 0)
				_vGrid.assignedMaxValue = 4;
			else
				_vGrid.assignedMaxValue = maxY;
			_lineGraph.data =  arrY;
			//_cGrid.data = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
			//trace(ComArr);
			var totalnum:Number=0;
			var tt:Number=0;
			for (var j:int = 0;j < ComArr.length;j++){
			  totalnum+=Number(ComArr[j][1]);
			}
			average = totalnum/ComArr.length;
			var averagey:Number;               //平均值所对应的Y坐标
			averagey = _vGrid.getPositionByValue(average)+_cGrid.y;
			drawAverage(averagey);
			average_labelstr.y = averagey - 10;
			if (average >= 1) average_labelnum.text = String(Math.round(average * 100) / 100);
			else average_labelnum.text = String((Math.round(average*10000)/10000).toFixed(2));
			for (i = 0; i <=feny ;i++ ) {
				yarr[i] = Number(maxY / feny)*i;
			}
			//平均数的文本位置
			
			for (i = 0; i <= feny ; i++ ) {
				if (average == yarr[i]) {
					bg_ave.visible = true;
					trace(average+"----------------"+yarr[i]);
					//average_labelnum.backgroundColor = 0xFFFFFF;
					//bg_ave.y = 0;
					average_labelnum.y = averagey-5;
					return;
				}
				if (yarr[i] < average && average < yarr[i+1])
				{
					var ttn:Number = (yarr[i + 1] - yarr[i]) * 0.5 + yarr[i];
					var tty1:Number = _vGrid.getPositionByValue(yarr[i + 1]) + _cGrid.y - 5;  
					var tty2:Number = _vGrid.getPositionByValue(yarr[i]) + _cGrid.y - 5; 
					average_labelnum.y = _vGrid.getPositionByValue(average) + _cGrid.y - 5;       
					var ttcha:Number = 0;
					if (average < ttn) { 
						ttcha =  tty2 - average_labelnum.y ;
						trace(ttcha);
						if (ttcha < 14) average_labelnum.y = average_labelnum.y - (14 - ttcha);		 //和Y轴上的数据保持至少7的距离			
						}
					else if (average > ttn) { 
						ttcha = average_labelnum.y-tty1;
						if (ttcha < 14) average_labelnum.y = average_labelnum.y+(14 - ttcha);		  //和Y轴上的数据保持至少7的距离		
					}
				    else {
						average_labelnum.y = _vGrid.getPositionByValue(average) + _cGrid.y - 5;	
					}
					return;
				}
			}	
			
			
		}//---------------------------------------------------------------------
		/**
		 *  画一虚线为平均数
		 * @param	_yy
		 */
		private function drawAverage(_yy:Number):void {
			//trace(g.numChildren);
			var g2:Sprite = new Sprite();
			if (g.numChildren > 0) { g.removeChildAt(0); }
			var _xx = _cGrid.x;
			g2.graphics.lineStyle(1,0xFF9900);
			g2.graphics.moveTo(_xx,_yy);
		    for (var i:int = 0; i < _cGrid.width/4; i+=4 )
			{
				g2.graphics.lineTo(_xx + 4*(i+1),_yy);
				g2.graphics.moveTo(_xx + 4*(i+2),_yy);
				g2.graphics.lineTo(_xx + 4 * (i + 3), _yy);
				g2.graphics.moveTo(_xx + 4*(i+4),_yy);
			}
			g.addChild(g2);
		}
		private function doGraphMouseOver(evt:MouseEvent):void {
			stage.addEventListener(MouseEvent.MOUSE_MOVE, doGraphMouseMove);
		}
		
		private function doGraphMouseMove(evt:MouseEvent):void {
			var index:int = _cGrid.getIndexByPosition(_mouseLayer.mouseX);
			_lineGraph.normalizeAllItems();
			_lineGraph.emphasizeItem(index);
		}
		
		private function doGraphMouseOut(evt:MouseEvent):void {
			stage.removeEventListener(MouseEvent.MOUSE_MOVE, doGraphMouseMove);
			_lineGraph.normalizeAllItems();
		}
	    /**
	     * 鼠标放在折线的圆点时显示的tips信息
	     * @param	evt
	     */	
		private function doLineGraphItemOver(evt:ItemEvent):void {
			trace("over:" + evt.index);
			var _x:Number = (_cGrid.width) / (ComArr.length-1)*evt.index+_cGrid.x+5;
			var _y:Number = _vGrid.getPositionByValue(ComArr[evt.index][1]) +_vGrid.y - 5;//+5改成-5
			if (_y>= 200)_y = _y - 80;
			//trace(_x+"---"+_y);
			//ExternalInterface.call("console.log", _x+"/"+_y + ":" + _tool.width + ":" + _cGrid.width);
			_tool.setContent(ComDataArr, evt.index, _x, _y);
			
			if (_x + _tool.width >= _cGrid.width) _x = _x - _tool.width - 10;
			_tool.setContent(ComDataArr, evt.index, _x, _y);
			//ExternalInterface.call("console.log", _x+ "/" +_y);

			_tool.visible = true;
		}
		
		private function doLineGraphItemOut(evt:ItemEvent):void {
			trace("out:" + evt.index);
			_tool.visible = false;
		}

		private function doLineGraphItemClick(evt:ItemEvent):void {
			trace("click:" + evt.index);
		}
	}
	
}