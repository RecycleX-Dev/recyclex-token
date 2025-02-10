const { ethers } = require("hardhat");

async function main() {
  
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const RecycleXFactory = await ethers.getContractFactory("RecycleX");
  const RecycleX = await RecycleXFactory.deploy();
  console.log("RecycleX address:", RecycleX.address);
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
  console.error(error);
  process.exit(1);
});