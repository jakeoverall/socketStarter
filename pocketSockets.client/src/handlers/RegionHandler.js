import { SocketHandler } from "../utils/SocketHandler.js"

class RegionHandler extends SocketHandler {

  constructor() {
    super(true)
  }

  EnterRegion(regionId) {
    this.emit('ENTER_REGION', regionId)
  }

  LeaveRegion(regionId) {
    this.emit('LEAVE_REGION', regionId)
  }

}

export const regionHandler = new RegionHandler()