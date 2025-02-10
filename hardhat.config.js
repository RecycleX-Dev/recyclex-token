require("hardhat-gas-reporter");
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
  
  gasReporter: {
    currency: 'KRW',
    gasPrice: 24,
    coinmarketcap: `${process.env.COINMARKETCAP_API_KEY}`
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
      apiKey: process.env.ETH_SCAN_API_KEY,
  },
};

//npx hardhat compile
//npx hardhat clean 


//npx hardhat run scripts/deploy.js --network sepolia
//npx hardhat verify --network sepolia 

//npx hardhat test ./test/

//npx hardhat flatten ./contracts/NFTBase.sol > NFTBase_flat.sol
//sol2uml contracts/NFTBase.sol

//npx hardhat verify --network sepolia [주소]

//스텔시

//Token 배포
//npx hardhat run scripts/0_deploy_token.js --network sepolia
