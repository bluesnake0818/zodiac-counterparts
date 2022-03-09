import mongoose from 'mongoose'

const Schema = mongoose.Schema

const memeSchema = new Schema({
  title: String,
  url: String,
  funny: Boolean,
  author: {type: Schema.Types.ObjectId, ref: "Profile"}
})

const Meme = mongoose.model('Meme', memeSchema)

export {
  Meme
}