import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const RegionMemberSchema = new Schema(
  {
    regionId: { type: Schema.Types.ObjectId, required: true, ref: 'Region' },
    accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    isOnline: { type: Boolean, default: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

RegionMemberSchema.index({ regionId: 1, accountId: 1 }, { unique: true })
