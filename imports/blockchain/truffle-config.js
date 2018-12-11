require("babel-polyfill");
require("babel-register")({
  "presets": ["es2015"],
  "plugins": ["syntax-async-functions","transform-regenerator"]
});

const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = "measure soda royal what keen vacuum arm view portion clerk motion dizzy";
const providerUrl = "https://mainnet.infura.io/v3/5b5cc6e48f8d4e33813555faab27bc08";
const fullPathBuildDirectory = `${__dirname}/build/contracts`;

//   solc compilers works only with truffle 5.0.0 and above.
module.exports = {
  contracts_build_directory: fullPathBuildDirectory,
  compilers: {
    solc: {
      version: "0.4.25",
      optimizer: {
        enabled: false,
        runs: 200
      }
    },
  },
  networks: {
    live: {
      network_id: 1,
      host: "localhost",
      port: 8546,
      gas: 4543760
    },
    ropsten: {
      network_id: 3,
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/143f9cf968fe4c3da0db77ff525e0da4")
      },
      
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
      from:'0x817DC2AA22a3DfdB7Daec2E06534387F1b0807d9' // special parity dev account with lot's of ether. don't change.
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
