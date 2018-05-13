import Web3 from 'web3'

import daddy from '../../build/contracts/DonationDaddy.json'
import token from '../../build/contracts/DonationToken.json'

const web3addr = 'ws://localhost:8545'
let web3 = new Web3(web3addr)
const daddyAddr = '0x0a9abfdcc572838b9b579b94446c0c8bd29a013b'
let daddyContract = new web3.eth.Contract(daddy.abi, daddyAddr)

module.exports = {
  daddyContract: daddyContract,
  tokenAbi: token.abi,
  web3: web3
}
