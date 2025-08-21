import fs from 'node:fs';
import path from 'node:path';
import { BuildParameters } from '..';
import * as core from '@actions/core';

class SetupAndroid {
  public static async setup(buildParameters: BuildParameters) {
    core.info('test log');
    core.info('setup android');
    const { targetPlatform, androidKeystoreBase64, androidKeystoreName, projectPath } = buildParameters;

    core.info(`params ${targetPlatform} ${androidKeystoreBase64} ${androidKeystoreName} ${projectPath}`);
    if (targetPlatform === 'Android' && androidKeystoreBase64 !== '' && androidKeystoreName !== '') {
      SetupAndroid.setupAndroidRun(androidKeystoreBase64, androidKeystoreName, projectPath);
    }
  }

  private static setupAndroidRun(androidKeystoreBase64: string, androidKeystoreName: string, projectPath: string) {
    const decodedKeystore = Buffer.from(androidKeystoreBase64, 'base64').toString('binary');
    const githubWorkspace = process.env.GITHUB_WORKSPACE || '';
    core.info(`results ${decodedKeystore} ${githubWorkspace}`);
    fs.writeFileSync(path.join(githubWorkspace, projectPath, androidKeystoreName), decodedKeystore, 'binary');

    const done = fs.existsSync(path.join(githubWorkspace, projectPath, androidKeystoreName));
    core.info(`file write ${done}`);
  }
}

export default SetupAndroid;
