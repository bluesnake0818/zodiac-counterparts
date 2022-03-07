import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  avatar: String,
  zodiac: {type: Schema.Types.ObjectId, ref: "Zodiac"}
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
