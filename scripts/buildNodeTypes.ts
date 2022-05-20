import { Extractor, ExtractorConfig } from '@microsoft/api-extractor';
import { execaSync } from 'execa';
import path from 'path';

const rootPath = process.cwd();
const nodeTempTypesPath = path.resolve(rootPath, './dist/node/tempTypes');

void (function main() {
  buildTempTypes();
  rollTempTypes();
  deleteTempTypes();
})();

function buildTempTypes() {
  const nodePath = path.resolve(rootPath, './packages/node/');
  const nodeTSConfigPath = path.resolve(nodePath, 'tsconfig.json');

  execaSync('npx', [
    'tsc',
    '--declaration',
    '--emitDeclarationOnly',
    '--outDir',
    nodeTempTypesPath,
    '-p',
    nodeTSConfigPath
  ]);
}

function deleteTempTypes() {
  execaSync('npx', ['rimraf', nodeTempTypesPath]);
}

function rollTempTypes() {
  const apiExtractorJsonPath = path.resolve(rootPath, 'api-extractor.json');
  const apiExtractorConfig = ExtractorConfig.loadFileAndPrepare(apiExtractorJsonPath);

  const apiExtractorResult = Extractor.invoke(apiExtractorConfig, {
    localBuild: true,
    showVerboseMessages: true
  });

  if (apiExtractorResult.succeeded) {
    console.log(`API Extractor completed successfully`);
  } else {
    console.error(
      `API Extractor completed with ${apiExtractorResult.errorCount} errors` +
        ` and ${apiExtractorResult.warningCount} warnings`
    );
  }
}
