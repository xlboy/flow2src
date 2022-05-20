import React, { memo } from 'react';
import { config } from '../pages/home/core/config';

interface LayoutContentProps {}

const LayoutContent: React.FC<LayoutContentProps> = () => {
  return <div className="app-layout-content" id={config.canvasId}></div>;
};

export default memo(LayoutContent);
