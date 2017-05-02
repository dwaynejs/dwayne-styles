require('babel-register')({
  presets: [
    'es2015',
    'stage-0',
    [
      'dwayne',
      {
        globalVars: ['undefined']
      }
    ]
  ]
});

require('./');
