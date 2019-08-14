const webpack = require('webpack');
const WebpackConfigFactory = require('@nestjs/ng-universal')
    .WebpackConfigFactory;

/**
 * In fact, passing following configuration to the WebpackConfigFactory is not required
 * default options object returned from this method has equivalent entries defined by default.
 *
 * Example: WebpackConfigFactory.create(webpack);
 */
module.exports = WebpackConfigFactory.create(webpack, {
    server: './server/main.ts',
    prerender: './prerender.ts',
});