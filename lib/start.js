const inquirer = require('inquirer');
const shell = require('shelljs');
const chalk = require('chalk');
const ip = require('ip');
const qrcode = require('qrcode-terminal');

module.exports = async function start() {
  console.log(chalk.cyan('🦄  Pegasus Interactive Runner'));

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'platform',
      message: 'Where do you want to run the app?',
      choices: [
        { name: '🌐 Web (Browser)', value: 'web' },
        { name: '📱 Mobile (QR Code / Live Reload)', value: 'mobile' },
        { name: '🖥️  Desktop (Electron)', value: 'desktop' }
      ]
    }
  ]);

  if (answers.platform === 'web') {
    console.log(chalk.blue('\n🚀 Starting Web Server...'));
    shell.exec('npx ng serve -o'); // -o opens browser
  } 
  else if (answers.platform === 'desktop') {
    console.log(chalk.blue('\n🖥️  Starting Desktop App...'));
    // Ideally: ng serve, then electron .
    // Simple verification mode:
    shell.exec('npx cap open @capacitor-community/electron'); 
    
    // NOTE: For true live reload, we would need concurrent execution. 
    // For now, we open the electron project or shell.
    console.log(chalk.yellow('Tip: Use "npm run electron:start" if configured for live reload.'));
  } 
  else if (answers.platform === 'mobile') {
    const localIp = ip.address();
    const url = `http://${localIp}:4200`;

    console.log(chalk.green(`\n📱 Mobile Dev Server`));
    console.log(chalk.white(`1. Ensure your phone is on the same Wi-Fi: `) + chalk.bold(localIp));
    console.log(chalk.white(`2. Scan this QR Code to open:`));
    
    qrcode.generate(url, { small: true });

    console.log(chalk.white(`\nURL: `) + chalk.underline.blue(url));
    console.log(chalk.gray('\nStarting Angular Dev Server (host 0.0.0.0)...'));

    // We must run with host 0.0.0.0 to be accessible externally
    shell.exec('npx ng serve --host 0.0.0.0 --disable-host-check');
  }
}
