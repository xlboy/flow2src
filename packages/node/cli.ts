import cac from 'cac';
import path from 'path';
import colors from 'picocolors';
import { getConfig } from './config';
import { APP_NAME } from './constants';
import { httpServerStart } from './server';

const rootPath = process.cwd();
const packageVersion = require(path.resolve(rootPath, './package.json')).version;
const cli = cac(APP_NAME);

cli
  .command('', 'start server')
  .alias('start')
  .alias('dev')
  .option('--configPath <configPath>', '[string] use the configuration file of the specified path')
  .option('--serverPort <serverPort>', '[number] specify server port')
  .option('--rootPath <rootPath>', '[string] project root path')
  .action(async (options: { configPath?: string; serverPort?: number; rootPath?: string }) => {
    const { configPath, rootPath, serverPort } = options;

    global.__f2s__config = getConfig({ configPath, rootPath });

    const finalServerPort = await httpServerStart({
      port: serverPort || __f2s__config.port,
      rootPath: rootPath || __f2s__config.rootPath
    });

    console.log(
      `\n\n${colors.cyan(`${APP_NAME} v${packageVersion}`)} ${colors.green(`server running at:`)}\n\n${colors.gray(
        `> Local:  http://localhost:${finalServerPort}`
      )}`
    );
  });

cli.version(packageVersion);

cli.help();

cli.parse();
