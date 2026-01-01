#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const program = new Command();
const packageJson = require('../package.json');

// Commands
const create = require('../lib/create');
const build = require('../lib/build');
const apk = require('../lib/apk');

program
  .version(packageJson.version)
  .description('Pegasus Framework CLI - Build native apps with Angular & Capacitor');

program
  .command('create <name>')
  .description('Create a new Pegasus mobile project')
  .option('-i, --app-id <id>', 'App ID (e.g. com.example.app)')
  .option('-a, --app-name <appName>', 'App Name')
  .option('-t, --test-framework <framework>', 'Test Framework (jasmine|jest|none)')
  .action((name, options) => {
    create(name, options);
  });

program
  .command('build <platform>')
  .description('Build the project for a specific platform (android|ios|web|desktop)')
  .action((platform) => {
    build(platform);
  });

program
  .command('apk')
  .description('Generate Android APK (Debug/Release)')
  .action(() => {
     apk();
  });

program
  .command('start')
  .description('Interactive runner for Web, Desktop (Electron), and Mobile (QR Code)')
  .action(() => {
    require('../lib/start')();
  });

program.parse(process.argv);
