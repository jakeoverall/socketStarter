import { AppState } from '../AppState.js'
import Pop from '../utils/Pop'
import { SocketHandler } from '../utils/SocketHandler'

class SocketService extends SocketHandler {
  constructor() {
    super(true)
    this
      .on('error', this.onError)
      .on('LIGHT_STATE', this.setLightState)
      .on('MESSAGE_ADDED', this.addMessage)
  }

  onError(e) {
    Pop.toast(e.message, 'error')
  }

  setLightState(lightState) {
    AppState.lightIsOn = lightState
  }

  addMessage(message) {
    addOrSkip(AppState.messages, message)
  }

}


function addOrSkip(arr, item) {
  let found = arr.find(i => i.id == item.id)
  if (!found) {
    arr.push(item)
  }
}




export const socketService = new SocketService()
