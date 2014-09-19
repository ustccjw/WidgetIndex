package baidu.fw.jsl {
    import flash.display.Stage;    
    import flash.external.ExternalInterface;    

    /**
     * 影片类。能控制Object/Embed标签的属性。
     * @author yaowei
     */
    public class Movie {

        private static var _stage:Stage;

        /**
         * 设置舞台。
         */
        public static function set stage(value:Stage):void {
            _stage = value;
        }

        /**
         * 设置/获取 宽度。
         */
        public static function get width():Number {
            return _stage.stageWidth;
        }

        public static function set width(value:Number):void {
            setSize(value, -1);
        }

        /**
         * 设置/获取 高度。
         */
        public static function get height():Number {
            return _stage.stageHeight;
        }

        public static function set height(value:Number):void {
            setSize(-1, value);
        }

        /**
         * 设置影片的尺寸。
         */
        public static function setSize(width:Number = -1,height:Number = -1):void {
            var p:String = 'var f = document["'+ExternalInterface.objectID+'"] || window["'+ExternalInterface.objectID+'"];';
            if(width != -1) {
                p += 'f.width = "' + width + '";';
            }
            if(height != -1) {
                p += 'f.height = "' + height + '";';
            }
            ExternalInterface.call("eval", p);
        }
    }
}
