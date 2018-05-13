import { Component } from 'react'
import { observer } from 'mobx-react'
import mainStore from './stores/main'

const ETHFormSetResult = observer(({ stateStore }) => {
  let alertClass = ''
  let alertMsg = ''
  console.log(stateStore)
  if (stateStore.fail) {
    alertClass = 'alert alert-danger'
    alertMsg = stateStore.fail
  } else if (stateStore.success) {
    alertClass = 'alert alert-success'
    alertMsg = stateStore.success
  }
  if (stateStore.fail || stateStore.success) {
    return (
      <div className={alertClass} role="alert">
        {alertMsg}
      </div>
    )
  }
  return ''
})

const ETHFormSet = observer(
  class ETHFormSet extends Component {
    componentWillMount() {
      mainStore.setActiveRoute(this.props.route)
    }
    render() {
      return (
        <div>
          <ETHFormSetResult stateStore={this.props.stateStore} />
          {this.props.children}
        </div>
      )
    }
  }
)

const ETHForm = ({ children, title, submitText, submitFunc }) => (
  <div className="card card-body">
    <span className="card-title">{title}</span>
    {children}
    <button className="btn btn-primary mb-2" onClick={submitFunc}>
      {submitText}
    </button>
  </div>
)

module.exports = {
  ETHForm: ETHForm,
  ETHFormSet: ETHFormSet,
  ETHFormSetResult: ETHFormSetResult
}
