<h1 align="center">React Watermark</h1>

<h4 align="center">React watermark component<h4>

## ✨ 特性

* 不影响现有代码
* 支持一个页面添加多处不同水印
* 水印防被删(监听水印组件元素删除并重新添加，监听改变水印的属性并重新添加)

## 🏗 安装

```sh
// npm 安装
npm install --save @pansy/react-watermark

// yarn 安装
yarn add @pansy/react-watermark
```

## 🔨 使用

```
import React from 'react';
import Watermark from '@pansy/react-watermark';

export default () => {
  return (
    <WaterMark style={{ width: 500, height: '100%' }} text="测试水印">
      <div>
        <button>
          123
        </button>
      </div>
    </WaterMark>
  )
}
```
