export interface Options {
  chunkWidth: number;
  chunkHeight: number;
  textAlign: CanvasTextAlign;
  textBaseline: CanvasTextBaseline;
  globalAlpha: number;
  rotateAngle: number;
  fillStyle: string;
  font: string;
}

export interface WatermarkDOM {
  watermarkId: string;
  watermarkWrapperId: string;
}

export interface Observers {
  DOMRemoveObserver?: MutationObserver;
  DOMAttrModifiedObserver?: MutationObserver;
}
