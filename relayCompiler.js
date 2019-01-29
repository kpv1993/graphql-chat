const spawn = require('child_process').spawn;
const path = require('path');

const args = [
    '--extensions',
    'js',
    'jsx',
    '--schema',
    path.resolve(__dirname, '../data/graphql.schema.json'), // or wherever you store your schema file
    '--src',
    path.resolve(__dirname, '..'), // since we are currently in <rootDir>/scripts
    '--include', // these will be based off of the `--src` flag ☝️
    'src/**',
    'storybook/**',
    'node_modules/shared-component/src/**', // your node modules you want to compile
    '--exclude',
    '**/__mocks__/**',
    '**/__tests__/**',
    '**/__generated__/**'
];

if (process.argv.includes('--watch')) {
    args.push('--watch');
}

if (process.argv.includes('--no-watchman')) {
    // use this flag if linking node modules
    args.push('--no-watchman');
}

const proc = spawn(
    path.resolve(__dirname, '../node_modules/.bin/relay-compiler'),
    args,
    {stdio: 'inherit'}
);

proc.on('close', code => {
    process.exit(code);
});
