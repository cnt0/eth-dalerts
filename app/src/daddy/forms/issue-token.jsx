import { observer } from 'mobx-react'
import { ETHForm } from '../../eth-forms'
import daddyStore from '../store'
import { bindToEvent } from '../../utils'

module.exports = observer(() => (
  <ETHForm
    title="Issue new donation token for your address"
    submitText="Issue token"
    submitFunc={daddyStore.issueToken}>
    <div className="form-group mx-sm-3 mb-2">
      <input
        id="name"
        className="form-text"
        type="text"
        placeholder="your name"
        onChange={bindToEvent(daddyStore.updateName)}
      />
    </div>
  </ETHForm>
))
