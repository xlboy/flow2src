import { Topology } from '@topology/core';
import { flowPens } from '@topology/flow-diagram';
import { config } from './config';
import type { TopologyEvent } from './types';

class CanvasController {
  private root!: Topology;
  constructor() {
    this.init();
  }

  addEventListener = <T extends keyof TopologyEvent, B extends TopologyEvent[T]>(
    eventType: string,
    subcribe: (data: B) => void
  ): void => {
    this.root.on(eventType, subcribe);
  };

  removeEventListener = <T extends keyof TopologyEvent, B extends TopologyEvent[T]>(
    eventType: string,
    subcribe: (data: B) => void
  ): void => {
    this.root.off(eventType, subcribe);
  };

  private init = (): void => {
    this.root = new Topology(config.canvasId, {
      background: '#e4fa91'
    });

    this.root.register(flowPens());
    this.root.open();
  };
}

export default CanvasController;
