exports.config = {
  // namespace: "rpg_webcomponents",
  // generateDistribution: true,
  // generateWWW: false,
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
