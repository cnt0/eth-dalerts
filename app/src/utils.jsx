import w3p from 'web3-promisify'

module.exports = {
  bindToEvent: f => event => f(event.target.value),
  bindToWeb3: f => (...args) => w3p(g => f(...args, g))
}
