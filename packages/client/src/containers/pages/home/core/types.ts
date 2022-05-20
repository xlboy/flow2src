export interface BaseConfig {
  canvasId: string;
}

/**
 * 文档地址：https://www.yuque.com/alsmile/topology/xqfbf4
 * …但文档内所描述的evnetType，大部分都有问题
 * 以下是通过翻寻源码而寻到的eventType及对应的data类型
 */
export interface TopologyEvent extends Record<string, any> {
  // move: Pen[];
  // rotated: Pen[];
  // loaded: void;
  // mediaEnd: Node;
  // animateEnd: Pen;
  // resize: { width: number; height: number };
  // addNode: Node;
  // addLine: Line;
  // scale: number;
  // opened: void;
  // websocket: any;
  // mqtt: { topic: string; message: any };
  // setText: Pen;
  // moveOutNode: Node;
  // moveInNode: Node;
  // moveOutLine: Line;
  // moveOutParent: {
  //   x: number;
  //   y: number;
  //   buttons?: number;
  //   ctrlKey?: boolean;
  //   shiftKey?: boolean;
  //   altKey?: boolean;
  //   pageX?: number;
  //   pageY?: number;
  // };
  // resizePens: Pen[];
  // space: {
  //   x: number;
  //   y: number;
  //   restore?: boolean;
  // };
  // multi: Pen[];
  // line: Line;
  // lineRightClick: Line[];
  // anchor: {
  //   anchor: Point;
  //   anchorIndex: number;
  //   line: Line;
  //   node: Node;
  // };
  // nodeCenter: Node;
  // node: Node;
  // nodeRightClick: Node;
  // lineOn: Line;
  // addLineInLines: Line;
  // dblclick: Node;
  // undo: TopologyData;
  // redo: TopologyData;
  // delete: Pen[];
  // copy: TopologyData;
  // paste: Pen[];
  // locked: Lock;
  // lockPens: {
  //   pens: Pen[];
  //   lock: Lock;
  // };
  // combine: Node;
  // uncombine: Node;
  // translate: { x: number; y: number };
  // tip: HTMLElement;
}
