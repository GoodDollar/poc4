const Identity = artifacts.require("./Identity.sol");
const GenesisProtocol = artifacts.require("../daostack/contracts/GenesisProtocol.sol");
const StandardToken = artifacts.require("zeppelin-solidity/contracts/token/ERC20/StandardToken.sol");

// deploy the identity contract:
module.exports = async function(deployer, network) {
     const gpParams = [50, 3600, 500, web3.utils.toWei("100"), 5, 0, 60, 0, 0, 0, 0, 0, 0, 0];
    const foundersHash = "0x0000000000000000000000000000000000000000000000000000000000000000";
    let gpAddress, gp, token;

    if (network === "development") {
        console.log("StandardToken: ", StandardToken);
        deployer.deploy(StandardToken).then(async (res) => {
            token = res;
            gp = await deployer.deploy(GenesisProtocol, token.address, { gas: 6000000 });
            const paramsHash = await gp.getParametersHash(gpParams, false);
            await deployer.deploy(Identity, gp.address, paramsHash, foundersHash);
        });
    } else if (network === "kovan-fork") {
        gpAddress = "0x0866dF55c550cedc4e504AdbaC9A45c06C670b78";
        gp = await GenesisProtocol.at(gpAddress);
        const paramsHash = await gp.getParametersHash(gpParams, false);
        await deployer.deploy(Identity, gp.address, paramsHash, foundersHash);
    }
};
