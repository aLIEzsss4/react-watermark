import { CSSProperties } from 'react';
import { Options } from '../interface';

const encrypt = (str) => {
  return window.btoa(decodeURI(encodeURIComponent(str)))
}

export const genRandomId = (prefix = '') => {
  return `${encrypt(prefix)}-${(new Date()).getTime()}-${Math.floor(Math.random() * Math.pow(10, 8))}`
}

export const getStyleStr = (style: CSSProperties = {}): string => {
  let str = '';

  Object.keys(style).forEach(item => {
    const key = item.replace(/([A-Z])/g, '-$1').toLowerCase();
    str += `${key}:${style[item]};`
  })

  return str;
}

export function getWaterMarkCanvas(text: string, options: Options) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const canvasWidth = 4000;
  const canvasHeight = 4000;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  context.textAlign = options.textAlign;
  context.textBaseline = options.textBaseline;
  context.globalAlpha = options.globalAlpha;
  context.font = options.font;

  context.translate(canvasWidth / 2, canvasHeight / 2);
  context.rotate(options.rotateAngle);

  context.translate(-canvasWidth / 2 * 1.2, -canvasHeight / 2 * 1.2)
  context.fillStyle = options.fillStyle;

  const waterMarkText = [];
  const chunkWidth = options.chunkWidth;
  const chunkHeight = options.chunkHeight;
  const horizontalChunkCount = Math.ceil(canvasWidth / chunkWidth) + 1;
  const verticalChunkCount = Math.ceil(canvasHeight / chunkHeight) + 1;

  for (let j = 0, initY = chunkHeight / 2, indent = 0; j <= verticalChunkCount; j += 1) {
    indent = parseInt((j % 2) + '');

    for (let i = 0, initX = chunkWidth / 2; i <= horizontalChunkCount; i += 1) {
      waterMarkText.push({
        text,
        x: i * chunkWidth + indent * initX,
        y: j * chunkHeight + initY
      })
    }
  }

  waterMarkText.forEach((item) => {
    context.fillText(item.text, item.x, item.y)
  })

  return context.canvas.toDataURL();
}

export { default as SecurityDefense } from './security-defense';
