import { Component } from 'react'
import { observer } from 'mobx-react'

import { ETHFormSet } from '../eth-forms'

import { bindToEvent, bindToStore } from '../utils'

import routes from '../routes'
import daddyStore from './store'

import IssueTokenForm from './forms/issue-token'
import SetTaxForm from './forms/set-tax'

module.exports = observer(() => (
  <ETHFormSet route={routes.daddy} stateStore={daddyStore}>
    <SetTaxForm />
    <br />
    <IssueTokenForm />
  </ETHFormSet>
))
