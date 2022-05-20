import jetpack from 'fs-jetpack';
import path from 'path';
import { APP_NAME } from './constants';

export interface Flow2SrcConfig {
  /**
   * @default process.cwd()
   * @description 项目的根路径
   */
  rootPath?: string;
  /**
   * @description
   */
  includes?: string[];
  /**
   * @default 2999
   * @description 服务端口
   */
  port?: number;
}

const configFileNames = (['.json', '.js'] as const).map(filePostfix => `${APP_NAME}.config${filePostfix}` as const);

export type ConfigFileName = typeof configFileNames[number];

type ConfigFilePostfix = GetFilePathPostfix<ConfigFileName>;
const configFilePriorityMap: Record<ConfigFileName, number> = {
  'flow2src.config.js': 1,
  'flow2src.config.json': 2
};

interface GetConfigOptions {
  /**
   * @description config file path or project dir path
   */
  configPath?: string;
  /**
   * @default process.pwd()
   */
  rootPath?: string;
}

function getConfig(options?: GetConfigOptions): Flow2SrcConfig {
  const cwd = jetpack.cwd();

  if (!options) {
    return findDefaultConfigInRootDir(cwd);
  }

  const { configPath, rootPath = cwd } = options;

  const hasSpecifiedPath = !!configPath;

  if (hasSpecifiedPath) {
    const wholeConfigPath = jetpack.cwd(configPath).cwd();
    const configPathType = jetpack.exists(wholeConfigPath);

    switch (configPathType) {
      case false:
        throw new Error(`There is no such path, ${wholeConfigPath}`);

      case 'file':
        return loadExistentConfigFile(wholeConfigPath);

      case 'dir':
        return findDefaultConfigInRootDir(wholeConfigPath);

      default:
        throw new Error(`This is an incorrect path, ${wholeConfigPath}`);
    }
  } else {
    return findDefaultConfigInRootDir(rootPath);
  }
}

/**
 * @description 加载存在的配置文件
 */
function loadExistentConfigFile(wholeFilePath: string): Flow2SrcConfig {
  const [fileType] = wholeFilePath.match(/(?<=\.)(json|[j]s)$/)! as [ConfigFilePostfix];

  let configContent: Flow2SrcConfig;

  switch (fileType) {
    case 'json': {
      try {
        configContent = jetpack.read(wholeFilePath, 'json');
      } catch (error) {
        throw new Error(`Not a valid json file, ${wholeFilePath}`);
      }

      break;
    }

    case 'js': {
      try {
        configContent = require(wholeFilePath);
      } catch (error) {
        throw new Error(error as any);
      }

      break;
    }
  }

  return configContent!;
}

function findDefaultConfigInRootDir(rootDir: string): Flow2SrcConfig {
  const foundConfigFiles = jetpack.cwd(rootDir).find({
    matching: configFileNames,
    recursive: false
  }) as ConfigFileName[];

  const hasFoundConfigFile = foundConfigFiles.length !== 0;

  if (!hasFoundConfigFile) {
    throw new Error(`There is no default configuration file in the current path, ${rootDir}`);
  }

  /*
    可能会出现 同级目录下同时存在几个配置文件 (app.config.js、app.config.json等)
    这时，则需要在这多个配置文件间取一个优先的
  */
  const sortedConfigFileContents = [...foundConfigFiles].sort(
    (fileA, fileB) => configFilePriorityMap[fileA] - configFilePriorityMap[fileB]
  );

  const [priorityHighestConfigFile] = sortedConfigFileContents;

  return loadExistentConfigFile(path.resolve(rootDir, priorityHighestConfigFile));
}

function defineConfig(config: Flow2SrcConfig) {
  return config;
}

export { getConfig, loadExistentConfigFile, defineConfig };
