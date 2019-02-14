module.exports = function(api) {
  api.cache(true);
  return {
    presets: [["module:metro-react-native-babel-preset"], ['react-app'],["@babel/preset-flow"]],
    env: {
      production: {
        plugins: ['react-native-paper/babel','@babel/plugin-proposal-class-properties', 'optional-require']
        
      },
    },
    ignore: [ "node_modules/art/core/color.js" ],
    plugins: ['react-native-paper/babel','@babel/plugin-proposal-class-properties', 'optional-require',
      ["module-resolver", {
        "alias": {
          "^react-native$": "react-native-web"
        }
      }]
    ],

    
  };
};