import { Zodiac } from '../models/zodiac.js'

function index(req, res) {
  // console.log("zodiac")
  res.render('zodiacs/index', {
    title: "zodiac"
  })
}

export {
  index
}