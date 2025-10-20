const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
const { getMfeEnv, buildRemoteEntryUrl } = require('../libs/projects/shared/src/lib/core/config/mfe-env.config.js');

const isProduction = process.env.NODE_ENV === 'production';
const mfeEnv = getMfeEnv(isProduction);

const config = withModuleFederationPlugin({

  remotes: {
    'mfLogin': buildRemoteEntryUrl(mfeEnv.login.url),
    'mfBanner': buildRemoteEntryUrl(mfeEnv.banner.url),
    'mfMembers': buildRemoteEntryUrl(mfeEnv.members.url),
  },

  shared: {
    ...shareAll({ 
      singleton: true, 
      strictVersion: true, 
      requiredVersion: 'auto' 
    }),
    'shared': { 
      singleton: false,
      strictVersion: false,
      requiredVersion: false
    }
  },

});

config.output.publicPath = `${mfeEnv.host.url}/`;

module.exports = config
