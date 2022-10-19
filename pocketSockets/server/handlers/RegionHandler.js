import { SocketHandler } from '../utils/SocketHandler'

export class RegionHandler extends SocketHandler {
  /**
   * @param {import("socket.io").Server} io
   * @param {import("socket.io").Socket} socket
   */
  constructor(io, socket) {
    super(io, socket, true)
    this
      .on('ENTER_REGION', this.enterRegion)
      .on('LEAVE_REGION', this.leaveRegion)
  }

  enterRegion(regionId) {
    this.socket.join(regionId)
  }

  leaveRegion(regionId) {
    this.socket.leave(regionId)
  }
}
