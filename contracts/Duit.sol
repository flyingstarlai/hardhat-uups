// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract Duit is Initializable, ERC20Upgradeable, OwnableUpgradeable, UUPSUpgradeable {
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    function initialize() initializer public {
        __ERC20_init("Duit", "DUIT");
        __Ownable_init();
        __UUPSUpgradeable_init();

        _mint(msg.sender, 10000000 * 10 ** decimals());
    }

    function _authorizeUpgrade(address newImplementation)
    internal
    onlyOwner
    override
    {}
}

contract DuitV2 is Duit {
    uint fee;

    function version() pure public returns(string memory) {
        return "V2";
    }
}

contract DuitV3 is Duit {
    uint fee;
    string detail;

    function version() pure public returns(string memory) {
        return "V3";
    }
}

