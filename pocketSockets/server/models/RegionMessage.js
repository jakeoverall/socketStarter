import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const RegionMessageSchema = new Schema(
  {
    body: { type: String, required: true, minlength: 1, maxlength: 5000 },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    regionId: { type: Schema.Types.ObjectId, required: true, ref: 'Region' },
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
