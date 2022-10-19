import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { regionsService } from '../services/RegionsService.js'
import { socketProvider } from '../SocketProvider.js'

export class RegionsController extends BaseController {
  constructor() {
    super('api/regions')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getRegion)
      .get('/:id/members', this.getRegionMembers)
      .get('/:id/messages', this.getRegionMessages)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .post('/:id/messages', this.createMessage)
      .post('/:id/join', this.joinRegion)
      .delete('/:id', this.delete)
  }
  async getRegionMessages(req, res, next) {
    try {
      const messages = await regionsService.getMessages(req.params.id)
      res.send(messages)
    } catch (error) {
      next(error)
    }
  }
  async getRegionMembers(req, res, next) {
    try {
      const members = await regionsService.getMembers(req.params.id)
      res.send(members)
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      const regions = await regionsService.get(req.query)
      return res.send(regions)
    } catch (error) {
      next(error)
    }
  }

  async getRegion(req, res, next) {
    try {
      const region = await regionsService.getRegionById(req.params.id)
      return res.send(region)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const region = await regionsService.create(req.body)
      res.send(region)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const purged = await regionsService.delete(req.params.id, req.userInfo.id)
      res.send(purged)
    } catch (error) {
      next(error)
    }
  }


  async createMessage(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.regionId = req.params.id
      const message = await regionsService.createMessage(req.body)
      socketProvider.messageRoom(req.params.id, 'MESSAGE_ADDED', message)
      res.send(message)
    } catch (error) {
      next(error)
    }
  }

  async joinRegion(req, res, next) {
    try {
      const regionMember = await regionsService.join(req.params.id, req.userInfo.id)
      res.send(regionMember)
    } catch (error) {
      next(error)
    }
  }

}
