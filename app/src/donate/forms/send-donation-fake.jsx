import { observer } from 'mobx-react'
import { ETHForm } from '../../eth-forms'
import donateStore from '../store'
import { bindToEvent } from '../../utils'

module.exports = observer(() => (
  <ETHForm
    title="Send fake donation (only token owner can do it)"
    submitText="Donate (fake)"
    submitFunc={donateStore.fakeDonate}>
    <div className="form-group mx-sm-3 mb-2">
      <input
        id="fakeFrom"
        className="form-text"
        type="text"
        placeholder="from"
        onChange={bindToEvent(donateStore.setFakeFrom)}
      />
      <input
        id="fakeMsg"
        className="form-text"
        type="text"
        placeholder="message"
        onChange={bindToEvent(donateStore.setFakeMsg)}
      />
      <input
        id="fakeValue"
        className="form-text"
        type="text"
        placeholder="value"
        onChange={bindToEvent(donateStore.setFakeValue)}
      />
    </div>
  </ETHForm>
))
