import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new mongoose.Schema({
  author: {type: Schema.Types.ObjectId, ref: "Profile"},
  content: {type: String, required: true},
}, {
  timestamps: true
})

const zodiacSchema = new Schema ({
  startDate: Date,
  endDate: Date,
  wZodName: String,
  eZodName: String,
  wZodDesc: String,
  eZodDesc: String,
  wZodPollCount: Number,
  eZodPollCount: Number,
  comments: [commentSchema],
}, {
  timestamps: true
})

const Zodiac = mongoose.model('Zodiac', zodiacSchema)

export {
  Zodiac
}