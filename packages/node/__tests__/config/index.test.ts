import { getConfig, loadExistentConfigFile } from '@/config';
import path from 'path';

jest.useFakeTimers();

describe('测试 config', () => {
  describe('测试 getConfig', () => {
    describe('查找默认的配置文件', () => {
      it('不传 options，根据 cwd 寻默认配置文件', () => {
        expect(getConfig).toThrowError(/^There is no default configuration file in the current path.+/);
      });

      it('传空对象式的 options，但没传具体 path 与 root，依然根据 cwd 寻默认配置', () => {
        const fn = () => getConfig({});

        expect(fn).toThrowError(/^There is no default configuration file in the current path.+/);
      });

      it('将 rootPath 设为当前目录，而后在此目录里寻找默认的配置文件', () => {
        const config = getConfig({
          rootPath: __dirname
        });

        expect(config).toMatchObject({ src: '' });
      });
    });

    describe('测试 options.configPath', () => {
      it('传无效的目录', () => {
        const fn = () =>
          getConfig({
            configPath: path.resolve(__dirname, './ffff')
          });

        expect(fn).toThrowError(/^There is no such path.+/);
      });

      it('传有效的目录，会在目录内查找默认配置文件', () => {
        const config = getConfig({
          rootPath: __dirname
        });

        expect(config).toMatchObject({ src: '' });
      });

      // 与此相关的其他文件类型， 可查阅 '测试 loadExistentConfigFile' 的 describe 块
      it('传有效的文件', () => {
        const config1 = getConfig({
          configPath: path.resolve(__dirname, './flow2src.config.js')
        });

        expect(config1).toMatchObject({ src: '' });
      });
    });
  });

  describe('测试 loadExistentConfigFile', () => {
    describe('json 类型', () => {
      it('空', () => {
        const fn = () => loadExistentConfigFile(path.resolve(__dirname, './config.void.json'));

        expect(fn).toThrowError(/^Not a valid json file.+/);
      });

      it('无效，即语法层有误', () => {
        const fn = () => loadExistentConfigFile(path.resolve(__dirname, './config.invalid.json'));

        expect(fn).toThrowError(/^Not a valid json file.+/);
      });

      it('有效', () => {
        const config = loadExistentConfigFile(path.resolve(__dirname, './config.test.json'));

        expect(config).toMatchObject({ name: '1' });
      });
    });

    describe('js 类型', () => {
      it('空', () => {
        const config = loadExistentConfigFile(path.resolve(__dirname, './config.void.js'));

        // 无 export 的 js 文件，会默认为空对象
        expect(config).toMatchObject({});
      });

      it('无效，即语法层有误', () => {
        const fn = () => loadExistentConfigFile(path.resolve(__dirname, './config.invalid.js'));

        expect(fn).toThrowError();
      });

      it('有效', () => {
        const config = loadExistentConfigFile(path.resolve(__dirname, './flow2src.config.js'));

        expect(config).toMatchObject({ src: '' });
      });
    });
  });
});
