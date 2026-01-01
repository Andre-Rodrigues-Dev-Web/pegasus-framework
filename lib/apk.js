const shell = require('shelljs');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

module.exports = function apk() {
  console.log(chalk.cyan('🦄  Pegasus: Generating Android APK...'));

  const androidDir = path.join(process.cwd(), 'android');
  if (!fs.existsSync(androidDir)) {
    console.error(chalk.red('Android project not found. Run `pegasus create` or `pegasus build android` first.'));
    process.exit(1);
  }

  // Check for gradlew
  const gradlew = process.platform === 'win32' ? 'gradlew.bat' : './gradlew';
  const gradlewPath = path.join(androidDir, gradlew);

  if (!fs.existsSync(gradlewPath) && !fs.existsSync(path.join(androidDir, 'gradlew'))) {
     console.error(chalk.red(`Gradle wrapper not found at ${gradlewPath}`));
     process.exit(1);
  }

  // Run assembleDebug
  console.log(chalk.blue('\n🐘  Running Gradle Build (assembleDebug)...'));
  
  // We need to run inside android directory
  shell.cd(androidDir);

  if (shell.exec(`${gradlew} assembleDebug`).code !== 0) {
      console.error(chalk.red('Gradle build failed.'));
      process.exit(1);
  }

  const apkPath = 'app/build/outputs/apk/debug/app-debug.apk';
  const fullApkPath = path.join(androidDir, apkPath);

  if (fs.existsSync(fullApkPath)) {
      console.log(chalk.green(`\n✅  APK Generated Successfully!`));
      console.log(chalk.white(`Location: ${fullApkPath}`));
      
      // Attempt to move it to root for convenience?
      // fs.copyFileSync(fullApkPath, path.join(process.cwd(), '../output.apk'));
  } else {
      console.warn(chalk.yellow('Build finished but APK file not found at expected path.'));
  }
}
