import { Component } from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Route } from 'react-router-dom'

import { observer } from 'mobx-react'

import mainStore from './stores/main'
import routes from './routes'
import Header from './header'
import Daddy from './daddy/component'
import Donate from './donate/component'
import DonateEmpty from './donate-empty'

const element = (
  <Router>
    <div>
      <Header mainStore={mainStore} />
      <br />
      <Route exact path="/" component={Daddy} />
      <Route exact path="/donate" component={DonateEmpty} />
      <Route path="/donate/:name" component={Donate} />
    </div>
  </Router>
)
const node = document.getElementById('content')
render(element, node)
