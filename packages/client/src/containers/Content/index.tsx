import React, { memo } from 'react';
import { tw } from 'twind';
import { config } from '@/core/config';

interface LayoutContentProps {}

const LayoutContent: React.FC<LayoutContentProps> = () => {
  return <div className={tw`flex-1 h-full !overflow-hidden`} id={config.canvasId}></div>;
};

export default memo(LayoutContent);
