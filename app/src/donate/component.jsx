import { Component } from 'react'
import { observer } from 'mobx-react'

import { ETHFormSet } from '../eth-forms'

import { bindToEvent, bindToStore } from '../utils'

import routes from '../routes'
import donateStore from './store'

import SendDonationForm from './forms/send-donation'
import SendDonationFakeForm from './forms/send-donation-fake'
import SetGoalForm from './forms/set-goal'

const Donate = observer(
  class Donate extends Component {
    componentWillMount() {
      donateStore.initTokenContract(this.props.match.params.name)
    }
    render() {
      const { match } = this.props
      return (
        <ETHFormSet route={routes.donate} stateStore={donateStore}>
          {`Token address is ${donateStore.tokenAddr} BTW`}
          <SendDonationForm />
          <br />
          <SendDonationFakeForm />
          <br />
          <SetGoalForm />
        </ETHFormSet>
      )
    }
  }
)

module.exports = Donate
