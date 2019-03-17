import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  // namespace: "rpg_webcomponents",
  // generateDistribution: true,
  // generateWWW: false,
  plugins: [sass({
      injectGlobalPaths: []
    })],
    
  devServer: {
    root: 'www',
    port: parseInt(process.env.port)
  }
};