import mongoose from 'mongoose'

const Schema = mongoose.Schema

const thoughtSchema = new mongoose.Schema({
  title: String,
  mood: 
  {
    type: String,
    enum: ["☀️", "🌤", "🌥", "🌧", "⚡️", "🌈"]
  },
  comment: String, 
}, {
  timestamps: true
})

const profileSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  avatar: String,
  // hasVoted: Boolean,
  // zodiac: {type: Schema.Types.ObjectId, ref: "Zodiac"},
  thoughts: [thoughtSchema]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
