import { AppState } from '../AppState.js'
import Pop from '../utils/Pop'
import { SocketHandler } from '../utils/SocketHandler'

class SocketService extends SocketHandler {
  constructor() {
    super()
    this
      .on('error', this.onError)
      .on('LIGHT_STATE', this.setLightState)
  }

  onError(e) {
    Pop.toast(e.message, 'error')
  }

  setLightState(lightState) {
    AppState.lightIsOn = lightState
  }

}

export const socketService = new SocketService()
