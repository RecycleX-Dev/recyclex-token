require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();


task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      }
    }
  },

  networks: {
    bsc: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: [process.env.BSC_MAINNET_PRIVATE_KEY],
    },
    bsctestnet: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      chainId: 97,
      accounts: [process.env.BSC_TESTNET_PRIVATE_KEY],
    },
  },
  etherscan: {
      apiKey: process.env.BSC_SCAN_API_KEY,
  },
};

//npx hardhat compile
//npx hardhat clean 

//npx hardhat run scripts/deploy.js --network sepolia
//npx hardhat verify --network sepolia 

//npx hardhat test ./test/


//npx hardhat verify --network sepolia [주소]
