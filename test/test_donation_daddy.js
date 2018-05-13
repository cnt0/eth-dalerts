let w3p = require('web3-promisify')
let DonationDaddy = artifacts.require('DonationDaddy')
let DonationToken = artifacts.require('DonationToken')

contract('DonationDaddy', async (accounts) => {
  it("should assert true", async () => {
    let donation_daddy = await DonationDaddy.deployed()
    let owner = await donation_daddy.owner()
    assert.equal(owner, accounts[0])
    assert.isTrue(true)
  }),
  it("should correctly issue token", async function() {
    let donation_daddy = await DonationDaddy.deployed()
    donation_daddy.IssueDonationToken({from: accounts[1]})
    let token_event = await w3p(f => donation_daddy.DonationTokenIssued().watch(f))
    assert.equal(token_event.args.receiver, accounts[1])
    let token = web3.eth.contract(DonationToken.abi).at(token_event.args.addr)
    token.Donate('rush', 'b', {from: accounts[2], value: new web3.BigNumber(100)})
    let donation = await w3p(f => token.GotDonation().watch(f))
    console.log('donation', donation)
  })
})