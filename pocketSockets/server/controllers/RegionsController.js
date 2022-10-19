import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { regionsService } from '../services/RegionsService.js'

export class RegionsController extends BaseController {
  constructor() {
    super('api/regions')
    this.router
      .get('', this.getAll)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .post('/:id/message', this.createMessage)
      .post('/:id/join', this.joinRegion)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      const regions = await regionsService.get(req.query)
      return res.send(regions)
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
