import { Auth0Provider } from '@bcwdev/auth0provider'
import { attachHandlers } from '../../Setup'
import { dbContext } from '../db/DbContext.js'
import { accountService } from '../services/AccountService'
import { logger } from '../utils/Logger.js'
import { SocketHandler } from '../utils/SocketHandler'

export class AuthHandler extends SocketHandler {
  /**
   * @param {import("socket.io").Server} io
   * @param {import("socket.io").Socket} socket
   */
  constructor(io, socket) {
    super(io, socket)
    this
      .on('authenticate', this.onAuthenticate)
      .on('disconnect', this.onDisconnect)
  }

  async onAuthenticate(bearerToken) {
    try {
      const user = await Auth0Provider.getUserInfoFromBearerToken(bearerToken)
      const profile = await accountService.getAccount(user)
      const limitedProfile = {
        id: profile.id,
        email: profile.email,
        picture: profile.picture
      }
      this.socket.join(user.id)
      attachHandlers(this.io, this.socket, user, limitedProfile)
      this.socket.emit('authenticated', limitedProfile)
      this.io.emit('userConnected', limitedProfile)
      await dbContext.RegionMembers.updateMany({ accountId: this.profile.id }, { isOnline: true })
    } catch (e) {
      this.socket.emit('error', e)
    }
  }

  async onDisconnect() {
    try {
      this.io.emit('userDisconnected', this.profile)
      await dbContext.RegionMembers.updateMany({ accountId: this.profile.id }, { isOnline: false })
    } catch (error) {
      logger.error('[DISCONNECTING_USER_VIA_SOCKET]', error)
    }

  }
}
