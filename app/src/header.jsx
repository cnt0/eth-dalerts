import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import routes from './routes'
import { bindToEvent } from './utils'

const getClass = (mainStore, route) =>
  mainStore.activeRoute == route ? 'nav-item active' : 'nav-item'

const Header = observer(({ mainStore }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
    <span className="navbar-brand">Donation alerts</span>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className={getClass(mainStore, routes.daddy)}>
          <Link exact="true" to={routes.daddy} className="nav-link">
            Daddy
          </Link>
        </li>
        <li className={getClass(mainStore, routes.donate)}>
          <Link to={routes.donate} className="nav-link">
            Donate
          </Link>
        </li>
      </ul>
    </div>
    <form className="form-inline">
      <input
        className="form-control"
        type="text"
        placeholder="Your ETH address"
        onChange={bindToEvent(mainStore.updateAddr)}
      />
    </form>
  </nav>
))

module.exports = Header
