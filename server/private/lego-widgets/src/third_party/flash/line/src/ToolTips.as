package
{
  import flash.display.Sprite;
  import flash.text.TextField;
  import flash.text.TextFormat;
  import flash.display.DisplayObjectContainer;
  import flash.display.InteractiveObject;
  import flash.display.*;
  
  public class ToolTips extends Sprite
  {
	  /**
       * 顶级容器。
       */
      private var _root:DisplayObjectContainer;
		
	  /**
       * tooltip的容器。
       */
      private var container:Sprite;
	  /**
       * 文本框。一个默认的tooltip。
       */
      private var textField:TextField;

  
	  public function ToolTips()
	  {
	        //容器
            container = new Sprite();
            container.mouseEnabled = false;
            container.tabEnabled = false;
            container.mouseChildren = false;
            
            //初始化动态文本
            textField = new TextField();
			textField.defaultTextFormat = new TextFormat(null, null, null, null, null, null, null, null, null, null, null, null, 4);
            textField.background = true;
            textField.backgroundColor = 0x000000;
            textField.border = true;
            textField.borderColor = 0x000000;
            textField.multiline = false;
            textField.wordWrap = false;
            textField.autoSize = "left";
            
            //设置动态文本样式
            var format:TextFormat = new TextFormat("宋体", 12, 0xffffff);
            format.indent = 2;
            textField.setTextFormat(format);
            textField.defaultTextFormat = format;
          //  timer.addEventListener(TimerEvent.TIMER, handleTimer);
          // delayTimer.addEventListener(TimerEvent.TIMER, toolTipDelayHandler);
	  }
	  public function Drawrect():void
	  {
	     var sp:Sprite=new Sprite();
		 sp.graphics.beginFill(0x112233);
		 sp.graphics.drawRect(0, 0, 20, 20);
		 this.addChild(sp);
	  }
	  public function setContent(arr:Array,n:int,_x:Number,_y:Number):void
	  {
		  var CellArr:Array = arr;
		  var s0:String = String(CellArr[n][0]);
		  var s1:String = String(CellArr[n][1]);
		  var s2:String = String(CellArr[n][2]);
		  var s3:String = String(CellArr[n][3]);
		  var s4:String = String(CellArr[n][4]);
		  //s2 = String(Number(s2)*100);
		  if (s4 != "-1" && s4 != "-1.00") {
			textField.text = s0 +  "\r消费：￥" + parseFloat(s4).toFixed(2) + "\r点击：" + s1 + "\r展现量：" + s3 +"\r点击率：" + s2 +"%";  
		  } else {
			textField.text = s0 + "\r点击：" + s1 + "\r展现量：" + s3 +"\r点击率：" + s2 +"%";  
		  }
		  textField.alpha = 0.7;
		  this.addChild(container);
		  container.blendMode = BlendMode.LAYER;
		  container.x = _x;
		  container.y = _y;
		  container.addChild(textField);
	  }
  }
}