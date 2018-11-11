require("babel-polyfill");
require("babel-register")({
  "presets": ["es2015"],
  "plugins": ["syntax-async-functions","transform-regenerator"]
});

const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = "measure soda royal what keen vacuum arm view portion clerk motion dizzy";
const providerUrl = "https://mainnet.infura.io/v3/5b5cc6e48f8d4e33813555faab27bc08";

module.exports = {
  networks: {
    live: {
      network_id: 1,
      host: "localhost",
      port: 8546,
      gas: 4543760
    },
    ropsten: {
      network_id: 3,
      host: "localhost",
      port: 8545,
      gas: 4543760
    },
    rinkeby: {
      network_id: 4,
      host: "localhost",
      port: 8545,
      gas: 4543760
    },
    kovan: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://kovan.infura.io/v3/143f9cf968fe4c3da0db77ff525e0da4")
      },
      network_id: 42,
      gas: 4543760
    },
    development: {
      network_id: "*",
      host: "localhost",
      port: 8545,
      gas: 4543760
    },
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  compilers: {
    solc: {
      version: "0.4.25",    // Fetch exact version from solc-bin (default: truffle's version)
      optimizer: {
        enabled: true,
        runs: 200
      }
      }
  },
  rpc: {
    host: "localhost",
    port: 8545
  }
};
