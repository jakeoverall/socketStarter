import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const RegionSchema = new Schema(
  {
    name: { type: String, required: true },
    picture: { type: String, required: true },
    description: { type: String, default: '' },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

RegionSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

RegionSchema.virtual('membersCount', {
  localField: '_id',
  foreignField: 'regionId',
  count: true,
  justOne: false,
  ref: 'RegionMember'
})
