import Koa from 'koa';
import KoaRouter from 'koa-router';
import type { Flow2SrcConfig } from '../config';

type InheritOptions = Pick<Flow2SrcConfig, 'port' | 'rootPath'>;

export interface ServerOptions extends InheritOptions {}

export async function httpServerStart(serverOptions: ServerOptions): Promise<number> {
  return new Promise(resolve => {
    const { port = 2999 } = serverOptions;

    const app = new Koa();
    const router = new KoaRouter();

    app.use(router.routes());

    app.listen(port, () => {
      resolve(port);
    });
  });
}
