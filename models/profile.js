import mongoose from 'mongoose'

const Schema = mongoose.Schema

const thoughtSchema = new mongoose.Schema({
  title: String,
  mood: 
  {
    type: String,
    enum: ["☀️", "🌤", "🌥", "🌧", "⚡️", "🌈"]
  },
  comment: 
  {
    type: String, 
    default: "."
  }
  
}, {
  timestamps: true
})

const profileSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  avatar: String,
  thoughts: [thoughtSchema]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
