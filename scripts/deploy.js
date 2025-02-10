const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log(`Deploying contracts with account: ${deployer.address}`);

    // 1️⃣ RecycleXFactory 컨트랙트 배포
    console.log("Deploying RecycleXFactory...");
    const Factory = await hre.ethers.getContractFactory("RecycleXFactory");
    const factory = await Factory.deploy();
    await factory.deployed();
    console.log(`RecycleXFactory deployed at: ${factory.address}`);

    // 2️⃣ 동일한 Salt 값 설정
    const salt = hre.ethers.utils.id("recyclex-salt");

    // 3️⃣ 예상 컨트랙트 주소 출력
    const predictedAddress = await factory.getAddress(salt);
    console.log(`Predicted RecycleX contract address: ${predictedAddress}`);

    // 4️⃣ RecycleX 배포 (CREATE2 사용)
    console.log("Deploying RecycleX via Factory...");
    const tx = await factory.deploy(salt);
    await tx.wait();
    console.log(`RecycleX deployed at: ${predictedAddress}`);

    console.log("Deployment completed successfully!");
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
