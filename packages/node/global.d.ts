import type { Flow2SrcConfig } from './config';

declare global {
  /**
   * @description 获取文件路径的后缀名
   * @example
   *
   * type AppConfigName = 'app.config.js' | 'app.config.json' | 'app.config.ts';
   * type Result = GetFilePathPostfix<AppConfigName> // 'js' | 'json' | 'ts'
   */

  type GetFilePathPostfix<
    CurrentFilePath extends string,
    IsRange extends boolean = false,
    CumulativeResult extends string = ''
  > = CurrentFilePath extends `${infer StartChar}${infer RestChar}`
    ? StartChar extends '.'
      ? GetFilePathPostfix<RestChar, true>
      : IsRange extends true
      ? GetFilePathPostfix<RestChar, true, `${CumulativeResult}${StartChar}`>
      : GetFilePathPostfix<RestChar>
    : CumulativeResult;

  var __f2s__config: Flow2SrcConfig;

  namespace NodeJS {
    interface ProcessEnv {}
  }
}
