import { flow, types } from 'mobx-state-tree'

import { web3, daddyContract, tokenAbi } from '../eth'
import BaseStore from '../stores/base'
import MainStore from '../stores/main'
import { bindToWeb3 } from '../utils'

const gasPerTX = 900000

const DonateStore = types
  .compose(
    BaseStore,
    types.model({
      goalDescr: '',
      goalTarget: 0,

      fakeFrom: '',
      fakeMsg: '',
      fakeValue: 0,

      donateFrom: '',
      donateMsg: '',
      donateValue: 0,

      tax: '',
      tokenAddr: ''
    })
  )
  .actions(self => {
    let tokenContract = null
    let mainStore = null

    const setDonateFrom = from => (self.donateFrom = from)
    const setDonateMsg = msg => (self.donateMsg = msg)
    const setDonateValue = value => (self.donateValue = +value)

    const setFakeFrom = from => (self.fakeFrom = from)
    const setFakeMsg = msg => (self.fakeMsg = msg)
    const setFakeValue = value => (self.fakeValue = +value)

    const setGoalDescr = descr => (self.goalDescr = descr)
    const setGoalTarget = target => (self.goalTarget = +target)

    const afterCreate = () => (mainStore = MainStore)

    const initTokenContract = flow(function* initTokenContract(name) {
      const addr = yield daddyContract.methods
        .tokens(web3.utils.stringToHex(name))
        .call()
      tokenContract = new web3.eth.Contract(tokenAbi, addr)
      console.log(tokenContract)
      self.tokenAddr = tokenContract._address
    })

    const setGoal = flow(function* setGoal() {
      try {
        yield bindToWeb3(
          tokenContract.methods.SetGoal(self.goalDescr, self.goalTarget).send
        )({ from: mainStore.addr, gas: gasPerTX })

        self.success = `Goal "${self.goalDescr}" => ${self.goalTarget} set!`
      } catch (e) {
        self.fail = e.message
      }
    })

    const fakeDonate = flow(function* fakeDonate() {
      try {
        tokenContract.methods
          .FakeDonate(self.fakeValue, self.fakeFrom, self.fakeMsg)
          .send({ from: mainStore.addr, gas: gasPerTX })

        let event = yield bindToWeb3(tokenContract.events.GotDonation)({
          filter: { receiver: mainStore.addr }
        })

        let { from, message, sum } = event.returnValues
        self.success = `Got ${sum} from ${from} with message "${message}"`
      } catch (e) {
        self.fail = e.message
      }
    })

    const donate = flow(function* donate() {
      try {
        tokenContract.methods.Donate(self.donateFrom, self.donateMsg).send({
          from: mainStore.addr,
          gas: gasPerTX,
          value: self.donateValue
        })
        let event = yield bindToWeb3(tokenContract.events.GotDonation)({
          filter: { receiver: mainStore.addr }
        })
        let { from, message, sum } = event.returnValues
        self.success = `Got ${sum} from ${from} with message "${message}"`
      } catch (e) {
        self.fail = e.message
      }
    })

    return {
      afterCreate,
      initTokenContract,

      setGoal,
      setGoalDescr,
      setGoalTarget,

      setDonateFrom,
      setDonateMsg,
      setDonateValue,
      donate,

      fakeDonate,
      setFakeFrom,
      setFakeMsg,
      setFakeValue
    }
  })

module.exports = DonateStore.create()
