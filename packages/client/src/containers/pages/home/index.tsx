import { useMount, useUpdate } from 'ahooks';
import React, { memo, useRef } from 'react';
import LayoutContent from '../../Content';
import CanvasController from './core/controller';
import './index.less';
import LayoutMenu from '../../Menu';
import LayoutProps from '../../Props';

interface LayoutPageProps {}

const LayoutPage: React.FC<LayoutPageProps> = () => {
  const canvasController = useRef<CanvasController>();
  const forceUpdateComponent = useUpdate();

  useMount(() => {
    canvasController.current = new CanvasController();

    forceUpdateComponent();
  });

  return (
    <div className="app-layout">
      <LayoutMenu />
      <LayoutContent />
      {canvasController.current && <LayoutProps canvasController={canvasController.current} />}
    </div>
  );
};

export default memo(LayoutPage);
