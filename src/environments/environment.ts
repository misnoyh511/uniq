// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyB5wvO8LCF5xMzXvQqrFenJRDX5TORNm-8',
    authDomain: 'shilpa-vyas.firebaseapp.com',
    databaseURL: 'https://shilpa-vyas.firebaseio.com',
    projectId: 'shilpa-vyas',
    storageBucket: '',
    messagingSenderId: '662627196845',
    appName: '[DEFAULT]'
  },
    USER_INFO_KEY: 'USER_INFO_KEY',
    ANALYTICS_TOKEN: 'ANALYTICS_TOKEN',
    ANALYTICS_API_ENDPOINT: 'https://botdex.allegra.ai/api/',
    API_ENDPOINT: 'https://stagingapi.uniq.ai',
    PREVIEW_BOT: 'http://localhost:8080/'
};
