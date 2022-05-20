import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import path from 'path';
import esbuild from 'rollup-plugin-esbuild';
import { terser } from 'rollup-plugin-terser';

const rootPackage = require('./package.json');

const nodePath = path.resolve(__dirname, './packages/node/');

/**
 * @type { import('rollup').RollupOptions }
 */
const defaultNodeConfig = {
  treeshake: {
    moduleSideEffects: 'no-external',
    propertyReadSideEffects: false,
    tryCatchDeoptimization: false
  },
  input: {
    index: path.resolve(nodePath, './index.ts'),
    cli: path.resolve(nodePath, './cli.ts')
  },
  output: {
    dir: path.resolve('dist'),
    entryFileNames: `node/[name].js`,
    chunkFileNames: 'node/chunks/dep-[hash].js',
    exports: 'named',
    format: 'cjs',
    externalLiveBindings: false,
    freeze: false
  },
  external: [...Object.keys(rootPackage.dependencies)],
  plugins: [
    json(),
    nodeResolve(),
    esbuild({
      tsconfig: path.resolve(nodePath, 'tsconfig.json'),
      exclude: ['packages/node/__tests__/**']
    }),
    commonjs()
  ]
};

/**
 *
 * @param {boolean} isProduction
 */
function createNodeConfig(isProduction) {
  /**
   * @type { import('rollup').RollupOptions }
   */
  const nodeConfig = {
    ...defaultNodeConfig,
    plugins: [...defaultNodeConfig.plugins, isProduction ? terser() : null],
    external: [...defaultNodeConfig.external, ...(isProduction ? [] : Object.keys({ ...rootPackage.devDependencies }))]
  };

  return nodeConfig;
}

export default commandLineArgs => {
  const isDev = commandLineArgs.watch;
  const isProduction = !isDev;

  return [createNodeConfig(isProduction)];
};
