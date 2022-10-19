import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { RegionSchema } from '../models/Region.js';
import { RegionMemberSchema } from '../models/RegionMember.js';
import { RegionMessageSchema } from '../models/RegionMessage.js';
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);


  Regions = mongoose.model('Region', RegionSchema)
  RegionMembers = mongoose.model('RegionMember', RegionMemberSchema)
  RegionMessages = mongoose.model('RegionMessage', RegionMessageSchema)

}

export const dbContext = new DbContext()
