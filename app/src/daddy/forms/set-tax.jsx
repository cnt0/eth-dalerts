import { observer } from 'mobx-react'
import { ETHForm } from '../../eth-forms'
import daddyStore from '../store'
import { bindToEvent } from '../../utils'

module.exports = observer(() => (
  <ETHForm
    title="Set tax for all donations"
    submitText="Set tax"
    submitFunc={daddyStore.setTax}>
    <div className="form-group mx-sm-3 mb-2">
      <input
        id="tax"
        className="form-text"
        type="text"
        placeholder="new tax"
        onChange={bindToEvent(daddyStore.updateTax)}
      />
    </div>
  </ETHForm>
))
