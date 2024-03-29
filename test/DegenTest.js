const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DegenToken", function () {
  let DegenToken, degenToken, owner, addr1, addr2;

  beforeEach(async function () {
    // Deploy the contract
    DegenToken = await ethers.getContractFactory("DegenToken");
    [owner, addr1, addr2, _] = await ethers.getSigners();
    degenToken = await DegenToken.deploy();
    await degenToken.waitForDeployment();
  });

  it("Should mint new tokens successfully", async function () {
    await degenToken.connect(owner).mintNewTokens(addr1.address, 1000);
    expect(await degenToken.balanceOf(addr1.address)).to.equal(1000);
  });

  it("Should transfer tokens successfully", async function () {
    await degenToken.connect(owner).mintNewTokens(addr1.address, 1000);
    await degenToken.connect(addr1).transferTokens(addr2.address, 500);
    expect(await degenToken.balanceOf(addr2.address)).to.equal(500);
  });

  it("Should fail to transfer tokens if insufficient balance", async function () {
    await expect(degenToken.connect(addr2).transferTokens(addr2.address, 500)).to.be.revertedWith("Insufficient balance");
  });

  it("Should redeem tokens for item successfully", async function () {
    await degenToken.connect(owner).mintNewTokens(addr1.address, 1000);
    await degenToken.connect(owner).createNewGameItems("Test Item", 1000);
    await degenToken.connect(addr1).redeemTokensForItem(1);
    expect(await degenToken.balanceOf(addr1.address)).to.equal(0);
    // expect(await degenToken.IdToGameItemsInfo(1)).to.have.property("owner", addr1.address);
  });

  it("Should fail to redeem tokens for non-existent item", async function () {
    await expect(degenToken.connect(addr1).redeemTokensForItem(1)).to.be.reverted;
  });

  it("Should burn tokens successfully", async function () {
    await degenToken.connect(owner).mintNewTokens(addr1.address, 1000);
    await degenToken.connect(addr1).burnTokens(500);
    expect(await degenToken.balanceOf(addr1.address)).to.equal(500);
  });

  it("Should fail to burn tokens if insufficient balance", async function () {
    await expect(degenToken.connect(addr1).burnTokens(1000)).to.be.revertedWith("ERC20: burn amount exceeds balance");
  });

  it("Should create new game items successfully", async function () {
    await degenToken.connect(owner).createNewGameItems("Test Item", 1000);
    // expect(await degenToken.IdToGameItemsInfo(1)).to.have.property("name", "Test Item");
  });
});
