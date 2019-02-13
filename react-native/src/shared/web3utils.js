//@flow
import ethUtils from 'ethereumjs-util'
import Web3PromieEvent from 'web3-core-promievent'

type TxHash = string
export const promisifyTxHash = (tx:typeof Web3PromieEvent):Promise<TxHash> => {
  return  new Promise((resolve, reject) => {
      tx.on("transactionHash",resolve)
      tx.on("error",reject)
    })
}

export const sign = (data:any,privateKey:string):string => {
  let message = ethUtils.toBuffer(JSON.stringify(data))
  let msgHash = ethUtils.hashPersonalMessage(message)
  let pk = ethUtils.toBuffer(privateKey)
  let sig = ethUtils.ecsign(msgHash, pk)
  let signature = ethUtils.toRpcSig(sig.v,sig.r,sig.s)
  return signature
}

export const verifySignature = (data:any,rpcsig:string,verifyPublicKey:string) => {
  let message = ethUtils.toBuffer(JSON.stringify(data))
  let msgHash = ethUtils.hashPersonalMessage(message)
  let signature = ethUtils.fromRpcSig(rpcsig)
  let publicKey = ethUtils.ecrecover(msgHash,signature.v,signature.r,signature.s)
  // console.log("verifySignature",publicKey.toString('hex'),verifyPublicKey.toString("hex"),publicKey.equals(verifyPublicKey))
  return publicKey.toString("hex")===verifyPublicKey
}
