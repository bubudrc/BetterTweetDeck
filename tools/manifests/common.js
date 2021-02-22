const {commonHosts, commonConnectHosts} = require('./commonHosts');
const _ = require('lodash');

const iconSizes = [16, 32, 48, 96, 128, 256, 512];

const icons = _(iconSizes)
  .map((size) => {
    return {
      size,
      icon: `build/assets/icons/icon-${size}.png`,
    };
  })
  .keyBy((i) => i.size)
  .mapValues((v) => v.icon)
  .value();

module.exports = {
  name: 'Better TweetDeck',
  short_name: 'Better TweetDeck',
  default_locale: 'en',
  version: '4.0.0',
  manifest_version: 2,
  icons,
  content_scripts: [
    {
      matches: ['*://tweetdeck.twitter.com/*'],
      js: ['build/content.js'],
      run_at: 'document_end',
    },
  ],
  background: {
    scripts: ['build/background.js'],
  },
  options_ui: {
    page: 'build/options/ui.html',
    chrome_style: false,
  },
  web_accessible_resources: ['build/inject.js', '*.png'],
  permissions: ['storage', 'contextMenus', ...commonHosts],
  content_security_policy: [
    ['img-src', 'https:', 'data:', "'self'", '*'],
    ['default-src'],
    ['connect-src', ...commonConnectHosts],
    ['style-src', "'unsafe-inline'"],
    ['script-src', `'self'`],
  ]
    .map((directive) => {
      return directive.join(' ');
    })
    .join('; '),
};
