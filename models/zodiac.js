import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new mongoose.Schema({
  author: {type: Schema.Types.ObjectId, ref: "Profile"},
  content: {type: String, required: true},
}, {
  timestamps: true
})

const pollSchema = new mongoose.Schema({
  voter: {type: Schema.Types.ObjectId, ref: "Profile"},
  name: String,
}, {
  timestamps: true
})

const zodiacSchema = new Schema ({
  wZodName: String,
  eZodName: String,
  wZodDesc: String,
  eZodDesc: String,
  wZodImgURL: String,
  eZodImgURL: String,
  comments: [commentSchema],
  polls: [pollSchema],
}, {
  timestamps: true
})

const Zodiac = mongoose.model('Zodiac', zodiacSchema)

export {
  Zodiac
}