import { flow, types } from 'mobx-state-tree'

const BaseStore = types.model({ fail: '', success: '' }).actions(self => ({
  clearResult: () => {
    self.fail = ''
    self.success = ''
  }
}))

module.exports = BaseStore
