import React from 'react';
// @ts-ignore
import WaterMark from '@pansy/react-watermark';

export default () => {
  return (
    <WaterMark style={{ width: 500, height: 300 }} text="王幸康">
      <div>
        <button>
          123
        </button>
      </div>
    </WaterMark>
  )
}
