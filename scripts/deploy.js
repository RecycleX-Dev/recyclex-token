const { ethers } = require("hardhat");
require("dotenv").config(); // .env 파일에서 환경 변수 불러오기

async function main() {
  // 배포자 지갑 가져오기
  const [deployer] = await ethers.getSigners();
  console.log("🚀 Deploying contracts with the account:", deployer.address);
  console.log("💰 Account balance:", (await deployer.getBalance()).toString());

  // 멀티시그 지갑 주소 설정
  const multisigWalletAddress = process.env.MULTISIG_WALLET || "0x1234567890abcdef1234567890abcdef12345678";
  if (!ethers.utils.isAddress(multisigWalletAddress)) {
    throw new Error("❌ Invalid multisig wallet address provided.");
  }

  console.log("🔑 Using multisig wallet address:", multisigWalletAddress);

  // 스마트 컨트랙트 배포
  const RecycleXFactory = await ethers.getContractFactory("RecycleX");
  const RecycleX = await RecycleXFactory.deploy(multisigWalletAddress);
  
  // 트랜잭션 완료 대기
  await RecycleX.deployed();

  console.log("✅ RecycleX deployed to:", RecycleX.address);
  console.log("📜 Transaction hash:", RecycleX.deployTransaction.hash);
}

// 에러 핸들링 및 배포 실행
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
