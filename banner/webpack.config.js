const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
const { getMfeEnv } = require('../libs/projects/shared/src/lib/core/config/mfe-env.config.js');

const isProduction = process.env.NODE_ENV === 'production';
const mfeEnv = getMfeEnv(isProduction);

const config = withModuleFederationPlugin({

  name: 'mfBanner',

  exposes: {
    './BannerComponent': './src/app/banner/banner.component.ts'
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

config.output.publicPath = `${mfeEnv.banner.url}/`;

module.exports = config
