﻿package baidu.lib.images {
    import flash.display.BitmapData;
    import flash.utils.ByteArray;    

    /**
     * PNG图片数据生成器（注:从Adobe as3corelib 库引入并稍微修改）
     * @author xiaokun
     */
    public class PNGEncoder {

        /**
         * 构造函数
         */
        public function PNGEncoder() {
        }

        /**
         * 根据给定的BitmapData对象生成PNG图片数据
         * @param	img				<BitmapData>给定图像的BitmapData对象
         * @return					<ByteArray>生成的PNG图片ByteArray数据
         */
        public function encode(img:BitmapData):ByteArray {
            var png:ByteArray = new ByteArray();
            png.writeUnsignedInt(0x89504e47);
            png.writeUnsignedInt(0x0D0A1A0A);
            var IHDR:ByteArray = new ByteArray();
            IHDR.writeInt(img.width);
            IHDR.writeInt(img.height);
            IHDR.writeUnsignedInt(0x08060000);
            IHDR.writeByte(0);
            writeChunk(png, 0x49484452, IHDR);
            var IDAT:ByteArray = new ByteArray();
            for(var i:int = 0;i < img.height;i++) {
                IDAT.writeByte(0);
                var p:uint;
                var j:int;
                if ( !img.transparent ) {
                    for(j = 0;j < img.width;j++) {
                        p = img.getPixel(j, i);
                        IDAT.writeUnsignedInt(uint(((p & 0xFFFFFF) << 8) | 0xFF));
                    }
                } else {
                    for(j = 0;j < img.width;j++) {
                        p = img.getPixel32(j, i);
                        IDAT.writeUnsignedInt(uint(((p & 0xFFFFFF) << 8) | (p >>> 24)));
                    }
                }
            }
            IDAT.compress();
            writeChunk(png, 0x49444154, IDAT);
            writeChunk(png, 0x49454E44, null);
            return png;
        }

        private var crcTable:Array;
        private var crcTableComputed:Boolean = false;

        private function writeChunk(png:ByteArray, type:uint, data:ByteArray):void {
            if (!crcTableComputed) {
                crcTableComputed = true;
                crcTable = [];
                var c:uint;
                for (var n:uint = 0;n < 256; n++) {
                    c = n;
                    for (var k:uint = 0;k < 8; k++) {
                        if (c & 1) {
                            c = uint(uint(0xedb88320) ^ uint(c >>> 1));
                        } else {
                            c = uint(c >>> 1);
                        }
                    }
                    crcTable[n] = c;
                }
            }
            var len:uint = 0;
            if (data != null) {
                len = data.length;
            }
            png.writeUnsignedInt(len);
            var p:uint = png.position;
            png.writeUnsignedInt(type);
            if ( data != null ) {
                png.writeBytes(data);
            }
            var e:uint = png.position;
            png.position = p;
            c = 0xffffffff;
            for (var i:int = 0;i < (e - p); i++) {
                c = uint(crcTable[
	                (c ^ png.readUnsignedByte()) & uint(0xff)] ^ uint(c >>> 8));
            }
            c = uint(c ^ uint(0xffffffff));
            png.position = e;
            png.writeUnsignedInt(c);
        }
    }
}