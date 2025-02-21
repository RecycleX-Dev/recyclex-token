const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("RecycleX Contract Tests", function () {
  let deployer, user1, user2, multisig;
  let recycleX;

  before(async function () {
    [deployer, user1, user2, multisig] = await ethers.getSigners();

    // 배포
    const RecycleXFactory = await ethers.getContractFactory("RecycleX");
    recycleX = await RecycleXFactory.deploy(multisig.address);
    await recycleX.deployed();
  });

  it("✅ 배포 확인 및 총 공급량 검증", async function () {
    const totalSupply = await recycleX.totalSupply();
    expect(totalSupply).to.equal(ethers.utils.parseEther("1500000000")); // 15억 개
  });

  it("🔄 전송(Transfer) 기능 테스트", async function () {
    // deployer -> user1 전송
    await recycleX.connect(multisig).transfer(user1.address, ethers.utils.parseEther("1000"));

    // 잔액 확인
    expect(await recycleX.balanceOf(user1.address)).to.equal(ethers.utils.parseEther("1000"));
  });

  it("🔥 소각(Burn) 기능 테스트", async function () {
    // user1이 500 토큰 소각
    await recycleX.connect(user1).burn(ethers.utils.parseEther("500"));

    // 잔액 확인
    expect(await recycleX.balanceOf(user1.address)).to.equal(ethers.utils.parseEther("500"));
  });

  it("🛡️ permitAndTransfer 이중 지출 방지 확인", async function () {
    const amount = ethers.utils.parseEther("100");
    
    // user1이 user2에게 permit 부여 후 전송
    const deadline = Math.floor(Date.now() / 1000) + 3600; // 1시간 후 만료
    const { v, r, s } = await getPermitSignature(
      recycleX,
      user1,
      user2.address,
      amount,
      deadline
    );

    await recycleX.connect(user2).permitAndTransfer(user1.address, user2.address, amount, deadline, v, r, s);

    // user2가 정상적으로 수신했는지 확인
    expect(await recycleX.balanceOf(user2.address)).to.equal(amount);
  });
});

// Permit 서명 생성 함수
async function getPermitSignature(token, owner, spender, value, deadline) {
    const domain = {
      name: await token.name(),
      version: "1",
      chainId: (await owner.provider.getNetwork()).chainId, // 네트워크 ID를 정확히 가져오기
      verifyingContract: token.address,
    };
  
    const types = {
      Permit: [
        { name: "owner", type: "address" },
        { name: "spender", type: "address" },
        { name: "value", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "deadline", type: "uint256" },
      ],
    };
  
    const nonce = await token.nonces(owner.address); // 정확한 nonce 가져오기
    const message = {
      owner: owner.address,
      spender: spender,
      value: value,
      nonce: nonce.toNumber(),
      deadline: deadline,
    };
  
    const signature = await owner._signTypedData(domain, types, message);
    return ethers.utils.splitSignature(signature);
}
