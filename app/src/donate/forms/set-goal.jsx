import { observer } from 'mobx-react'
import { ETHForm } from '../../eth-forms'
import donateStore from '../store'
import { bindToEvent } from '../../utils'

module.exports = observer(() => (
  <ETHForm
    title="Set goal for donations (only token owner can do it)"
    submitText="Set goal"
    submitFunc={donateStore.setGoal}>
    <div className="form-group mx-sm-3 mb-2">
      <input
        id="fakeFrom"
        className="form-text"
        type="text"
        placeholder="goal description"
        onChange={bindToEvent(donateStore.setGoalDescr)}
      />
      <input
        id="fakeMsg"
        className="form-text"
        type="text"
        placeholder="goal target sum"
        onChange={bindToEvent(donateStore.setGoalTarget)}
      />
    </div>
  </ETHForm>
))
