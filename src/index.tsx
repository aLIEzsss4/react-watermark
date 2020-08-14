import React from 'react';
import { getStyleStr, genRandomId, SecurityDefense, getWaterMarkCanvas } from './utils';
import { Options, Observers } from './interface';

export interface WatermarkProps {
  style?: React.CSSProperties;
  monitor?: boolean;
  /**
   * 水印文本
   */
  text?: string;
  /**
   * 水印配置
   */
  options?: Options;
  securityAlarm?: () => void;
}

const defaultOptions: Options = {
  chunkWidth: 200,
  chunkHeight: 60,
  textAlign: 'left',
  textBaseline: 'bottom',
  globalAlpha: 0.17,
  font: '14px Microsoft Yahei',
  rotateAngle: -0.26,
  fillStyle: '#666'
}

const defaultStyle: React.CSSProperties = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  opacity: 0.7,
  zIndex: 9999,
  pointerEvents: 'none',
  overflow: 'hidden',
  backgroundColor: 'transparent',
  backgroundRepeat: 'repeat'
};

const waterMarkStyle = getStyleStr(defaultStyle);
const noop = function () {};

const Watermark: React.FC<WatermarkProps> = ({
  style,
  text,
  monitor,
  options,
  securityAlarm,
  children
}) => {
  const watermarkId = genRandomId('watermark');
  const watermarkWrapperId = genRandomId('watermark-wrapper');

  const security = React.useRef<any>(null);
  const DOMRemoveObserver = React.useRef<any>();
  const DOMAttrModifiedObserver = React.useRef<any>();

  React.useEffect(() => {
    if (monitor) {
      security.current = new SecurityDefense(
        {
          watermarkId: watermarkId,
          watermarkWrapperId: watermarkWrapperId
        },
        {
          waterMarkStyle,
          getCanvasUrl: getCanvasUrl
        },
        {
          securityAlarm,
          updateObserver: updateObserver
        }
      );
    }
    return () => {
      DOMRemoveObserver.current && DOMRemoveObserver.current.disconnect();
      DOMAttrModifiedObserver.current && DOMAttrModifiedObserver.current.disconnect();
      security.current = null;
    }
  }, []);

  const getCanvasUrl = () => {
    const newOptions = Object.assign({}, defaultOptions, options)
    return getWaterMarkCanvas(text, newOptions)
  }

  const updateObserver = (observers: Observers = {}) => {
    if (observers.DOMRemoveObserver) {
      DOMRemoveObserver.current = observers.DOMRemoveObserver
    }
    if (observers.DOMAttrModifiedObserver) {
      DOMAttrModifiedObserver.current = observers.DOMAttrModifiedObserver
    }
  }

  const watermarkStyles: React.CSSProperties = {
    ...defaultStyle,
    backgroundImage: `url("${getCanvasUrl()}")`
  }

  return (
    <div style={{ ...style, position: 'relative', overflow: 'hidden' }} id={watermarkWrapperId}>
      <div style={watermarkStyles} id={watermarkId} />
      {children}
    </div>
  )
}

Watermark.defaultProps = {
  monitor: true,
  options: defaultOptions,
  securityAlarm: noop
}

export default Watermark;
