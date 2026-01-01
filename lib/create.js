const shell = require('shelljs');
const chalk = require('chalk');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

async function promptForConfig(name, options) {
  const prompts = [];

  if (!options.appId) {
    prompts.push({
      type: 'input',
      name: 'appId',
      message: 'What is the App ID?',
      default: `com.pegasus.${name.toLowerCase()}`
    });
  }

  if (!options.appName) {
    prompts.push({
      type: 'input',
      name: 'appName',
      message: 'What is the App Name?',
      default: name
    });
  }

  if (!options.testFramework) {
    prompts.push({
      type: 'list',
      name: 'testFramework',
      message: 'Which unit testing framework would you like to use?',
      choices: [
        { name: 'Jasmine/Karma (Default)', value: 'jasmine' },
        { name: 'Jest (Recommended)', value: 'jest' },
        { name: 'None', value: 'none' }
      ]
    });
  }

  const answers = await inquirer.prompt(prompts);
  return {
    appId: options.appId || answers.appId,
    appName: options.appName || answers.appName,
    testFramework: options.testFramework || answers.testFramework
  };
}

function setupJest(projectPath) {
  console.log(chalk.blue('\n🧪  Configuring Jest...'));
  shell.cd(projectPath);
  
  // Install Jest deps
  if (shell.exec('npm install jest jest-preset-angular @types/jest -D').code !== 0) {
    console.warn(chalk.yellow('Failed to install Jest dependencies.'));
  }

  // Create setup-jest.ts
  const setupContent = "import 'jest-preset-angular/setup-jest';";
  fs.writeFileSync(path.join(projectPath, 'setup-jest.ts'), setupContent);

  // Update package.json
  const pkgPath = path.join(projectPath, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  
  pkg.scripts.test = 'jest';
  pkg.jest = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    globalSetup: 'jest-preset-angular/global-setup'
  };

  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
}

module.exports = async function create(name, cliOptions = {}) {
  console.log(chalk.cyan(`🦄  Pegasus Framework: Creating project '${name}'...`));

  // Prerequisite checks
  if (!shell.which('git') || !shell.which('npm')) {
    console.error(chalk.red('Error: git and npm are required.'));
    process.exit(1);
  }

  // 1. Configuration
  const config = await promptForConfig(name, cliOptions);

  // 2. Create Angular App
  console.log(chalk.blue('\n📦  Scaffolding Angular Application...'));
  
  // --skip-tests if not jasmine (we either skip or manually setup jest)
  const skipTestsFlag = config.testFramework === 'jasmine' ? '' : '--skip-tests';
  
  const createCmd = `npx -p @angular/cli@latest ng new ${name} --routing --style=scss --skip-git ${skipTestsFlag}`;
  if (shell.exec(createCmd).code !== 0) {
    console.error(chalk.red('Error creating Angular project.'));
    process.exit(1);
  }

  const projectPath = path.join(process.cwd(), name);
  shell.cd(projectPath);

  // 2.5 Setup Jest if selected
  if (config.testFramework === 'jest') {
    setupJest(projectPath);
  }

  // 3. Add 'pegasus' script
  const pkgPath = path.join(projectPath, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  pkg.scripts = pkg.scripts || {};
  pkg.scripts['pegasus'] = 'pegasus start';
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

  // 4. Install Capacitor
  console.log(chalk.blue('\n🔌  Installing Capacitor Core...'));
  if (shell.exec('npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios').code !== 0) {
    console.error(chalk.red('Error installing Capacitor.'));
    process.exit(1);
  }

  // 5. Init Capacitor
  console.log(chalk.blue('\n⚙️   Initializing Capacitor...'));
  if (shell.exec(`npx cap init "${config.appName}" "${config.appId}" --web-dir=dist/${name}`).code !== 0) {
     console.error(chalk.red('Error initializing Capacitor.'));
     process.exit(1);
  }

  // 6. Install Pegasus Native Plugins
  console.log(chalk.blue('\n🧩  Installing Native Plugins...'));
  shell.exec('npm install @capacitor/camera @capacitor/toast @capacitor/preferences', { silent: true });

  // 7. Inject Pegasus UI Templates
  console.log(chalk.blue('\n🎨  Injecting Pegasus UI Components...'));
  const templateDir = path.join(__dirname, '../templates');
  
  if (fs.existsSync(templateDir)) {
      shell.cp('-R', `${templateDir}/*`, projectPath);
      console.log(chalk.green('Pegasus UI components injected.'));
  }

  // 8. Add Platforms
  console.log(chalk.blue('\n📱  Adding Mobile Platforms...'));
  shell.exec('npx cap add android', { silent: true });
  if (process.platform === 'darwin') {
      shell.exec('npx cap add ios', { silent: true });
  }

  console.log(chalk.green('\n✅  Pegasus Project Created Successfully!'));
  console.log(chalk.white(`
    To get started:
    cd ${name}
    npm run pegasus
  `));
}
