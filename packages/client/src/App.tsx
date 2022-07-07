import { useMount, useUpdate } from 'ahooks';
import React, { useRef } from 'react';
import { tw } from 'twind';
import LayoutContent from './containers/Content';
import LayoutMenu from './containers/Menu';
import CanvasController from './core/controller';
import LayoutProps from './containers/Props';

const App: React.FC = () => {
  const canvasController = useRef<CanvasController>();
  const forceUpdateComponent = useUpdate();

  useMount(() => {
    canvasController.current = new CanvasController();

    forceUpdateComponent();
  });

  return (
    <div className={tw`h-[100vh] w-full flex`}>
      <LayoutMenu />
      <LayoutContent />
      {canvasController.current && <LayoutProps canvasController={canvasController.current} />}
    </div>
  );
};

export default App;
