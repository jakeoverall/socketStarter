import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class RegionsService {
  async join(regionId, userId) {
    const region = await this.getRegionById(regionId)
    const regionMember = await dbContext.RegionMembers.create({
      accountId: userId,
      regionId: region.id,
    })
    return regionMember
  }

  async createMessage(messageData) {
    const regionMember = await dbContext.RegionMembers.findOne({ regionId: messageData.regionId, accountId: messageData.creatorId })
    if (!regionMember) {
      throw new BadRequest('You are not a member of this region please join to add messages')
    }

    const message = await dbContext.RegionMessages.create(messageData)
    return message
  }


  async getRegionById(id) {
    const region = await dbContext.Regions.findById(id).populate('membersCount')
    if (!region) {
      throw new BadRequest("Invalid Region Id")
    }
    return region
  }

  async get(query) {
    const regions = dbContext.Regions.find(query).populate('membersCount')
    return regions
  }

  async create(regionData) {
    const region = await dbContext.Regions.create(regionData)
    dbContext.RegionMembers.create({
      accountId: regionData.creatorId,
      regionId: region.id,
    })
    return region
  }


  async delete(regionId, userId) {
    const region = await this.getRegionById(regionId)
    // @ts-ignore
    if (region.creatorId.toString() != userId) {
      throw new Forbidden('You are not allowed to delete this region')
    }

    await region.remove()

    await dbContext.RegionMembers.deleteMany({ regionId: region.id })
    await dbContext.RegionMessages.deleteMany({ regionId: region.id })
    return 'region has been purged'
  }


}


export const regionsService = new RegionsService()
