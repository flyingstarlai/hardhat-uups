import {ethers, upgrades} from "hardhat";
import {expect} from 'chai'
import {Duit, DuitV2} from "../typechain-types";
import {ContractFactory} from "ethers";


describe("Upgradeable Contract", function () {

    let Duit: ContractFactory;
    let DuitV2: ContractFactory;
    let DuitV3: ContractFactory;

    console.log('SEC', process.env.SECRET)

    before('get factories', async function () {
        Duit = await ethers.getContractFactory('Duit')
        DuitV2 = await ethers.getContractFactory('DuitV2')
        DuitV3 = await ethers.getContractFactory('DuitV3')
    })

    it("can deploy", async function () {
        const duit = await  upgrades.deployProxy(Duit, { kind: 'uups'});
        expect(await duit.name()).to.equal("Duit");
    });

    it("can upgrade to new versions", async function () {
        const duit = await  upgrades.deployProxy(Duit, { kind: 'uups'});

        const duitV2 = await upgrades.upgradeProxy(duit, DuitV2);
        expect(await duitV2.version()).to.equal("V2");
        expect(duitV2.address).to.equal(duit.address);

        const duitV3 = await upgrades.upgradeProxy(duitV2, DuitV3);
        expect(await duitV3.version()).to.equal("V3");
        expect(duitV3.address).to.equal(duit.address);
    });
});
