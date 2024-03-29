// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

    const Token = await hre.ethers.getContractFactory("DegenToken");
    const token = await Token.deploy();

    await token.waitForDeployment(1);

    console.log(
        `Token deployed to  ${token.target}`
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

// 0x5eC4b0ed98c0D5A6bd9825a0E130A107aF0F2AFF
