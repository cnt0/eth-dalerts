import { Component } from 'react'
import { ETHForm } from './eth-forms'
import { Route } from 'react-router-dom'
import routes from './routes'

class DonateEmpty extends Component {
  constructor(props) {
    super(props)
    this.input = ''
  }
  render() {
    return (
      <Route
        render={({ history }) => (
          <ETHForm
            title="Go to token page"
            submitText="Go"
            submitFunc={() =>
              history.push(`${routes.donate}/${this.input.value}`)
            }>
            <div className="form-group mx-sm-3 mb-2">
              <input
                id="tokenName"
                className="form-text"
                type="text"
                placeholder="Token name"
                ref={r => (this.input = r)}
              />
            </div>
          </ETHForm>
        )}
      />
    )
  }
}

module.exports = DonateEmpty
