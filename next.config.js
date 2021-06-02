const { chunk } = require('lodash');
const userAgents = require('top-user-agents');

// for this example i'm using all user-agents, but you would normally target specific user-agents
// const userAgents = require('ua-list')('ie');

module.exports = {
  async redirects() {
    return [
      {
        source: '/redirect',
        destination: '/hello-world',
        permanent: false,
      },
      //   batching the user-agents in 10 because the `has` prop has a limit
      ...chunk(userAgents, 10).map((groupedUA) => ({
        source: '/:path((?!old-browser.html$).*)',
        has: groupedUA.map((ua) => ({
          type: 'header',
          key: 'User-Agent',
          value: ua,
        })),
        permanent: false,
        destination: '/old-browser.html',
      })),
    ];
  },
};
