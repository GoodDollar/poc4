const Identity = artifacts.require("./Identity.sol");
const GenesisProtocol = artifacts.require("../daostack/contracts/votingMachines/GenesisProtocol.sol");
const GenToken = artifacts.require("./DAOToken.sol");


// deploy the identity contract:
module.exports = async function(deployer, network, accounts) {
    const gpParams = [50, 3600, 500, web3.utils.toWei("100"), 5, 0, 60, 0, 0, 0, 0, 0, 0, 0];
    const foundersHash = "0x0000000000000000000000000000000000000000000000000000000000000000";
                          
    let gpAddress, gp, token;
    console.log("GenesisProtocol: ", GenesisProtocol);
    if (network === "development") {
        console.log("GenToken: ", GenToken);
        deployer.deploy(GenToken,"mewe","MEW",0).then(async (res) => {
            token = res;
            gp = await deployer.deploy(GenesisProtocol, token.address, { gas: 6000000 });
            console.log("deployed genesis protocol")
            //const paramsHash = await gp.getParametersHash(gpParams, false);
            const paramsHash = await gp.getParametersHash(gpParams, accounts[0]); // to match solc v 0.5.0, cannot send 'false' for an address type variable
            console.log({paramsHash})    
            await deployer.deploy(Identity, gp.address, paramsHash, foundersHash);
            console.log(accounts[0])
            token.mint.sendTransaction(accounts[0],web3.utils.toWei("1000000000000000000", "ether"))


        });
    } else if (network === "kovan-fork") {
        gpAddress = "0x0866dF55c550cedc4e504AdbaC9A45c06C670b78"; // no need to redeploy
        gp = await GenesisProtocol.at(gpAddress);
        const paramsHash = await gp.getParametersHash(gpParams, false);
        await deployer.deploy(Identity, gp.address, paramsHash, foundersHash);
    }
    else if (network === "ropsten") {
        gpAddress = "0x0866dF55c550cedc4e504AdbaC9A45c06C670b78"; // no need to redeploy
        gp = await GenesisProtocol.at(gpAddress);
        console.log("Genesis Protocol contract address on",network,gp)
        const paramsHash = await gp.getParametersHash(gpParams, false);
        const identityAdd = await deployer.deploy(Identity, gp.address, paramsHash, foundersHash);
        console.log("Identity contract address on ",network,identityAdd)
    }
};
