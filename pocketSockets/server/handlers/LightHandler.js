import { SocketHandler } from '../utils/SocketHandler'

let lightSwitchOn = false


export class LightHandler extends SocketHandler {
  /**
   * @param {import("socket.io").Server} io
   * @param {import("socket.io").Socket} socket
   */
  constructor(io, socket) {
    super(io, socket)
    this
      .on('GET_LIGHT_STATE', this.sendLightState)
      .on('TOGGLE_LIGHT', this.toggleLight)
  }
  sendLightState() {
    this.socket.emit('LIGHT_STATE', lightSwitchOn)
  }

  toggleLight() {
    lightSwitchOn = !lightSwitchOn
    this.io.emit('LIGHT_STATE', lightSwitchOn)
  }
}
