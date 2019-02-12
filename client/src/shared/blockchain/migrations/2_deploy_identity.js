const Identity = artifacts.require("./Identity.sol");
const GenesisProtocol = artifacts.require("../daostack/contracts/votingMachines/GenesisProtocol.sol");
const GenToken = artifacts.require("./DAOToken.sol");
const Web3 = require('web3')


// deploy the identity contract:
module.exports = async function(deployer, network, accounts) {
    const gpParams = [50, 3600, 500, web3.utils.toWei("100"), 5, 0, 60, 0, 0, 0, 0, 0, 0, 0];
    const foundersHash = "0x0000000000000000000000000000000000000000000000000000000000000000";
                          
    let gpAddress, gp, token,adminAccount,genTokenAddress,ethAmount;
    adminAccount = accounts[0];
    if(network === "test") {
        
    }
    else if (network === "development") {
        //adminAccount = accounts[0];
        /*adminAccount = accounts[0];
        console.log("GenToken: ", GenToken);
        deployer.deploy(GenToken,"mewe","MEW",0).then(async (res) => {
            token = res;
            gp = await deployer.deploy(GenesisProtocol, token.address, { gas: 6000000 });
            console.log("deployed genesis protocol")
            //const paramsHash = await gp.getParametersHash(gpParams, false);
            const paramsHash = await gp.getParametersHash(gpParams, adminAccount); // to match solc v 0.5.0, cannot send 'false' for an address type variable
            console.log({paramsHash})    
            await deployer.deploy(Identity, gp.address, paramsHash, foundersHash);
            console.log(adminAccount)
            token.mint.sendTransaction(adminAccount,web3.utils.toWei(ethAmount, "ether"))


        });*/
    }else{
        if (network === "kovan-fork") {
            gpAddress = "0x0866dF55c550cedc4e504AdbaC9A45c06C670b78"; // no need to redeploy
            genTokenAddress = "0x543Ff227F64Aa17eA132Bf9886cAb5DB55DCAddf"      
            //adminAccount = "0x27822d4556d2c6757D1094380eEc98200689932a"
        }
        else if (network === "ropsten") {
            // TODO: update addresses
            gpAddress = "0x0866dF55c550cedc4e504AdbaC9A45c06C670b78"; // no need to redeploy
            genTokenAddress = "0x543Ff227F64Aa17eA132Bf9886cAb5DB55DCAddf"      
            //adminAccount = "0x27822d4556d2c6757D1094380eEc98200689932a"
        }

        //adminAccount = "0x3a521bb34288ad947994452debff612573c54daf";
    }

    console.log({accounts})
    console.log({adminAccount})
    deployer.deploy(GenToken,"mewe","MEW",0).then(async (res) => {
        token = res;
        
        gp = await deployer.deploy(GenesisProtocol, token.address, { gas: 6000000 });
        await gp.setParameters(gpParams,adminAccount)
        const paramsHash = await gp.getParametersHash(gpParams, adminAccount); // to match solc v 0.5.0, cannot send 'false' for an address type variable
        console.log("default account",{adminAccount,paramsHash})
        const identityAdd = await deployer.deploy(Identity, gp.address, paramsHash, foundersHash);
        ethAmount = "10000000000000000";
        console.log("sending ",ethAmount, " GEN to ",adminAccount)
        token.mint.sendTransaction(adminAccount,web3.utils.toWei(ethAmount, "ether"))
    });








        
    

    
    
    
    
};
