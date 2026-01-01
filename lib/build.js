const shell = require('shelljs');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

module.exports = function build(platform) {
module.exports = function build(platform) {
  const supported = ['android', 'ios', 'web', 'desktop'];
  if (!supported.includes(platform)) {
      console.error(chalk.red(`Platform ${platform} not supported. Use ${supported.join(', ')}.`));
      process.exit(1);
  }

  console.log(chalk.cyan(`🦄  Pegasus: Building for ${platform}...`));

  // 1. Build Angular (Common for all)
  console.log(chalk.blue('\n🔨  Building Angular app...'));
  if (shell.exec('npm run build').code !== 0) {
      console.error(chalk.red('Angular build failed.'));
      process.exit(1);
  }

  if (platform === 'web') {
      console.log(chalk.green(`\n✅  Web Build finished! Dist is in dist/`));
      return;
  }

  // 2. Desktop (Electron) Setup & Sync
  if (platform === 'desktop') {
      const electronDir = path.join(process.cwd(), 'electron');
      // Check if electron is initialized
      if (!fs.existsSync(electronDir)) {
          console.log(chalk.yellow('\n🖥️  Initializing Electron platform (First Time)...'));
          
          // Install dependency if needed
          if (shell.exec('npm install @capacitor-community/electron electron -D').code !== 0) {
              console.error(chalk.red('Failed to install Electron dependencies'));
              process.exit(1);
          }
          
          // Add platform
          if (shell.exec('npx cap add @capacitor-community/electron').code !== 0) {
              console.error(chalk.red('Failed to add Electron platform'));
              process.exit(1);
          }
      }
      
      console.log(chalk.blue(`\n🔄  Syncing with Electron...`));
      if (shell.exec(`npx cap sync @capacitor-community/electron`).code !== 0) {
        console.error(chalk.red('Capacitor sync failed.'));
        process.exit(1);
      }
      
      console.log(chalk.green(`\n✅  Desktop setup complete!`));
      console.log(chalk.white('To run desktop app:'));
      console.log(`npx cap open @capacitor-community/electron`);
      return;
  }

  // 3. Mobile Sync (Android/iOS)
  console.log(chalk.blue(`\n🔄  Syncing with ${platform}...`));
  if (shell.exec(`npx cap sync ${platform}`).code !== 0) {
      console.error(chalk.red('Capacitor sync failed.'));
      process.exit(1);
  }

  console.log(chalk.green(`\n✅  Build complete for ${platform}!`));
  console.log(chalk.white('You can now run directly or open in IDE:'));
  console.log(`npx cap open ${platform}`);
}
}
