import mongoose from 'mongoose'

const Schema = mongoose.Schema

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
})