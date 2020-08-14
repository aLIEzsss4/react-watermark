export interface Options {
  /**
   * 水印区域的宽度
   */
  chunkWidth?: number;
  /**
   * 水印区域的宽度
   */
  chunkHeight?: number;
  /**
   * 文本的位置
   */
  textAlign?: CanvasTextAlign;
  /**
   * 绘制文本时使用的文本基线
   */
  textBaseline?: CanvasTextBaseline;
  /**
   * 透明度, 取值 [0, 1]
   */
  globalAlpha?: number;
  /**
   * 旋转的角度
   */
  rotateAngle?: number;
  /**
   * 设置绘画的颜色、渐变或模式
   */
  fillStyle?: string;
  /**
   * 设置文本内容的字体属性
   */
  font?: string;
}

export interface WatermarkDOM {
  watermarkId: string;
  watermarkWrapperId: string;
}

export interface Observers {
  DOMRemoveObserver?: MutationObserver;
  DOMAttrModifiedObserver?: MutationObserver;
}
