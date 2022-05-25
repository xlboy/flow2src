import type { Topology } from '@topology/core';
import 'vite/client';

declare module '*.svg' {
  import type * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
}
declare global {
  declare let rootCanvas: Topology;
  interface Window {}
}
