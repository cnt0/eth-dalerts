import { utils } from 'web3'
import { flow, types } from 'mobx-state-tree'

import { daddyContract } from '../eth'
import BaseStore from '../stores/base'
import MainStore from '../stores/main'
import { bindToWeb3 } from '../utils'

const gasPerTX = 900000

const DaddyStore = types
  .compose(
    BaseStore,
    types.model({
      name: '',
      tax: '',
      tokenAddr: ''
    })
  )
  .actions(self => {
    let mainStore = null

    const afterCreate = () => (mainStore = MainStore)

    const updateTax = newTax => {
      self.tax = newTax
    }
    const updateName = newName => {
      self.name = newName
    }
    const setTax = flow(function* setTax() {
      try {
        yield bindToWeb3(
          daddyContract.methods.SetTax(self.tax).send
        )({ from: mainStore.addr, gas: gasPerTX })
        self.success = `SUCCESS, new tax is ${self.tax}`
        console.log('SUCCESS, new tax is', self.tax)
      } catch (err) {
        console.log('ERROR, cant set new tax', err.message)
        self.fail = err.message
      }
    })
    const issueToken = flow(function* issueToken() {
      try {
        daddyContract.methods
          .IssueDonationToken(utils.toHex(self.name))
          .send({ from: mainStore.addr, gas: gasPerTX })

        let event = yield bindToWeb3(daddyContract.events.DonationTokenIssued)({
          filter: { receiver: mainStore.addr }
        })
        console.log('DonationTokenIssued event', event)
        self.tokenAddr = event.returnValues.addr
        self.success = `SUCCESS: issued token ${event.returnValues.addr}`
      } catch (err) {
        console.log('err', err)
        self.fail = err.message
      }
    })

    return { afterCreate, updateTax, updateName, setTax, issueToken }
  })

module.exports = DaddyStore.create()
