import { useMemoizedFn, useMount, useRafState } from 'ahooks';
import React, { memo } from 'react';
import type { ReadonlyDeep } from 'type-fest';
import type CanvasController from '../pages/home/core/controller';
import type { RootState } from './types';

interface LayoutPropsProps {
  canvasController: ReadonlyDeep<CanvasController>;
}

const LayoutProps: React.FC<LayoutPropsProps> = props => {
  const { canvasController } = props;
  const [{ activePen }, setRootState] = useRafState<RootState>({
    activePen: null
  });

  const handlerActivePen = useMemoizedFn((data: Record<string, any>[]) => {
    const [activePen] = data;

    if (activePen) {
      setRootState({ activePen });
    } else {
      setRootState({ activePen: null });
    }
  });

  const handlerInactivePen = useMemoizedFn(() => {
    setRootState({ activePen: null });
  });

  useMount(function initEventListener() {
    canvasController.addEventListener('active', handlerActivePen);
    canvasController.addEventListener('inactive', handlerInactivePen);
    canvasController.addEventListener('enter', e => {
      console.log('e', e);
    });
  });

  const renderCanvasProps = (): React.ReactNode => {
    return null;
  };

  const renderActivePenProps = (): React.ReactNode => {
    console.log('activePen', activePen);

    return <div></div>;
  };

  return (
    <div className="app-layout-props">
      <h3 className="text-center">Props</h3>

      {activePen !== null ? renderActivePenProps() : renderCanvasProps()}
      <div></div>
    </div>
  );
};

export default memo(LayoutProps);
