import { socketService } from "../services/SocketService.js";

export class LightHandler {

  static toggleLight() {
    socketService.emit('TOGGLE_LIGHT')
  }

  static getLightState() {
    socketService.emit('GET_LIGHT_STATE')
  }

}
