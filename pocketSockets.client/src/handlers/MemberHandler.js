import { AppState } from "../AppState.js";
import { socketService } from "../services/SocketService.js";
import Pop from "../utils/Pop.js";

function toggleMemberOffline(member) {
  const active = AppState.members.find(m => m.accountId == member.id)
  active.isOnline = false
  Pop.toast(`${member.email.split('@')[0]} is offline`, 'warning')
}

function toggleMemberOnline(member) {
  const active = AppState.members.find(m => m.accountId == member.id)
  active.isOnline = true
  Pop.success(`${member.email.split('@')[0]} is online`)
}

class MemberHandler {
  constructor() {
    socketService
      .on('userDisconnected', toggleMemberOffline)
      .on('userConnected', toggleMemberOnline)
  }
}


export const memberHandler = new MemberHandler()
