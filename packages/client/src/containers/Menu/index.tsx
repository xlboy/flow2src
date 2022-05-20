import { Button } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { flowTools } from '../pages/home/core/data';

interface LayoutMenuProps {}

const LayoutMenu: React.FC<LayoutMenuProps> = () => {
  const handleDrag = (ev: React.DragEvent<HTMLButtonElement>, node: Record<string, any>) => {
    ev.dataTransfer.setData('Topology', JSON.stringify(node));
  };

  const renderFlow = (): React.ReactNode => {
    return (
      <>
        <h3 className="w-full text-center">流程图</h3>
        <div className="w-full flex p-3 flex-wrap flex-start">
          {flowTools.map(item => (
            <Button
              key={item.name}
              onDragStart={ev => {
                handleDrag(ev, item.data);
              }}
              draggable
              className="!p-0 !m-5"
            >
              <i className={classNames(['iconfont', item.icon])} style={{ fontSize: 20 }}></i>
            </Button>
          ))}
        </div>
      </>
    );
  };

  return <div className="app-layout-menu">{renderFlow()}</div>;
};

export default LayoutMenu;
