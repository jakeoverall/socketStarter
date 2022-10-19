import { socketService } from "../services/SocketService.js"

export class RegionHandler {

  static EnterRegion(regionId) {
    socketService.emit('ENTER_REGION', regionId)
  }

  static LeaveRegion(regionId) {
    socketService.emit('LEAVE_REGION', regionId)
  }

}
