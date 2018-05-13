import { observer } from 'mobx-react'
import { ETHForm } from '../../eth-forms'
import donateStore from '../store'
import { bindToEvent } from '../../utils'

module.exports = observer(() => (
  <ETHForm
    title="Send donation"
    submitText="Donate"
    submitFunc={donateStore.donate}>
    <div className="form-group mx-sm-3 mb-2">
      <input
        id="donateFrom"
        className="form-text"
        type="text"
        placeholder="from"
        onChange={bindToEvent(donateStore.setDonateFrom)}
      />
      <input
        id="donateMsg"
        className="form-text"
        type="text"
        placeholder="message"
        onChange={bindToEvent(donateStore.setDonateMsg)}
      />
      <input
        id="donateValue"
        className="form-text"
        type="text"
        placeholder="value"
        onChange={bindToEvent(donateStore.setDonateValue)}
      />
    </div>
  </ETHForm>
))
