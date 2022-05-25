import { Button } from 'antd';
import clsx from 'clsx';
import React from 'react';
import { apply, tw } from 'twind';
import { css } from 'twind/css';
import { flowTools } from '@/core/data';

interface LayoutMenuProps {}

const menuWrapper = tw(css`
  ${apply`h-full bg-[#f8f8f8] p-[10px] box-border`}
  ${apply`border(r-1 solid [#d9d9d9])`}
  flex-basis: 300px;
`);

const LayoutMenu: React.FC<LayoutMenuProps> = () => {
  const handleDrag = (ev: React.DragEvent<HTMLButtonElement>, node: Record<string, any>) => {
    ev.dataTransfer.setData('Topology', JSON.stringify(node));
  };

  const renderFlow = (): React.ReactNode => {
    return (
      <>
        <h3 className={tw`w-full text-center`}>流程图</h3>
        <div className={tw`w-full p-3 flex(& wrap) justify-start`}>
          {flowTools.map(item => (
            <Button
              key={item.name}
              onDragStart={ev => {
                handleDrag(ev, item.data);
              }}
              draggable
              className={tw`!p-0 !m-5`}
            >
              <i className={clsx(['iconfont', (item as any).icon])} style={{ fontSize: 20 }}></i>
            </Button>
          ))}
        </div>
      </>
    );
  };

  return <div className={menuWrapper}>{renderFlow()}</div>;
};

export default LayoutMenu;
