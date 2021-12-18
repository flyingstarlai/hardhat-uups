import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import '@openzeppelin/hardhat-upgrades';
import {HardhatUserConfig, task} from "hardhat/config";
import "@nomiclabs/hardhat-waffle";

import dotenv from 'dotenv'
dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const pk1 = process.env.PRIVATE_KEY || ''
const rpcKey = process.env.MORALIS_KEY || ''

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
    },
    bsc_test: {
      url: `https://speedy-nodes-nyc.moralis.io/${rpcKey}/bsc/testnet`,
      accounts: [pk1]
    }
  }
}


export default config;
