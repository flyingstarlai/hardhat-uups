// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import hre, {upgrades, ethers} from 'hardhat'

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

    // We get the contract to deploy

    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const Duit = await ethers.getContractFactory('Duit');
    const duit = await upgrades.deployProxy(Duit, { kind: 'uups'});
    await duit.deployed();

    console.log("Duit deployed to:", duit.address);

    const DuitV2 = await ethers.getContractFactory('DuitV2')
    const duitV2 = await upgrades.upgradeProxy(duit, DuitV2);

    console.log("DuitV2 deployed to:", duitV2.address);
 }

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
