export const flowTools = [
  {
    name: '开始/结束',
    icon: 'icon-flow-start',
    data: {
      text: '开始',
      rect: {
        width: 120,
        height: 40
      },
      borderRadius: 0.5,
      width: 120,
      height: 40,
      name: 'rectangle'
    }
  },
  {
    name: '流程',
    icon: 'icon-rectangle',
    data: {
      text: '流程',
      width: 120,
      height: 40,
      name: 'rectangle'
    }
  },
  {
    name: '判定',
    icon: 'icon-diamond',
    data: {
      text: '判定',
      width: 120,
      height: 60,
      name: 'diamond'
    }
  },
  {
    name: '数据',
    icon: 'icon-flow-data',
    data: {
      text: '数据',
      width: 120,
      height: 50,
      name: 'flowData'
    }
  },
  {
    name: '准备',
    icon: 'icon-flow-ready',
    data: {
      text: '准备',
      width: 120,
      height: 50,
      name: 'hexagon'
    }
  },
  {
    name: '子流程',
    icon: 'icon-flow-subprocess',
    data: {
      text: '子流程',
      width: 120,
      height: 50,
      name: 'flowSubprocess'
    }
  },
  {
    name: '数据库',
    icon: 'icon-db',
    data: {
      text: '数据库',
      width: 80,
      height: 120,
      name: 'flowDb'
    }
  },
  {
    name: '文档',
    icon: 'icon-flow-document',
    data: {
      text: '文档',
      width: 120,
      height: 100,
      name: 'flowDocument'
    }
  },
  {
    name: '内部存储',
    icon: 'icon-internal-storage',
    data: {
      text: '内部存储',
      width: 120,
      height: 80,
      name: 'flowInternalStorage'
    }
  },
  {
    name: '外部存储',
    icon: 'icon-extern-storage',
    data: {
      text: '外部存储',
      width: 120,
      height: 80,
      name: 'flowExternStorage'
    }
  },
  {
    name: '队列',
    icon: 'icon-flow-queue',
    data: {
      text: '队列',
      width: 100,
      height: 100,
      name: 'flowQueue'
    }
  },
  {
    name: '手动输入',
    icon: 'icon-flow-manually',
    data: {
      text: '手动输入',
      width: 120,
      height: 80,
      name: 'flowManually'
    }
  },
  {
    name: '展示',
    icon: 'icon-flow-display',
    data: {
      text: '展示',
      width: 120,
      height: 80,
      name: 'flowDisplay'
    }
  },
  {
    name: '并行模式',
    icon: 'icon-flow-parallel',
    data: {
      text: '并行模式',
      width: 120,
      height: 50,
      name: 'flowParallel'
    }
  },
  {
    name: '注释',
    icon: 'icon-flow-comment',
    data: {
      text: '注释',
      width: 100,
      height: 100,
      name: 'flowComment'
    }
  },
  {
    name: 'tt',
    data: {
      name: 'image',
      x: 100,
      y: 100,
      width: 20,
      height: 20,
      iconFamily: 't-icon', // 必须正确设置，具体参考每个字体图标的项目设置
      // iconSize: 20, // 缺省自适应
      iconColor: 'green', // 可缺省
      icon: '\ue8e7' // 字体图标Unicode编码。必须正确设置，具体参考下面文档
    }
  }
] as const;
