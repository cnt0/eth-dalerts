import { types } from 'mobx-state-tree'

const MainStore = types
  .model({
    addr: '',
    activeRoute: ''
  })
  .actions(self => ({
    updateAddr: newAddr => {
      self.addr = newAddr
    },
    setActiveRoute: route => {
      self.activeRoute = route
    }
  }))

module.exports = MainStore.create()
