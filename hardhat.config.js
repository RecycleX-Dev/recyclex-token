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
    version: "0.8.9",
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

//npx hardhat flatten ./contracts/NFTBase.sol > NFTBase_flat.sol
//sol2uml contracts/NFTBase.sol

//npx hardhat verify --network sepolia [주소]

//스텔시

//Token 배포
//npx hardhat run scripts/0_deploy_token.js --network sepolia

//RoleManager 배포
//npx hardhat run scripts/1_deploy_rolemanager.js --network sepolia

//NFTBase 배포 (RoleManager)
//npx hardhat run scripts/2_deploy_nftbase.js --network sepolia

//NFTs 배포 (RoleManager, NFTBase, CurrentId)
//npx hardhat run scripts/3_deploy_nfts.js --network sepolia

//Matching 배포 (all, duration, matchingFee, teamaddress)
//npx hardhat run scripts/4_deploy_matching.js --network sepolia

//Staking 배포 (all,
//npx hardhat run scripts/5_deploy_staking.js --network sepolia






/////////////////////////////////////


//
//
//NFTOpenSale 배포 (소스 주소 변경 후)
//npx hardhat run scripts/9_deploy_nftopensale.js --network sepolia
//npx hardhat verify --network sepolia [NFTOpenSale주소] [NFTBase주소]


//NFTBase 세팅 수동으로.. 
//어드민 추가



//업그레이드 참고 꼭 읽고 진행 (컨트랙트 수정)
//https://forum.openzeppelin.com/t/korean-writing-upgradeable-contracts/2007