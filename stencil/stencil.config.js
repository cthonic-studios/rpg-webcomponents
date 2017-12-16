exports.config = {
  bundles: [
    { components: ['point-tracker', 'character-attribute'] }
  ],
  collections: [
    { name: '@stencil/router' }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
