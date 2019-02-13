import assertRevert from "openzeppelin-solidity/test/helpers/assertRevert";


const Identity = artifacts.require("Identity");
// TODO integrate tests from https://github.com/ConsenSys/Tokens/blob/master/test/eip20/eip20.js

contract("Identity", accounts => {  
   before("load wallet with eth",async () => {
        const res = await web3.eth.sendTransaction({from:accounts[0],to:accounts[1],value:web3.utils.toWei("1","ether")})
    
   }) 
  it("Propose should work", async () => {


    //function proposeProfile(bytes32 _identityHash) payable public {
    let instance = await Identity.deployed();
    let profileAddress = accounts[1]
    let data = "0x123a521Bb34288ad947994452deBfF612573C54DAf"
    let balance = await web3.eth.getBalance(accounts[1])
    console.log("balance",balance.toString())
    assert.isAtLeast(parseInt(balance),1,"no eth balance")
    await instance.proposeProfile.sendTransaction(data,{
        value: "1",
        from:profileAddress
    })
    let profileResult = await instance.profiles.call(profileAddress)
    let proposalResult = await instance.proposals.call(profileResult.proposalId)
    console.log({profileResult,proposalResult,id:profileResult.proposalId})
    assert.equal(profileResult.state, 1,"account proposal should be on state 1");
    assert.equal(proposalResult, profileAddress,"proposal id should point to creating address");

  });

});
